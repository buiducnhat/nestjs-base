import { Role } from '@modules/auth/enums/role.enum';

export class UserInfoDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: Role;
  token: string;
}
