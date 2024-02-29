import { Button, Modal, Text } from '@mantine/core';
import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import { useModal } from '../../hooks';
import { LEAVE_SERVER } from '../../graphql/mutations';
import {
  LeaveServerMutation,
  LeaveServerMutationVariables,
} from '../../gql/graphql';

export function LeaveServerModal() {
  const navigate = useNavigate();
  const { serverId } = useParams();

  const { isOpen, closeModal } = useModal('LeaveServer');
  const [leaveServer, { loading }] = useMutation<
    LeaveServerMutation,
    LeaveServerMutationVariables
  >(LEAVE_SERVER, {
    variables: {
      input: {
        serverId: Number(serverId),
      },
    },
    onCompleted: (data) => {
      navigate('/');
    },
    refetchQueries: ['GetServerByProfileIdOfMember'],
  });

  const handleLeaveServer = () => {
    leaveServer();
    closeModal();
  };

  return (
    <Modal title="Leave server" opened={isOpen} onClose={closeModal}>
      <Text fw={700}>Are you sure you want to leave this server?</Text>
      <Button
        mt={'md'}
        color="red"
        disabled={loading}
        onClick={handleLeaveServer}
      >
        Leave Server
      </Button>
    </Modal>
  );
}
