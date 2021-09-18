import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from '@modules/auth/auth.service';
import { JwtPayload } from '@modules/auth/dto/jwt-payload.dto';
import { IAuthConfig } from '@src/configs/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<IAuthConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwtSecretKey'),
    });
  }

  async validate(payload: JwtPayload) {
    return this.authService.validateUser(payload.userId);
  }
}
