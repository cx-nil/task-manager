import { Args, Query, Resolver } from '@nestjs/graphql';
import { Author } from './models/author.model';
import { AuthorService } from './author.service';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private authorService: AuthorService) {}

  @Query(() => Author)
  author(@Args('email', { type: () => String }) email: string) {
    return this.authorService.findOneByEmail(email);
  }
}
