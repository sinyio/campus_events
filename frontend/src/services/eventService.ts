import { API_CONFIG } from '../config/api';
import { apiService } from './apiService';
import { Event, EventsResponse } from '../types/event';
import { replaceUrlParams } from '../utils/replaceUrlParams';

export { Event };

export interface EventFilters extends Record<string, string | string[] | number | undefined> {
  status?: string;
  categoryId?: string[];
  page?: number;
  limit?: number;
  date?: string;
  search?: string;
}

export type RegistrationCheckResponse = boolean;

export interface EventRegistrationsResponse {
  data: Array<{
    userId: string;
    eventId: string;
    status: 'REGISTERED' | 'CANCELLED' | 'ATTENDED';
    registeredAt: string;
    event: Event;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
  };
}

export const eventService = {
  async getEvents(filters?: EventFilters): Promise<EventsResponse> {
    const queryFilters = filters?.categoryId?.includes('all')
      ? { ...filters, categoryId: undefined }
      : filters;

    if (queryFilters?.page) {
      queryFilters.page = Number(queryFilters.page);
    }

    return apiService.get<EventsResponse>(API_CONFIG.ENDPOINTS.EVENTS, queryFilters);
  },

  async registerToEvent(eventId: string) {
    return apiService.post(replaceUrlParams(API_CONFIG.ENDPOINTS.REGISTER_TO_EVENT, { eventId }));
  },

  async checkRegistration(eventId: string): Promise<RegistrationCheckResponse> {
    return apiService.get(replaceUrlParams(API_CONFIG.ENDPOINTS.CHECK_REGISTRATION, { eventId }));
  },

  async cancelRegistration(eventId: string) {
    return apiService.post(replaceUrlParams(API_CONFIG.ENDPOINTS.CANCEL_REGISTRATION, { eventId }));
  },

  async getMyRegistrations(page: number = 1, limit: number = 10): Promise<EventRegistrationsResponse> {
    return apiService.get(API_CONFIG.ENDPOINTS.MY_REGISTRATIONS, {
      page,
      limit,
    });
  },


  async addFavorite(eventId: string) {
    return apiService.post(replaceUrlParams(API_CONFIG.ENDPOINTS.ADD_FAVORITE, { eventId }));
  },

  async deleteFavorite(eventId: string) {
    return apiService.delete(replaceUrlParams(API_CONFIG.ENDPOINTS.DELETE_FAVORITE, { eventId }));
  },

  async checkFavorite(eventId: string): Promise<boolean> {
    return apiService.get(replaceUrlParams(API_CONFIG.ENDPOINTS.CHECK_FAVORITE, { eventId }));
  },

  async getMyFavorites(page: number = 1, limit: number = 10) {
    return apiService.get(API_CONFIG.ENDPOINTS.MY_FAVORITES, {
      page,
      limit,
    });
  },
}; 