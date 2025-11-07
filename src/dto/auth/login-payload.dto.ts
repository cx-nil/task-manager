import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginPayload {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
