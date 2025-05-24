import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Auth } from './decorators/auth.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Вход в систему' })
  @ApiResponse({
    status: 200,
    description: 'Успешный вход',
    schema: {
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            login: { type: 'string' },
            name: { type: 'string' }
          }
        },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Обновление токена доступа' })
  @ApiResponse({
    status: 200,
    description: 'Токены успешно обновлены',
    schema: {
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Неверный токен обновления' })
  @ApiBearerAuth('JWT-auth')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  @Auth()
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно зарегистрирован',
    schema: {
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            login: { type: 'string' },
            name: { type: 'string' }
          }
        },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }
}
