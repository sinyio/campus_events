import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useCategories, Category } from '../hooks/useCategories';

interface FeedHeaderProps {
  selectedCategories: string[];
  selectedStatus: string | undefined;
  onFiltersChange: (filters: { status?: string; categoryId?: string[] }) => void;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: { status: string; categoryId: string[] }) => void;
  selectedCategories: string[];
  selectedStatus: string | undefined;
  categories: Category[];
}

const statusOptions = [
  { value: 'UPCOMING', label: 'Предстоящие' },
  { value: 'ONGOING', label: 'Текущие' },
  { value: 'PAST', label: 'Прошедшие' },
];

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  selectedCategories,
  selectedStatus,
  categories,
}) => {
  const { getColor } = useThemeStyles();
  const [tempCategories, setTempCategories] = useState<string[]>(selectedCategories);
  const [tempStatus, setTempStatus] = useState(selectedStatus);

  useEffect(() => {
    setTempCategories(selectedCategories);
    setTempStatus(selectedStatus);
  }, [selectedCategories, selectedStatus]);

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: getColor('background'),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      maxHeight: '80%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: getColor('text'),
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: getColor('text'),
      marginBottom: 10,
    },
    categoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    categoryChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: getColor('primary'),
    },
    categoryChipActive: {
      backgroundColor: getColor('primary'),
    },
    categoryChipText: {
      color: getColor('primary'),
    },
    categoryChipTextActive: {
      color: getColor('textOnPrimary'),
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 20,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    cancelButton: {
      backgroundColor: getColor('surface'),
    },
    applyButton: {
      backgroundColor: getColor('primary'),
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
    },
    cancelButtonText: {
      color: getColor('text'),
    },
    applyButtonText: {
      color: getColor('textOnPrimary'),
    },
    statusContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    statusChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: getColor('primary'),
    },
    statusChipActive: {
      backgroundColor: getColor('primary'),
    },
    statusChipText: {
      color: getColor('primary'),
    },
    statusChipTextActive: {
      color: getColor('textOnPrimary'),
    },
  });

  const handleApply = () => {
    if (tempStatus) {
      onApply({ status: tempStatus, categoryId: tempCategories });
      onClose();
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    if (categoryId === 'all') {
      setTempCategories(tempCategories.includes('all') ? [] : ['all']);
    } else {
      const newCategories = tempCategories.filter(id => id !== 'all');
      if (tempCategories.includes(categoryId)) {
        setTempCategories(newCategories.filter(id => id !== categoryId));
      } else {
        setTempCategories([...newCategories, categoryId]);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Фильтры</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Статус</Text>
            <View style={styles.statusContainer}>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.statusChip,
                    tempStatus === option.value && styles.statusChipActive,
                  ]}
                  onPress={() => setTempStatus(option.value)}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      tempStatus === option.value && styles.statusChipTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Категории</Text>
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  tempCategories.includes('all') && styles.categoryChipActive,
                ]}
                onPress={() => handleCategoryPress('all')}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    tempCategories.includes('all') && styles.categoryChipTextActive,
                  ]}
                >
                  Все
                </Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    tempCategories.includes(category.id) && styles.categoryChipActive,
                  ]}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      tempCategories.includes(category.id) && styles.categoryChipTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, styles.cancelButtonText]}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={handleApply}
            >
              <Text style={[styles.buttonText, styles.applyButtonText]}>Применить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const FeedHeader: React.FC<FeedHeaderProps> = ({ 
  selectedCategories, 
  selectedStatus, 
  onFiltersChange 
}) => {
  const { getColor } = useThemeStyles();
  const { categories, isLoading, error } = useCategories();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: getColor('background'),
      paddingVertical: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: getColor('text'),
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    categoriesContainer: {
      flex: 1,
      marginRight: 16,
    },
    categoryChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: getColor('primary'),
      marginRight: 8,
    },
    categoryChipActive: {
      backgroundColor: getColor('primary'),
    },
    categoryChipText: {
      color: getColor('primary'),
    },
    categoryChipTextActive: {
      color: getColor('textOnPrimary'),
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: getColor('surface'),
    },
    filterButtonText: {
      color: getColor('text'),
      fontSize: 14,
      fontWeight: '500',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: getColor('textSecondary'),
      textAlign: 'center',
      padding: 16,
    },
  });

  const handleCategoryPress = (categoryId: string) => {
    let newCategories: string[];
    if (categoryId === 'all') {
      newCategories = selectedCategories.includes('all') ? [] : ['all'];
    } else {
      const filteredCategories = selectedCategories.filter(id => id !== 'all');
      if (selectedCategories.includes(categoryId)) {
        newCategories = filteredCategories.filter(id => id !== categoryId);
      } else {
        newCategories = [...filteredCategories, categoryId];
      }
    }
    onFiltersChange({ status: selectedStatus, categoryId: newCategories });
  };

  const handleApplyFilters = (filters: { status: string; categoryId: string[] }) => {
    onFiltersChange(filters);
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
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Кампус</Text>
      <View style={styles.headerContent}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategories.includes('all') && styles.categoryChipActive,
            ]}
            onPress={() => handleCategoryPress('all')}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategories.includes('all') && styles.categoryChipTextActive,
              ]}
            >
              Все
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategories.includes(category.id) && styles.categoryChipActive,
              ]}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategories.includes(category.id) && styles.categoryChipTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>Фильтр</Text>
        </TouchableOpacity>
      </View>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApply={handleApplyFilters}
        selectedCategories={selectedCategories}
        selectedStatus={selectedStatus || ''}
        categories={categories}
      />
    </View>
  );
};

export default FeedHeader; 