import { IsString, IsOptional, IsDateString, IsEnum, IsNumber, Min } from 'class-validator';
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

  @ApiPropertyOptional({ description: 'Maximum number of participants' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxParticipants?: number;

  @ApiPropertyOptional({ 
    description: 'Registration deadline',
    example: '2024-03-19T23:59:59Z'
  })
  @IsOptional()
  @IsDateString()
  registrationDeadline?: string;
} 