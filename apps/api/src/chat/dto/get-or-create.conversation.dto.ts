import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class GetOrCreateConversationDto {
  @IsInt()
  @Field()
  memberOneId: number;

  @IsInt()
  @Field()
  memberTwoId: number;
}
