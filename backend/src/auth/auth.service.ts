import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: AuthDto) {
    try {
      const oldUser = await this.prisma.user.findUnique({
        where: {
          login: dto.login,
        },
      });

      if (oldUser) {
        throw new BadRequestException('User already exists');
      }

      const hashedPassword = await hash(dto.password, {
        type: 2, // Argon2id
        memoryCost: 65536, // 64 MiB
        timeCost: 3, // 3 iterations
        parallelism: 4, // 4 threads
      });

      const user = await this.prisma.user.create({
        data: {
          login: dto.login,
          name: dto.name,
          password: hashedPassword,
        },
      });

      const tokens = await this.issueTokens(user.id);

      return {
        user: {
          id: user.id,
          login: user.login,
          name: user.name,
          email: user.email,
        },
        ...tokens,
      };
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.validateUser(dto);
      const tokens = await this.issueTokens(user.id);

      return {
        user: {
          id: user.id,
          login: user.login,
          name: user.name,
          email: user.email,
        },
        ...tokens,
      };
    } catch (error) {
      this.logger.error(`Login failed: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getNewTokens(refreshToken: string) {
    try {
      const result = await this.jwt.verifyAsync(refreshToken);
      if (!result) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: result.id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const tokens = await this.issueTokens(user.id);

      return {
        user: {
          id: user.id,
          login: user.login,
          name: user.name,
          email: user.email,
        },
        ...tokens,
      };
    } catch (error) {
      this.logger.error(`Token refresh failed: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (!user) {
      this.logger.warn(`Login attempt failed: User not found with login ${dto.login}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      const isValid = await verify(user.password, dto.password);
      if (!isValid) {
        this.logger.warn(`Login attempt failed: Invalid password for user ${dto.login}`);
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (error) {
      this.logger.error(`Password verification failed for user ${dto.login}: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
