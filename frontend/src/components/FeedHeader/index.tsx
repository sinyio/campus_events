import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { useCategories, Category } from '../../hooks/useCategories';
import { createStyles } from './styles';
import { FilterButton } from '../../ui/FilterButton';
import { Chip } from '../../ui/Chip/Index';
import FeedHeaderSkeleton from './FeedHeaderSkeleton';
import FilterModal from '../FilterModal';

interface FeedHeaderProps {
  selectedCategories: string[];
  selectedStatus: string | undefined;
  onFiltersChange: (filters: { status?: string; categoryId?: string[] }) => void;
  categories: Category[];
}

const FeedHeader: React.FC<FeedHeaderProps> = ({
  selectedCategories,
  selectedStatus,
  onFiltersChange,
  categories
}) => {
  const { getColor } = useThemeStyles();
  const { isLoading } = useCategories();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const styles = createStyles(getColor);

  const handleCategoryPress = (categoryId: string) => {
    if (categoryId === 'all') {
      onFiltersChange({
        categoryId: selectedCategories.includes('all') ? [] : ['all'],
        status: selectedStatus
      });
    } else {
      const newCategories = selectedCategories.filter(id => id !== 'all');
      if (selectedCategories.includes(categoryId)) {
        onFiltersChange({
          categoryId: newCategories.filter(id => id !== categoryId),
          status: selectedStatus
        });
      } else {
        onFiltersChange({
          categoryId: [...newCategories, categoryId],
          status: selectedStatus
        });
      }
    }
  };

  const handleApplyFilters = (filters: { status: string; categoryId: string[] }) => {
    onFiltersChange(filters);
  };

  const isFilterActive = selectedStatus !== 'UPCOMING' || 
    (selectedCategories && selectedCategories.length > 0 && !selectedCategories.includes('all'));

  if (isLoading) {
    return <FeedHeaderSkeleton />
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          <View style={styles.categoriesContainer}>
            <Chip
              active={selectedCategories.includes('all')}
              onPress={() => handleCategoryPress('all')}
            >
              Все
            </Chip>
            {categories.map((category) => (
              <Chip
                key={category.id}
                active={selectedCategories.includes(category.id)}
                onPress={() => handleCategoryPress(category.id)}
              >
                {category.name}
              </Chip>
            ))}
          </View>
        </ScrollView>
        <FilterButton 
          onPress={() => setIsFilterModalVisible(true)} 
          isActive={isFilterActive}
        />
      </View>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApply={handleApplyFilters}
        selectedCategories={selectedCategories}
        selectedStatus={selectedStatus}
        categories={categories}
      />
    </View>
  );
};

export default FeedHeader;