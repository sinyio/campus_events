import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/events.service';
import { EventRegistrationsController } from './controllers/event-registrations.controller';
import { EventRegistrationsService } from './services/event-registrations.service';
import { EventFavoritesController } from './controllers/event-favorites.controller';
import { EventFavoritesService } from './services/event-favorites.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [
    EventsController, 
    EventRegistrationsController, 
    EventFavoritesController
  ],
  providers: [
    EventsService, 
    EventRegistrationsService, 
    EventFavoritesService, 
    PrismaService
  ],
  exports: [
    EventsService, 
    EventRegistrationsService, 
    EventFavoritesService
  ],
})
export class EventsModule {} 