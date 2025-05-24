import { Controller, Get, Post, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { EventFavoritesService } from '../services/event-favorites.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateEventDto } from '../dto/create-event.dto';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('event-favorites')
@Controller('event-favorites')
export class EventFavoritesController {
  constructor(private readonly eventFavoritesService: EventFavoritesService) {}

  @Post(':eventId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Добавить мероприятие в избранное' })
  @ApiResponse({ 
    status: 201, 
    description: 'Мероприятие успешно добавлено в избранное',
    type: CreateEventDto,
    examples: {
      success: {
        summary: 'Успешное добавление в избранное',
        value: {
          id: 'fav123456',
          userId: 'usr123456',
          eventId: 'evt123456',
          addedAt: '2024-04-21T12:00:00Z',
          event: {
            id: 'evt123456',
            title: 'Встреча выпускников',
            description: 'Ежегодная встреча выпускников факультета',
            startTime: '2024-05-01T10:00:00Z',
            endTime: '2024-05-01T18:00:00Z',
            location: 'Главный корпус, аудитория 101',
            categoryId: 'cat123456',
            imageUrl: 'https://example.com/image.jpg',
            status: 'UPCOMING',
            category: {
              id: 'cat123456',
              name: 'Выпускные мероприятия',
            },
          },
        },
      },
    },
  })
  addToFavorites(@Request() req, @Param('eventId') eventId: string) {
    return this.eventFavoritesService.addToFavorites(req.user.id, eventId);
  }

  @Delete(':eventId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить мероприятие из избранного' })
  @ApiResponse({ 
    status: 200, 
    description: 'Мероприятие успешно удалено из избранного',
    examples: {
      success: {
        summary: 'Успешное удаление из избранного',
        value: {
          message: 'Event removed from favorites',
        },
      },
    },
  })
  removeFromFavorites(@Request() req, @Param('eventId') eventId: string) {
    return this.eventFavoritesService.removeFromFavorites(req.user.id, eventId);
  }

  @Get('my-favorites')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить список избранных мероприятий' })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    type: Number,
    description: 'Номер страницы (начиная с 1)',
    example: 1
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    type: Number,
    description: 'Количество элементов на странице',
    example: 10
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список избранных мероприятий получен успешно',
    type: () => PaginatedResponseDto<CreateEventDto>,
    examples: {
      success: {
        summary: 'Успешное получение списка избранных мероприятий',
        value: {
          data: [
            {
              id: 'fav123456',
              userId: 'usr123456',
              eventId: 'evt123456',
              addedAt: '2024-04-21T12:00:00Z',
              event: {
                id: 'evt123456',
                title: 'Встреча выпускников',
                description: 'Ежегодная встреча выпускников факультета',
                startTime: '2024-05-01T10:00:00Z',
                endTime: '2024-05-01T18:00:00Z',
                location: 'Главный корпус, аудитория 101',
                categoryId: 'cat123456',
                imageUrl: 'https://example.com/image.jpg',
                status: 'UPCOMING',
                category: {
                  id: 'cat123456',
                  name: 'Выпускные мероприятия',
                },
              },
            },
          ],
          meta: {
            total: 5,
            page: 1,
            limit: 10,
            hasNextPage: false,
          },
        },
      },
    },
  })
  getMyFavorites(@Request() req, @Query() pagination: PaginationDto) {
    return this.eventFavoritesService.getUserFavorites(req.user.id, pagination);
  }

  @Get(':eventId/is-favorite')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Проверить, находится ли мероприятие в избранном' })
  @ApiResponse({ 
    status: 200, 
    description: 'Статус избранного получен успешно',
    examples: {
      success: {
        summary: 'Успешная проверка статуса избранного',
        value: {
          isFavorite: true,
        },
      },
    },
  })
  isFavorite(@Request() req, @Param('eventId') eventId: string) {
    return this.eventFavoritesService.isFavorite(req.user.id, eventId);
  }
} 