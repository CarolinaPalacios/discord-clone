import { useState } from 'react';
import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { useModal } from '../../hooks';

import {
  AddMemberToServerMutation,
  AddMemberToServerMutationVariables,
} from '../../gql/graphql';
import { ADD_MEMBER_TO_SERVER } from '../../graphql/mutations';

export function ServerJoinModal() {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');

  const { isOpen, closeModal } = useModal('JoinServer');

  const [addMember, { loading, error }] = useMutation<
    AddMemberToServerMutation,
    AddMemberToServerMutationVariables
  >(ADD_MEMBER_TO_SERVER, {
    variables: {
      inviteCode,
    },
    onCompleted: (data) => {
      navigate(`/server/${data?.addMemberToServer?.id}`);
      closeModal();
    },
    refetchQueries: ['GetServerByProfileIdOfMember'],
  });

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Join server">
      <Stack spacing={'md'}>
        <TextInput
          label="Invite code"
          onChange={(e) => setInviteCode(e.target.value)}
          error={error?.message}
        />
        <Button
          disabled={!inviteCode}
          loading={loading}
          onClick={() => addMember()}
        >
          Join Server
        </Button>
      </Stack>
    </Modal>
  );
}
