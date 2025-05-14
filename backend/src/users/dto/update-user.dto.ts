import { IsString, IsOptional, IsEnum, IsUrl } from 'class-validator';
import { Theme } from '../enums/theme.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  studentId?: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @IsEnum(Theme)
  @IsOptional()
  theme?: Theme;
} 