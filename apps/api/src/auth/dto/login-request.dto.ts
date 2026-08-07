import { LoginRequest } from '@repo/models';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginRequestDto implements LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
