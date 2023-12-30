import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { redisPubSubProvider } from '../redis/redis-pubsub.provider';
import { MemberService } from '../member/member.service';

@Module({
  providers: [
    ChatService,
    ChatResolver,
    PrismaService,
    JwtService,
    ProfileService,
    redisPubSubProvider,
    MemberService,
    ConfigService,
  ],
})
export class ChatModule {}
