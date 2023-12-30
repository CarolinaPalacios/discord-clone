import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DirectMessage, Message } from '../gql/graphql';
import {
  DeleteMessageMutation,
  DeleteMessageMutationVariables,
} from '../gql/graphql';
import { useMessageStore } from '../stores/message-store';
import { useModal } from './use-modal';
import { DELETE_MESSAGE } from '../graphql/mutations';

interface UseMessageActionsArgs {
  message: Message | DirectMessage;
}

export function useMessageActions({ message }: UseMessageActionsArgs) {
  const { channelId, conversationId } = useParams<{
    channelId: string;
    conversationId: string;
  }>();

  const updateMessageModal = useModal('UpdateMessage');
  const setMessage = useMessageStore((state) => state.setMessage);

  const [deleteMessageMutation] = useMutation<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
  >(DELETE_MESSAGE, {
    variables: {
      messageId: Number(message.id),
      conversationId: Number(conversationId),
      channelId: Number(channelId),
    },
  });

  const handleUpdateMessage = () => {
    updateMessageModal.openModal();
    setMessage(message);
  };

  const handleDeleteMessage = () => {
    deleteMessageMutation();
  };

  return {
    handleUpdateMessage,
    handleDeleteMessage,
  };
}
