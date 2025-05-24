import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../config/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { createStyles } from './styles';
import Button from '../../ui/Button';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SettingsScreen = () => {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const colors = theme.colors[isDark ? 'dark' : 'light'];
  const styles = createStyles(colors);

  const handleLogout = async () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              navigation.navigate('MainTabs');
            } catch (error) {
              console.error('Logout failed:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Настройки</Text>
      
      <TouchableOpacity 
        style={[styles.button, { borderRadius: 24 }]}
        onPress={toggleTheme}
      >
        <View style={[styles.icon, isDark && styles.iconFilled]} />
        <Text style={styles.buttonText}>
          {isDark ? 'Светлая тема' : 'Темная тема'}
        </Text>
      </TouchableOpacity>

      <Button
        variant="destructive"
        onPress={handleLogout}
        style={{ marginTop: 'auto', marginBottom: 16, width: '100%' }}
      >
        Выйти
      </Button>
    </View>
  );
}; 