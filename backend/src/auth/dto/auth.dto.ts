import { IsOptional, IsString, MinLength } from "class-validator";

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  login: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  @IsString()
  password: string;
}
