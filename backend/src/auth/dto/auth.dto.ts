import { IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван Иванов',
    required: false
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Логин пользователя',
    example: 'ivanov',
    required: true
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: 'Пароль пользователя (минимум 6 символов)',
    example: 'password123',
    required: true,
    minLength: 6
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  @IsString()
  password: string;
}
