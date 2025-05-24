import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Event } from '../../types/event';
import { useTheme } from '../../context/ThemeContext';
import { theme } from '../../config/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { createStyles } from './styles';
import { FavoriteButton } from '../FavoriteButton';
import { useAuth } from '../../context/AuthContext';
import { useAddFavorite } from '../../hooks/useAddFavorite';
import { useDeleteFavorite } from '../../hooks/useDeleteFavorite';
import { useCheckFavorite } from '../../hooks/useCheckFavorite';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isDark } = useTheme();
  const colors = theme.colors[isDark ? 'dark' : 'light'];
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const { data: favoriteData } = useCheckFavorite(!user ? null : event.id);
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return { day: 'Дата не указана', month: '' };
      }
      return {
        day: date.getDate().toString(),
        month: date.toLocaleDateString('ru-RU', { month: 'short' }).replace('.', '')
      };
    } catch (error) {
      return { day: 'Дата не указана', month: '' };
    }
  };

  const isSameDay = (date1: string, date2: string) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const handlePress = () => {
    navigation.navigate('EventDetails', { event });
  };

  const handleFavoritePress = () => {
    if (favoriteData) {
      deleteFavorite(event.id);
    } else {
      addFavorite(event.id);
    }
  };

  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: event.imageUrl || event.category?.imageUrl }}
        style={styles.image}
      />
      <View style={styles.gradient}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      {user && (
        <View style={styles.favoriteButtonContainer}>
          <FavoriteButton
            isFavorite={favoriteData ?? false}
            onPress={handleFavoritePress}
            transparent
          />
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.date}>
          <Text style={styles.dateDay}>{formatDate(event.startTime).day}</Text>
          <Text style={styles.dateMonthText}>{formatDate(event.startTime).month}</Text>
          {event.endTime && !isSameDay(event.startTime, event.endTime) && (
            <>
              <Text style={styles.dateMonthTextSeparator}>—</Text> 
              <Text style={styles.dateDay}>{formatDate(event.endTime).day}</Text>
              <Text style={styles.dateMonthText}>{formatDate(event.endTime).month}</Text>
            </>
          )}
        </View>
        {event.category && (
          <Text style={styles.category}>{event.category.name}</Text>
        )}
        <Text 
          style={styles.title}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {event.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}; 