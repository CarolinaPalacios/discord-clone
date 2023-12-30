import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateChannelMessageDto {
  @IsInt()
  @Field()
  channelId: number;

  @IsString()
  @Field()
  content: string;
}
