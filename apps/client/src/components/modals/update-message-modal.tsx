import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Flex, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@apollo/client';
import { useModal } from '../../hooks';
import { useMessageStore } from '../../stores';
import {
  UpdateMessageMutation,
  UpdateMessageMutationVariables,
} from '../../gql/graphql';
import { UPDATE_MESSAGE } from '../../graphql/mutations';

export function UpdateMessageModal() {
  const { conversationId, channelId } = useParams();

  const { isOpen, closeModal } = useModal('UpdateMessage');
  const message = useMessageStore((state) => state.message);

  const form = useForm({
    initialValues: {
      content: '',
    },
    validate: {
      content: (value) =>
        !value.trim() ? 'Please enter your new content' : null,
    },
    validateInputOnChange: true,
  });

  useEffect(() => {
    if (!message?.content) return;
    form.setFieldValue('content', message.content);
  }, [message]);

  const [updateMessage, { loading }] = useMutation<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
  >(UPDATE_MESSAGE, {
    variables: {
      messageId: Number(message?.id),
      content: form.values.content,
      conversationId: Number(conversationId),
      channelId: Number(channelId),
    },
    onCompleted: () => {
      closeModal();
    },
  });

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Update message">
      <Stack>
        <Flex direction={'column'}>
          <TextInput
            mb="md"
            label="Content"
            placeholder="Update your content"
            {...form.getInputProps('content')}
            error={form.errors.content}
          />
        </Flex>
        <Group spacing={'md'}>
          <Button onClick={closeModal} color="red">
            Cancel
          </Button>
          <Button
            onClick={() => updateMessage()}
            variant="gradient"
            disabled={loading || !!form.errors.content}
          >
            Update Message
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
