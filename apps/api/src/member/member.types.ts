import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Profile } from '../profile/profile.types';
import { Server } from '../server/server.types';

@ObjectType()
export class Member {
  @Field({ nullable: true })
  id: number;

  @Field(() => Profile, { nullable: true })
  profile: Profile;

  @Field({ nullable: true })
  profileId: number;

  @Field(() => Server, { nullable: true })
  server: Server;

  @Field(() => MemberRole, { nullable: true })
  role: MemberRole;

  @Field({ nullable: true })
  imageUrl: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  createdAt: string;

  @Field({ nullable: true })
  updatedAt: string;
}

export enum MemberRole {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  GUEST = 'GUEST',
}

registerEnumType(MemberRole, {
  name: 'MemberRole',
  description: 'Define the role of a member in a server',
});
