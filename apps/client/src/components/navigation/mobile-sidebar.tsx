import { Drawer } from '@mantine/core';

import { useGeneralStore } from '../../stores';
import { Sidebar } from './sidebar';
import { ServerSidebar } from '../server';
import { ChatHeader } from './chat-header';

interface MobileSidebarProps {
  type: 'channel' | 'conversation';
}

export function MobileSidebar({ type }: MobileSidebarProps) {
  const { drawerOpen, toggleDrawer } = useGeneralStore();

  return (
    <>
      <ChatHeader opened={drawerOpen} toggle={toggleDrawer} type={type} />
      <Sidebar />
      <Drawer
        mb={0}
        zIndex={10}
        opened={drawerOpen}
        onClose={toggleDrawer}
        size={'350px'}
        position="left"
        withOverlay={false}
        styles={{ root: { width: 0, height: 0, position: 'fixed' } }}
        withCloseButton={false}
      >
        <ServerSidebar />
      </Drawer>
    </>
  );
}
