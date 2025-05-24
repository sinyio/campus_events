import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventsDto } from './dto/get-events.dto';
import { EventStatus, Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: GetEventsDto) {
    const { status, categoryId, search, date, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: Prisma.EventWhereInput = {
      ...(status && { status: status as EventStatus }),
      ...(categoryId && categoryId.length > 0 && {
        categoryId: {
          in: categoryId,
        },
      }),
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

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
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
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.event.count({ where }),
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
} 