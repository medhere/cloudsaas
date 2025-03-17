import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Server, Plus, ExternalLink, Settings, Activity, Clock, BarChart2 } from 'lucide-react';

const ProjectApplications = () => {
  const { projectId } = useParams();
  
  // Mock data for applications
  const applications = [
    {
      id: 'web-app',
      name: 'Web Application',
      type: 'Node.js',
      status: 'running',
      url: 'https://web-app.example.com',
      cpu: '12%',
      memory: '256MB / 512MB',
      uptime: '10 days, 4 hours'
    },
    {
      id: 'api-service',
      name: 'API Service',
      type: 'Python',
      status: 'running',
      url: 'https://api.example.com',
      cpu: '8%',
      memory: '128MB / 256MB',
      uptime: '15 days, 2 hours'
    },
    {
      id: 'database',
      name: 'Database',
      type: 'PostgreSQL',
      status: 'running',
      url: 'internal',
      cpu: '5%',
      memory: '512MB / 1GB',
      uptime: '15 days, 2 hours'
    },
    {
      id: 'worker',
      name: 'Background Worker',
      type: 'Node.js',
      status: 'running',
      url: 'internal',
      cpu: '3%',
      memory: '128MB / 256MB',
      uptime: '8 days, 10 hours'
    },
    {
      id: 'staging-app',
      name: 'Staging Environment',
      type: 'Node.js',
      status: 'stopped',
      url: 'https://staging.example.com',
      cpu: '0%',
      memory: '0MB / 512MB',
      uptime: '0 minutes'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applications</h1>
        <Link
          to={`/project/${projectId}/create-application`} 
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus size={16} className="mr-2" />
          New Application
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {applications.map((app) => (
          <div key={app.id} className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 text-blue-600 bg-blue-100 rounded-md">
                    <Server size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{app.name}</h2>
                    <p className="text-sm text-gray-500">{app.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 inline-flex items-center text-sm font-medium rounded-full ${
                    app.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    <span className={`w-2 h-2 mr-2 rounded-full ${app.status === 'running' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                    {app.status === 'running' ? 'Running' : 'Stopped'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                <div className="flex flex-col">
                  <span className="flex items-center text-sm text-gray-500">
                    <Activity size={16} className="mr-1" /> CPU Usage
                  </span>
                  <span className="text-lg font-medium">{app.cpu}</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center text-sm text-gray-500">
                    <Server size={16} className="mr-1" /> Memory
                  </span>
                  <span className="text-lg font-medium">{app.memory}</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" /> Uptime
                  </span>
                  <span className="text-lg font-medium">{app.uptime}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-6">
                <Link 
                  to={`/project/${projectId}/app/${app.id}/overview`} 
                  className="flex items-center px-3 py-2 text-sm text-blue-700 rounded-md bg-blue-50 hover:bg-blue-100"
                >
                  <Settings size={16} className="mr-1" />
                  Manage
                </Link>
                <Link 
                  to={`/project/${projectId}/app/${app.id}/routine`} 
                  className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md bg-gray-50 hover:bg-gray-100"
                >
                  <Clock size={16} className="mr-1" />
                  Routine Tasks
                </Link>
                <Link 
                  to={`/project/${projectId}/app/${app.id}/monit`} 
                  className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md bg-gray-50 hover:bg-gray-100"
                >
                  <BarChart2 size={16} className="mr-1" />
                  Monitoring
                </Link>
                {app.url !== 'internal' && (
                  <a 
                    href={app.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md bg-gray-50 hover:bg-gray-100"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Open URL
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectApplications;
