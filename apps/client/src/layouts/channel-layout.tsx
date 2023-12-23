import { Outlet } from 'react-router-dom';
import { MobileSidebar } from '../components/navigation/mobile-sidebar';

export function ChannelLayout() {
  return (
    <>
      <MobileSidebar />
      <Outlet />
    </>
  );
}
