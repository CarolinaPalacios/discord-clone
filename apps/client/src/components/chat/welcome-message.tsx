import { Box, Flex, Text } from '@mantine/core';
import { IconHash } from '@tabler/icons-react';

interface WelcomeMessageProps {
  type: 'conversation' | 'channel';
  name: string | null;
}
export function WelcomeMessage({ type, name }: WelcomeMessageProps) {
  return (
    <Flex justify={'end'} align={'start'} direction={'column'} p="lg">
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[5],
          textAlign: 'center',
          margin: '0px',
          borderRadius: 100,
          padding: theme.spacing.sm,
          cursor: 'pointer',
        })}
      >
        <IconHash size={40} radius={'100'} />
      </Box>
      <Text size="xl" fw={700}>
        {type === 'channel' ? `Welcome to ${name}` : ``}
      </Text>
      <Text c="dimmed">
        {type === 'channel'
          ? `This is the start of the #${name} channel`
          : `This is the start of the conversation with ${name}`}
      </Text>
    </Flex>
  );
}
