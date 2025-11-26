import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class RefreshTokenPayload {
  @Field()
  @IsString()
  refreshToken: string;
}
