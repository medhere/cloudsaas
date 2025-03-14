import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Boxes, 
  Users, 
  BarChart2, 
  Clock, 
  CreditCard, 
  Settings, 
  Shield, 
  HelpCircle,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Projects', icon: <Boxes size={20} />, path: '/projects' },
    { name: 'Team', icon: <Users size={20} />, path: '/team' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
    { name: 'Activity', icon: <Clock size={20} />, path: '/activity' },
    { name: 'Billing', icon: <CreditCard size={20} />, path: '/billing' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    { name: 'Security', icon: <Shield size={20} />, path: '/security' },
    { name: 'Support', icon: <HelpCircle size={20} />, path: '/support' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-lg mr-2">
            C
          </div>
          <span className="text-xl font-bold">CloudSaaS</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        
        <button className="mt-4 flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md w-full">
          <LogOut size={18} className="mr-3" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
