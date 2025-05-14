import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { EventsFeed } from '../components/EventsFeed';
import FeedHeader from '../components/FeedHeader';

const FeedScreen: React.FC = () => {
  const { getColor } = useThemeStyles();
  const [filters, setFilters] = useState<{
    status?: string;
    categoryId?: string[];
  }>({
    categoryId: ['all']
  });

  const handleFiltersChange = (newFilters: { status?: string; categoryId?: string[] }) => {
    setFilters(newFilters);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('background'),
    },
  });

  return (
    <View style={styles.container}>
      <FeedHeader 
        selectedCategories={filters.categoryId || []}
        selectedStatus={filters.status}
        onFiltersChange={handleFiltersChange}
      />
      <EventsFeed filters={filters} />
    </View>
  );
};

export default FeedScreen; 