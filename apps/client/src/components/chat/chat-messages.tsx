import { ScrollArea, Stack } from '@mantine/core';

import { ChannelType, MessageUnion } from '../../gql/graphql';
import { ChatMessage } from './chat-message';
import { WelcomeMessage } from './welcome-message';
import {
  useScrollToBottom,
  useMemberById,
  useChannelById,
  useSmallerThanLarge,
} from '../../hooks';

interface ChatMessagesProps {
  conversationId?: number;
  channelId?: number;
  messages: MessageUnion[];
}

export function ChatMessages({ channelId, messages }: ChatMessagesProps) {
  const channel = useChannelById({ channelId: channelId! });
  const member = useMemberById();

  const viewport = useScrollToBottom({
    dependency: messages.length,
  });

  const isSmallerThanLarge = useSmallerThanLarge();

  return (
    <Stack p="md" w="100%">
      <ScrollArea
        h={
          channel?.name === 'general' && isSmallerThanLarge
            ? 'calc(100vh - 280px)'
            : 'calc(100vh - 180px)'
        }
        ml={channel?.type !== ChannelType.Text ? '20px' : '100px'}
        viewportRef={viewport}
      >
        {member?.profile?.name && (
          <WelcomeMessage type={'conversation'} name={member?.profile?.name} />
        )}
        {channel?.name && (
          <WelcomeMessage type={'channel'} name={channel?.name} />
        )}
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            showUserInfo={
              index === 0 ||
              message.member?.id !== messages[index - 1]?.member?.id
            }
          />
        ))}
      </ScrollArea>
    </Stack>
  );
}
