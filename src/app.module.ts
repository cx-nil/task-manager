import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorsModule } from './features/authors/authors.module';
import { AuthModule } from './features/auth/auth.module';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nil1234:password%40123@cluster0.lgdlirv.mongodb.net/?appName=Cluster0',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      graphiql: true,
    }),
    AuthorsModule,
    AuthModule,
  ],
})
export class AppModule {}
