import React, { useState, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { EventsList } from '../../components/EventsList';
import FeedHeader from '../../components/FeedHeader';
import { createStyles } from './styles';
import { useCategories } from '../../hooks/useCategories';

const statusLabels: Record<string, string> = {
  'UPCOMING': 'Предстоящие',
  'ONGOING': 'Текущие',
  'PAST': 'Прошедшие'
};

export const FeedScreen: React.FC = () => {
  const { getColor } = useThemeStyles();
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const [filters, setFilters] = useState<{
    status?: string;
    categoryId?: string[];
  }>({
    categoryId: ['all'],
    status: 'UPCOMING'
  });

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleFiltersChange = (newFilters: { status?: string; categoryId?: string[] }) => {
    const categoryIds = newFilters.categoryId || [];
    
    // If trying to deselect 'all' and no other categories are selected, keep 'all' selected
    if (!categoryIds.includes('all') && categoryIds.length === 0) {
      setFilters({ ...newFilters, categoryId: ['all'] });
      return;
    }

    setFilters(newFilters);
  };

  const styles = createStyles(getColor);

  const getSubtitle = () => {
    const categoryIds = filters.categoryId || [];
    
    if (categoryIds.includes('all') || categoryIds.length === 0) {
      return `Все -> ${filters.status ? statusLabels[filters.status] : 'Ближайшие'}`;
    }

    const firstCategory = categories.find(cat => cat.id === categoryIds[0]);
    const additionalCount = categoryIds.length - 1;
    
    let categoryText = firstCategory?.name || 'Все';
    if (additionalCount > 0) {
      categoryText += ` + ${additionalCount}`;
    }
    
    return `${categoryText} -> ${filters.status ? statusLabels[filters.status] : 'Ближайшие'}`;
  };

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

  const headerMarginBottom = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [16, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { marginBottom: headerMarginBottom }]}>
        <FeedHeader
          selectedCategories={filters.categoryId || []}
          selectedStatus={filters.status}
          onFiltersChange={handleFiltersChange}
          categories={categories}
        />
      </Animated.View>
      {!isCategoriesLoading &&
        <Animated.View style={[
          styles.titleContainer, 
          { 
            opacity: headerOpacity,
            height: headerHeight,
            overflow: 'hidden'
          }
        ]}>
          <Text style={styles.title}>Афиша</Text>
          <Text style={styles.subtitle}>{getSubtitle()}</Text>
        </Animated.View>
      }
      <EventsList 
        filters={filters}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
};

export default FeedScreen; 