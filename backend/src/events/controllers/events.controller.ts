import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { GetEventsDto } from '../dto/get-events.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Создать новое мероприятие' })
  @ApiResponse({ 
    status: 201, 
    description: 'Мероприятие успешно создано',
    type: CreateEventDto,
    examples: {
      success: {
        summary: 'Успешное создание мероприятия',
        value: {
          id: 'clg123456',
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
  })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список мероприятий' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список мероприятий получен успешно',
    type: () => PaginatedResponseDto<CreateEventDto>,
  })
  findAll(@Query() filterDto: GetEventsDto) {
    const transformedDto = {
      ...filterDto,
      page: Number(filterDto.page) || 1,
      limit: Number(filterDto.limit) || 10
    };
    return this.eventsService.findAll(transformedDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию о мероприятии' })
  @ApiResponse({ 
    status: 200, 
    description: 'Информация о мероприятии получена успешно',
    type: CreateEventDto,
    examples: {
      success: {
        summary: 'Успешное получение информации о мероприятии',
        value: {
          id: 'clg123456',
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
  })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Обновить информацию о мероприятии' })
  @ApiResponse({ 
    status: 200, 
    description: 'Информация о мероприятии обновлена успешно',
    type: CreateEventDto,
    examples: {
      success: {
        summary: 'Успешное обновление информации о мероприятии',
        value: {
          id: 'clg123456',
          title: 'Встреча выпускников 2024',
          description: 'Обновленное описание мероприятия',
          startTime: '2024-05-01T10:00:00Z',
          endTime: '2024-05-01T18:00:00Z',
          location: 'Главный корпус, аудитория 102',
          categoryId: 'cat123456',
          imageUrl: 'https://example.com/new-image.jpg',
          status: 'UPCOMING',
          category: {
            id: 'cat123456',
            name: 'Выпускные мероприятия',
          },
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удалить мероприятие' })
  @ApiResponse({ 
    status: 200, 
    description: 'Мероприятие успешно удалено',
    examples: {
      success: {
        summary: 'Успешное удаление мероприятия',
        value: {
          message: 'Event with ID clg123456 has been deleted',
        },
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Get('feed')
  @ApiOperation({ summary: 'Получить ленту мероприятий' })
  @ApiResponse({ 
    status: 200, 
    description: 'Лента мероприятий получена успешно',
    type: () => PaginatedResponseDto<CreateEventDto>,
  })
  getEvents(@Query() filterDto: GetEventsDto) {
    const transformedDto = {
      ...filterDto,
      page: Number(filterDto.page) || 1,
      limit: Number(filterDto.limit) || 10
    };
    return this.eventsService.findAll(transformedDto);
  }
} 