import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class SignupPayload {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;
}
