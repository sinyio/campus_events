import { IsOptional, IsString, IsEnum, IsDateString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  PAST = 'PAST',
}

export class EventFilterDto {
  @ApiProperty({ 
    description: 'Поисковый запрос для фильтрации по названию и описанию',
    required: false,
    example: 'конференция'
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ 
    description: 'ID категории для фильтрации',
    required: false,
    example: 'cat123456'
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ 
    description: 'Статус мероприятия',
    enum: EventStatus,
    required: false,
    example: 'UPCOMING'
  })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiProperty({ 
    description: 'Дата для фильтрации (YYYY-MM-DD) - возвращает мероприятия, которые происходят в этот день',
    required: false,
    example: '2024-05-01'
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ 
    description: 'Номер страницы',
    required: false,
    default: 1,
    minimum: 1,
    example: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ 
    description: 'Количество элементов на странице',
    required: false,
    default: 10,
    minimum: 1,
    example: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
} 