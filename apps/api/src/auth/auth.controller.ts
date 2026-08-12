import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '@repo/models';
import type { CookieOptions, Response } from 'express';
import ms, { StringValue } from 'ms';
import { AUTH_COOKIE_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserModel> {
    const { accessToken, user } = await this.authService.login(dto);
    res.cookie(AUTH_COOKIE_NAME, accessToken, this.buildCookieOptions());
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): void {
    res.clearCookie(AUTH_COOKIE_NAME, this.buildCookieOptions());
  }

  private buildCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: ms(
        (this.configService.get<string>('JWT_EXPIRES_IN') ??
          '1d') as StringValue,
      ),
    };
  }
}
