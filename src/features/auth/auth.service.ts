import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { LoginPayload } from '../../dto/auth/login-payload.dto';
import { AuthorService } from '../authors/author.service';
import { SignupPayload } from 'src/dto/auth/signup-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private authorService: AuthorService,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginPayload) {
    const user = await this.validateUser(payload);
    const authPayload = { email: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(authPayload),
      refreshToken: '', // TODO: Implement refresh token logic
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
    const authPayload = { email: newUser.email, sub: newUser._id };
    return {
      accessToken: this.jwtService.sign(authPayload),
      refreshToken: '', // TODO: Implement refresh token logic
      author: newUser,
    };
  }
}
