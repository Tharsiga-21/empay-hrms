import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex relative">
      <div className="mesh-gradient" />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        <Topbar />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
