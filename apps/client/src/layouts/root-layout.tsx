import { Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';
import { ServerSearch } from '../components/server';

export function RootLayout() {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[4],
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
      })}
    >
      <ServerSearch>
        <Outlet />
      </ServerSearch>
    </Box>
  );
}
