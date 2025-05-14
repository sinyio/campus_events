import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStyles } from '../hooks/useThemeStyles';

const CalendarScreen: React.FC = () => {
  const { getColor } = useThemeStyles();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('background'),
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: getColor('text'),
      marginBottom: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Календарь событий</Text>
    </View>
  );
};

export default CalendarScreen; 