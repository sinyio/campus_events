import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeStyles } from '../hooks/useThemeStyles';

const ProfileScreen: React.FC = () => {
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
      marginBottom: 24,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: getColor('text'),
      marginBottom: 16,
    },
    button: {
      backgroundColor: getColor('primary'),
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
    },
    buttonText: {
      color: getColor('textOnPrimary'),
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Настройки</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Редактировать профиль</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Изменить пароль</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Приложение</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Темная тема</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Уведомления</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen; 