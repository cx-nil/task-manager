import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Author' })
export class Author {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: false })
  email: string;
}
