import { User } from '@modules/users/entities/user.entity';

export class LoginDto {
  email: string;
  password: string;
}

export class LoginResponseDto {
  token: string;
  user: User;
}
