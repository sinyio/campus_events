import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EventFavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addToFavorites(userId: string, eventId: string) {
    try {
      return await this.prisma.eventFavorite.create({
        data: {
          userId,
          eventId,
        },
        include: {
          event: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('User or event not found');
      }
      throw error;
    }
  }

  async removeFromFavorites(userId: string, eventId: string) {
    try {
      await this.prisma.eventFavorite.delete({
        where: {
          userId_eventId: {
            userId,
            eventId,
          },
        },
      });
      return { message: 'Event removed from favorites' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Favorite not found');
      }
      throw error;
    }
  }

  async getUserFavorites(userId: string) {
    return this.prisma.eventFavorite.findMany({
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
        addedAt: 'desc',
      },
    });
  }

  async isFavorite(userId: string, eventId: string) {
    const favorite = await this.prisma.eventFavorite.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });
    return !!favorite;
  }
} 