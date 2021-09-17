import { User } from '@modules/users/entities/user.entity';

export class RegisterDto {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone?: string;
  password: string;
}

export class RegisterResponseDto {
  token: string;
  user: User;
}
