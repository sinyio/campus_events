import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService, EventFilters } from '../services/eventService';
import { Event } from '../types/event';

export { Event, EventFilters };

export const useRegisterToEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: string) => {
      return eventService.registerToEvent(eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrationCheck'] });
      queryClient.invalidateQueries({ queryKey: ['myRegistrations'] });
    },
  });
}; 