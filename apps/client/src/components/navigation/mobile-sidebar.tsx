import { Drawer, rem } from '@mantine/core';
import { useGeneralStore } from '../../stores/general-store';
import { Sidebar } from './sidebar';
import { ServerSidebar } from './server-sidebar';

export function MobileSidebar() {
  const { drawerOpen, toggleDrawer } = useGeneralStore();

  return (
    <div>
      <Sidebar />

      <Drawer
        padding="0"
        mb="0"
        zIndex={10}
        opened={drawerOpen}
        size={rem(320)}
        h={rem(600)}
        position="left"
        withOverlay={false}
        styles={{ root: { width: 0, height: 0, position: 'fixed' } }}
        withCloseButton={false}
        ml={rem(80)}
        onClose={toggleDrawer}
      >
        <ServerSidebar />
      </Drawer>
    </div>
  );
}
