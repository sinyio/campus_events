import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventRegistrationDto } from '../dto/event-registration.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class EventRegistrationsService {
  constructor(private readonly prisma: PrismaService) {}

  async register(userId: string, eventId: string) {
    try {
      // First check if a registration exists
      const existingRegistration = await this.prisma.eventRegistration.findUnique({
        where: {
          userId_eventId: {
            userId,
            eventId,
          },
        },
      });

      if (existingRegistration) {
        // If registration exists, update its status to REGISTERED
        return await this.prisma.eventRegistration.update({
          where: {
            userId_eventId: {
              userId,
              eventId,
            },
          },
          data: {
            status: 'REGISTERED',
          },
          include: {
            event: {
              include: {
                category: true,
              },
            },
          },
        });
      }

      // If no registration exists, create a new one
      return await this.prisma.eventRegistration.create({
        data: {
          userId,
          eventId,
          status: 'REGISTERED',
        },
        include: {
          event: {
            include: {
              category: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('User or event not found');
      }
      throw error;
    }
  }

  async cancel(userId: string, eventId: string) {
    try {
      return await this.prisma.eventRegistration.update({
        where: {
          userId_eventId: {
            userId,
            eventId,
          },
        },
        data: {
          status: 'CANCELLED',
        },
        include: {
          event: {
            include: {
              category: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Registration not found');
      }
      throw error;
    }
  }

  async markAsAttended(userId: string, eventId: string) {
    try {
      return await this.prisma.eventRegistration.update({
        where: {
          userId_eventId: {
            userId,
            eventId,
          },
        },
        data: {
          status: 'ATTENDED',
        },
        include: {
          event: {
            include: {
              category: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Registration not found');
      }
      throw error;
    }
  }

  async getUserRegistrations(userId: string, pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * Number(limit);
    const take = Number(limit);

    const [registrations, total] = await Promise.all([
      this.prisma.eventRegistration.findMany({
        where: {
          userId,
          status: {
            in: ['REGISTERED', 'ATTENDED']
          }
        },
        include: {
          event: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          registeredAt: 'desc',
        },
        skip,
        take,
      }),
      this.prisma.eventRegistration.count({
        where: {
          userId,
          status: {
            in: ['REGISTERED', 'ATTENDED']
          }
        },
      }),
    ]);

    return {
      data: registrations,
      meta: {
        total,
        page,
        limit,
        hasNextPage: skip + registrations.length < total,
      },
    };
  }

  async getEventRegistrations(eventId: string) {
    return this.prisma.eventRegistration.findMany({
      where: {
        eventId,
      },
      include: {
        user: true,
      },
      orderBy: {
        registeredAt: 'asc',
      },
    });
  }

  async checkRegistration(userId: string, eventId: string) {
    const registration = await this.prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });

    return registration?.status === 'REGISTERED';
  }
} 