import { IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    required: false,
    example: 'John Doe'
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'User email',
    required: false,
    example: 'john.doe@example.com'
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Student ID',
    required: false,
    example: '12345'
  })
  @IsString()
  @IsOptional()
  studentId?: string;

  @ApiProperty({
    description: 'URL to user avatar',
    required: false,
    example: 'https://example.com/avatar.jpg'
  })
  @IsUrl()
  @IsOptional()
  avatarUrl?: string;
} 