import { useState } from 'react';
import {
  Button,
  Modal,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
  rem,
  Group,
  Image,
  Flex,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useModal } from '../../hooks';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useMutation } from '@apollo/client';
import { CREATE_SERVER } from '../../graphql/mutations';
import {
  CreateServerMutation,
  CreateServerMutationVariables,
} from '../../gql/graphql';
import { useProfileStore } from '../../stores';

import './create-server-modal.css';

export function CreateServerModal() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const theme = useMantineTheme();

  const { isOpen, closeModal } = useModal('CreateServer');

  const [createServer, { loading, error }] = useMutation<
    CreateServerMutation,
    CreateServerMutationVariables
  >(CREATE_SERVER);

  const profileId = useProfileStore((state) => state.profile?.id);

  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: {
      name: (value) => !value.trim() && 'Please enter a name',
    },
  });

  const onSubmit = () => {
    if (!form.validate()) return;
    createServer({
      variables: {
        input: {
          name: form.values.name,
          profileId,
        },
        file,
      },
      onCompleted: () => {
        setImagePreview(null);
        setFile(null);
        form.reset();
        closeModal();
      },

      refetchQueries: ['GetServerByProfileIdOfMember'],
    });
  };

  const handleDropzoneChange: DropzoneProps['onDrop'] = (files) => {
    if (files.length === 0) {
      return setImagePreview(null);
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    setFile(files[0]);
    reader.readAsDataURL(files[0]);
  };

  return (
    <Modal
      title="Customize your server"
      opened={isOpen}
      onClose={closeModal}
      size="33rem"
      centered
    >
      <Text c={'dimmed'} align="center" mt={'sm'}>
        Give your new server a personality by choosing a name and an icon. You
        can always change it later.
      </Text>
      <form onSubmit={form.onSubmit(() => onSubmit())}>
        <Stack>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            {!imagePreview && (
              <Dropzone
                onDrop={(files) => handleDropzoneChange(files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                mt={'md'}
              >
                <Group
                  position="center"
                  spacing="xl"
                  style={{ minHeight: rem(100), pointerEvents: 'none' }}
                >
                  <Dropzone.Accept>
                    <IconUpload
                      size="3.2rem"
                      stroke={1.5}
                      color={
                        theme.colors[theme.primaryColor][
                          theme.colorScheme === 'dark' ? 4 : 6
                        ]
                      }
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      size="3.2rem"
                      stroke={1.5}
                      color={
                        theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
                      }
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size="3.2rem" stroke={1.5} />
                  </Dropzone.Idle>
                  <>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not
                      exceed 5mb
                    </Text>
                  </>
                </Group>
              </Dropzone>
            )}
            {error?.message && !file && <Text c="red">{error?.message}</Text>}
            {imagePreview && (
              <Flex pos="relative" w={rem(150)} h={rem(150)} mt="md">
                <>
                  <Button
                    color="red"
                    pos="absolute"
                    size="25"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setImagePreview(null);
                    }}
                    style={{
                      transform: 'translate(50%, 50%)',
                      left: 100,
                      top: 0,
                      zIndex: 200,
                    }}
                  >
                    <IconX color="white" />
                  </Button>
                  <Image
                    radius={100}
                    width={rem(150)}
                    height={rem(150)}
                    fit="cover"
                    src={imagePreview}
                    pos="absolute"
                  />
                </>
              </Flex>
            )}
          </Flex>
          <TextInput
            label="Server name"
            placeholder="Your server's name"
            {...form.getInputProps('name')}
            error={form.errors.name}
          />
          <Flex justify="space-between" align="center" py={'md'}>
            <Button
              disabled={!!form.errors.name || loading}
              type="button"
              variant="transparent"
              onClick={closeModal}
            >
              Back
            </Button>
            <Button
              disabled={!!form.errors.name || loading}
              type="submit"
              variant="gradient"
            >
              Create Server
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  );
}
