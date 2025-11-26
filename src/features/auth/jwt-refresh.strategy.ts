import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Env } from '../../config/constants/env';
import type { Auth } from '../../config/types/auth';
import { AuthService } from './auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    if (!Env.JWT_REFRESH_SECRET_KEY) {
      throw new Error('JWT secret key is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Env.JWT_REFRESH_SECRET_KEY,
    });
  }

  async validate(payload: Auth) {
    console.log('JwtRefreshStrategy.validate - Payload:', payload);
    const user = await this.authService.findOneByEmail(payload.email);
    if (!user || !payload) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
