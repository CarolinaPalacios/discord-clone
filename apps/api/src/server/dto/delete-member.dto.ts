import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class DeleteMemberDto {
  @IsInt()
  @Field()
  memberId: number;
}
