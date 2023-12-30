import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Member } from '../member/member.types';
import { Profile } from '../profile/profile.types';

@ObjectType()
export class Channel {
  @Field()
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field(() => ChannelType)
  type: ChannelType;

  @Field(() => Date, { nullable: true })
  createdAt: string;

  @Field(() => Date, { nullable: true })
  updatedAt: string;

  @Field(() => [Member], { nullable: true })
  members: Member[];
}

export enum ChannelType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}

registerEnumType(ChannelType, {
  name: 'ChannelType',
  description: 'Defines the type of the channel',
});

@ObjectType()
export class Server {
  @Field()
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field({ nullable: true })
  inviteCode: string;

  @Field({ nullable: true })
  profileId: number;

  @Field(() => Profile)
  profile: Profile;

  @Field(() => [Member], { nullable: true })
  members: Member[];

  @Field(() => [Channel], { nullable: true })
  channels: Channel[];
}
