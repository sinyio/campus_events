import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '../screens/FeedScreen';
import SearchScreen from '../screens/SearchScreen';
import CalendarScreen from '../screens/CalendarScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { MyEventsScreen } from '../screens/MyEventsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import { Event } from '../types/event';
import { useTheme } from '../context/ThemeContext';
import { theme } from '../config/theme';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LoginScreen } from '../screens/LoginScreen';
import { useAuth } from '../context/AuthContext';
import { Feed } from '../ui/Icons/Feed';
import { Search } from '../ui/Icons/Search';
import { Calendar } from '../ui/Icons/Calendar';
import { Profile } from '../ui/Icons/Profile';
import { Settings } from '../ui/Icons/Settings';
import { styles } from './styles';
import { Logo } from 'ui/Logo';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

export type RootStackParamList = {
  MainTabs: undefined;
  EventDetails: { event: Event };
  Login: undefined;
  Settings: undefined;
  Favorites: undefined;
  MyEvents: undefined;
};

export type RootTabParamList = {
  'Афиша': undefined;
  'Поиск': undefined;
  'Календарь': { isCalendarVisible?: boolean };
  'Профиль': undefined;
};

type TabScreenProps = BottomTabScreenProps<RootTabParamList>;

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  const { isDark } = useTheme();
  const colors = theme.colors[isDark ? 'dark' : 'light'];
  const { user } = useAuth();

  const dynamicStyles = {
    header: {
      ...styles.header,
      backgroundColor: colors.surface,
    },
    tabBar: {
      ...styles.tabBar,
      backgroundColor: colors.surface,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }: TabScreenProps) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Афиша') {
            return <Feed width={30} height={30} color={color} />;
          } else if (route.name === 'Поиск') {
            return <Search width={30} height={30} color={color} />;
          } else if (route.name === 'Календарь') {
            return <Calendar width={30} height={30} color={color} />;
          } else if (route.name === 'Профиль') {
            return <Profile width={30} height={30} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: dynamicStyles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: {
          hide: {
            animation: 'spring',
            config: {
              delay: 1,
              duration: 1,
            }
          }
        },
        header: () => (
          <View style={[
            dynamicStyles.header,
            (route.name === 'Афиша' || route.name === 'Поиск') && {
              shadowColor: 'transparent',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            }
          ]}>
            <Logo width={84} height={20} />
            {route.name === 'Календарь' && (
              <TouchableOpacity
                style={[
                  styles.calendarButton,
                  {
                    position: 'absolute',
                    right: 16,
                    top: 70,
                  }
                ]}
                onPress={() => {
                  navigation.setParams({
                    isCalendarVisible: !route.params?.isCalendarVisible
                  });
                }}
              >
                <Calendar
                  width={24}
                  height={24}
                  color={route.params?.isCalendarVisible ? colors.primary : colors.text}
                />
              </TouchableOpacity>
            )}
            {route.name === 'Профиль' && (
              <TouchableOpacity
                style={[
                  styles.calendarButton,
                  {
                    position: 'absolute',
                    right: 16,
                    top: 70,
                  }
                ]}
                onPress={() => {
                  navigation.navigate('Settings' as never);
                }}
              >
                <Settings />
              </TouchableOpacity>
            )}
          </View>
        ),
      })}
    >
      <Tab.Screen name="Афиша" component={FeedScreen} />
      <Tab.Screen name="Поиск" component={SearchScreen} />
      <Tab.Screen 
        name="Календарь" 
        component={CalendarScreen}
        initialParams={{ isCalendarVisible: true }}
      />
      <Tab.Screen
        name="Профиль"
        component={user ? ProfileScreen : LoginScreen}
        options={{
          tabBarLabel: user ? 'Профиль' : 'Войти',
          headerShown: user ? true : false
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { isLoading } = useAuth();
  const { isDark } = useTheme();
  const colors = theme.colors[isDark ? 'dark' : 'light'];

  const dynamicStyles = {
    header: {
      ...styles.header,
      backgroundColor: colors.surface,
    },
    tabBar: {
      ...styles.tabBar,
      backgroundColor: colors.surface,
    },
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 0 }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
            ),
            headerStyle: dynamicStyles.header,
            headerTitle: '',
            headerLeftContainerStyle: { paddingLeft: 16 }
          })}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 0 }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
            ),
            headerStyle: dynamicStyles.header,
            headerTitle: '',
            headerLeftContainerStyle: { paddingLeft: 16 }
          })}
        />
        <Stack.Screen
          name="MyEvents"
          component={MyEventsScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 0 }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
            ),
            headerStyle: dynamicStyles.header,
            headerTitle: '',
            headerLeftContainerStyle: { paddingLeft: 16 }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 