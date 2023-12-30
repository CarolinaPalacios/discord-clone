import { useEffect } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import {
  GetMessagesByConversationIdOrChannelIdQuery,
  MessageDeletedSubscription,
  MessageUnion,
  MessageUpdatedSubscription,
} from '../gql/graphql';
import { MESSAGE_UPDATED, MESSAGE_DELETED } from '../graphql/subscriptions';
import { GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID } from '../graphql/queries';

interface UseMessageCacheUpdateArgs {
  messageId: number | undefined | null;
  conversationId?: number | undefined | null;
  channelId?: number | undefined | null;
}

export function useMessageCacheUpdate({
  messageId,
  conversationId,
  channelId,
}: UseMessageCacheUpdateArgs) {
  const { cache } = useApolloClient();

  const { data: dataMessageUpdated } =
    useSubscription<MessageUpdatedSubscription>(MESSAGE_UPDATED, {
      variables: { conversationId, channelId },
      skip: !conversationId && !channelId,
      onError: (error) => {
        console.error(error);
      },
    });

  const { data: dataMessageDeleted } =
    useSubscription<MessageDeletedSubscription>(MESSAGE_DELETED, {
      variables: { conversationId, channelId },
      skip: !conversationId && !channelId,
      onError: (error) => {
        console.error(error);
      },
    });

  useEffect(() => {
    if (dataMessageUpdated?.messageUpdated?.message?.id === messageId) {
      const cachedData =
        cache.readQuery<GetMessagesByConversationIdOrChannelIdQuery>({
          query: GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID,
          variables: {
            conversationId,
            channelId,
          },
        });

      const updatedMessages =
        cachedData?.getMessagesByConversationIdOrChannelId.messages
          ?.map((message) => {
            if (!message) return message;

            return message.id ===
              dataMessageUpdated?.messageUpdated?.message?.id
              ? dataMessageUpdated?.messageUpdated?.message
              : message;
          })
          .filter(Boolean);

      if (updatedMessages) {
        cache.writeQuery<GetMessagesByConversationIdOrChannelIdQuery>({
          query: GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID,
          variables: {
            conversationId,
            channelId,
          },
          data: {
            getMessagesByConversationIdOrChannelId: {
              messages: updatedMessages as MessageUnion[],
            },
          },
        });
      }
    }
  }, [dataMessageUpdated, cache, conversationId, messageId]);

  useEffect(() => {
    if (dataMessageDeleted?.messageDeleted?.message?.id === messageId) {
      const cachedData =
        cache.readQuery<GetMessagesByConversationIdOrChannelIdQuery>({
          query: GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID,
          variables: {
            conversationId,
            channelId,
          },
        });

      if (cachedData?.getMessagesByConversationIdOrChannelId) {
        const updatedMessages =
          cachedData?.getMessagesByConversationIdOrChannelId.messages || [];

        cache.writeQuery<GetMessagesByConversationIdOrChannelIdQuery>({
          query: GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID,
          variables: {
            conversationId,
            channelId,
          },
          data: {
            getMessagesByConversationIdOrChannelId: {
              messages: updatedMessages,
            },
          },
        });
      }
    }
  }, [
    cache,
    channelId,
    conversationId,
    messageId,
    dataMessageDeleted?.messageDeleted?.message,
  ]);
}
