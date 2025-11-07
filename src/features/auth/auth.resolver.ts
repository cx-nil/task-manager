import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './models/auth.model';
import { LoginPayload } from 'src/dto/auth/login-payload.dto';
import { AuthService } from './auth.service';
import { SignupPayload } from 'src/dto/auth/signup-payload.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Auth)
  async login(@Args('input') payload: LoginPayload) {
    const response = await this.authService.login(payload);
    return response;
  }

  @Mutation(() => Auth)
  async signUp(@Args('input') payload: SignupPayload) {
    const response = await this.authService.signUp(payload);
    return response;
  }
}
