import { useInfiniteQuery } from '@tanstack/react-query';
import { eventService } from '../services/eventService';
import { EventRegistrationsResponse } from '../types/event';

export const useMyRegistrations = () => {
    return useInfiniteQuery({
        queryKey: ['myRegistrations'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await eventService.getMyRegistrations(Number(pageParam));
            return response as EventRegistrationsResponse;
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