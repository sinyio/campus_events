import { API_CONFIG } from '../config/api';
import { apiService } from './apiService';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthResponse {
  user: {
    id: string;
    login: string;
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface LoginDto {
  login: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  name: string;
}

export const authService = {
  async login(dto: LoginDto): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(API_CONFIG.ENDPOINTS.LOGIN, dto);
      await this.setTokens(response.accessToken, response.refreshToken);
      await this.setUser(response.user);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  },

  async register(dto: RegisterDto): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(API_CONFIG.ENDPOINTS.REGISTER, dto);
      await this.setTokens(response.accessToken, response.refreshToken);
      await this.setUser(response.user);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  },

  async logout() {
    try {
      await this.removeTokens();
      await this.removeUser();
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Logout failed');
    }
  },

  async getNewTokens(): Promise<AuthResponse> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token');

      const response = await apiService.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.REFRESH_TOKEN,
        { refreshToken }
      );
      
      await this.setTokens(response.accessToken, response.refreshToken);
      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw new Error('Token refresh failed');
    }
  },

  async setTokens(accessToken: string, refreshToken: string) {
    try {
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    } catch (error) {
      console.error('Failed to save tokens:', error);
      throw new Error('Failed to save tokens');
    }
  },

  async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync('accessToken');
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  },

  async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync('refreshToken');
    } catch (error) {
      console.error('Failed to get refresh token:', error);
      return null;
    }
  },

  async removeTokens() {
    try {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
    } catch (error) {
      console.error('Failed to remove tokens:', error);
      throw new Error('Failed to remove tokens');
    }
  },

  async setUser(user: AuthResponse['user']) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user:', error);
      throw new Error('Failed to save user');
    }
  },

  async getUser(): Promise<AuthResponse['user'] | null> {
    try {
      const user = await AsyncStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  },

  async removeUser() {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to remove user:', error);
      throw new Error('Failed to remove user');
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getAccessToken();
      return !!token;
    } catch (error) {
      console.error('Failed to check authentication:', error);
      return false;
    }
  }
}; 