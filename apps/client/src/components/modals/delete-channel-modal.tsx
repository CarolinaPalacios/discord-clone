import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Modal, Text } from '@mantine/core';
import { useModal, useServer } from '../../hooks';
import { useGeneralStore } from '../../stores';
import { DELETE_CHANNEL_FROM_SERVER } from '../../graphql/mutations';
import {
  DeleteChannelFromServerMutation,
  DeleteChannelFromServerMutationVariables,
} from '../../gql/graphql';

export function DeleteChannelModal() {
  const navigate = useNavigate();
  const { isOpen, closeModal } = useModal('DeleteChannel');
  const { server } = useServer();

  const channelToBeDeletedOrUpdatedId = useGeneralStore(
    (state) => state.channelToBeDeletedOrUpdatedId
  );

  const [deleteChannel, { loading }] = useMutation<
    DeleteChannelFromServerMutation,
    DeleteChannelFromServerMutationVariables
  >(DELETE_CHANNEL_FROM_SERVER, {
    variables: {
      input: {
        channelId: Number(channelToBeDeletedOrUpdatedId),
      },
    },
    refetchQueries: ['GetServerById'],
    onCompleted: () => {
      closeModal();
      navigate(`/server/${server?.id}`);
    },
  });

  const handleDeleteChannel = async () => {
    await deleteChannel();
  };

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Delete Channel">
      <Text fw={700}>Are you sure you want to delete this channel?</Text>
      <Button
        mt={'md'}
        color="red"
        onClick={handleDeleteChannel}
        loading={loading}
      >
        Delete Channel
      </Button>
    </Modal>
  );
}
