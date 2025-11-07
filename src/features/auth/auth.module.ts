import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthorsModule } from '../authors/authors.module';
import { authProvider } from './auth.provider';

@Module({
  imports: [
    AuthorsModule,
    JwtModule.register({
      secret: 'super-secret-key', // use env variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [...authProvider],
})
export class AuthModule {}
