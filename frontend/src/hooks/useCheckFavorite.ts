import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/eventService';

export const useCheckFavorite = (eventId: string | null) => {
  return useQuery<boolean>({
    queryKey: ['favoriteCheck', eventId],
    queryFn: () => eventService.checkFavorite(eventId as string),
    enabled: eventId !== null
  });
}; 