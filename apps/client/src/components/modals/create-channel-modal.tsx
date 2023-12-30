import { useEffect } from 'react';
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
import { useModal, useServer } from '../../hooks';
import { useGeneralStore } from '../../stores/general-store';
import {
  ChannelType,
  CreateChannelOnServerMutation,
  CreateChannelOnServerMutationVariables,
} from '../../gql/graphql';
import { CREATE_CHANNEL_ON_SERVER } from '../../graphql/mutations';

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
      type: (value) => !value.trim() && 'Please select a channel type',
    },
    validateInputOnChange: true,
  });

  const { server } = useServer();

  const [createChannelOnServer, { loading, error }] = useMutation<
    CreateChannelOnServerMutation,
    CreateChannelOnServerMutationVariables
  >(CREATE_CHANNEL_ON_SERVER, {
    variables: {
      input: {
        serverId: Number(server?.id),
        type: form.values.type,
        name: form.values.name,
      },
    },
    refetchQueries: ['GetServerById'],
    onCompleted: () => {
      form.reset();
      closeModal();
    },
  });

  useEffect(() => {
    if (!channelType) return;
    form.setFieldValue('type', channelType);
  }, [channelType]);

  const handleCreateChannel = () => {
    createChannelOnServer();
  };

  return (
    <Modal title="Create channel" opened={isOpen} onClose={closeModal}>
      <Stack>
        <Flex direction={'column'} h={rem(250)}>
          <TextInput
            mb={'md'}
            label="Channel name"
            placeholder="Channel name"
            {...form.getInputProps('name')}
            error={form.errors.name || error?.message}
          />
          <Select
            {...form.getInputProps('type')}
            label="Channel type"
            data={Object.values(ChannelType).map((type) => type)}
          />
        </Flex>
        <Group spacing={'md'}>
          <Button color="red" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            loading={loading}
            variant="gradient"
            disabled={!form.values.name || loading || !!error?.message}
            onClick={handleCreateChannel}
          >
            Create Channel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
