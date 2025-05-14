import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Event } from '../types/event';
import { useTheme } from '../context/ThemeContext';
import { theme } from '../config/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isDark } = useTheme();
  const colors = theme.colors[isDark ? 'dark' : 'light'];
  const navigation = useNavigation<NavigationProp>();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Дата не указана';
      }
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return 'Дата не указана';
    }
  };

  const handlePress = () => {
    navigation.navigate('EventDetails', { event });
  };

  const styles = StyleSheet.create({
    container: {
      height: 140,
      borderRadius: 24,
      overflow: 'hidden',
      marginBottom: 10,
      backgroundColor: colors.surface,
    },
    image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    content: {
      flex: 1,
      padding: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    category: {
      color: '#FFFFFF',
      fontSize: 14,
      marginBottom: 4,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    date: {
      color: '#FFFFFF',
      fontSize: 14,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image 
        source={{ uri: event.imageUrl || event.category?.imageUrl }} 
        style={styles.image} 
      />
      <View style={styles.content}>
        {event.category && (
          <Text style={styles.category}>{event.category.name}</Text>
        )}
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>{formatDate(event.startTime)}</Text>
      </View>
    </TouchableOpacity>
  );
}; 