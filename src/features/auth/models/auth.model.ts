import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from '../../authors/models/author.model';

@ObjectType({ description: 'auth' })
export class Auth {
  @Field(() => String)
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => Author)
  author: Author;
}
