import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventRegistrationDto } from '../dto/event-registration.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EventRegistrationsService {
  constructor(private readonly prisma: PrismaService) {}

  async register(userId: string, eventId: string) {
    try {
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

  async getUserRegistrations(userId: string) {
    return this.prisma.eventRegistration.findMany({
      where: {
        userId,
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
    });
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
} 