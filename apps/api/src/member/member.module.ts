import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MemberResolver } from './member.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';

@Module({
  providers: [
    MemberService,
    MemberResolver,
    PrismaService,
    JwtService,
    ConfigService,
    ProfileService,
  ],
})
export class MemberModule {}
