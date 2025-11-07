import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

const authorResolver = {
  provide: AuthorResolver,
  useClass: AuthorResolver,
};

const authorService = {
  provide: AuthorService,
  useClass: AuthorService,
};

export const authorsProvider = [authorResolver, authorService];
