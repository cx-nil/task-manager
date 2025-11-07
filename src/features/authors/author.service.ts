import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

import { Author } from '../../schemas/author.schema';
// import { Author } from './models/author.model';
import { SignupPayload } from '../../dto/auth/signup-payload.dto';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async findOneByEmail(email: string): Promise<Author | null> {
    const user = await this.authorModel.findOne({ email }).lean();
    if (!user) return null;
    return user;
  }

  async create(payload: SignupPayload): Promise<Author> {
    const { password } = payload;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new this.authorModel({
      ...payload,
      password: hashedPassword,
    });
    return user.save();
  }
}
