import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { MemberRole } from '../member/member.types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  private async createConversation(memberOneId: number, memberTwoId: number) {
    return await this.prisma.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: { profile: true },
        },
        memberTwo: {
          include: { profile: true },
        },
        directMessages: true,
      },
    });
  }

  private async findConversation(memberOneId: number, memberTwoId: number) {
    return await this.prisma.conversation.findFirst({
      where: {
        OR: [
          {
            AND: [{ memberOneId }, { memberTwoId }],
          },
          {
            AND: [{ memberOneId: memberTwoId }, { memberTwoId: memberOneId }],
          },
        ],
      },
      include: {
        memberOne: {
          include: { profile: true },
        },
        memberTwo: {
          include: { profile: true },
        },
      },
    });
  }

  async getOrCreateConversation(memberOneId: number, memberTwoId: number) {
    const conversation = await this.findConversation(memberOneId, memberTwoId);
    if (conversation) return conversation;

    const newConversation = await this.createConversation(
      memberOneId,
      memberTwoId
    );

    if (!newConversation)
      return new ApolloError(
        'Unable to create conversation',
        'CONVERSATION_CREATION_FAILED'
      );

    return newConversation;
  }

  async createMessage(
    content: string,
    currentProfileId: number,
    conversationId?: number,
    channelId?: number,
    fileUrl?: string
  ) {
    if (!conversationId && !channelId)
      return new ApolloError(
        'No conversation or channel found',
        'NO_CONVERSATION_OR_CHANNEL_FOUND'
      );

    const currentProfile = await this.prisma.profile.findFirst({
      where: { id: currentProfileId },
    });

    if (!currentProfile)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');

    if (conversationId) {
      const conversation = await this.prisma.conversation.findFirst({
        where: {
          id: conversationId,
          OR: [
            {
              memberOne: {
                profileId: currentProfile.id,
              },
            },
            {
              memberTwo: {
                profileId: currentProfile.id,
              },
            },
          ],
        },
        include: {
          memberOne: {
            include: { profile: true },
          },
          memberTwo: {
            include: { profile: true },
          },
        },
      });

      if (!conversation)
        return new ApolloError(
          'Conversation not found',
          'CONVERSATION_NOT_FOUND'
        );

      const member =
        conversation.memberOne.profileId === currentProfile.id
          ? conversation.memberOne
          : conversation.memberTwo;

      if (!member)
        return new ApolloError('Member not found', 'MEMBER_NOT_FOUND');

      return await this.prisma.directMessage.create({
        data: {
          conversationId,
          memberId: member.id,
          content,
          fileUrl,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });
    } else if (channelId) {
      const channel = await this.prisma.channel.findFirst({
        where: {
          id: channelId,
        },
      });
      if (!channel)
        return new ApolloError('Channel not found', 'CHANNEL_NOT_FOUND');

      const member = await this.prisma.member.findFirst({
        where: {
          profileId: currentProfile.id,
          serverId: channel.serverId,
        },
      });
      if (!member)
        return new ApolloError('Member not found', 'MEMBER_NOT_FOUND');

      return await this.prisma.message.create({
        data: {
          channelId,
          memberId: member.id,
          content,
          fileUrl,
        },
        include: {
          member: {
            include: { profile: true },
          },
          channel: true,
        },
      });
    }
  }

  async getMessagesByConversationIdOrChannelId(
    conversationId: number,
    channelId: number
  ) {
    if (!conversationId && !channelId)
      return new ApolloError(
        'Channel or conversation not found',
        'CHANNEL_OR_CONVERSATION_NOT_FOUND'
      );

    if (conversationId) {
      const conversation = await this.prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
      });
      if (!conversation)
        return new ApolloError(
          'Conversation not found',
          'CONVERSATION_NOT_FOUND'
        );

      const directMessages = await this.prisma.directMessage.findMany({
        where: {
          conversationId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
        orderBy: {
          updatedAt: 'asc',
        },
      });
      return { messages: directMessages };
    } else if (channelId) {
      const channel = await this.prisma.channel.findUnique({
        where: {
          id: channelId,
        },
      });
      if (!channel)
        return new ApolloError('Channel not found', 'CHANNEL_NOT_FOUND');

      const messages = await this.prisma.message.findMany({
        where: {
          channelId,
        },
        include: {
          member: {
            include: { profile: true },
          },
          channel: true,
        },
        orderBy: {
          updatedAt: 'asc',
        },
      });
      return { messages };
    }
  }

  async deleteMessage(
    conversationId: number,
    channelId: number,
    messageId: number,
    profileId: number
  ) {
    if (conversationId) {
      const conversation = await this.prisma.conversation.findFirst({
        where: {
          id: conversationId,
          OR: [
            {
              memberOne: {
                profileId,
              },
            },
            {
              memberTwo: {
                profileId,
              },
            },
          ],
        },
        include: {
          memberOne: {
            include: { profile: true },
          },
          memberTwo: {
            include: { profile: true },
          },
        },
      });
      if (!conversation)
        return new ApolloError(
          'Conversation not found',
          'CONVERSATION_NOT_FOUND'
        );

      const member =
        conversation.memberOne.profileId === profileId
          ? conversation.memberOne
          : conversation.memberTwo;

      if (!member)
        return new ApolloError('Member not found', 'MEMBER_NOT_FOUND');

      const directMessage = await this.prisma.directMessage.findFirst({
        where: {
          id: messageId,
          conversationId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });

      if (!directMessage || directMessage.deleted)
        return new ApolloError('Message not found', 'MESSAGE_NOT_FOUND');
      this.deleteImageFile(directMessage.fileUrl);

      const isAdmin = member.role === MemberRole.ADMIN;
      const isModerator = member.role === MemberRole.MODERATOR;
      const isMessageOwner = directMessage.memberId === member.id;
      const canModify = isMessageOwner || isAdmin || isModerator;

      if (!canModify)
        return new ApolloError(
          'You do not have permission to delete this message',
          'PERMISSION_DENIED'
        );

      const updateDirectMessage = await this.prisma.directMessage.update({
        where: {
          id: messageId,
        },
        data: {
          deleted: true,
          content: 'This message has been deleted',
          fileUrl: null,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });
      return { message: updateDirectMessage };
    } else if (channelId) {
      const channel = await this.prisma.channel.findFirst({
        where: {
          id: channelId,
        },
      });
      if (!channel)
        return new ApolloError('Channel not found', 'CHANNEL_NOT_FOUND');

      const member = await this.prisma.member.findFirst({
        where: {
          profileId,
          serverId: channel.serverId,
        },
      });
      if (!member)
        return new ApolloError('Member not found', 'MEMBER_NOT_FOUND');

      const message = await this.prisma.message.findFirst({
        where: {
          id: messageId,
          channelId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });
      if (!message || message.deleted)
        return new ApolloError('Message not found', 'MESSAGE_NOT_FOUND');

      const isAdmin = member.role === MemberRole.ADMIN;
      const isModerator = member.role === MemberRole.MODERATOR;
      const isMessageOwnwer = message.memberId === member.id;
      const canModify = isMessageOwnwer || isAdmin || isModerator;

      if (!canModify)
        return new ApolloError(
          'You do not have permission to delete this message',
          'PERMISSION_DENIED'
        );

      const updateMessage = await this.prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          deleted: true,
          content: 'This message has been deleted',
          fileUrl: null,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });
      return { message: updateMessage };
    }
  }

  async updateMessage(
    messageId: number,
    memberId: number,
    content: string,
    channelId: number,
    conversationId: number
  ) {
    if (!channelId && !conversationId)
      return new ApolloError(
        'Channel or conversation not found',
        'CHANNEL_OR_CONVERSATION_NOT_FOUND'
      );

    if (conversationId) {
      const directMessage = await this.prisma.directMessage.findFirst({
        where: {
          id: messageId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });
      if (!directMessage || directMessage.deleted)
        return new ApolloError('Message not found', 'MESSAGE_NOT_FOUND');

      const isMessageOwner = directMessage.memberId === memberId;
      if (!isMessageOwner)
        return new ApolloError(
          'You do not have permission to update this message',
          'PERMISSION_DENIED'
        );

      return await this.prisma.directMessage.update({
        where: {
          id: messageId,
          conversationId,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });
    } else if (channelId) {
      const message = await this.prisma.message.findFirst({
        where: {
          id: messageId,
          channelId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });
      if (!message || message.deleted)
        return new ApolloError('Message not found', 'MESSAGE_NOT_FOUND');

      const isMessageOwner = message.memberId === memberId;
      if (!isMessageOwner)
        return new ApolloError(
          'You do not have permission to update this message',
          'PERMISSION_DENIED'
        );

      return await this.prisma.message.update({
        where: {
          id: messageId,
          channelId,
        },
        data: {
          content,
        },
        include: {
          channel: true,
          member: {
            include: { profile: true },
          },
        },
      });
    }
  }

  async deleteImageFile(fileUrl: string) {
    if (!fileUrl) return;
    const dirPath = join(process.cwd(), 'public', 'images');
    const fileName = fileUrl.split('/').pop();
    const imagePath = join(dirPath, fileName);

    if (existsSync(imagePath)) {
      try {
        unlinkSync(imagePath);
      } catch (error) {
        return new ApolloError(`Error deleting image file: ${error.message}`);
      }
    }
  }

  async createChannelMessage(
    profileId: number,
    channelId: number,
    content: string,
    fileUrl?: string,
    serverId?: number
  ) {
    try {
      const channel = await this.prisma.channel.findFirst({
        where: {
          id: channelId,
          serverId,
        },
      });
      if (!channel)
        return new ApolloError('Channel not found', 'CHANNEL_NOT_FOUND');

      const member = await this.prisma.member.findFirst({
        where: {
          profileId,
          serverId,
        },
      });
      if (!member)
        return new ApolloError('Member not found', 'MEMBER_NOT_FOUND');

      return await this.prisma.message.create({
        data: {
          channelId,
          memberId: member.id,
          content,
          fileUrl,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getMessagesByChannelId(channelId: number) {
    try {
      const channel = await this.prisma.channel.findUnique({
        where: {
          id: channelId,
        },
      });
      if (!channel)
        return new ApolloError('Channel not found', 'CHANNEL_NOT_FOUND');

      return await this.prisma.message.findMany({
        where: {
          channelId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
        orderBy: {
          updatedAt: 'asc',
        },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
