import { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useModal } from '../../../hooks/use-modal';
import { IconUpload, IconX } from '@tabler/icons-react';
import { useMutation } from '@apollo/client';
import { UPDATE_SERVER } from '../../../graphql/mutations/server/update-server';
import {
  UpdateServerMutation,
  UpdateServerMutationVariables,
} from '../../../gql/graphql';
import classes from './update-server-modal.module.css';
import { useServer } from '../../../hooks/graphql/server/use-server';

export function UpdateServerModal() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { isOpen, closeModal } = useModal('UpdateServer');
  const [updateServer, { loading, error }] = useMutation<
    UpdateServerMutation,
    UpdateServerMutationVariables
  >(UPDATE_SERVER);

  const { server } = useServer();

  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: {
      name: (value) => !value.trim() && 'Please enter a name',
    },
  });

  useEffect(() => {
    if (!server) return;
    form.setValues({
      name: server?.name,
    });
    setImagePreview(server?.imageUrl);
  }, [server?.name, server?.imageUrl]);

  const onSubmit = () => {
    if (!form.validate()) return;
    updateServer({
      variables: {
        input: {
          name: form.values.name,
          serverId: server?.id,
        },
        file,
      },
      onCompleted: () => {
        setImagePreview(null);
        setFile(null);
        closeModal();
        form.reset();
      },

      refetchQueries: ['GetServers'],
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
    <Modal title="Update server" opened={isOpen} onClose={closeModal}>
      <Text>Update your server name and icon.</Text>
      <form onSubmit={form.onSubmit(() => onSubmit())}>
        <Stack>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            {!imagePreview && (
              <Dropzone
                onDrop={(files) => {
                  handleDropzoneChange(files);
                }}
                accept={IMAGE_MIME_TYPE}
                className={classes.dropzone}
                mt={'md'}
              >
                <Group style={{ minHeight: rem(100), pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <IconUpload size="3.2rem" stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size="3.2rem" stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconUpload size="3.2rem" stroke={1.5} />
                  </Dropzone.Idle>
                  <>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Upload a server icon
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
                    style={{
                      zIndex: 1,
                      borderRadius: '50%',
                      padding: 0,
                      width: rem(30),
                      height: rem(30),
                      top: 0,
                      right: 18,
                    }}
                    onClick={() => {
                      setImagePreview(null);
                      setFile(null);
                    }}
                  >
                    <IconX color="white" />
                  </Button>
                  <Image
                    src={imagePreview}
                    w={rem(150)}
                    h={rem(150)}
                    radius={'50%'}
                  />
                </>
              </Flex>
            )}
          </Flex>
          <TextInput
            label="Server name"
            placeholder="Enter server name"
            {...form.getInputProps('name')}
            error={form.errors.name}
          />
          <Button
            disabled={!!form.errors.name || loading}
            w={'50%'}
            type={'submit'}
            variant="gradient"
            mt={'md'}
          >
            Update Server
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
