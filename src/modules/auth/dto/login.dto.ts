import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { User } from '@modules/users/entities/user.entity';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  token: string;
  user: User;
}
