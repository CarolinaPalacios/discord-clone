import { BadRequestException, Injectable, UseFilters } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ApolloError } from 'apollo-server-express';
import { MemberRole, Profile } from '@prisma/client';
import { GraphQLErrorFilter } from '../filters/custom-exetion-filters';
import { PrismaService } from '../prisma/prisma.service';
import {
  ChangeMemberRoleDto,
  CreateChannelOnServerDto,
  CreateServerDto,
  DeleteChannelFromServerDto,
  DeleteMemberDto,
  DeleteServerDto,
  FindChannelByIdDto,
  LeaveServerDto,
  UpdateChannelDto,
  UpdateServerDto,
} from './dto/index.dto';
import { ChannelType } from './server.types';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async getServerByProfileIdOfMember(email: string) {
    return this.prisma.server.findMany({
      where: {
        members: {
          some: {
            profile: {
              email,
            },
          },
        },
      },
    });
  }

  async createServer(createServerDto: CreateServerDto, imageUrl: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: createServerDto.profileId,
      },
    });
    if (!profile)
      throw new BadRequestException({ profile: 'Profile does not exist' });

    return this.prisma.server.create({
      data: {
        name: createServerDto.name,
        inviteCode: uuidv4(),
        imageUrl,
        profileId: profile.id,
        channels: {
          create: [
            {
              name: 'general',
              profileId: createServerDto.profileId,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: createServerDto.profileId,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });
  }

  async getServerById(id: number, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', ' PROFILE_NOT_FOUND');
    const server = await this.prisma.server.findUnique({
      where: {
        id,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        channels: true,
        profile: true,
        members: {
          include: {
            profile: true,
          },
        },
      },
    });
    if (!server)
      return new ApolloError('Server does not exist', 'SERVER_NOT_FOUND');
    return server;
  }

  async updateServerWithNewInviteCode(serverId: number) {
    const server = await this.prisma.server.findUnique({
      where: {
        id: serverId,
      },
    });
    if (!server)
      return new BadRequestException({ server: 'Server does not exist' });

    return this.prisma.server.update({
      where: {
        id: server.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
  }

  @UseFilters(GraphQLErrorFilter)
  async addMemberToServer(inviteCode: string, email: string) {
    const server = await this.prisma.server.findUniqueOrThrow({
      where: {
        inviteCode,
      },
    });
    if (!server)
      return new ApolloError(
        'Invalid server invite code',
        'INVALID_INVITE_CODE'
      );

    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');

    const member = await this.prisma.member.findFirst({
      where: {
        profileId: profile.id,
        serverId: server.id,
      },
    });
    if (member)
      return new ApolloError('Member already exists', 'MEMBER_ALREADY_EXISTS');

    return this.prisma.server.update({
      where: {
        inviteCode,
      },
      data: {
        members: {
          create: [
            {
              profileId: profile.id,
            },
          ],
        },
      },
    });
  }

  async updateServer(updateServerDto: UpdateServerDto, imageUrl: string) {
    const server = await this.prisma.server.findUnique({
      where: {
        id: updateServerDto.serverId,
      },
    });
    if (!server)
      return new ApolloError('Server does not exist', 'SERVER_NOT_FOUND');
    return this.prisma.server.update({
      where: {
        id: server.id,
      },
      data: {
        name: updateServerDto.name,
        imageUrl,
      },
    });
  }

  async changeMemberRole(input: ChangeMemberRoleDto, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { email },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');

    const member = await this.prisma.member.findUniqueOrThrow({
      where: { id: input.memberId },
    });
    if (!member)
      return new ApolloError('Member does not exist', 'MEMBER_NOT_FOUND');

    await this.prisma.member.update({
      where: {
        id: member.id,
        NOT: {
          profileId: member.id,
        },
      },
      data: {
        role: MemberRole[input.role],
      },
    });

    const server = await this.prisma.server.findUnique({
      where: {
        id: member.serverId,
      },
      include: {
        members: true,
      },
    });
    if (!server)
      return new ApolloError('Server does not exist', 'SERVER_NOT_FOUND');

    return server;
  }

  async deleteMemberFromServer(input: DeleteMemberDto, email: string) {
    let profile: Profile;
    try {
      profile = await this.prisma.profile.findUniqueOrThrow({
        where: { email },
      });
    } catch (error) {
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');
    }

    const member = await this.prisma.member.findUnique({
      where: { id: input.memberId },
    });
    if (!member)
      return new ApolloError('Member does not exist', 'MEMBER_NOT_FOUND');
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');

    await this.prisma.member.delete({
      where: {
        id: member.id,
        NOT: {
          profileId: profile.id,
        },
      },
    });

    const server = await this.prisma.server.findUnique({
      where: {
        id: member.serverId,
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });
    if (!server)
      return new ApolloError('Server does not exist', 'SERVER_NOT_FOUND');

    return server;
  }

  async createChannelOnServer(input: CreateChannelOnServerDto, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');

    return this.prisma.server.update({
      where: {
        id: input.serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name: input.name,
            profileId: profile.id,
            type: ChannelType[input.type],
          },
        },
      },
    });
  }

  async deleteServer(input: DeleteServerDto, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');

    const server = await this.prisma.server.findUnique({
      where: {
        id: input.serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN],
            },
          },
        },
      },
    });

    if (!server) return new ApolloError('Server not found', 'SERVER_NOT_FOUND');

    await this.prisma.server.delete({
      where: {
        id: server.id,
      },
    });

    return 'Server deleted successfully';
  }

  async leaveServer(input: LeaveServerDto, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');
    await this.prisma.server.update({
      where: {
        id: input.serverId,
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });

    return 'Server left successfully';
  }

  async deleteChannelFromServer(
    input: DeleteChannelFromServerDto,
    email: string
  ) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: input.channelId,
        profileId: profile.id,
        NOT: {
          name: 'general',
        },
      },
    });
    if (!channel)
      return new ApolloError('Channel does not exist', 'CHANNEL_NOT_FOUND');

    await this.prisma.channel.delete({
      where: {
        id: channel.id,
      },
    });

    return 'Channel deleted successfully';
  }

  async updateChannel(input: UpdateChannelDto, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { email },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: input.channelId,
        profileId: profile.id,
        NOT: {
          name: 'general',
        },
      },
    });
    if (!channel)
      return new ApolloError('Channel does not exist', 'CHANNEL_NOT_FOUND');

    return await this.prisma.channel.update({
      where: {
        id: channel.id,
      },
      data: {
        name: input.name,
        type: ChannelType[input.type],
      },
    });
  }

  async getChannelById(input: FindChannelByIdDto, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { email },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: input.channelId,
        serverId: input.serverId,
      },
      include: {
        messages: true,
        profile: true,
      },
    });
    if (!channel)
      return new ApolloError('Channel does not exist', 'CHANNEL_NOT_FOUND');

    return channel;
  }
}
