import { API_CONFIG } from '../config/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiService = {
  async get<T>(endpoint: string, params?: Record<string, string | string[] | number | undefined>): Promise<T> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) return;
        
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, String(v)));
        } else {
          queryParams.append(key, String(value));
        }
      });
    }

    const url = `${API_CONFIG.BASE_URL}${endpoint}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    console.log('Fetching URL:', url);
    
    try {
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new ApiError(response.status, `API request failed: ${errorText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log('Posting to URL:', url);
    console.log('Post data:', data);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new ApiError(response.status, `API request failed: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('Response data:', responseData);
      return responseData;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },
}; 