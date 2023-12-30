import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateMessageDto {
  @Field({ nullable: true })
  conversationId?: number;

  @Field({ nullable: true })
  channelId?: number;

  @IsString()
  @Field()
  content: string;
}
