import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../services/eventService';

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => eventService.deleteFavorite(eventId),
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: ['favoriteCheck', eventId] });
      queryClient.invalidateQueries({ queryKey: ['myFavorites'] });
    },
  });
}; 