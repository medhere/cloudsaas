import React from 'react';
import { useParams } from 'react-router-dom';
import { Server, Clock, Cpu, MemoryStick, HardDrive, Activity, Globe, GitBranch } from 'lucide-react';

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
      <div className="flex items-center justify-between">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Basic Info Card */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium">Basic Information</h2>
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
              <a href={appData.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-800">
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
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium">Resource Usage</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center text-gray-500"><Cpu size={16} className="mr-1" /> CPU Usage</span>
                <span className="font-medium">{appData.cpu}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: appData.cpu }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center text-gray-500"><MemoryStick size={16} className="mr-1" /> Memory Usage</span>
                <span className="font-medium">{appData.memory}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center text-gray-500"><HardDrive size={16} className="mr-1" /> Disk Usage</span>
                <span className="font-medium">{appData.disk}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Info Card */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium">Deployment Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="flex items-center text-gray-500"><GitBranch size={16} className="mr-1" /> Git Repository:</span>
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
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-medium">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Application restarted</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <GitBranch className="w-5 h-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">New deployment from branch 'main'</p>
              <p className="text-sm text-gray-500">{appData.lastDeployed}</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">New domain added: api.example.com</p>
              <p className="text-sm text-gray-500">5 days ago</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <Server className="w-5 h-5 text-gray-400" />
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
