import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(createProfileDto: CreateProfileDto) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email: createProfileDto.email,
      },
    });
    if (profile) return profile;

    return await this.prisma.profile.create({
      data: {
        name: createProfileDto.name,
        email: createProfileDto.email,
        imageUrl: createProfileDto.imageUrl,
      },
    });
  }

  async getProfileById(profileId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        servers: true,
        channels: true,
        members: true,
      },
    });
    return profile;
  }

  async getProfileByEmail(email: string) {
    return this.prisma.profile.findUnique({
      where: {
        email,
      },
      include: {
        servers: {
          include: {
            channels: true,
          },
        },
      },
    });
  }
}
