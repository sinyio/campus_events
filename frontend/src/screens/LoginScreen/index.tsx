import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { theme } from '../../config/theme';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './styles';
import Button from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Logo } from '../../ui/Logo';

export const LoginScreen = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login: authLogin } = useAuth();
  const { isDark } = useTheme();
  const colors = theme.colors[isDark ? 'dark' : 'light'];
  const styles = createStyles(colors);

  const handleLogin = async () => {
    try {
      await authLogin({ login, password });
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
        <Text style={styles.subtitle}>Ваша афиша событий</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.loginContainer}>
          <Input
            placeholder="Логин"
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.passwordContainer}>
          <Input
            placeholder="Пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          >
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={28}
                color="#1E1E1F"
              />
            </TouchableOpacity>
          </Input>
        </View>
        <Button onPress={handleLogin}>Войти</Button>
      </View>
    </View>
  );
}; 