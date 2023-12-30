import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';
import { ChannelType } from '../server.types';

@InputType()
export class UpdateChannelDto {
  @IsInt()
  @Field()
  channelId: number;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field(() => ChannelType)
  type: ChannelType;
}
