import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeStyles } from '../hooks/useThemeStyles';
import PosterHeader from '../components/PosterHeader';

const PosterScreen: React.FC = () => {
  const { getColor } = useThemeStyles();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('background'),
    },
  });

  return (
    <View style={styles.container}>
      <PosterHeader />
      {/* Здесь будет контент афиши */}
    </View>
  );
};

export default PosterScreen; 