import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, Animated } from 'react-native';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { Category } from '../../hooks/useCategories';
import { createStyles } from './styles';
import { Chip } from '../../ui/Chip/Index';
import Button from '../../ui/Button';

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
  const slideAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTempCategories(selectedCategories);
    setTempStatus(selectedStatus);
  }, [selectedCategories, selectedStatus]);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const styles = createStyles(getColor);

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
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View 
          style={[
            styles.modalContent,
            {
              transform: [{
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1000]
                })
              }]
            }
          ]}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Фильтры поиска</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Статус</Text>
              <View style={styles.statusContainer}>
                {statusOptions.map((option) => (
                  <Chip
                    key={option.value}
                    active={tempStatus === option.value}
                    onPress={() => setTempStatus(option.value)}
                  >
                    {option.label}
                  </Chip>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Категории</Text>
              <View style={styles.categoryContainer}>
                <Chip
                  active={tempCategories.includes('all')}
                  onPress={() => handleCategoryPress('all')}
                >
                  Все
                </Chip>
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    active={tempCategories.includes(category.id)}
                    onPress={() => handleCategoryPress(category.id)}
                  >
                    {category.name}
                  </Chip>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
          <Button
              onPress={handleApply}
              variant="primary"
              style={{ width: '100%' }}
            >
              Применить
            </Button>
            <Button
              onPress={onClose}
              style={{ backgroundColor: '#363638', width: '100%' }}
            >
              Отмена
            </Button>
            
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal; 