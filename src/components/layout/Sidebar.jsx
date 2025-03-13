import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CreditCard, 
  Settings, 
  Users, 
  ClipboardList, 
  Shield, 
  BarChart, 
  HelpCircle 
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { path: '/projects', icon: <FolderKanban size={20} />, label: 'Projects' },
  { path: '/billing', icon: <CreditCard size={20} />, label: 'Billing' },
  { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  { path: '/team', icon: <Users size={20} />, label: 'Team Management' },
  { path: '/activity', icon: <ClipboardList size={20} />, label: 'Activity Logs' },
  { path: '/security', icon: <Shield size={20} />, label: 'Security' },
  { path: '/analytics', icon: <BarChart size={20} />, label: 'Usage & Analytics' },
  { path: '/support', icon: <HelpCircle size={20} />, label: 'Support' },
];

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="mb-8 mt-4">
        <h1 className="text-2xl font-bold">AppHost</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto mb-4 p-4 bg-gray-800 rounded-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-sm font-bold">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
