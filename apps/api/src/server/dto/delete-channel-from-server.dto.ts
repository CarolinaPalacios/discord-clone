import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class DeleteChannelFromServerDto {
  @IsInt()
  @Field()
  channelId: number;
}
