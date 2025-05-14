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