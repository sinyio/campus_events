import { IsOptional, IsString, IsEnum, IsNumber, Min, IsDateString, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EventStatus } from '@prisma/client';

export class GetEventsDto {
  @ApiProperty({ 
    required: false, 
    enum: EventStatus,
    description: 'Filter events by status'
  })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiProperty({ 
    required: false, 
    type: [String],
    description: 'Filter events by category IDs (comma-separated)'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (!value) return undefined;
    if (Array.isArray(value)) return value;
    return value.split(',');
  })
  categoryId?: string[];

  @ApiProperty({ 
    required: false, 
    type: String,
    description: 'Search events by title (case-insensitive partial match)'
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ 
    required: false, 
    type: String,
    format: 'date',
    description: 'Filter events by specific date (YYYY-MM-DD) - returns events that occur on this date (between startTime and endTime)'
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ 
    required: false, 
    type: Number,
    minimum: 1,
    description: 'Page number (starts from 1)'
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ 
    required: false, 
    type: Number,
    minimum: 1,
    description: 'Number of items per page'
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
} 