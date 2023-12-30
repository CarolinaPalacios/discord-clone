import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Member } from '../member/member.types';
import { Channel } from '../server/server.types';

@ObjectType()
export class Conversation {
  @IsInt()
  @Field()
  id: number;

  @IsInt()
  @Field({ nullable: true })
  memberOneId: number;

  @IsInt()
  @Field({ nullable: true })
  memberTwoId: number;

  @Field(() => Member)
  memberOne: Member;

  @Field(() => Member)
  memberTwo: Member;

  @Field(() => [DirectMessage])
  messages: DirectMessage[];
}

@ObjectType()
export class DirectMessage {
  @IsInt()
  @Field({ nullable: true })
  id: number;

  @IsInt()
  @Field({ nullable: true })
  conversationId: number;

  @Field(() => Conversation, { nullable: true })
  conversation: Conversation;

  @IsInt()
  @Field({ nullable: true })
  memberId: number;

  @Field(() => Member)
  member: Member;

  @Field({ nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  fileUrl: string;

  @Field(() => Boolean, { nullable: true })
  deleted: boolean;

  @Field(() => String, { nullable: true })
  createdAt: string;

  @Field(() => String, { nullable: true })
  updatedAt: string;
}

@ObjectType()
export class Message {
  @IsInt()
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  fileUrl: string;

  @Field({ nullable: true })
  deleted: boolean;

  @Field(() => Channel, { nullable: true })
  channel: Channel;

  @Field(() => Member)
  member: Member;

  @Field(() => String, { nullable: true })
  createdAt: string;

  @Field(() => String, { nullable: true })
  updatedAt: string;
}

export const MessageUnion = createUnionType({
  name: 'MessageUnion',
  types: () => [Message, DirectMessage],
  resolveType(value) {
    if ('conversationId' in value) return DirectMessage;
    return Message;
  },
});

@ObjectType()
export class MessageResult {
  @Field(() => MessageUnion)
  message: typeof MessageUnion;
}

@ObjectType()
export class MessagesResult {
  @Field(() => [MessageUnion])
  messages: (typeof MessageUnion)[];
}
