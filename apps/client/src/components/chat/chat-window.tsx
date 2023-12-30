import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useGeneralStore } from '../../stores/general-store';
import { ChannelType, MessageUnion } from '../../gql/graphql';
import { ChatMessages } from './chat-messages';
import { MediaRoom } from './media/media-room';
import { TextInputSection } from './text-input-section';
import {
  useToggleDrawer,
  useMessageCreatedSubscription,
  useMessageData,
  useConversationData,
} from '../../hooks';

interface ChatWindowProps {
  chatName: string;
  chatType: 'channel' | 'conversation';
  channelType?: ChannelType;
}
export function ChatWindow({
  chatName,
  chatType,
  channelType,
}: ChatWindowProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { drawerOpen } = useGeneralStore((state) => state);
  const { createMessage, messages, channelId, memberId } = useMessageData();

  const createImagePreview = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  useToggleDrawer();

  const form = useForm({
    initialValues: {
      content: '',
    },
  });

  const { conversation, getOrCreateConversation } = useConversationData({
    memberId,
  });

  const conversationId = conversation?.id;

  useMessageCreatedSubscription();

  const handleSendMessage = async (content: string) => {
    if (!conversationId && !channelId) return;
    getOrCreateConversation();
    await createMessage({
      variables: {
        input: {
          content,
          conversationId,
          channelId,
        },
        file,
      },
      refetchQueries: ['GetMessagesByConversationIdOrChannelId'],
      onError: (error) => console.error(error),
    });

    setImagePreview(null);
    setFile(null);
    form.reset();
  };

  const { isSmallerThanLg } = useToggleDrawer();

  return (
    <Flex justify={'center'} align={'end'}>
      <Outlet />
      <Flex
        justify={'flex-end'}
        align={'flex-end'}
        direction={'column'}
        pt="60px"
        h="100vh"
        w="calc(100vw - 80px)"
        miw="60vw"
      >
        <Paper
          m={0}
          p={0}
          h="calc(100vh - 60px)"
          w={drawerOpen ? 'calc(100% - 340px)' : 'calc(100% - 110px)'}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[4],
            borderRadius: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <Flex>
            {channelType && (
              <Flex>
                {channelType === ChannelType.Video && (
                  <Flex w={'100%'}>
                    <Flex w={isSmallerThanLg ? '100vw' : '50vw'}>
                      <MediaRoom chatId={chatName} audio={true} video={true} />
                    </Flex>
                    {isSmallerThanLg && (
                      <Flex
                        direction={'column'}
                        w={drawerOpen ? '26vw' : '40vw'}
                        mr={'md'}
                      >
                        <ChatMessages
                          messages={messages as MessageUnion[]}
                          conversationId={conversationId}
                          channelId={channelId}
                        />
                        <Flex mt="md" justify={'center'} align={'center'}>
                          <TextInputSection
                            setImagePreview={setImagePreview}
                            imagePreview={imagePreview}
                            onSend={handleSendMessage}
                            onFileChange={createImagePreview}
                          />
                        </Flex>
                      </Flex>
                    )}
                  </Flex>
                )}
                {channelType === ChannelType.Audio && (
                  <>
                    <Flex w={isSmallerThanLg ? '100vw' : '50vw'}>
                      <MediaRoom chatId={chatName} audio={true} video={false} />
                    </Flex>
                    {!isSmallerThanLg && (
                      <Flex direction={'column'} w={'26vw'}>
                        <ChatMessages
                          messages={messages as MessageUnion[]}
                          channelId={channelId}
                          conversationId={conversationId}
                        />
                        <Flex
                          mt={'md'}
                          w={'100%'}
                          justify={'center'}
                          align={'center'}
                        >
                          <TextInputSection
                            setImagePreview={setImagePreview}
                            imagePreview={imagePreview}
                            onSend={handleSendMessage}
                            onFileChange={createImagePreview}
                          />
                        </Flex>
                      </Flex>
                    )}
                  </>
                )}
              </Flex>
            )}
            {channelType === ChannelType.Text && (
              <Flex direction={'column'} w={'100vw'}>
                <ChatMessages
                  messages={messages as MessageUnion[]}
                  channelId={channelId}
                  conversationId={conversationId}
                />
                <Flex mt={'md'} w={'100%'} justify={'center'} align={'center'}>
                  <TextInputSection
                    setImagePreview={setImagePreview}
                    imagePreview={imagePreview}
                    onSend={handleSendMessage}
                    onFileChange={createImagePreview}
                  />
                </Flex>
              </Flex>
            )}
            {chatType === 'conversation' && (
              <Flex direction={'column'} w={'100vw'}>
                <ChatMessages
                  messages={messages as MessageUnion[]}
                  channelId={channelId}
                  conversationId={conversationId}
                />
                <Flex mt={'md'} w={'90%'} justify={'center'} align={'center'}>
                  <TextInputSection
                    setImagePreview={setImagePreview}
                    imagePreview={imagePreview}
                    onSend={handleSendMessage}
                    onFileChange={createImagePreview}
                  />
                </Flex>
              </Flex>
            )}
          </Flex>
        </Paper>
      </Flex>
    </Flex>
  );
}
