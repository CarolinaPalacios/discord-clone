import { Outlet } from 'react-router-dom';
import { ServerSidebar } from '../components/navigation/server-sidebar';

export function ServerLayout() {
  return (
    <div>
      <ServerSidebar />
      <Outlet />
    </div>
  );
}
