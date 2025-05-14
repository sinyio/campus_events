import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useEvents, Event } from '../hooks/useEvents';
import { EventCard } from './EventCard';

interface EventsFeedProps {
  filters?: {
    status?: string;
    categoryId?: string[];
  };
}

export const EventsFeed: React.FC<EventsFeedProps> = ({ filters }) => {
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('background'),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    errorText: {
      color: getColor('textSecondary'),
      textAlign: 'center',
      marginBottom: 16,
    },
    retryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: getColor('primary'),
      borderRadius: 8,
    },
    retryButtonText: {
      color: getColor('textOnPrimary'),
      fontSize: 14,
      fontWeight: '500',
    },
    list: {
      flex: 1,
    },
    listContent: {
      padding: 16,
    },
    loadMoreButton: {
      padding: 16,
      alignItems: 'center',
    },
    loadMoreText: {
      color: getColor('primary'),
      fontSize: 14,
      fontWeight: '500',
    },
  });

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
      />
    </View>
  );
}; 