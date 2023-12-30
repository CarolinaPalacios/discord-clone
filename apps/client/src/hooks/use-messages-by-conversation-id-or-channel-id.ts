import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID } from '../graphql/queries';
import { GetMessagesByConversationIdOrChannelIdQuery } from '../gql/graphql';

export function useMessagesByConversationIdOrChannelId() {
  const { channelId, conversationId, memberId } = useParams<{
    channelId: string;
    conversationId: string;
    memberId: string;
  }>();

  const { data } = useQuery<GetMessagesByConversationIdOrChannelIdQuery>(
    GET_MESSAGES_BY_CONVERSATION_ID_OR_CHANNEL_ID,
    {
      variables: {
        conversationId: Number(conversationId),
        channelId: Number(channelId),
      },
      skip: !conversationId && !channelId,
      onError: (error) => {
        console.error(error);
      },
    }
  );

  console.log(data, memberId);

  return data?.getMessagesByConversationIdOrChannelId.messages || [];
}
