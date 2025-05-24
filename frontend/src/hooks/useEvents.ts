import { useInfiniteQuery } from '@tanstack/react-query';
import { eventService, EventFilters } from '../services/eventService';
import { Event, EventsResponse } from '../types/event';

export { Event, EventFilters };

export const useEvents = (filters?: EventFilters) => {
  return useInfiniteQuery({
    queryKey: ['events', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await eventService.getEvents({
        ...filters,
        page: Number(pageParam),
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta?.hasNextPage) {
        return undefined;
      }
      return Number(lastPage.meta.page) + 1;
    },
    initialPageParam: 1,
    staleTime: 0,
  });
}; 