import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthService, AuthResolver, PrismaService, JwtService],
})
export class AuthModule {}
