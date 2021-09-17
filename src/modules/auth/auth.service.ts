import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register.dto';

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

  async register(registerDto: CreateUserDto): Promise<RegisterResponseDto> {
    const user = await this.usersService.create(registerDto);
    return {
      token: this._generateToken(user.id),
      user,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findWithEmail(loginDto.email);
    if (!user || loginDto.password !== user.password) {
      throw new HttpException('Wrong username or password', HttpStatus.UNAUTHORIZED);
    }
    return {
      token: this._generateToken(user.id),
      user,
    };
  }

  private _generateToken(userId: number): string {
    return this.jwtService.sign({ id: userId });
  }
}
