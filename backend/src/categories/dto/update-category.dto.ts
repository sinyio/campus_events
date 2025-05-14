import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsUrl } from 'class-validator';
import { CategoryType } from '../enums/category-type.enum';

export class UpdateCategoryDto {
  @ApiProperty({ 
    description: 'Тип категории',
    enum: CategoryType,
    example: CategoryType.CONFERENCES,
    required: false
  })
  @IsEnum(CategoryType)
  @IsOptional()
  type?: CategoryType;

  @ApiProperty({ 
    description: 'Название категории',
    example: 'Конференции',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    description: 'URL изображения категории',
    example: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format',
    required: false
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
} 