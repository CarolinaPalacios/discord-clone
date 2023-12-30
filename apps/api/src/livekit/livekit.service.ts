import { Injectable } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';

@Injectable()
export class LivekitService {
  async createAccessToken(identity: string, roomName: string) {
    try {
      const at = new AccessToken(
        process.env.LK_API_KEY,
        process.env.LK_API_SECRET,
        {
          identity,
          ttl: 60 * 60 * 24,
        }
      );

      at.addGrant({
        roomJoin: true,
        room: roomName,
        canPublish: true,
        canSubscribe: true,
      });
      return at.toJwt();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
