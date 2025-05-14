import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { CategoryType } from '../enums/category-type.enum';

export class CreateCategoryDto {
  @ApiProperty({ 
    description: 'Тип категории',
    enum: CategoryType,
    example: CategoryType.CONFERENCES
  })
  @IsEnum(CategoryType)
  @IsNotEmpty()
  type: CategoryType;

  @ApiProperty({ 
    description: 'Название категории',
    example: 'Конференции'
  })
  @IsString()
  @IsNotEmpty()
  name: string;
} 