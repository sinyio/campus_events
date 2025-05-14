import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GetEventsDto } from './dto/get-events.dto';
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
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
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
    name: 'startDate', 
    required: false, 
    type: String,
    format: 'date-time',
    description: 'Filter events starting from this date'
  })
  @ApiQuery({ 
    name: 'endDate', 
    required: false, 
    type: String,
    format: 'date-time',
    description: 'Filter events ending before this date'
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
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
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
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete event by ID' })
  @ApiResponse({ status: 200, description: 'Event has been successfully deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
} 