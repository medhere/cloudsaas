import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Server, 
  Power,
  Box,
  ShoppingBag,
  Key,
  GitBranch,
  Globe,
  Network,
  Terminal,
  Shield,
  Package,
  FileText,
  BarChart2,
  ChevronLeft
} from 'lucide-react';

const ProjectSidebar = ({ projectId }) => {
  const navItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: `/project/${projectId}` },
    { name: 'Manage', icon: <Power size={20} />, path: `/project/${projectId}/manage` },
    { name: 'Applications', icon: <Box size={20} />, path: `/project/${projectId}/applications` },
    { name: 'Marketplace', icon: <ShoppingBag size={20} />, path: `/project/${projectId}/marketplace` },
    { name: 'Project Keys', icon: <Key size={20} />, path: `/project/${projectId}/keys` },
    { name: 'Deployment', icon: <GitBranch size={20} />, path: `/project/${projectId}/deployment` },
    { name: 'DNS Manager', icon: <Globe size={20} />, path: `/project/${projectId}/dns` },
    { name: 'Network', icon: <Network size={20} />, path: `/project/${projectId}/network` },
    { name: 'Shell', icon: <Terminal size={20} />, path: `/project/${projectId}/shell` },
    { name: 'Firewall', icon: <Shield size={20} />, path: `/project/${projectId}/firewall` },
    { name: 'Registry', icon: <Package size={20} />, path: `/project/${projectId}/registry` },
    { name: 'Events Log', icon: <FileText size={20} />, path: `/project/${projectId}/events` },
    { name: 'Monitoring', icon: <BarChart2 size={20} />, path: `/project/${projectId}/monitoring` },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <NavLink to="/dashboard/projects" className="flex items-center text-gray-600 hover:text-blue-600 mb-4">
            <ChevronLeft size={16} className="mr-1" />
            <span className="text-sm">Back to Projects</span>
          </NavLink>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-lg mr-2">
            <Server size={16} />
          </div>
          <span className="text-xl font-bold truncate">Project: {projectId}</span>
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

export default ProjectSidebar;
