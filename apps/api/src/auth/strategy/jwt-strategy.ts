import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { Profile } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    console.log('extractJwt', ExtractJwt.fromAuthHeaderAsBearerToken());
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { email: payload.email },
    });

    if (!profile) throw new UnauthorizedException('Not authorized!');
    return profile;
  }
}
