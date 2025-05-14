import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { useEvents, Event } from '../../hooks/useEvents';
import { useDebounce } from '../../hooks/useDebounce';
import { EventCard } from '../../components/EventCard';
import FilterModal from '../../components/FilterModal';
import { createStyles } from './styles';

const SearchScreen: React.FC = () => {
  const { getColor } = useThemeStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    status?: string;
    categoryId?: string[];
  }>({
    categoryId: ['all']
  });
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 700);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useEvents({
    ...filters,
    search: debouncedSearchQuery,
  });

  const styles = createStyles(getColor);

  const handleFiltersChange = (newFilters: { status?: string; categoryId?: string[] }) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={getColor('primary')} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>
          {error instanceof Error ? error.message : 'An error occurred'}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => refetch()}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const events = data?.pages.flatMap(page => page.data) ?? [];
  const uniqueEvents = events.filter((event, index, self) =>
    index === self.findIndex((e) => e.id === event.id)
  );

  const renderItem = ({ item }: { item: Event }) => (
    <EventCard event={item} />
  );

  const renderFooter = () => {
    if (!hasNextPage) return null;

    return (
      <TouchableOpacity
        style={styles.loadMoreButton}
        onPress={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        <Text style={styles.loadMoreText}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Поиск</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск событий..."
          placeholderTextColor={getColor('textSecondary')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>Фильтр</Text>
        </TouchableOpacity>
      </View>
      {debouncedSearchQuery && <FlatList
        data={uniqueEvents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? 'Ничего не найдено' : 'Введите поисковый запрос'}
          </Text>
        }
      />}

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApply={handleFiltersChange}
        selectedCategories={filters.categoryId || []}
        selectedStatus={filters.status}
      />
    </View>
  );
};

export default SearchScreen; 