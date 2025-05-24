import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { GetEventsDto } from '../dto/get-events.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';
import { EventStatus } from '@prisma/client';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ 
    status: 201, 
    description: 'Event has been successfully created',
    schema: {
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        startTime: { type: 'string', format: 'date-time' },
        endTime: { type: 'string', format: 'date-time' },
        location: { type: 'string' },
        status: { type: 'string', enum: Object.values(EventStatus) },
        category: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            type: { type: 'string' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createEventDto: CreateEventDto, @Query('referenceDate') referenceDate?: string) {
    return this.eventsService.create(createEventDto, referenceDate ? new Date(referenceDate) : undefined);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all events with filters',
    description: 'Returns a paginated list of events filtered by various criteria'
  })
  @ApiQuery({ 
    name: 'status', 
    required: false, 
    enum: EventStatus,
    description: 'Filter events by status'
  })
  @ApiQuery({ 
    name: 'categoryId', 
    required: false, 
    type: [String],
    description: 'Filter events by category IDs. Multiple IDs can be provided as comma-separated values (e.g., cat1,cat2,cat3)'
  })
  @ApiQuery({ 
    name: 'search', 
    required: false, 
    type: String,
    description: 'Search events by title (case-insensitive partial match)'
  })
  @ApiQuery({ 
    name: 'date', 
    required: false, 
    type: String,
    format: 'date',
    description: 'Filter events by specific date (YYYY-MM-DD) - returns events that occur on this date (between startTime and endTime)'
  })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    type: Number,
    description: 'Page number (starts from 1)'
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    type: Number,
    description: 'Number of items per page'
  })
  @ApiQuery({ 
    name: 'referenceDate', 
    required: false, 
    type: String,
    format: 'date-time',
    description: 'Reference date for calculating event status (defaults to current time)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns filtered events with pagination metadata',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              startTime: { type: 'string', format: 'date-time' },
              endTime: { type: 'string', format: 'date-time' },
              location: { type: 'string' },
              status: { type: 'string', enum: Object.values(EventStatus) },
              category: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  type: { type: 'string' }
                }
              },
              registrations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    userId: { type: 'string' },
                    status: { type: 'string' }
                  }
                }
              },
              favorites: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    userId: { type: 'string' }
                  }
                }
              }
            }
          }
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            hasNextPage: { type: 'boolean' }
          }
        }
      }
    }
  })
  findAll(@Query() filters: GetEventsDto) {
    return this.eventsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the event',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        startTime: { type: 'string', format: 'date-time' },
        endTime: { type: 'string', format: 'date-time' },
        location: { type: 'string' },
        status: { type: 'string', enum: Object.values(EventStatus) },
        category: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            type: { type: 'string' }
          }
        },
        registrations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              userId: { type: 'string' },
              status: { type: 'string' }
            }
          }
        },
        favorites: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              userId: { type: 'string' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  findOne(@Param('id') id: string, @Query('referenceDate') referenceDate?: string) {
    return this.eventsService.findOne(id, referenceDate ? new Date(referenceDate) : undefined);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update event by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Event has been successfully updated',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        startTime: { type: 'string', format: 'date-time' },
        endTime: { type: 'string', format: 'date-time' },
        location: { type: 'string' },
        status: { type: 'string', enum: Object.values(EventStatus) },
        category: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            type: { type: 'string' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  update(
    @Param('id') id: string, 
    @Body() updateEventDto: UpdateEventDto,
    @Query('referenceDate') referenceDate?: string
  ) {
    return this.eventsService.update(id, updateEventDto, referenceDate ? new Date(referenceDate) : undefined);
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
} 