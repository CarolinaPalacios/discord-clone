import { Outlet } from 'react-router-dom';
import { MobileSidebar } from '../components/navigation';

export function ChannelLayout() {
  return (
    <>
      <MobileSidebar type="channel" />
      <Outlet />
    </>
  );
}
