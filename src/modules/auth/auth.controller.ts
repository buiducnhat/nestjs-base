import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '@src/decorators/roles.decorator';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { Role } from './enums/role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: UserInfoDto, description: 'success' })
  async login(@Body() loginDto: LoginDto): Promise<UserInfoDto> {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, type: UserInfoDto, description: 'success' })
  async register(@Body() registerDto: CreateUserDto): Promise<UserInfoDto> {
    return this.authService.register(registerDto);
  }

  @Get('/me')
  @ApiOperation({ summary: 'Profile' })
  @ApiResponse({ status: 200, type: UserInfoDto, description: 'success' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: any) {
    return req.user;
  }

  @Get('/admin')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async admin() {
    return { message: 'Admin route for testing' };
  }
}
