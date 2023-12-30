import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [
    ProfileService,
    ProfileResolver,
    PrismaService,
    JwtService,
    ConfigService,
  ],
})
export class ProfileModule {}
