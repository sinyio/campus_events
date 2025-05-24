import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { useDebounce } from '../../hooks/useDebounce';
import { useCategories } from '../../hooks/useCategories';
import FilterModal from '../../components/FilterModal';
import { createStyles } from './styles';
import SearchBar from '../../ui/SearchBar';
import { FilterButton } from '../../ui/FilterButton';
import { EventsList } from '../../components/EventsList';

const SearchScreen: React.FC = () => {
  const { getColor } = useThemeStyles();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    status?: string;
    categoryId?: string[];
  }>({
    categoryId: ['all'],
    status: 'UPCOMING'
  });
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 700);
  const styles = createStyles(getColor);

  const handleFiltersChange = (newFilters: { status?: string; categoryId?: string[] }) => {
    setFilters(newFilters);
  };

  const isFilterActive = filters.status !== 'UPCOMING' || 
    (filters.categoryId && filters.categoryId.length > 0 && !filters.categoryId.includes('all'));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Экскурсия в..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <FilterButton 
            onPress={() => setIsFilterModalVisible(true)} 
            isActive={isFilterActive}
          />
        </View>
      </View>

      {debouncedSearchQuery ? (
        <EventsList
          filters={{
            ...filters,
            search: debouncedSearchQuery,
          }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Введите поисковый запрос
          </Text>
        </View>
      )}

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApply={handleFiltersChange}
        selectedCategories={filters.categoryId || []}
        selectedStatus={filters.status}
        categories={categories}
      />
    </View>
  );
};

export default SearchScreen; 