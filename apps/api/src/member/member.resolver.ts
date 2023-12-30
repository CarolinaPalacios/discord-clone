import { Resolver, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GraphqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MemberService } from './member.service';
import { Member } from './member.types';

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => Member)
  async getMemberById(
    @Args('memberId', { nullable: true }) memberId: number,
    @Args('serverId', { nullable: true }) serverId: number
  ) {
    return await this.memberService.getMemberById(memberId, serverId);
  }

  @Query(() => Member)
  async getMemberByProfileId(
    @Args('profileId', { nullable: true }) profileId: number,
    @Args('serverId', { nullable: true }) serverId: number
  ) {
    return await this.memberService.getMemberByProfileId(profileId, serverId);
  }
}
