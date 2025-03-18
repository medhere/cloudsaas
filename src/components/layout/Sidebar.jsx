import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
    { name: 'Projects', icon: <Boxes size={20} />, path: '/dashboard/projects' },
    { name: 'Team', icon: <Users size={20} />, path: '/dashboard/team' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/dashboard/analytics' },
    { name: 'Activity', icon: <Clock size={20} />, path: '/dashboard/activity' },
    { name: 'Billing', icon: <CreditCard size={20} />, path: '/dashboard/billing' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
    { name: 'Security', icon: <Shield size={20} />, path: '/dashboard/security' },
    { name: 'Support', icon: <HelpCircle size={20} />, path: '/dashboard/support' },
  ];

  return (
    <div className="flex flex-col w-64 h-full bg-white border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 mr-2 text-lg font-bold text-white bg-blue-600 rounded-md">
            C
          </div>
          <span className="text-xl font-bold">PaaS10</span>
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
            className="w-8 h-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        
        <Link to="/" className="flex items-center w-full px-4 py-2 mt-4 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
          <LogOut size={18} className="mr-3" />
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
