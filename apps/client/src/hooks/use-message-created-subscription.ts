import { useEffect } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { MESSAGE_CREATED } from '../graphql/subscriptions';
import {
  GetMessagesByConversationIdOrChannelIdQuery,
  MessageCreatedSubscription,
  MessageCreatedSubscriptionVariables,
} from '../gql/graphql';
import { GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID } from '../graphql/queries';

export function useMessageCreatedSubscription() {
  const { cache } = useApolloClient();
  const { conversationId: convId, channelId: channId } = useParams<{
    conversationId: string;
    channelId: string;
  }>();

  const conversationId = convId !== undefined ? parseInt(convId) : null;
  const channelId = channId !== undefined ? parseInt(channId) : null;

  const { data: dataMessageCreated } = useSubscription<
    MessageCreatedSubscription,
    MessageCreatedSubscriptionVariables
  >(MESSAGE_CREATED, {
    variables: {
      conversationId,
      channelId,
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    const newMessage = dataMessageCreated?.messageCreated;

    const cachedData =
      cache.readQuery<GetMessagesByConversationIdOrChannelIdQuery>({
        query: GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID,
        variables: {
          conversationId,
          channelId,
        },
      });
    if (
      cachedData &&
      newMessage &&
      cachedData.getMessagesByConversationIdOrChannelId.messages
    ) {
      if (newMessage.message) {
        const updatedMessages = [
          ...cachedData.getMessagesByConversationIdOrChannelId.messages,
          newMessage.message,
        ];

        try {
          cache.writeQuery<GetMessagesByConversationIdOrChannelIdQuery>({
            query: GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID,
            variables: { conversationId, channelId },
            data: {
              getMessagesByConversationIdOrChannelId: {
                messages: updatedMessages,
              },
            },
            overwrite: true,
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [
    dataMessageCreated?.messageCreated.message,
    dataMessageCreated?.messageCreated?.message?.id,
    conversationId,
    cache,
    channelId,
    dataMessageCreated?.messageCreated,
  ]);

  return dataMessageCreated?.messageCreated.message;
}
