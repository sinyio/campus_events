import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { GetEventsDto } from '../dto/get-events.dto';
import { EventStatus, Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const startTime = new Date(createEventDto.startTime);
    const endTime = new Date(createEventDto.endTime);
    const registrationDeadline = createEventDto.registrationDeadline 
      ? new Date(createEventDto.registrationDeadline)
      : undefined;

    const data = {
      title: createEventDto.title,
      description: createEventDto.description,
      startTime,
      endTime,
      location: createEventDto.location,
      categoryId: createEventDto.categoryId,
      imageUrl: createEventDto.imageUrl,
      status: this.calculateEventStatus(startTime, endTime),
      maxParticipants: createEventDto.maxParticipants,
      registrationDeadline,
    };

    return this.prisma.event.create({
      data,
      include: {
        category: true,
      },
    });
  }

  async findAll(filters: GetEventsDto) {
    const { status, categoryId, search, startDate, endDate, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * Number(limit);
    const take = Number(limit);

    const baseWhere = {
      ...(status && { status: status as EventStatus }),
      ...(search && {
        title: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
      ...(startDate && {
        startTime: {
          gte: new Date(startDate),
        },
      }),
      ...(endDate && {
        endTime: {
          lte: new Date(endDate),
        },
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

    return {
      data: events,
      meta: {
        total,
        page,
        limit,
        hasNextPage: skip + events.length < total,
      },
    };
  }

  async findOne(id: string) {
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

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);

    const startTime = updateEventDto.startTime ? new Date(updateEventDto.startTime) : undefined;
    const endTime = updateEventDto.endTime ? new Date(updateEventDto.endTime) : undefined;
    const registrationDeadline = updateEventDto.registrationDeadline 
      ? new Date(updateEventDto.registrationDeadline)
      : undefined;

    const data = {
      ...(updateEventDto.title && { title: updateEventDto.title }),
      ...(updateEventDto.description && { description: updateEventDto.description }),
      ...(startTime && { startTime }),
      ...(endTime && { endTime }),
      ...(updateEventDto.location && { location: updateEventDto.location }),
      ...(updateEventDto.categoryId && { categoryId: updateEventDto.categoryId }),
      ...(updateEventDto.imageUrl && { imageUrl: updateEventDto.imageUrl }),
      ...(updateEventDto.maxParticipants && { maxParticipants: updateEventDto.maxParticipants }),
      ...(registrationDeadline && { registrationDeadline }),
      ...(startTime && endTime && {
        status: this.calculateEventStatus(startTime, endTime),
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

  private calculateEventStatus(startTime: Date, endTime: Date): EventStatus {
    const now = new Date();
    if (now < startTime) {
      return EventStatus.UPCOMING;
    } else if (now >= startTime && now <= endTime) {
      return EventStatus.ONGOING;
    } else {
      return EventStatus.PAST;
    }
  }
} 