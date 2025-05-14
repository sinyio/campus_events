import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useThemeStyles } from '../hooks/useThemeStyles';
import Select from 'react-select';

interface Category {
  id: string;
  name: string;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: { status: string; categories: string[] }) => void;
  selectedCategories: string[];
  selectedStatus: string;
}

const categories: Category[] = [
  { id: 'all', name: 'Все' },
  { id: 'music', name: 'Музыка' },
  { id: 'sports', name: 'Спорт' },
  { id: 'art', name: 'Искусство' },
  { id: 'food', name: 'Еда' },
  { id: 'tech', name: 'Технологии' },
];

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
}) => {
  const { getColor } = useThemeStyles();
  const [tempCategories, setTempCategories] = useState<string[]>(selectedCategories);
  const [tempStatus, setTempStatus] = useState(selectedStatus);

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
  });

  const handleApply = () => {
    onApply({ status: tempStatus, categories: tempCategories });
    onClose();
  };

  const toggleCategory = (categoryId: string) => {
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
            <Select
              value={statusOptions.find(option => option.value === tempStatus)}
              onChange={(option) => setTempStatus(option?.value || '')}
              options={statusOptions}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: getColor('surface'),
                  borderColor: getColor('border'),
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: getColor('surface'),
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? getColor('primary') : 'transparent',
                  color: state.isFocused ? getColor('textOnPrimary') : getColor('text'),
                }),
              }}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Категории</Text>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    tempCategories.includes(category.id) && styles.categoryChipActive,
                  ]}
                  onPress={() => toggleCategory(category.id)}
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

const PosterHeader: React.FC = () => {
  const { getColor } = useThemeStyles();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: getColor('background'),
      paddingVertical: 16,
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
  });

  const handleCategoryPress = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(selectedCategories.includes('all') ? [] : ['all']);
    } else {
      const newCategories = selectedCategories.filter(id => id !== 'all');
      if (selectedCategories.includes(categoryId)) {
        setSelectedCategories(newCategories.filter(id => id !== categoryId));
      } else {
        setSelectedCategories([...newCategories, categoryId]);
      }
    }
  };

  const handleApplyFilters = (filters: { status: string; categories: string[] }) => {
    setSelectedStatus(filters.status);
    setSelectedCategories(filters.categories);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
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
        selectedStatus={selectedStatus}
      />
    </View>
  );
};

export default PosterHeader; 