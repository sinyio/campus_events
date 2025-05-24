import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { EventStatus } from '@prisma/client';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiPropertyOptional({ 
    description: 'Event status',
    enum: EventStatus
  })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiPropertyOptional({ 
    description: 'Reference date for calculating event status',
    example: '2024-05-20T10:00:00Z'
  })
  @IsOptional()
  @IsDateString()
  referenceDate?: string;
} 