import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

export const authorsProvider = [AuthorResolver, AuthorService];
