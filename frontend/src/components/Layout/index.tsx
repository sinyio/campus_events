import React from 'react';
import { View } from 'react-native';
import AppNavigator from '../../navigation/AppNavigator';
import { createStyles } from './styles';

export const Layout: React.FC = () => {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}; 