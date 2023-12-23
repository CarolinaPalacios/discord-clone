import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Modal, Text } from '@mantine/core';
import { useModal } from '../../../../hooks/use-modal';
import { useServer } from '../../../../hooks/graphql/server/use-server';
import { useGeneralStore } from '../../../../stores/general-store';
import { DELETE_CHANNEL } from '../../../../graphql/mutations/server/delete-channel';
import {
  DeleteChannelMutation,
  DeleteChannelMutationVariables,
} from '../../../../gql/graphql';

export function DeleteChannelModal() {
  const navigate = useNavigate();
  const { isOpen, closeModal } = useModal('DeleteChannel');
  const { server } = useServer();

  const channelToBeDeletedOrUpdatedId = useGeneralStore(
    (state) => state.channelToBeDeletedOrUpdatedId
  );

  const [deleteChannel, { loading }] = useMutation<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >(DELETE_CHANNEL, {
    variables: {
      channelId: channelToBeDeletedOrUpdatedId,
    },
    refetchQueries: ['GetServer'],
    onCompleted: () => {
      closeModal();
      navigate(`/server/${server?.id}`);
    },
  });

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Delete Channel">
      <Text fw={700}>Are you sure you want to delete this channel?</Text>
      <Button
        mt={'md'}
        color="red"
        onClick={() => deleteChannel()}
        loading={loading}
      >
        Delete Channel
      </Button>
    </Modal>
  );
}
