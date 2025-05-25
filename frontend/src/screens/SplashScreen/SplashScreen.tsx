import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { theme } from '../../config/theme';
import { Logo } from '../../ui/Logo';

export const SplashScreen = () => {
  const { isDark } = useTheme();
  const backgroundColor = isDark ? theme.colors.dark.background : theme.colors.light.background;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Logo width={300} height={300} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 