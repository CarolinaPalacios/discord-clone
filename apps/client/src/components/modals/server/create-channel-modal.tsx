import {
  Button,
  Flex,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
  rem,
} from '@mantine/core';
import { useMutation } from '@apollo/client';
import { useForm } from '@mantine/form';
import { useModal } from '../../../hooks/use-modal';
import { useGeneralStore } from '../../../stores/general-store';
import {
  ChannelType,
  CreateChannelMutation,
  CreateChannelMutationVariables,
} from '../../../gql/graphql';
import { useServer } from '../../../hooks/graphql/server/use-server';
import { CREATE_CHANNEL } from '../../../graphql/mutations/server/create-channel';
import { useEffect } from 'react';

export function CreateChannelModal() {
  const { isOpen, closeModal } = useModal('CreateChannel');
  const channelType = useGeneralStore(
    (state) => state.channelTypeForCreateChannelModal
  );

  const form = useForm({
    initialValues: {
      name: '',
      type: channelType ? channelType : ChannelType.Text,
    },
    validate: {
      name: (value) =>
        !value.trim()
          ? 'Please enter a name'
          : value.toLowerCase() === 'general'
          ? 'Channel name cannot be general'
          : null,
      type: (value) => !value.trim() && 'Please select a type',
    },
    validateInputOnChange: true,
  });

  const { server } = useServer();

  const [createChannel, { loading, error }] = useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(CREATE_CHANNEL, {
    variables: {
      input: {
        serverId: server?.id,
        type: form.values.type,
        name: form.values.name,
      },
    },
    refetchQueries: ['GetServer'],
    onCompleted: () => {
      form.reset();
      closeModal();
    },
  });

  useEffect(() => {
    if (!channelType) return;
    form.setFieldValue('type', channelType);
  }, [channelType]);

  return (
    <Modal title="Create channel" opened={isOpen} onClose={closeModal}>
      <Stack>
        <Flex direction={'column'} h={rem(250)}>
          <TextInput
            mb={'md'}
            label="Channel name"
            {...form.getInputProps('name')}
            error={form.errors.name || error?.message}
          />
          <Select
            {...form.getInputProps('type')}
            label="Channel type"
            data={Object.values(ChannelType).map((type) => type)}
          />
        </Flex>
        <Group>
          <Button color="red" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            loading={loading}
            variant="gradient"
            disabled={
              !form.values.name ||
              !form.values.type ||
              loading ||
              !!error?.message
            }
            onClick={() => createChannel()}
          >
            Create Channel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
