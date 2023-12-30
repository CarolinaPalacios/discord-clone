import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { GraphqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.types';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Profile)
  async createProfile(@Args('input') input: CreateProfileDto) {
    return this.profileService.createProfile(input);
  }

  @Query(() => Profile)
  async getProfileById(@Args('profileId') profileId: number) {
    return this.profileService.getProfileById(profileId);
  }
}
