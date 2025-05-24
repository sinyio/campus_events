import { useInfiniteQuery } from '@tanstack/react-query';
import { eventService } from '../services/eventService';
import { Event } from '../types/event';

interface FavoriteEvent {
  id: string;
  userId: string;
  eventId: string;
  addedAt: string;
  event: Event;
}

interface FavoritesResponse {
  data: FavoriteEvent[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export const useMyFavorites = () => {
    return useInfiniteQuery({
        queryKey: ['myFavorites'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await eventService.getMyFavorites(Number(pageParam));
            return response as FavoritesResponse;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage?.meta?.hasNextPage) {
                return undefined;
            }
            return Number(lastPage.meta.page) + 1;
        },
        initialPageParam: 1,
    });
}; 