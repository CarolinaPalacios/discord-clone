import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ApolloError } from 'apollo-server-express';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { Server } from './server.types';
import { GraphqlAuthGuard } from '../auth/guards/auth.guard';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { CreateChannelOnServerDto } from './dto/create-channel-on-server.dto';

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => [Server])
  async getServers(@Context() ctx: { req: Request }) {
    if (!ctx.req?.profile.email)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');

    return this.serverService.getServersByProfileEmailOfMember(
      ctx.req?.profile.email
    );
  }

  @Query(() => Server)
  async getServer(
    @Args('id', { nullable: true }) id: number,
    @Context() ctx: { req: Request }
  ) {
    if (!ctx.req?.profile.email)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');
    return this.serverService.getServer(id, ctx.req?.profile.email);
  }

  @Mutation(() => Server)
  async createServer(
    @Args('input') input: CreateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload
  ) {
    if (!file) throw new ApolloError('Image is required');
    const imageUrl = await this.storeImageAndReturnUrl(file);

    return this.serverService.createServer(input, imageUrl);
  }

  private async storeImageAndReturnUrl(file: GraphQLUpload) {
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

  @Mutation(() => Server)
  async updateServer(
    @Args('input') input: UpdateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload
  ) {
    let imageUrl;
    if (file) {
      imageUrl = await this.storeImageAndReturnUrl(file);
    }

    try {
      return this.serverService.updateServer(input, imageUrl);
    } catch (error) {
      return new ApolloError(error.message, error.code);
    }
  }

  @Mutation(() => Server)
  async updateServerWithNewInviteCode(
    @Args('serverId', { nullable: true }) serverId: number
  ) {
    if (!serverId)
      throw new ApolloError('Server id is required', 'SERVER_ID_REQUIRED');
    try {
      return this.serverService.updateServerWithNewInviteCode(serverId);
    } catch (error) {
      return new ApolloError(error.message, error.code);
    }
  }

  @Mutation(() => Server)
  async createChannel(
    @Args('input') input: CreateChannelOnServerDto,
    @Context() ctx: { req: Request }
  ) {
    try {
      return this.serverService.createChannel(input, ctx.req?.profile.email);
    } catch (error) {
      return new ApolloError(error.message, error.code);
    }
  }

  @Mutation(() => String)
  async leaveServer(
    @Args('serverId', { nullable: true }) serverId: number,
    @Context() ctx: { req: Request }
  ) {
    try {
      await this.serverService.leaveServer(serverId, ctx.req?.profile.email);
      return 'Success';
    } catch (error) {
      return new ApolloError(error.message, error.code);
    }
  }

  @Mutation(() => String)
  async deleteServer(
    @Args('serverId', { nullable: true }) serverId: number,
    @Context() ctx: { req: Request }
  ) {
    try {
      return this.serverService.deleteServer(serverId, ctx.req?.profile.email);
    } catch (error) {
      return new ApolloError(error.message, error.code);
    }
  }

  @Mutation(() => String)
  async deleteChannelFromServer(
    @Args('channelId', { nullable: true }) channelId: number,
    @Context() ctx: { req: Request }
  ) {
    try {
      return this.serverService.deleteChannelFromServer(
        channelId,
        ctx.req?.profile.email
      );
    } catch (error) {
      return new ApolloError(error.message, error.code);
    }
  }
}
