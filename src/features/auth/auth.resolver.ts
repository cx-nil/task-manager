import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginPayload } from '../../dto/auth/login-payload.dto';
import { SignupPayload } from '../../dto/auth/signup-payload.dto';
import { RefreshTokenPayload } from '../../dto/auth/refresh-token-payload.dto';
import { Auth } from './models/auth.model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Auth)
  async login(@Args('input') payload: LoginPayload) {
    const response = await this.authService.login(payload);
    return response;
  }

  @Mutation(() => Auth)
  async signup(@Args('input') payload: SignupPayload) {
    const response = await this.authService.signUp(payload);
    return response;
  }

  @Mutation(() => Auth)
  async getAccessToken(@Args('input') payload: RefreshTokenPayload) {
    const response = await this.authService.generateAccessToken(payload);
    return response;
  }
}
