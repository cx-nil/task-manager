import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { Author } from '../../schemas/author.schema';
import { SignupPayload } from '../../dto/auth/signup-payload.dto';
import { AuthorRepository } from 'src/repositories/author.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async findOneByEmail(email: string): Promise<Author | null> {
    return await this.getUser({ email });
  }

  async getUser({
    email,
    _id,
  }: {
    email?: string;
    _id?: string;
  }): Promise<Author | null> {
    if (email) {
      return await this.authorRepository.findByEmail(email);
    }
    if (_id) {
      return await this.authorRepository.findById(_id);
    }
    return null;
  }

  async create(payload: SignupPayload): Promise<Author> {
    const { password } = payload;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.authorRepository.create({
      ...payload,
      password: hashedPassword,
    });
    return user;
  }
}
