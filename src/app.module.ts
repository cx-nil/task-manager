import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorsModule } from './features/authors/authors.module';
import { AuthModule } from './features/auth/auth.module';
import { join } from 'path';
import { Env } from './config/constants/env';

@Module({
  imports: [
    MongooseModule.forRoot(Env.DB_URI ?? ''),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      graphiql: true,
      formatError: (error) => ({
        message: error.message || 'Internal Server Error',
        extensions: {
          code: error.extensions?.code,
        },
      }),
    }),
    AuthorsModule,
    AuthModule,
  ],
})
export class AppModule {}
