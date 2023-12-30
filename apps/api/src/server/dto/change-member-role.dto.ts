import { IsString, IsInt } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChangeMemberRoleDto {
  @IsInt()
  @Field()
  memberId: number;

  @IsString()
  @Field()
  role: string;
}
