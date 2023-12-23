import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Modal, Text } from '@mantine/core';
import { useModal } from '../../../hooks/use-modal';
import { useServer } from '../../../hooks/graphql/server/use-server';
import { DELETE_SERVER } from '../../../graphql/mutations/server/delete-server';
import {
  DeleteServerMutation,
  DeleteServerMutationVariables,
} from '../../../gql/graphql';

export function DeleteServerModal() {
  const navigate = useNavigate();
  const { isOpen, closeModal } = useModal('DeleteServer');

  const { server } = useServer();

  const [deleteServer, { loading }] = useMutation<
    DeleteServerMutation,
    DeleteServerMutationVariables
  >(DELETE_SERVER, {
    variables: {
      serverId: server?.id,
    },
    refetchQueries: ['GetServers'],
    onCompleted: () => {
      closeModal();
      navigate(`/`);
    },
  });

  return (
    <Modal title="Delete server" opened={isOpen} onClose={closeModal}>
      <Text fw={700}>Are you sure you want to delete this server?</Text>
      <Button
        mt={'md'}
        color="red"
        onClick={() => deleteServer()}
        loading={loading}
      >
        Delete Server
      </Button>
    </Modal>
  );
}
