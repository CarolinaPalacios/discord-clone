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
}

const IconRoleMap = {
  [MemberRole.Guest]: null,
  [MemberRole.Moderator]: <IconShieldCheck color="blue" />,
  [MemberRole.Admin]: <IconCrown color="green" />,
};

export function ChatMessage({ message }: ChatMessageProps) {
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

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[4],
        padding: theme.spacing.md,
        margin: '0px',
        cursor: 'pointer',
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
      <Flex w="100%" justify={'space-between'}>
        <Flex align={'center'} w={'100%'} justify={'space-evenly'}>
          <Image
            mr={'sm'}
            src={message.member?.profile?.imageUrl || null}
            width={rem(30)}
            height={rem(30)}
            radius={rem(30)}
          />
          <Flex direction={'column'} w={'100%'}>
            <Flex justify={'start'} align={'center'}>
              <Text fw={700}>{message.member?.profile?.name}</Text>
              <Flex ml="sm" align="center">
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
                <>
                  {message.createdAt &&
                    !message.updatedAt &&
                    new Date(Number(message?.createdAt)).toLocaleString()}
                  {message.updatedAt &&
                    new Date(Number(message?.updatedAt)).toLocaleString()}
                </>
              </Text>
            </Flex>
            {!message.deleted ? (
              <>
                <Text>{message.content}</Text>
                {message.fileUrl && (
                  <Image
                    src={message.fileUrl}
                    width={rem(200)}
                    height={rem(200)}
                  />
                )}
              </>
            ) : (
              <Text c={'dimmed'} italic size={'sm'}>
                {' '}
                {message.content}
              </Text>
            )}
          </Flex>
        </Flex>
        {!message.deleted ? (
          <MessageActions
            canDeleteMessage={canDeleteMessage}
            canUpdateMessage={canUpdateMessage}
            handleDeleteMessage={handleDeleteMessage}
            handleUpdateMessage={handleUpdateMessage}
          />
        ) : null}
      </Flex>
    </Box>
  );
}
