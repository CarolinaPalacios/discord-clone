import {
  Avatar,
  Button,
  Flex,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconHash, IconMenu2 } from '@tabler/icons-react';
import { useMemberById, useServer } from '../../hooks';
import { useGeneralStore } from '../../stores';

interface ChatHeaderProps {
  opened: boolean;
  toggle: () => void;
  type: 'channel' | 'conversation';
}

export function ChatHeader({ opened, toggle, type }: ChatHeaderProps) {
  const theme = useMantineTheme();
  const { server } = useServer();
  console.log(server, ':server');
  const memberData = useMemberById();
  const { drawerOpen } = useGeneralStore((state) => state);

  return (
    <Paper
      style={{
        transition: 'margin-left 0.3s ease',
        marginLeft: opened ? '350px' : '10px',
      }}
      shadow="md"
      w={'100%'}
      sx={{
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[4],
        display: ['flex', 'flex'],
        position: 'fixed',
        inset: drawerOpen ? '0px 0px' : '0px 80px',
        height: '60px',
        width: '100vw',
        border: 'none',
      }}
    >
      <Flex
        sx={{
          display: ['flex', 'flex'],
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Button
          onClick={toggle}
          variant="link"
          sx={{
            display: ['flex', 'flex'],
            justifyContent: 'center',
            alignItems: 'center',
            width: '2%',
            height: '60%',
          }}
        >
          <IconMenu2 />
        </Button>
        {type === 'channel' ? (
          <>
            <IconHash />
            <Text fw={700} size={'lg'}>
              {server?.name}
            </Text>
          </>
        ) : (
          <Flex align={'center'} w={'20%'} ml={'md'}>
            <Avatar
              mr={'md'}
              src={memberData?.profile?.imageUrl}
              radius={100}
            />
            <Text fw={700} size={'lg'}>
              {memberData?.profile?.name}
            </Text>
          </Flex>
        )}
      </Flex>
    </Paper>
  );
}
