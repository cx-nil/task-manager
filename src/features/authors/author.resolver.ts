import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Author } from './models/author.model';
import { AuthorService } from './author.service';
import { CurrentUser } from '../../decorators/current-user.decorator';
import type { Auth } from '../../config/types/auth';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private authorService: AuthorService) {}

  @Query(() => Author)
  author(@Args('email', { type: () => String }) email: string) {
    return this.authorService.findOneByEmail(email);
  }

  @Query(() => Author)
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@CurrentUser() user: Auth) {
    return this.authorService.findOneByEmail(user.email);
  }
}
