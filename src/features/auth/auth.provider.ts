import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

const authResolver = {
  provide: AuthResolver,
  useClass: AuthResolver,
};

const authService = {
  provide: AuthService,
  useClass: AuthService,
};

export const authProvider = [authResolver, authService];
