import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Play, Pause, RefreshCw, Trash2, Plus, ExternalLink } from 'lucide-react';

const ProjectApplications = () => {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('web');
  
  // Mock data for applications
  const webApps = [
    { id: 'frontend-app', name: 'Frontend App', status: 'Running', type: 'Node.js', url: 'https://frontend.example.com', port: 3000 },
    { id: 'admin-panel', name: 'Admin Panel', status: 'Running', type: 'React', url: 'https://admin.example.com', port: 3001 },
    { id: 'landing-page', name: 'Landing Page', status: 'Stopped', type: 'Static HTML', url: 'https://landing.example.com', port: 8080 },
  ];
  
  const dockerApps = [
    { id: 'api-server', name: 'API Server', status: 'Running', image: 'node:14', ports: '4000:4000', created: '10 days ago' },
    { id: 'database', name: 'Database', status: 'Running', image: 'postgres:13', ports: '5432:5432', created: '10 days ago' },
    { id: 'redis-cache', name: 'Redis Cache', status: 'Running', image: 'redis:6', ports: '6379:6379', created: '5 days ago' },
    { id: 'nginx-proxy', name: 'Nginx Proxy', status: 'Running', image: 'nginx:latest', ports: '80:80, 443:443', created: '10 days ago' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Applications: {projectId}</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={18} />
          <span>Deploy New App</span>
        </button>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('web')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'web'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Web Applications
          </button>
          <button
            onClick={() => setActiveTab('docker')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'docker'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Docker Containers
          </button>
        </nav>
      </div>
      
      {/* Web Applications */}
      {activeTab === 'web' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Port
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {webApps.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Box className="text-gray-500 mr-2" size={18} />
                      <Link to={`/project/${projectId}/app/${app.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        {app.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{app.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 flex items-center">
                      <span className="text-sm">{app.url}</span>
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{app.port}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {app.status === 'Running' ? (
                        <button className="text-yellow-600 hover:text-yellow-900">
                          <Pause size={18} />
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900">
                          <Play size={18} />
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        <RefreshCw size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Docker Containers */}
      {activeTab === 'docker' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ports
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dockerApps.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Box className="text-gray-500 mr-2" size={18} />
                      <Link to={`/project/${projectId}/app/${app.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        {app.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{app.image}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{app.ports}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{app.created}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {app.status === 'Running' ? (
                        <button className="text-yellow-600 hover:text-yellow-900">
                          <Pause size={18} />
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900">
                          <Play size={18} />
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        <RefreshCw size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectApplications;
