import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from '@prisma/client';

export class CategoryDto {
  @ApiProperty({ description: 'ID категории' })
  id: string;

  @ApiProperty({ description: 'Название категории' })
  name: string;

  @ApiProperty({ 
    description: 'Тип категории',
    enum: CategoryType
  })
  type: CategoryType;

  @ApiProperty({ 
    description: 'URL изображения категории',
    example: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format'
  })
  imageUrl: string;
} 