import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../services/eventService';

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => eventService.addFavorite(eventId),
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: ['favoriteCheck', eventId] });
      queryClient.invalidateQueries({ queryKey: ['myFavorites'] });
    },
  });
}; 