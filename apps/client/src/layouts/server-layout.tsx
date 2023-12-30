import { Outlet } from 'react-router-dom';
import { Flex } from '@mantine/core';
import { Sidebar } from '../components/navigation';
import { ServerSidebar, ServerSearch } from '../components/server';

export function ServerLayout() {
  return (
    <Flex>
      <ServerSearch>
        <Sidebar />
        <ServerSidebar />
        <Outlet />
      </ServerSearch>
    </Flex>
  );
}
