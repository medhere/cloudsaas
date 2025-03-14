import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText,
  Users,
  Shield,
  Package,
  GitBranch,
  Settings,
  Globe,
  Lock,
  Cpu,
  Terminal,
  Clock,
  Network,
  Server,
  Database,
  Github,
  FileJson,
  Trash2,
  BarChart2,
  ChevronLeft
} from 'lucide-react';

const AppSidebar = ({ projectId, appId }) => {
  const navItems = [
    { name: 'Overview', icon: <LayoutDashboard size={18} />, path: `/project/${projectId}/app/${appId}` },
    { name: 'Logs', icon: <FileText size={18} />, path: `/project/${projectId}/app/${appId}/logs` },
    { name: 'Users ACL', icon: <Users size={18} />, path: `/project/${projectId}/app/${appId}/users-acl` },
    { name: 'Service ACL', icon: <Shield size={18} />, path: `/project/${projectId}/app/${appId}/service-acl` },
    { name: 'App Builder', icon: <Package size={18} />, path: `/project/${projectId}/app/${appId}/builder` },
    { name: 'Git Deployment', icon: <GitBranch size={18} />, path: `/project/${projectId}/app/${appId}/git` },
    { name: 'Config Manager', icon: <Settings size={18} />, path: `/project/${projectId}/app/${appId}/config` },
    { name: 'App Domains', icon: <Globe size={18} />, path: `/project/${projectId}/app/${appId}/domains` },
    { name: 'SSL Certificates', icon: <Lock size={18} />, path: `/project/${projectId}/app/${appId}/ssl` },
    { name: 'Process & Resources', icon: <Cpu size={18} />, path: `/project/${projectId}/app/${appId}/processes` },
    { name: 'Shell Commands', icon: <Terminal size={18} />, path: `/project/${projectId}/app/${appId}/shell` },
    { name: 'Cron Tasks', icon: <Clock size={18} />, path: `/project/${projectId}/app/${appId}/cron` },
    { name: 'Ports', icon: <Network size={18} />, path: `/project/${projectId}/app/${appId}/ports` },
    { name: 'Proxy', icon: <Server size={18} />, path: `/project/${projectId}/app/${appId}/proxy` },
    { name: 'Storage', icon: <Database size={18} />, path: `/project/${projectId}/app/${appId}/storage` },
    { name: 'Integration', icon: <Github size={18} />, path: `/project/${projectId}/app/${appId}/integration` },
    { name: 'AppJson & Procfile', icon: <FileJson size={18} />, path: `/project/${projectId}/app/${appId}/config-files` },
    { name: 'Routine Tasks', icon: <Trash2 size={18} />, path: `/project/${projectId}/app/${appId}/routine` },
    { name: 'App Monit', icon: <BarChart2 size={18} />, path: `/project/${projectId}/app/${appId}/monit` },
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
            <Package size={16} />
          </div>
          <span className="text-xl font-bold truncate">App: {appId}</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
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
