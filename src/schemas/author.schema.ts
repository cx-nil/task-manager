import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
  _id: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
