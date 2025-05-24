export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  categoryId: string;
  imageUrl?: string;
  status: 'UPCOMING' | 'ONGOING' | 'PAST';
  category?: {
    id: string;
    name: string;
    type: string;
    imageUrl?: string;
  };
}

export type RegistrationStatus = 'REGISTERED' | 'CANCELLED' | 'ATTENDED';

export interface EventRegistration {
  userId: string;
  eventId: string;
  status: RegistrationStatus;
  registeredAt: string;
  event: Event;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
  };
}

export type EventRegistrationsResponse = PaginatedResponse<EventRegistration>;

export interface EventsResponse {
  data: Event[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
} 