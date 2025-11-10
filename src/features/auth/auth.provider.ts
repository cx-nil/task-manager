import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

export const authProvider = [AuthResolver, AuthService];
