import { useParams } from 'react-router-dom';
import { IconCrown, IconShieldCheck } from '@tabler/icons-react';
import { Box, Flex, Image, Text, rem } from '@mantine/core';

import { ChannelType, MemberRole, MessageUnion } from '../../gql/graphql';

import { MessageActions } from './message-actions';

import {
  useChannelMemberData,
  useMessageCacheUpdate,
  useMessageActions,
  useMessageRole,
  useSmallerThanLarge,
} from '../../hooks';

interface ChatMessageProps {
  message: MessageUnion;
  showUserInfo?: boolean;
}

const IconRoleMap = {
  [MemberRole.Guest]: <IconShieldCheck color="gray" size={20} />,
  [MemberRole.Moderator]: <IconShieldCheck color="blue" size={20} />,
  [MemberRole.Admin]: <IconCrown color="green" size={20} />,
};

export function ChatMessage({ message, showUserInfo }: ChatMessageProps) {
  const { channelType, channelId, conversationId } = useParams();

  const { profileId, serverId } = useChannelMemberData();

  const { canUpdateMessage, canDeleteMessage } = useMessageRole({
    message,
    profileId,
    serverId,
  });

  useMessageCacheUpdate({
    messageId: message.id,
    conversationId: Number(conversationId),
    channelId: Number(channelId),
  });

  const { handleDeleteMessage, handleUpdateMessage } = useMessageActions({
    message,
  });

  const isSmallerThanLarge = useSmallerThanLarge();

  const memberName = message.member?.profile?.name || '';
  const memberImageUrl = message.member?.profile?.imageUrl || null;
  const createdAt = message.createdAt
    ? new Date(Number(message.createdAt)).toLocaleString()
    : '';

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[4],
        padding: theme.spacing.xs,
        margin: '0px',
        cursor: 'pointer',
        width: '96%',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.gray[5],
        },
        '&:active': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[6],
        },
      })}
    >
      <Flex
        w={channelType === ChannelType.Text ? '50%' : '100%'}
        justify={'space-between'}
      >
        {showUserInfo && (
          <Flex align={'center'} w={'100%'} justify={'space-evenly'}>
            <Image
              mr={'sm'}
              src={memberImageUrl}
              width={rem(30)}
              height={rem(30)}
              radius={rem(30)}
            />
            <Flex direction={'column'} w={'100%'}>
              <Flex justify={'start'} align={'center'}>
                <Text fw={700} w={'100%'}>
                  {memberName}
                </Text>
                <Flex ml="sm" mb={'5px'}>
                  {message.member?.role && IconRoleMap[message.member?.role]}
                </Flex>
                <Text
                  ml="sm"
                  c={'dimmed'}
                  size={'sm'}
                  truncate
                  w={
                    isSmallerThanLarge && channelType !== ChannelType.Text
                      ? '30px'
                      : '100%'
                  }
                >
                  {createdAt.split(',')[0]}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      {!message.deleted && (
        <MessageActions
          canDeleteMessage={canDeleteMessage}
          canUpdateMessage={canUpdateMessage}
          handleDeleteMessage={handleDeleteMessage}
          handleUpdateMessage={handleUpdateMessage}
        />
      )}

      {!message.deleted ? (
        <Flex h={'fit-content'} direction={'column'} w={'100%'}>
          <Flex align={'center'} style={{ wordBreak: 'break-word' }}>
            <Text ml="xs" c={'dimmed'} size={'xs'} truncate>
              {createdAt.split(', ')[1]}
            </Text>
            <Text ml={'5%'}>{message.content}</Text>
          </Flex>
          {message.fileUrl && (
            <Image src={message.fileUrl} width={rem(200)} height={rem(200)} />
          )}
        </Flex>
      ) : (
        <Text c={'dimmed'} italic size={'sm'}>
          {' '}
          {message.content}
        </Text>
      )}
    </Box>
  );
}
