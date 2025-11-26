import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { authProvider } from './auth.provider';
import { JwtStrategy } from './jwt.strategy';
// import { Env } from '../../config/constants/env';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [
    AuthorsModule,
    PassportModule,
    // JwtModule.register({
    //   secret: Env.JWT_SECRET_KEY,
    //   signOptions: { expiresIn: Number(Env.JWT_TOKEN_EXPIRATION) },
    // }),
    JwtModule,
  ],
  providers: [...authProvider, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
