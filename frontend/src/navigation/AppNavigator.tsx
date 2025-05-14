import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import FeedScreen from '../screens/FeedScreen';
import SearchScreen from '../screens/SearchScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import { Event } from '../types/event';
import { useTheme } from '../context/ThemeContext';
import { theme } from '../config/theme';
import { View, Text, StyleSheet } from 'react-native';

export type RootStackParamList = {
  MainTabs: undefined;
  EventDetails: { event: Event };
};

export type RootTabParamList = {
  'Лента': undefined;
  'Поиск': undefined;
  'Календарь': undefined;
  'Профиль': undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

type IconName = keyof typeof Ionicons.glyphMap;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#363638',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#4790FF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#1E1E1F',
  },
  tabBar: {
    height: 94,
    backgroundColor: '#363638',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TabNavigator = () => {
  const { isDark } = useTheme();
  const colors = theme.colors[isDark ? 'dark' : 'light'];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName = 'alert-circle-outline';

          if (route.name === 'Лента') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Поиск') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Календарь') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Профиль') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        header: () => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Кампус</Text>
          </View>
        ),
        contentStyle: {
          backgroundColor: '#1E1E1F',
        },
      })}
    >
      <Tab.Screen name="Лента" component={FeedScreen} />
      <Tab.Screen name="Поиск" component={SearchScreen} />
      <Tab.Screen name="Календарь" component={CalendarScreen} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const { isDark } = useTheme();
  const colors = theme.colors[isDark ? 'dark' : 'light'];

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: '#1E1E1F',
            },
          }}
        >
          <Stack.Screen 
            name="MainTabs" 
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="EventDetails" 
            component={EventDetailsScreen}
            options={{
              header: () => (
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Кампус</Text>
                </View>
              ),
            }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator; 