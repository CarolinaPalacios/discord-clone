import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { ProfileModule } from './profile/profile.module';
import { MemberModule } from './member/member.module';
import { TokenService } from './token/token.service';
import { ChatModule } from './chat/chat.module';
import { LivekitModule } from './livekit/livekit.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisPubSubProvider } from './redis/redis-pubsub.provider';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/',
    }),

    GraphQLModule.forRootAsync({
      imports: [ConfigModule, AppModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (
        configService: ConfigService,
        tokenService: TokenService
      ) => {
        return {
          installSubscriptionHandlers: true,
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          subscriptions: {
            'graphql-ws': true,
            'subscriptions-transport-ws': true,
          },
          onConnect: (connectionParams) => {
            const token = tokenService.extractToken(connectionParams);

            if (!token) {
              throw new Error('Token not provided');
            }
            const profile = tokenService.validateToken(token);
            if (!profile) {
              throw new Error('Invalid token');
            }
            return { profile };
          },
          context: ({ req, res, connection }) => {
            if (connection) {
              return { req, res, profile: connection.context.profile };
            }
            return { req, res };
          },
        };
      },
    }),

    ServerModule,

    ProfileModule,

    MemberModule,

    ChatModule,

    LivekitModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, TokenService, ConfigService, redisPubSubProvider],
})
export class AppModule {}
