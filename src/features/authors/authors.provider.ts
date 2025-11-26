import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { AuthorRepository } from '../../repositories/author.repository';

export const authorsProvider = [
  AuthorResolver,
  AuthorService,
  AuthorRepository,
];
