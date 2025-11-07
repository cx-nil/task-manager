import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Env } from '../../config/constants/env';
import type { AuthPayload } from '../../config/types/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    if (!Env.JWT_SECRET_KEY) {
      throw new Error('JWT secret key is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Env.JWT_SECRET_KEY,
    });
  }

  validate(payload: AuthPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}
