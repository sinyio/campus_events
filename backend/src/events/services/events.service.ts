import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { GetEventsDto } from '../dto/get-events.dto';
import { EventStatus, Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto, referenceDate?: Date) {
    const startTime = new Date(createEventDto.startTime);
    const endTime = new Date(createEventDto.endTime);

    const data = {
      title: createEventDto.title,
      description: createEventDto.description,
      startTime,
      endTime,
      date: startTime,
      location: createEventDto.location,
      category: {
        connect: {
          id: createEventDto.categoryId
        }
      },
      imageUrl: createEventDto.imageUrl,
      status: this.calculateEventStatus(startTime, endTime, referenceDate),
    };

    return this.prisma.event.create({
      data,
      include: {
        category: true,
      },
    });
  }

  async findAll(filters: GetEventsDto) {
    const { status, categoryId, search, date, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * Number(limit);
    const take = Number(limit);
    const referenceDate = date ? new Date(date) : undefined;

    const baseWhere = {
      ...(status && { status: status as EventStatus }),
      ...(search && {
        title: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
      ...(date && {
        AND: [
          {
            startTime: {
              lte: new Date(`${date}T23:59:59.999Z`),
            },
          },
          {
            endTime: {
              gte: new Date(`${date}T00:00:00.000Z`),
            },
          },
        ],
      }),
    };

    const findManyWhere = {
      ...baseWhere,
      ...(categoryId && {
        categoryId: {
          in: Array.isArray(categoryId) ? categoryId : [categoryId],
        },
      }),
    };

    const countWhere = {
      ...baseWhere,
      ...(categoryId && {
        categoryId: {
          in: Array.isArray(categoryId) ? categoryId : [categoryId],
        },
      }),
    };

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where: findManyWhere,
        include: {
          category: true,
          registrations: {
            select: {
              userId: true,
              status: true,
            },
          },
          favorites: {
            select: {
              userId: true,
            },
          },
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.event.count({
        where: countWhere,
      }),
    ]);

    // Обновляем статусы событий
    const updatedEvents = await Promise.all(
      events.map(async (event) => {
        const newStatus = this.calculateEventStatus(event.startTime, event.endTime, referenceDate);
        if (newStatus !== event.status) {
          return this.prisma.event.update({
            where: { id: event.id },
            data: { status: newStatus },
            include: {
              category: true,
              registrations: {
                select: {
                  userId: true,
                  status: true,
                },
              },
              favorites: {
                select: {
                  userId: true,
                },
              },
            },
          });
        }
        return event;
      })
    );

    return {
      data: updatedEvents,
      meta: {
        total,
        page,
        limit,
        hasNextPage: skip + events.length < total,
      },
    };
  }

  async findOne(id: string, referenceDate?: Date) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        category: true,
        registrations: {
          select: {
            userId: true,
            status: true,
          },
        },
        favorites: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    // Обновляем статус события
    const newStatus = this.calculateEventStatus(event.startTime, event.endTime, referenceDate);
    if (newStatus !== event.status) {
      return this.prisma.event.update({
        where: { id },
        data: { status: newStatus },
        include: {
          category: true,
          registrations: {
            select: {
              userId: true,
              status: true,
            },
          },
          favorites: {
            select: {
              userId: true,
            },
          },
        },
      });
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto, referenceDate?: Date) {
    const event = await this.findOne(id);

    const startTime = updateEventDto.startTime ? new Date(updateEventDto.startTime) : undefined;
    const endTime = updateEventDto.endTime ? new Date(updateEventDto.endTime) : undefined;

    const data = {
      ...(updateEventDto.title && { title: updateEventDto.title }),
      ...(updateEventDto.description && { description: updateEventDto.description }),
      ...(startTime && { startTime }),
      ...(endTime && { endTime }),
      ...(updateEventDto.location && { location: updateEventDto.location }),
      ...(updateEventDto.categoryId && { categoryId: updateEventDto.categoryId }),
      ...(updateEventDto.imageUrl && { imageUrl: updateEventDto.imageUrl }),
      ...(startTime && endTime && {
        status: this.calculateEventStatus(startTime, endTime, referenceDate),
      }),
    };

    return this.prisma.event.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.event.delete({
      where: { id },
    });
  }

  private calculateEventStatus(startTime: Date, endTime: Date, referenceDate?: Date): EventStatus {
    const now = referenceDate || new Date();
    
    // Direct date comparison without manual UTC conversion
    if (now < startTime) {
      return EventStatus.UPCOMING;
    } else if (now >= startTime && now <= endTime) {
      return EventStatus.ONGOING;
    } else {
      return EventStatus.PAST;
    }
  }
} 