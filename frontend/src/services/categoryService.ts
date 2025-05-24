import { API_CONFIG } from '../config/api';
import { apiService } from './apiService';

export interface Category {
  id: string;
  name: string;
}

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    return apiService.get<Category[]>(API_CONFIG.ENDPOINTS.CATEGORIES);
  },
}; 