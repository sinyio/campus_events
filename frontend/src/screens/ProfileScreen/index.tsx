import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { theme } from '../../config/theme';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { createStyles } from './styles';
import favoritesBg from '../../assets/favorites.png';
import registrationsBg from '../../assets/registrations.png';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const colors = theme.colors[isDark ? 'dark' : 'light'];
  const styles = createStyles(colors);

  const navigateToFavorites = () => {
    navigation.navigate('Favorites');
  };

  const navigateToEvents = () => {
    navigation.navigate('MyEvents');
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
        <Text style={styles.userEmail}>
          {user?.email || 'Почта не указана'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Мероприятия</Text>

      <View style={styles.navigationBlocks}>
        <TouchableOpacity style={styles.block} onPress={navigateToEvents}>
          <ImageBackground 
            source={registrationsBg} 
            style={styles.blockBackground}
            resizeMode="cover"
          >
            <Text style={styles.blockText}>Регистрации</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.block} onPress={navigateToFavorites}>
          <ImageBackground 
            source={favoritesBg} 
            style={styles.blockBackground}
            resizeMode="cover"
          >
            <Text style={styles.blockText}>Избранные</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 