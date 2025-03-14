import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Server, 
  FileText,
  Globe,
  HardDrive,
  Activity,
  Settings,
  Terminal,
  GitBranch,
  Lock,
  Network,
  Shield,
  Clock,
  Shuffle,
  Link,
  Box,
  ChevronLeft,
  BarChart2,
  RefreshCw
} from 'lucide-react';

const AppSidebar = ({ projectId, appId }) => {
  const navItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: `/project/${projectId}/app/${appId}/overview` },
    { name: 'Logs', icon: <FileText size={20} />, path: `/project/${projectId}/app/${appId}/logs` },
    { name: 'Domains', icon: <Globe size={20} />, path: `/project/${projectId}/app/${appId}/domains` },
    { name: 'Storage', icon: <HardDrive size={20} />, path: `/project/${projectId}/app/${appId}/storage` },
    { name: 'Processes', icon: <Activity size={20} />, path: `/project/${projectId}/app/${appId}/processes` },
    { name: 'Config', icon: <Settings size={20} />, path: `/project/${projectId}/app/${appId}/config` },
    { name: 'Shell', icon: <Terminal size={20} />, path: `/project/${projectId}/app/${appId}/shell` },
    { name: 'Git Deployment', icon: <GitBranch size={20} />, path: `/project/${projectId}/app/${appId}/git` },
    { name: 'SSL Certificates', icon: <Lock size={20} />, path: `/project/${projectId}/app/${appId}/ssl` },
    { name: 'Ports & Networking', icon: <Network size={20} />, path: `/project/${projectId}/app/${appId}/ports` },
    { name: 'Access Control', icon: <Shield size={20} />, path: `/project/${projectId}/app/${appId}/acl/services` },
    { name: 'Cron Jobs', icon: <Clock size={20} />, path: `/project/${projectId}/app/${appId}/cron` },
    { name: 'Proxy Rules', icon: <Shuffle size={20} />, path: `/project/${projectId}/app/${appId}/proxy` },
    { name: 'Integrations', icon: <Link size={20} />, path: `/project/${projectId}/app/${appId}/integration` },
    { name: 'App Builder', icon: <Box size={20} />, path: `/project/${projectId}/app/${appId}/builder` },
    { name: 'Routine Tasks', icon: <RefreshCw size={20} />, path: `/project/${projectId}/app/${appId}/routine` },
    { name: 'Monitoring', icon: <BarChart2 size={20} />, path: `/project/${projectId}/app/${appId}/monit` },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <NavLink to={`/project/${projectId}/applications`} className="flex items-center text-gray-600 hover:text-blue-600 mb-4">
            <ChevronLeft size={16} className="mr-1" />
            <span className="text-sm">Back to Applications</span>
          </NavLink>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-lg mr-2">
            <Server size={16} />
          </div>
          <span className="text-xl font-bold truncate">App: {appId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
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
    </div>
  );
};

export default AppSidebar;
