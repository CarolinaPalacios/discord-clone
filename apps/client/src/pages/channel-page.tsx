import { useParams } from 'react-router-dom';
import { ChatWindow } from '../components/chat';
import { ChannelType } from '../gql/graphql';
export function ChannelPage() {
  const { channelId, channelType } = useParams<{
    channelId: string;
    channelType: ChannelType;
  }>();

  return (
    <ChatWindow
      chatName={channelId!}
      chatType="channel"
      channelType={channelType}
    />
  );
}
