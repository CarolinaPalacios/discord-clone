import { Field, ObjectType } from '@nestjs/graphql';
import { Channel, Server } from '../server/server.types';

@ObjectType()
export class Profile {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [Server], { nullable: true })
  servers: Server[];

  @Field({ nullable: true })
  imageUrl: string;

  @Field(() => [Channel], { nullable: true })
  channels: Channel[];
}
