import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    return user;
  }

  async register(registerDto: CreateUserDto) {
    const user = await this.usersService.create(registerDto);
    return {
      token: this._generateToken(user.id),
      ...user,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findWithUsername(loginDto.username);
    if (!user || loginDto.password !== user.password) {
      throw new HttpException('Wrong username or password', HttpStatus.UNAUTHORIZED);
    }
    return {
      token: this._generateToken(user.id),
      ...user,
    };
  }

  private _generateToken(id: number) {
    return this.jwtService.sign({ id });
  }
}
