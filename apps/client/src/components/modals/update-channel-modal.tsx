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
import { useGeneralStore } from '../../stores';
import { useForm } from '@mantine/form';

import {
  ChannelType,
  UpdateChannelMutation,
  UpdateChannelMutationVariables,
} from '../../gql/graphql';
import { useMutation } from '@apollo/client';
import { useModal, useServer } from '../../hooks';
import { UPDATE_CHANNEL } from '../../graphql/mutations';

export function UpdateChannelModal() {
  const { isOpen, closeModal } = useModal('UpdateChannel');
  const { server } = useServer();

  const channelTypeForCreateChannelModal = useGeneralStore(
    (state) => state.channelTypeForCreateChannelModal
  );

  const channelId = useGeneralStore(
    (state) => state.channelToBeDeletedOrUpdatedId
  );

  const form = useForm({
    initialValues: {
      name: '',
      type: channelTypeForCreateChannelModal
        ? channelTypeForCreateChannelModal
        : ChannelType.Text,
    },
    validate: {
      name: (value) =>
        !value.trim()
          ? 'Please enter a name'
          : value === 'general'
          ? 'Channel name cannot be general'
          : null,
      type: (value) => !value.trim() && 'Please select a type',
    },
    validateInputOnChange: true,
  });

  useEffect(() => {
    const channel = server?.channels?.find(
      (channel) => channel.id === channelId
    );
    if (channel) {
      form.setFieldValue('name', channel?.name || '');
      form.setFieldValue('type', channel?.type || ChannelType.Text);
    }
  }, [channelId]);

  const [updateChannel] = useMutation<
    UpdateChannelMutation,
    UpdateChannelMutationVariables
  >(UPDATE_CHANNEL, {
    variables: {
      input: {
        channelId: channelId!,
        name: form.values.name,
        type: form.values.type,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['GetServerByProfileIdOfMember'],
  });

  const handleCreateChannel = () => {
    updateChannel();
    closeModal();
  };

  return (
    <Modal title="Update Channel" opened={isOpen} onClose={closeModal}>
      <Stack>
        <Flex direction={'column'} h={rem(250)}>
          <TextInput
            mb={'md'}
            label="Channel name"
            placeholder="Channel name"
            {...form.getInputProps('name')}
            error={form.errors.name}
          />
          <Select
            data={Object.values(ChannelType).map((type) => type)}
            label="Channel type"
            {...form.getInputProps('type')}
          />
        </Flex>
        <Group spacing={'md'}>
          <Button color="red" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            disabled={!!form.errors.name}
            onClick={handleCreateChannel}
          >
            Update Channel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
