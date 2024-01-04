import { Box, Flex, Text } from '@mantine/core';
import { IconHash } from '@tabler/icons-react';

interface WelcomeMessageProps {
  type: 'conversation' | 'channel';
  name: string | null;
}
export function WelcomeMessage({ type, name }: WelcomeMessageProps) {
  return (
    <Flex align={'start'} direction={'column'} p="xs">
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[5],
          textAlign: 'center',
          marginBottom: '30px',
          borderRadius: '50%',
          padding: theme.spacing.lg,
          cursor: 'pointer',
          marginTop: '20px',
        })}
      >
        <IconHash size={50} />
      </Box>
      <Text size="xl" fw={700} c={'dimmed'}>
        {type === 'channel' ? `Welcome to #${name}` : ``}
      </Text>
      <Text c="dimmed">
        {type === 'channel'
          ? `This is the start of the #${name} channel`
          : `This is the start of the conversation with ${name}`}
      </Text>
    </Flex>
  );
}
