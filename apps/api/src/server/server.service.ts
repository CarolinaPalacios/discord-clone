import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ApolloError } from 'apollo-server-express';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServerDto } from './dto/create-server.dto';
import { MemberRole } from '../member/member.types';
import { UpdateServerDto } from './dto/update-server.dto';
import { CreateChannelOnServerDto } from './dto/create-channel-on-server.dto';
import { ChannelType } from './server.types';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async createServer(input: CreateServerDto, imageUrl: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: input.profileId,
      },
    });
    if (!profile) throw new BadRequestException('Profile does not exist');

    return this.prisma.server.create({
      data: {
        ...input,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: 'general',
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
      include: {
        members: true,
      },
    });
  }

  async getServer(id: number, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', ' PROFILE_NOT_FOUND');
    const server = await this.prisma.server.findFirst({
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
        members: true,
      },
    });
    if (!server)
      return new ApolloError('Server does not exist', 'SERVER_NOT_FOUND');
    return server;
  }

  async getServersByProfileEmailOfMember(email: string) {
    return await this.prisma.server.findMany({
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

  async updateServerWithNewInviteCode(serverId: number) {
    const server = await this.prisma.server.findUnique({
      where: {
        id: serverId,
      },
    });
    if (!server)
      return new ApolloError('Server does not exist', 'SERVER_NOT_FOUND');

    return this.prisma.server.update({
      where: {
        id: serverId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
  }

  async updateServer(input: UpdateServerDto, imageUrl: string) {
    const server = await this.prisma.server.findUnique({
      where: {
        id: input.serverId,
      },
    });
    if (!server)
      return new ApolloError('Server does not exist', 'SERVER_NOT_FOUND');
    return this.prisma.server.update({
      where: {
        id: server.id,
      },
      data: {
        name: input.name,
        imageUrl,
      },
    });
  }

  async createChannel(input: CreateChannelOnServerDto, email: string) {
    if (!input.name) throw new Error('Channel name is required');

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

  async leaveServer(serverId: number, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');
    return this.prisma.server.update({
      where: {
        id: serverId,
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
  }

  async deleteServer(serverId: number, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');

    const server = await this.prisma.server.findUnique({
      where: {
        id: serverId,
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

  async deleteChannelFromServer(channelId: number, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile)
      return new ApolloError('Profile does not exist', 'PROFILE_NOT_FOUND');

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
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
}
