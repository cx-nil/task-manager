import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from 'src/schemas/author.schema';
import { authorsProvider } from './authors.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Author.name,
        schema: AuthorSchema,
      },
    ]),
  ],
  providers: [...authorsProvider],
  exports: [...authorsProvider],
})
export class AuthorsModule {}
