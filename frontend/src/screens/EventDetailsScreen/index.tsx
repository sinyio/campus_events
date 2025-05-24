import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { theme } from '../../config/theme';
import { Event } from '../../types/event';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { createStyles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RegisterToEventButton from '../../components/RegisterToEventButton';
import { CancelRegistrationButton } from '../../components/CancelRegistrationButton';
import { useRegisterToEvent } from '../../hooks/useRegisterToEvent';
import { useCheckRegistration } from '../../hooks/useCheckRegistration';
import { useCancelRegistration } from '../../hooks/useCancelRegistration';
import { useAuth } from '../../context/AuthContext';
import { FavoriteButton } from '../../components/FavoriteButton';
import { useAddFavorite } from '../../hooks/useAddFavorite';
import { useCheckFavorite } from '../../hooks/useCheckFavorite';
import { useDeleteFavorite } from '../../hooks/useDeleteFavorite';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EventDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NavigationProp>();
  const { event } = route.params;
  const { isDark } = useTheme();
  const colors = theme.colors[isDark ? 'dark' : 'light'];
  const { user } = useAuth();
  const { mutate: registerToEvent, isPending: isRegistering } = useRegisterToEvent();
  const { mutate: cancelRegistration, isPending: isCancelling } = useCancelRegistration();
  const { data: registrationData, isLoading: isCheckingRegistration } = useCheckRegistration(!user ? null : event.id);
  const { data: favoriteData } = useCheckFavorite(!user ? null : event.id) as { data: boolean | undefined };
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  console.log(registrationData);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleRegister = () => {
    registerToEvent(event.id, {
      onError: (error) => {
        Alert.alert(
          'Ошибка',
          'Не удалось зарегистрироваться на мероприятие. Пожалуйста, попробуйте позже.'
        );
      },
    });
  };

  const handleCancel = () => {
    cancelRegistration(event.id, {
      onError: (error) => {
        Alert.alert(
          'Ошибка',
          'Не удалось отменить регистрацию. Пожалуйста, попробуйте позже.'
        );
      },
    });
  };

  const styles = createStyles({ ...colors, isDark });

  const renderRegistrationButton = () => {
    if (!user) {
      return (
        <RegisterToEventButton onPress={() => navigation.navigate('Login')} />
      );
    }

    if (isCheckingRegistration) {
      return <RegisterToEventButton onPress={() => { }} disabled />;
    }

    if (registrationData) {
      return (
        <CancelRegistrationButton
          onPress={handleCancel}
          disabled={isCancelling}
        />
      );
    }

    return (
      <RegisterToEventButton
        onPress={handleRegister}
        disabled={isRegistering}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.imageUrl || event.category?.imageUrl }}
          style={styles.headerImage}
        />
        <View style={styles.imageOverlay}>
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: '100%', height: '100%' }}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {user && (
            <View style={styles.favoriteButtonContainer}>
              <FavoriteButton
                isFavorite={favoriteData || false}
                onPress={favoriteData ? () => deleteFavorite(event.id) : () => addFavorite(event.id)}
              />
            </View>
          )}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{event.title}</Text>
            {user && <View>{renderRegistrationButton()}</View>}
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Дата и время</Text>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeText}>
              Начало: {formatDateTime(event.startTime)}
            </Text>
            {event.endTime && (
              <Text style={styles.dateTimeText}>
                Окончание: {formatDateTime(event.endTime)}
              </Text>
            )}
          </View>
        </View>

        {event.location && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Место проведения</Text>
            <Text style={styles.sectionText}>{event.location}</Text>
          </View>
        )}

        {event.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Описание</Text>
            <Text style={styles.sectionText}>{event.description}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default EventDetailsScreen; 