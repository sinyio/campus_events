import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { Filter } from '../Icons/Filter';

interface FilterButtonProps {
  onPress: () => void;
  isActive?: boolean;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onPress, isActive = false }) => {
  const { isDark, getColor } = useThemeStyles();

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 18,
          backgroundColor: isDark ? '#4F4F52' : '#EBEBEB',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={onPress}
      >
        <Filter color={isDark ? '#F7F7F7' : '#1E1E1F'} />
      </TouchableOpacity>
      {isActive && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: getColor('primary'),
            borderWidth: 1,
            borderColor: getColor('background')
          }}
        />
      )}
    </View>
  );
}; 