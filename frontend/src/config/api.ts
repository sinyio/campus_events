import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
  default: 'http://localhost:3000',
});

export const API_CONFIG = {
  BASE_URL,
  ENDPOINTS: {
    EVENTS: '/events',
    EVENT_DETAILS: '/events/:eventId',
    REGISTER_TO_EVENT: '/event-registrations/:eventId/register',
    CANCEL_REGISTRATION: '/event-registrations/:eventId/cancel',
    CHECK_REGISTRATION: '/event-registrations/check/:eventId',
    MY_REGISTRATIONS: '/event-registrations/my-registrations',
    ADD_FAVORITE: '/event-favorites/:eventId',
    DELETE_FAVORITE: '/event-favorites/:eventId',
    CHECK_FAVORITE: '/event-favorites/:eventId/is-favorite',
    MY_FAVORITES: '/event-favorites/my-favorites',
    CATEGORIES: '/categories',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/login/access-token',
    PROFILE: '/users/profile',
  },
} as const;

export const getApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`; 