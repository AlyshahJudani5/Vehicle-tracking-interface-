import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  FileBarChart,
  Bell,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const theme = useStore((state) => state.theme);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Map, label: 'Map View', path: '/map' },
    { icon: FileBarChart, label: 'Reports', path: '/reports' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } h-screen fixed left-0 top-0 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      } shadow-lg`}
    >
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <span className="font-bold text-lg">Fleet Tracker</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 ${
              location.pathname === item.path ? 'bg-gray-100 dark:bg-gray-800' : ''
            } ${
              collapsed ? 'justify-center' : 'space-x-4'
            }`}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4">
        <button
          className={`flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 w-full ${
            collapsed ? 'justify-center' : 'space-x-4'
          }`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}