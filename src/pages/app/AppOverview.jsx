import React from 'react';
import { useParams } from 'react-router-dom';
import { Server, Clock, Cpu, Memory, HardDrive, Activity, Globe, GitBranch } from 'lucide-react';

const AppOverview = () => {
  const { projectId, appId } = useParams();

  // Mock data for the application
  const appData = {
    name: appId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    status: 'Running',
    uptime: '10 days, 4 hours',
    type: 'Node.js',
    version: '14.17.0',
    url: `https://${appId}.example.com`,
    cpu: '12%',
    memory: '256MB / 512MB',
    disk: '1.2GB / 5GB',
    deployments: 24,
    lastDeployed: '2 days ago',
    git: 'github.com/example/repo',
    branch: 'main'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Application Overview: {appData.name}</h1>
        <div className="flex space-x-2">
          <span className={`px-3 py-1 inline-flex items-center text-sm font-medium rounded-full ${
            appData.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            <span className={`w-2 h-2 mr-2 rounded-full ${appData.status === 'Running' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
            {appData.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Info Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Basic Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Application Type:</span>
              <span className="font-medium">{appData.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Version:</span>
              <span className="font-medium">{appData.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">URL:</span>
              <a href={appData.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                {appData.url}
              </a>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Uptime:</span>
              <span className="font-medium">{appData.uptime}</span>
            </div>
          </div>
        </div>

        {/* Resource Usage Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Resource Usage</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 flex items-center"><Cpu size={16} className="mr-1" /> CPU Usage</span>
                <span className="font-medium">{appData.cpu}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: appData.cpu }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 flex items-center"><Memory size={16} className="mr-1" /> Memory Usage</span>
                <span className="font-medium">{appData.memory}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 flex items-center"><HardDrive size={16} className="mr-1" /> Disk Usage</span>
                <span className="font-medium">{appData.disk}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Info Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Deployment Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 flex items-center"><GitBranch size={16} className="mr-1" /> Git Repository:</span>
              <span className="font-medium">{appData.git}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Branch:</span>
              <span className="font-medium">{appData.branch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Deployments:</span>
              <span className="font-medium">{appData.deployments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Deployed:</span>
              <span className="font-medium">{appData.lastDeployed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Application restarted</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <GitBranch className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">New deployment from branch 'main'</p>
              <p className="text-sm text-gray-500">{appData.lastDeployed}</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">New domain added: api.example.com</p>
              <p className="text-sm text-gray-500">5 days ago</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <Server className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Resource limits updated</p>
              <p className="text-sm text-gray-500">1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppOverview;
