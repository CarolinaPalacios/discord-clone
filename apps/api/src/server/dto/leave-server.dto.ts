import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class LeaveServerDto {
  @IsInt()
  @Field()
  serverId: number;
}
