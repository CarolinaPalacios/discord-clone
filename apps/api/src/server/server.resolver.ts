import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApolloError } from 'apollo-server-express';
import { v4 as uuidv4 } from 'uuid';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { Channel, Server } from './server.types';
import { GraphqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ServerService } from './server.service';
import {
  CreateServerDto,
  CreateChannelOnServerDto,
  ChangeMemberRoleDto,
  DeleteMemberDto,
  DeleteChannelFromServerDto,
  DeleteServerDto,
  FindChannelByIdDto,
  LeaveServerDto,
  UpdateServerDto,
  UpdateChannelDto,
} from './dto/index.dto';

@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [Server])
  async getServerByProfileIdOfMember(
    @Args('profileId') profileId: number,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.getServerByProfileIdOfMember(
      ctx.req.profile.email
    );
  }

  @Mutation(() => Server)
  async createServer(
    @Args('input') input: CreateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload.FileUpload
  ) {
    if (!file) throw new ApolloError('Please upload an image');
    const imageUrl = await this.storeImageAndReturnUrl(file);
    return this.serverService.createServer(input, imageUrl);
  }

  async storeImageAndReturnUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', 'images', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/images/${uniqueFilename}`;

    if (!existsSync(join(process.cwd(), 'public', 'images'))) {
      mkdirSync(join(process.cwd(), 'public', 'images'), { recursive: true });
    }
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));
    return imageUrl;
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => Server)
  async getServerById(
    @Args('id') id: number,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.getServerById(id, ctx.req?.profile.email);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Server)
  async updateServerWithNewInviteCode(
    @Args('serverId', { nullable: true }) serverId: number
  ) {
    return this.serverService.updateServerWithNewInviteCode(serverId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Server)
  async addMemberToServer(
    @Args('inviteCode') inviteCode: string,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.addMemberToServer(
      inviteCode,
      ctx.req?.profile.email
    );
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Server)
  async updateServer(
    @Args('input') input: UpdateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload.FileUpload
  ) {
    let imageUrl = null;
    if (file) imageUrl = await this.storeImageAndReturnUrl(file);
    return this.serverService.updateServer(input, imageUrl);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Server)
  async changeMemberRole(
    @Args('input') input: ChangeMemberRoleDto,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.changeMemberRole(input, ctx.req?.profile.email);
  }

  @Mutation(() => Server)
  async deleteMemberFromServer(
    @Args('input') input: DeleteMemberDto,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.deleteMemberFromServer(
      input,
      ctx.req?.profile.email
    );
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Server)
  async createChannelOnServer(
    @Args('input') input: CreateChannelOnServerDto,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.createChannelOnServer(
      input,
      ctx.req?.profile.email
    );
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => String)
  async deleteServer(
    @Args('input') input: DeleteServerDto,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.deleteServer(input, ctx.req?.profile.email);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => String)
  async leaveServer(
    @Args('input') input: LeaveServerDto,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.leaveServer(input, ctx.req?.profile.email);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => String)
  async deleteChannelFromServer(
    @Args('input') input: DeleteChannelFromServerDto,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.deleteChannelFromServer(
      input,
      ctx.req?.profile.email
    );
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Channel)
  async updateChannel(
    @Args('input') input: UpdateChannelDto,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.updateChannel(input, ctx.req?.profile.email);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => Channel)
  async getChannelById(
    @Args('input') input: FindChannelByIdDto,
    @Context() ctx: { req: Request }
  ) {
    return this.serverService.getChannelById(input, ctx.req?.profile.email);
  }
}
