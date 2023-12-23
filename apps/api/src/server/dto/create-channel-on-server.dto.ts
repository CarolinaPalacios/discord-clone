import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { ChannelType } from '../server.types';

@InputType()
export class CreateChannelOnServerDto {
  @IsString()
  @Field()
  name: string;

  @IsInt()
  @Field({ nullable: true })
  serverId: number;

  @IsEnum(ChannelType)
  @Field(() => ChannelType)
  type: ChannelType;
}
