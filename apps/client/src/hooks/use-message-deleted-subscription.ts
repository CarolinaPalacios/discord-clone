import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApolloClient, useSubscription } from '@apollo/client';
import { MESSAGE_DELETED } from '../graphql/subscriptions';
import {
  GetMessagesByConversationIdOrChannelIdQuery,
  MessageDeletedSubscription,
} from '../gql/graphql';
import { GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID } from '../graphql/queries';

export function useMessageDeletedSubscription() {
  const { cache } = useApolloClient();
  const { conversationId: convId, channelId: channId } = useParams<{
    conversationId: string;
    channelId: string;
  }>();

  const conversationId = convId !== undefined ? parseInt(convId) : null;
  const channelId = channId !== undefined ? parseInt(channId) : null;

  const { data: dataMessageDeleted } =
    useSubscription<MessageDeletedSubscription>(MESSAGE_DELETED, {
      variables: {
        conversationId,
        channelId,
      },
    });

  useEffect(() => {
    const deletedMessage = dataMessageDeleted?.messageDeleted.message;
    console.log('deletedMessage:', deletedMessage);

    const cachedData =
      cache.readQuery<GetMessagesByConversationIdOrChannelIdQuery>({
        query: GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID,
        variables: {
          conversationId,
          channelId,
        },
      });

    if (cachedData && deletedMessage) {
      const updatedMessages =
        cachedData.getMessagesByConversationIdOrChannelId.messages?.map(
          (messsage) => {
            if (!messsage) return messsage;
            return messsage.id === deletedMessage.id
              ? deletedMessage
              : messsage;
          }
        );

      if (updatedMessages) {
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
          overwrite: true,
        });
      }
    }
  }, [dataMessageDeleted, cache, conversationId, channelId]);

  return dataMessageDeleted?.messageDeleted.message;
}
