import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerResolver } from './server.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProfileService } from '../profile/profile.service';

@Module({
  providers: [
    ServerService,
    ServerResolver,
    PrismaService,
    JwtService,
    ConfigService,
    ProfileService,
  ],
})
export class ServerModule {}
