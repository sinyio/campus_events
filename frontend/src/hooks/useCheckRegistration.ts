import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/eventService';

export const useCheckRegistration = (eventId: string | null) => {
  return useQuery<boolean>({
    queryKey: ['registrationCheck', eventId],
    queryFn: () => eventService.checkRegistration(eventId as string),
    enabled: eventId !== null
  });
}; 