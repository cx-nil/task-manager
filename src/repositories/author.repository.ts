import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from '../schemas/author.schema';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(authorData: Partial<Author>): Promise<Author> {
    const createdAuthor = new this.authorModel(authorData);
    return createdAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findById(id: string): Promise<Author | null> {
    return this.authorModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<Author | null> {
    return this.authorModel.findOne({ email }).exec();
  }

  async findActiveAuthors(): Promise<Author[]> {
    return this.authorModel.find({ isActive: true }).exec();
  }

  async update(
    id: string,
    updateData: Partial<Author>,
  ): Promise<Author | null> {
    return this.authorModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Author | null> {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}
