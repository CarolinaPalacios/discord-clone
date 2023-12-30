import { Box, rem } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface MessageButtonProps {
  onClick: () => void;
  type: 'update' | 'delete';
}

export function MessageButton({ onClick, type }: MessageButtonProps) {
  return (
    <Box
      onClick={onClick}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[7]
            : theme.colors.gray[5],
        borderRadius: theme.radius.xl,
        width: rem(20),
        height: rem(20),
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[6],
        },
        '&:active': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[7],
        },
        '&:hover .icon': {
          transform: 'scale(1.4)',
        },
      })}
    >
      <Box className="icon" sx={{ transition: 'transform 0.2s ease' }}>
        {type === 'delete' ? <IconTrash size="15" /> : <IconEdit size="15" />}
      </Box>
    </Box>
  );
}
