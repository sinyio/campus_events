import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { useEvents, Event } from '../../hooks/useEvents';
import { EventCard } from '../EventCard';
import { createStyles } from './styles';

interface EventsListProps {
  filters?: {
    status?: string;
    categoryId?: string[];
    date?: string;
    search?: string;
  };
  onScroll?: (event: any) => void;
}

export const EventsList: React.FC<EventsListProps> = ({ filters, onScroll }) => {
  const { getColor } = useThemeStyles();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useEvents(filters);

  const styles = createStyles(getColor);

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
        {isFetchingNextPage && <ActivityIndicator size="large" color={getColor('primary')} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
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
        onScroll={onScroll}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Ничего не найдено</Text>
          </View>
        }
      />
    </View>
  );
}; 