import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { EventRegistrationsService } from '../services/event-registrations.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateEventDto } from '../dto/create-event.dto';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';
import { EventRegistrationDto } from '../dto/event-registration.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('event-registrations')
@Controller('event-registrations')
export class EventRegistrationsController {
  constructor(private readonly eventRegistrationsService: EventRegistrationsService) {}

  @Post(':eventId/register')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Зарегистрироваться на мероприятие' })
  @ApiResponse({ 
    status: 201, 
    description: 'Регистрация на мероприятие успешно выполнена',
    type: EventRegistrationDto,
    examples: {
      success: {
        summary: 'Успешная регистрация на мероприятие',
        value: {
          id: 'reg123456',
          userId: 'usr123456',
          eventId: 'evt123456',
          status: 'REGISTERED',
          registeredAt: '2024-04-21T12:00:00Z',
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
  register(@Request() req, @Param('eventId') eventId: string) {
    return this.eventRegistrationsService.register(req.user.id, eventId);
  }

  @Post(':eventId/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Отменить регистрацию на мероприятие' })
  @ApiResponse({ 
    status: 200, 
    description: 'Регистрация на мероприятие успешно отменена',
    type: EventRegistrationDto,
    examples: {
      success: {
        summary: 'Успешная отмена регистрации',
        value: {
          id: 'reg123456',
          userId: 'usr123456',
          eventId: 'evt123456',
          status: 'CANCELLED',
          registeredAt: '2024-04-21T12:00:00Z',
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
  cancel(@Request() req, @Param('eventId') eventId: string) {
    return this.eventRegistrationsService.cancel(req.user.id, eventId);
  }

  @Post(':eventId/attend')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Отметить участника как посетившего мероприятие' })
  @ApiResponse({ 
    status: 200, 
    description: 'Участник успешно отмечен как посетивший мероприятие',
    type: EventRegistrationDto,
    examples: {
      success: {
        summary: 'Успешное подтверждение посещения',
        value: {
          id: 'reg123456',
          userId: 'usr123456',
          eventId: 'evt123456',
          status: 'ATTENDED',
          registeredAt: '2024-04-21T12:00:00Z',
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
  markAsAttended(@Param('eventId') eventId: string, @Body('userId') userId: string) {
    return this.eventRegistrationsService.markAsAttended(userId, eventId);
  }

  @Get('my-registrations')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить список своих регистраций на мероприятия' })
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
    description: 'Количество записей на странице',
    example: 10
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список регистраций получен успешно',
    type: () => PaginatedResponseDto<EventRegistrationDto>,
    examples: {
      success: {
        summary: 'Успешное получение списка регистраций',
        value: {
          data: [
            {
              id: 'reg123456',
              userId: 'usr123456',
              eventId: 'evt123456',
              status: 'REGISTERED',
              registeredAt: '2024-04-21T12:00:00Z',
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
            total: 3,
            page: 1,
            limit: 10,
            totalPages: 1,
          },
        },
      },
    },
  })
  getMyRegistrations(@Request() req, @Query() pagination: PaginationDto) {
    return this.eventRegistrationsService.getUserRegistrations(req.user.id, pagination);
  }

  @Get('event/:eventId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получить список регистраций на конкретное мероприятие' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список регистраций на мероприятие получен успешно',
    type: () => PaginatedResponseDto<EventRegistrationDto>,
    examples: {
      success: {
        summary: 'Успешное получение списка регистраций на мероприятие',
        value: {
          data: [
            {
              id: 'reg123456',
              userId: 'usr123456',
              eventId: 'evt123456',
              status: 'REGISTERED',
              registeredAt: '2024-04-21T12:00:00Z',
              user: {
                id: 'usr123456',
                email: 'user@example.com',
                firstName: 'Иван',
                lastName: 'Иванов',
              },
            },
          ],
          meta: {
            total: 25,
            page: 1,
            limit: 10,
            totalPages: 3,
          },
        },
      },
    },
  })
  getEventRegistrations(@Param('eventId') eventId: string) {
    return this.eventRegistrationsService.getEventRegistrations(eventId);
  }

  @Get('check/:eventId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Проверить регистрацию пользователя на мероприятие' })
  @ApiResponse({ 
    status: 200, 
    description: 'Информация о регистрации получена успешно',
    schema: {
      type: 'boolean',
      description: 'Зарегистрирован ли пользователь на мероприятие',
      example: true
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Пользователь не авторизован'
  })
  async checkRegistration(@Request() req, @Param('eventId') eventId: string) {
    return this.eventRegistrationsService.checkRegistration(req.user.id, eventId);
  }
} 