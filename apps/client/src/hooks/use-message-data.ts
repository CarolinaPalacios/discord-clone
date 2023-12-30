import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GetMessagesByConversationIdOrChannelIdQuery,
  GetMessagesByConversationIdOrChannelIdQueryVariables,
} from '../gql/graphql';
import { CREATE_MESSAGE } from '../graphql/mutations';
import { GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID } from '../graphql/queries';

export function useMessageData() {
  const {
    memberId: membId,
    channelId: chanId,
    conversationId: convId,
  } = useParams<{
    memberId: string;
    channelId: string;
    conversationId: string;
  }>();

  const memberId = Number(membId);
  const channelId = Number(chanId);
  const conversationId = Number(convId);

  const [createMessage] = useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(CREATE_MESSAGE);

  const { data: dataGetMesagesByConversationIdOrCHannelId } = useQuery<
    GetMessagesByConversationIdOrChannelIdQuery,
    GetMessagesByConversationIdOrChannelIdQueryVariables
  >(GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID, {
    variables: {
      conversationId,
      channelId,
    },
  });

  return {
    memberId,
    channelId,
    createMessage,
    messages:
      dataGetMesagesByConversationIdOrCHannelId
        ?.getMessagesByConversationIdOrChannelId.messages || [],
  };
}
