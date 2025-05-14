import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { RegistrationStatus } from './registration-status.enum';

export class EventRegistrationDto {
  @ApiProperty({ description: 'ID пользователя', example: 'usr123456' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'ID мероприятия', example: 'evt123456' })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsEnum(RegistrationStatus)
  @IsNotEmpty()
  status: RegistrationStatus;
} 