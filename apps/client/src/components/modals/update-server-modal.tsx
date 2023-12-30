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
  useMantineTheme,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useModal, useServer } from '../../hooks';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useMutation } from '@apollo/client';
import { UPDATE_SERVER } from '../../graphql/mutations';
import {
  UpdateServerMutation,
  UpdateServerMutationVariables,
} from '../../gql/graphql';

export function UpdateServerModal() {
  const theme = useMantineTheme();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>();
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
    form.setFieldValue('name', server?.name || '');
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
      title="Update server"
      opened={isOpen}
      onClose={closeModal}
      size={'md'}
    >
      <form onSubmit={form.onSubmit(() => onSubmit())}>
        <Stack>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            {!imagePreview && (
              <Dropzone
                mt="md"
                onDrop={(files) => handleDropzoneChange(files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
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
                        theme.colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.gray[4]
                      }
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      size="3.2rem"
                      stroke={1.5}
                      color={
                        theme.colorScheme === 'dark'
                          ? theme.colors.red[6]
                          : theme.colors.red[4]
                      }
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size="3.2rem" stroke={1.5} />
                  </Dropzone.Idle>
                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not
                      exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            )}
            {error?.message && !file && <Text c="red">{error?.message}</Text>}
            {imagePreview && (
              <Flex pos="relative" w={rem(150)} h={rem(150)} mt="md">
                <>
                  <Button
                    color="red"
                    radius={100}
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
          <Button
            disabled={!!form.errors.name || loading}
            w={'30%'}
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
