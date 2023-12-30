import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Modal, Text } from '@mantine/core';
import { useServer, useModal } from '../../hooks';
import { DELETE_SERVER } from '../../graphql/mutations';
import {
  DeleteServerMutation,
  DeleteServerMutationVariables,
} from '../../gql/graphql';

export function DeleteServerModal() {
  const navigate = useNavigate();
  const { isOpen, closeModal } = useModal('DeleteServer');

  const { server } = useServer();

  const [deleteServer, { loading }] = useMutation<
    DeleteServerMutation,
    DeleteServerMutationVariables
  >(DELETE_SERVER, {
    variables: {
      input: {
        serverId: Number(server?.id),
      },
    },
    refetchQueries: ['GetServerByProfileIdOfMember'],
    onCompleted: () => {
      closeModal();
      navigate(`/`);
    },
  });

  const handleDeleteServer = async () => {
    await deleteServer();
  };

  return (
    <Modal title="Delete server" opened={isOpen} onClose={closeModal}>
      <Text fw={700}>Are you sure you want to delete this server?</Text>
      <Button
        mt={'md'}
        color="red"
        onClick={handleDeleteServer}
        loading={loading}
      >
        Delete Server
      </Button>
    </Modal>
  );
}
