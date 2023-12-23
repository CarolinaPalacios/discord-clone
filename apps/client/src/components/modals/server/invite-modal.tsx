import { useEffect } from 'react';
import { useClipboard } from '@mantine/hooks';
import { Button, Flex, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useMutation } from '@apollo/client';
import { useModal } from '../../../hooks/use-modal';
import { useServer } from '../../../hooks/graphql/server/use-server';
import {
  UpdateServerWithNewInviteCodeMutation,
  UpdateServerWithNewInviteCodeMutationVariables,
} from '../../../gql/graphql';
import { UPDATE_SERVER_WITH_NEW_INVITE_CODE } from '../../../graphql/mutations/server/update-server-with-new-invite-code';

export const InviteModal = () => {
  const { isOpen, closeModal } = useModal('InvitePeople');
  const { server } = useServer();

  const clipboard = useClipboard({
    timeout: 1000,
  });

  const [updateServerWithNewInviteCode, { loading }] = useMutation<
    UpdateServerWithNewInviteCodeMutation,
    UpdateServerWithNewInviteCodeMutationVariables
  >(UPDATE_SERVER_WITH_NEW_INVITE_CODE, {
    variables: {
      serverId: server?.id,
    },
  });

  const form = useForm({
    initialValues: {
      inviteCode: '',
    },
  });

  useEffect(() => {
    if (!server?.inviteCode) return;
    form.setValues({ inviteCode: server?.inviteCode });
  }, [server?.inviteCode]);

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Invite people">
      <Stack>
        <Flex>
          <TextInput
            w={'100%'}
            label="Server invite code"
            {...form.getInputProps('inviteCode')}
            rightSection={
              <Button variant="transparent" onClick={clipboard.copy}>
                {!clipboard.copied ? (
                  <IconCopy
                    style={{
                      width: '18px',
                      height: '18px',
                      position: 'absolute',
                      right: '5px',
                    }}
                  />
                ) : (
                  <IconCheck
                    color="green"
                    style={{
                      width: '18px',
                      height: '18px',
                      position: 'absolute',
                      right: '5px',
                    }}
                  />
                )}
              </Button>
            }
          />
        </Flex>
        <Button
          disabled={loading}
          onClick={() => updateServerWithNewInviteCode()}
        >
          <Text mr={'md'}>Generate new invite code</Text>
        </Button>
      </Stack>
    </Modal>
  );
};
