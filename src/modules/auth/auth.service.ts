import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register.dto';
import { IAppConfig } from '@src/configs/app.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IAppConfig>,
  ) {}

  async findUserById(userId: number) {
    const user = await this.usersService.findOne(userId);
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.usersService.findWithEmail(email);
    return user;
  }

  async register(registerDto: CreateUserDto): Promise<RegisterResponseDto> {
    if (!!(await this.findUserByEmail(registerDto.email))) {
      throw new HttpException(
        { statusCode: HttpStatus.CONFLICT, message: 'Email already exists' },
        HttpStatus.CONFLICT,
      );
    }

    registerDto.password = bcrypt.hashSync(
      registerDto.password,
      this.configService.get('bcryptSalt'),
    );

    const user = await this.usersService.create(registerDto);
    return {
      token: this._generateToken(user.id),
      user,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findWithEmail(loginDto.email);
    if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
      throw new HttpException(
        { statusCode: HttpStatus.UNAUTHORIZED, message: 'Wrong username or password' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      token: this._generateToken(user.id),
      user,
    };
  }

  private _generateToken(userId: number): string {
    return this.jwtService.sign({ userId });
  }
}
