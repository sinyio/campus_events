import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useCategories } from '../hooks/useCategories';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: { status?: string; categoryId?: string[] }) => void;
  selectedCategories: string[];
  selectedStatus?: string;
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
}) => {
  const { getColor } = useThemeStyles();
  const { categories } = useCategories();
  const [tempCategories, setTempCategories] = useState<string[]>(selectedCategories);
  const [tempStatus, setTempStatus] = useState<string | undefined>(selectedStatus);

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
    onApply({ status: tempStatus, categoryId: tempCategories });
    onClose();
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

export default FilterModal; 