import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { AuthorService } from '../authors/author.service';
import { LoginPayload } from '../../dto/auth/login-payload.dto';
import { RefreshTokenPayload } from '../../dto/auth/refresh-token-payload.dto';
import { SignupPayload } from '../../dto/auth/signup-payload.dto';
import type { Auth, SignInOptions } from '../../config/types/auth';
import { Author } from '../../schemas/author.schema';
import { Env } from '../../config/constants/env';

@Injectable()
export class AuthService {
  private accessSignInOptions: SignInOptions = {
    expiresIn: Env.JWT_TOKEN_EXPIRATION,
    secret: Env.JWT_SECRET_KEY as string,
  };

  private refreshSignInOptions: SignInOptions = {
    expiresIn: Env.JWT_REFRESH_TOKEN_EXPIRATION,
    secret: Env.JWT_REFRESH_SECRET_KEY as string,
  };

  constructor(
    private authorService: AuthorService,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginPayload) {
    const user = await this.validateUser(payload);

    const accessPayload: Auth = {
      email: user.email,
      sub: user._id.toString(),
      type: 'ACCESS',
    };

    const refreshPayload: Auth = {
      email: user.email,
      sub: user._id.toString(),
      type: 'REFRESH',
    };

    return {
      accessToken: this.jwtService.sign(
        accessPayload,
        this.accessSignInOptions,
      ),
      refreshToken: this.jwtService.sign(
        refreshPayload,
        this.refreshSignInOptions,
      ),
      author: user,
    };
  }

  async validateUser(payload: LoginPayload) {
    const { email, password } = payload;
    const user = await this.authorService.findOneByEmail(email);

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      return user;
    }
    throw new UnauthorizedException('Invalid Credentials');
  }

  async signUp(payload: SignupPayload) {
    const newUser = await this.authorService.create(payload);

    const accessPayload: Auth = {
      email: newUser.email,
      sub: newUser._id.toString(),
      type: 'ACCESS',
    };

    const refreshPayload: Auth = {
      email: newUser.email,
      sub: newUser._id.toString(),
      type: 'REFRESH',
    };

    return {
      accessToken: this.jwtService.sign(
        accessPayload,
        this.accessSignInOptions,
      ),
      refreshToken: this.jwtService.sign(
        refreshPayload,
        this.refreshSignInOptions,
      ),
      author: newUser,
    };
  }

  async findOneByEmail(email: string): Promise<Author | null> {
    return this.authorService.findOneByEmail(email);
  }

  async generateAccessToken(payload: RefreshTokenPayload) {
    const { refreshToken } = payload;
    const refreshPayload = this.jwtService.verify<Auth>(refreshToken, {
      secret: Env.JWT_REFRESH_SECRET_KEY,
    });

    if (!refreshPayload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.findOneByEmail(refreshPayload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessPayload: Auth = {
      email: user.email,
      sub: user._id.toString(),
      type: 'ACCESS',
    };

    return {
      accessToken: this.jwtService.sign(
        accessPayload,
        this.accessSignInOptions,
      ),
      refreshToken,
      author: user,
    };
  }
}
