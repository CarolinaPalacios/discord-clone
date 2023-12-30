import { Outlet } from 'react-router-dom';
import { MobileSidebar } from '../components/navigation';

export function ConversationLayout() {
  return (
    <>
      <MobileSidebar type="conversation" />
      <Outlet />
    </>
  );
}
