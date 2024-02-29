import {
  Args,
  Context,
  Query,
  Resolver,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { Inject, UseGuards, UseFilters } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ApolloError } from 'apollo-server-express';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Request } from 'express';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { join } from 'path';
import { createWriteStream, mkdirSync } from 'fs';

import { GraphqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { ProfileService } from '../profile/profile.service';
import { MemberService } from '../member/member.service';
import { GraphQLErrorFilter } from '../filters/custom-exetion-filters';

import { GetOrCreateConversationDto } from './dto/get-or-create.conversation.dto';
import { CreateChannelMessageDto } from './dto/create-channel-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';

import {
  Conversation,
  DirectMessage,
  Message,
  MessageResult,
  MessagesResult,
} from './chat.types';

@Resolver()
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly profileService: ProfileService,
    private readonly memberService: MemberService,

    @Inject('REDIS_PUB_SUB') private readonly pubSub: RedisPubSub
  ) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Conversation, {})
  async getOrCreateConversation(
    @Args('input') input: GetOrCreateConversationDto
  ) {
    return await this.chatService.getOrCreateConversation(
      input.memberOneId,
      input.memberTwoId
    );
  }

  @Subscription(() => MessageResult, {
    filter: (payload, variables) => {
      if (variables.conversationId)
        return (
          payload.messageCreated.message.conversationId ===
          variables.conversationId
        );
      else
        return payload.messageCreated.message.channelId === variables.channelId;
    },
  })
  messageCreated(
    @Args('conversationId', { nullable: true }) conversationId?: number,
    @Args('channelId', { nullable: true }) channelId?: number
  ): AsyncIterator<DirectMessage> {
    return this.pubSub.asyncIterator('messageCreated');
  }

  @UseFilters(GraphQLErrorFilter)
  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => MessageResult)
  async createMessage(
    @Args('input') input: CreateMessageDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload.FileUpload,
    @Context() ctx: { req: Request }
  ) {
    const profile = await this.profileService.getProfileByEmail(
      ctx.req?.profile.email
    );
    let imageUrl = '';
    if (file) imageUrl = await this.storeImageAndReturnUrl(file);

    const message = await this.chatService.createMessage(
      input.content,
      profile.id,
      input.conversationId,
      input.channelId,
      imageUrl
    );

    await this.pubSub.publish('messageCreated', {
      messageCreated: { message },
      conversationId: input.conversationId,
      channelId: input.channelId,
    });

    return { message };
  }

  async storeImageAndReturnUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const dirPath = join(process.cwd(), 'public', 'images');
    const imagePath = join(dirPath, uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/images/${uniqueFilename}`;
    mkdirSync(dirPath, { recursive: true });

    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));

    await new Promise((resolve, reject) => {
      readStream
        .pipe(createWriteStream(imagePath))
        .on('finish', resolve)
        .on('error', reject);
    });

    return imageUrl;
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => MessagesResult)
  async getMessagesByConversationIdOrChannelId(
    @Args('conversationId', { nullable: true }) conversationId?: number,
    @Args('channelId', { nullable: true }) channelId?: number
  ) {
    return this.chatService.getMessagesByConversationIdOrChannelId(
      conversationId,
      channelId
    );
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => MessageResult)
  async deleteMessage(
    @Args('messageId') messageId: number,
    @Context() ctx: { req: Request },
    @Args('conversationId', { nullable: true }) conversationId?: number,
    @Args('channelId', { nullable: true }) channelId?: number
  ) {
    if (!conversationId && !channelId)
      throw new ApolloError(
        'Either conversationId or channelId must be provided',
        'INVALID_INPUT'
      );

    const profile = await this.profileService.getProfileByEmail(
      ctx.req?.profile.email
    );
    const deletedMessage = await this.chatService.deleteMessage(
      conversationId,
      channelId,
      messageId,
      profile.id
    );
    try {
      await this.pubSub.publish('messageDeleted', {
        messageDeleted: deletedMessage,
      });
    } catch (error) {
      console.log(error);
      throw new ApolloError(error.message);
    }
    return deletedMessage;
  }

  @Subscription(() => MessageResult)
  messageDeleted(
    @Args('conversationId', { nullable: true }) conversationId?: number,
    @Args('channelId', { nullable: true }) channelId?: number
  ): AsyncIterator<MessageResult> {
    return this.pubSub.asyncIterator('messageDeleted');
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => MessageResult)
  async updateMessage(
    @Args('messageId') messageId: number,
    @Args('content') content: string,
    @Context() ctx: { req: Request },
    @Args('channelId', { nullable: true }) channelId?: number,
    @Args('conversationId', { nullable: true }) conversationId?: number
  ) {
    const member = await this.memberService.getMemberByEmail(
      ctx.req?.profile.email
    );
    if (!member) throw new ApolloError('Member not found', 'MEMBER_NOT_FOUND');

    const updatedMessage = await this.chatService.updateMessage(
      messageId,
      member.id,
      content,
      channelId,
      conversationId
    );
    this.pubSub.publish('messageUpdated', {
      messageUpdated: updatedMessage,
    });
    return { message: updatedMessage };
  }

  @Subscription(() => MessageResult)
  messageUpdated(
    @Args('conversationId', { nullable: true }) conversationId?: number,
    @Args('channelId', { nullable: true }) channelId?: number
  ): AsyncIterator<MessageResult> {
    return this.pubSub.asyncIterator('messageUpdated');
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Message)
  async createChannelMessage(
    @Args('input') input: CreateChannelMessageDto,

    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload,
    @Context() ctx: { req: Request }
  ) {
    const profile = await this.profileService.getProfileByEmail(
      ctx.req.profile.email
    );

    let imageUrl = '';
    if (file) imageUrl = await this.storeImageAndReturnUrl(file);

    const { channelId, content } = input;

    const newChannelMessage = await this.chatService.createChannelMessage(
      profile.id,
      channelId,
      content,
      imageUrl
    );

    await this.pubSub.publish('channelMessageCreated', {
      channelMessageCreated: newChannelMessage,
      channelId,
    });

    return newChannelMessage;
  }

  @Subscription(() => MessageResult, {
    filter: (payload, variables) => {
      return payload.channelMessageCreated.channelId === variables.channelId;
    },
  })
  channelMessageCreated(
    @Args('channelId', { nullable: true }) channelId?: number,
    @Args('conversationId', { nullable: true }) conversationId?: number
  ): AsyncIterator<Message> {
    return this.pubSub.asyncIterator('channelMessageCreated');
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [Message])
  async getMessagesByChannelId(@Args('channelId') channelId: number) {
    return await this.chatService.getMessagesByChannelId(channelId);
  }
}
