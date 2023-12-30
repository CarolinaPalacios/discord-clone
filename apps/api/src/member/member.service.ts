import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async getMemberById(memberId: number, serverId: number) {
    return await this.prisma.member.findFirstOrThrow({
      where: { id: memberId, serverId },
      include: {
        profile: true,
      },
    });
  }

  async getMemberByProfileId(profileId: number, serverId: number) {
    return await this.prisma.member.findFirstOrThrow({
      where: {
        profileId,
        serverId,
      },
      include: {
        profile: true,
      },
    });
  }

  async getMemberByEmail(email: string) {
    return await this.prisma.member.findFirst({
      where: {
        profile: {
          email,
        },
      },
    });
  }
}
