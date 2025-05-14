import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { theme } from '../config/theme';
import { Event } from '../types/event';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;

const EventDetailsScreen: React.FC<Props> = ({ route }) => {
  const { event } = route.params;
  const { isDark } = useTheme();
  const colors = theme.colors[isDark ? 'dark' : 'light'];

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerImage: {
      width: '100%',
      height: 250,
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 10,
    },
    registerButton: {
      backgroundColor: '#f4511e',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    registerButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    content: {
      padding: 20,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    sectionText: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    dateTimeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    dateTimeText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 8,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: event.imageUrl || event.category?.imageUrl }} 
        style={styles.headerImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{event.title}</Text>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>О событии</Text>
          <Text style={styles.sectionText}>{event.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Дата и время</Text>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeText}>
              {formatDateTime(event.startTime)}
            </Text>
          </View>
          {event.endTime && (
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateTimeText}>
                {formatDateTime(event.endTime)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Адрес</Text>
          <Text style={styles.sectionText}>{event.location}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default EventDetailsScreen; 