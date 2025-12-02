import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Match } from '../../../common/decorators/match.decorators';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role, { message: 'Role must be either USER or ADMIN' })
  role: Role;

  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
