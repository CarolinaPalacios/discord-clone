import { useEffect, useRef } from 'react';
import { useClipboard } from '@mantine/hooks';
import { Button, Flex, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconCopy, IconRefresh } from '@tabler/icons-react';
import { useMutation } from '@apollo/client';
import { useModal, useServer } from '../../hooks';
import {
  UpdateServerWithNewInviteCodeMutation,
  UpdateServerWithNewInviteCodeMutationVariables,
} from '../../gql/graphql';
import { UPDATE_SERVER_WITH_NEW_INVITE_CODE } from '../../graphql/mutations';

export const InviteModal = () => {
  const { isOpen, closeModal } = useModal('InviteFriends');
  const { server } = useServer();

  const clipboard = useClipboard({
    timeout: 1000,
  });

  const [updateServerWithNewInviteCode, { loading }] = useMutation<
    UpdateServerWithNewInviteCodeMutation,
    UpdateServerWithNewInviteCodeMutationVariables
  >(UPDATE_SERVER_WITH_NEW_INVITE_CODE, {
    variables: {
      serverId: Number(server?.id),
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

  const ref = useRef<HTMLInputElement>(null);

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Invite people">
      <Stack>
        <Flex>
          <TextInput
            ref={ref}
            w={'100%'}
            label="Server invite code"
            placeholder="https://discord.gg/invite"
            {...form.getInputProps('inviteCode')}
            rightSection={
              <Button
                variant="transparent"
                onClick={() => clipboard.copy(ref.current?.value || '')}
              >
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
          variant="gradient"
          onClick={() => updateServerWithNewInviteCode()}
        >
          <Text mr={'md'}>Generate new invite code</Text> <IconRefresh />
        </Button>
      </Stack>
    </Modal>
  );
};
