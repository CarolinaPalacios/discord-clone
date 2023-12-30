import { useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useGeneralStore } from '../stores/general-store';

export const useToggleDrawer = () => {
  const isSmallerThanLg = useMediaQuery('(max-width: 1200px)');

  const drawerOpen = useGeneralStore((state) => state.drawerOpen);

  useEffect(() => {
    useGeneralStore.setState({ drawerOpen: isSmallerThanLg ? false : true });
  }, [isSmallerThanLg]);

  return {
    drawerOpen,
    isSmallerThanLg,
  };
};
