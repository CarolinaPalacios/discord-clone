import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class FindChannelByIdDto {
  @IsInt()
  @Field()
  channelId: number;

  @IsInt()
  @Field()
  serverId: number;
}
