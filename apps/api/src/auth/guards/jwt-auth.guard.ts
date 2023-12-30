import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
// import { Clerk } from '@clerk/clerk-sdk-node';
import { ApolloError } from 'apollo-server-express';
import { ProfileService } from '../../profile/profile.service';

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private profileService: ProfileService
  ) {}

  async canActivate(context: ExecutionContext) {
    const gqlCtx = context.getArgByIndex(2);
    const request: Request = gqlCtx.req;

    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException('Not authorized!');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        publicKey: this.configService.get<string>('JWT_PUBLIC_KEY'),
        algorithms: ['RS256'],
      });
      request['profile'] = payload;
    } catch (error) {
      throw new ApolloError(error.message, error.code);
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    return request.headers.authorization?.replace('Bearer ', '');
  }
}
