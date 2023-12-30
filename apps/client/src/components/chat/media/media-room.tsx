import { useNavigate, useParams } from 'react-router-dom';
import '@livekit/components-styles';
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useLivekitAccessToken } from '../../../hooks';

interface MediaRoomProps {
  chatId: string;
  audio: boolean;
  video: boolean;
}

export function MediaRoom({ chatId, audio, video }: MediaRoomProps) {
  const navigate = useNavigate();
  const { serverId } = useParams();
  const { token } = useLivekitAccessToken({ chatId });

  return (
    <LiveKitRoom
      serverUrl={import.meta.env.VITE_LK_SERVER_URL}
      onDisconnected={() => navigate(`/server/${serverId}`)}
      connectOptions={{ autoSubscribe: false }}
      video={video}
      audio={audio}
      token={token}
      data-lk-theme="default"
      style={{
        height: 'calc(80vh - 60px)',
      }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
