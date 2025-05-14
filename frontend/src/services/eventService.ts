import { API_CONFIG } from '../config/api';
import { apiService } from './apiService';
import { Event, EventsResponse } from '../types/event';

export { Event };

export interface EventFilters extends Record<string, string | string[] | number | undefined> {
  status?: string;
  categoryId?: string[];
  page?: number;
  limit?: number;
}

export const eventService = {
  async getEvents(filters?: EventFilters): Promise<EventsResponse> {
    // Create a new filters object without categoryId if it contains only 'all'
    const queryFilters = filters?.categoryId?.includes('all') 
      ? { ...filters, categoryId: undefined }
      : filters;
      
    return apiService.get<EventsResponse>(API_CONFIG.ENDPOINTS.EVENTS, queryFilters);
  },
}; 