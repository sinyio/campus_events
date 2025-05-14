import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';

export const Layout: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 