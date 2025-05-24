import React, { useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { createStyles } from './styles';
import { useMyRegistrations } from '../../hooks/useMyRegistrations';
import { EventCard } from '../../components/EventCard';
import { EventRegistration } from '../../types/event';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const MyEventsScreen = () => {
  const { getColor } = useThemeStyles();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useMyRegistrations();

  const styles = createStyles(getColor);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [70, 0],
    extrapolate: 'clamp',
  });

  const headerPaddingTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [16, 0],
    extrapolate: 'clamp',
  });

  const headerPaddingBottom = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [8, 0],
    extrapolate: 'clamp',
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

  const registrations = data?.pages.flatMap(page => page.data) ?? [];
  const uniqueRegistrations = registrations.filter((reg, index, self) =>
    index === self.findIndex((r) => r.eventId === reg.eventId)
  );

  const renderItem = ({ item }: { item: EventRegistration }) => (
    <EventCard event={item.event} />
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
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: headerOpacity,
            height: headerHeight,
            paddingTop: headerPaddingTop,
            paddingBottom: headerPaddingBottom,
            overflow: 'hidden'
          },
        ]}
      >
        <Text style={styles.title}>Регистрации</Text>
      </Animated.View>
      <FlatList
        data={uniqueRegistrations}
        renderItem={renderItem}
        keyExtractor={(item) => item.eventId}
        contentContainerStyle={styles.listContent}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>У вас пока нет зарегистрированных мероприятий</Text>
          </View>
        }
      />
    </View>
  );
}; 