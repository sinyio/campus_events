import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from '@prisma/client';

export class CreateEventDto {
  @ApiProperty({ description: 'Event title' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Event description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Event start time', example: '2024-03-20T10:00:00Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ description: 'Event end time', example: '2024-03-20T12:00:00Z' })
  @IsDateString()
  endTime: string;

  @ApiPropertyOptional({ description: 'Event location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Category ID' })
  @IsString()
  categoryId: string;

  @ApiPropertyOptional({ description: 'Event image URL' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ 
    description: 'Event status',
    enum: EventStatus,
    default: EventStatus.UPCOMING
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