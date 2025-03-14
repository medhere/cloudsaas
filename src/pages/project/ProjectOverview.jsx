import React from 'react';
import { useParams } from 'react-router-dom';
import { Server, Cpu, HardDrive, Activity, Clock, Globe, BarChart2, Database } from 'lucide-react';

const ProjectOverview = () => {
  const { projectId } = useParams();
  
  // Mock data for server specs and usage
  const serverSpecs = {
    cpu: '4 vCPUs',
    memory: '8 GB RAM',
    storage: '100 GB SSD',
    location: 'US East (N. Virginia)',
    os: 'Ubuntu 20.04 LTS',
    created: 'October 15, 2023'
  };
  
  const usageData = {
    cpu: 42,
    memory: 65,
    storage: 38,
    network: {
      in: '1.2 GB',
      out: '3.5 GB'
    },
    uptime: '99.98%',
    lastReboot: '15 days ago'
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Overview: {projectId}</h1>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
            Running
          </span>
        </div>
      </div>
      
      {/* Server Specs */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Server className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Server Specifications</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Cpu className="text-gray-500 mr-3" size={18} />
            <div>
              <p className="text-sm text-gray-500">CPU</p>
              <p className="font-medium">{serverSpecs.cpu}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Database className="text-gray-500 mr-3" size={18} />
            <div>
              <p className="text-sm text-gray-500">Memory</p>
              <p className="font-medium">{serverSpecs.memory}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <HardDrive className="text-gray-500 mr-3" size={18} />
            <div>
              <p className="text-sm text-gray-500">Storage</p>
              <p className="font-medium">{serverSpecs.storage}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Globe className="text-gray-500 mr-3" size={18} />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{serverSpecs.location}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Server className="text-gray-500 mr-3" size={18} />
            <div>
              <p className="text-sm text-gray-500">Operating System</p>
              <p className="font-medium">{serverSpecs.os}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="text-gray-500 mr-3" size={18} />
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="font-medium">{serverSpecs.created}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resource Usage */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Activity className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Resource Usage</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">CPU Usage</span>
              <span className="text-sm text-gray-500">{usageData.cpu}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`bg-${usageData.cpu > 70 ? 'red' : usageData.cpu > 40 ? 'yellow' : 'green'}-600 h-2.5 rounded-full`} 
                style={{ width: `${usageData.cpu}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Memory Usage</span>
              <span className="text-sm text-gray-500">{usageData.memory}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`bg-${usageData.memory > 70 ? 'red' : usageData.memory > 40 ? 'yellow' : 'green'}-600 h-2.5 rounded-full`} 
                style={{ width: `${usageData.memory}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Storage Usage</span>
              <span className="text-sm text-gray-500">{usageData.storage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`bg-${usageData.storage > 70 ? 'red' : usageData.storage > 40 ? 'yellow' : 'green'}-600 h-2.5 rounded-full`} 
                style={{ width: `${usageData.storage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Network In</p>
            <p className="text-lg font-medium">{usageData.network.in}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Network Out</p>
            <p className="text-lg font-medium">{usageData.network.out}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Uptime</p>
            <p className="text-lg font-medium">{usageData.uptime}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Last Reboot</p>
            <p className="text-lg font-medium">{usageData.lastReboot}</p>
          </div>
        </div>
      </div>
      
      {/* Usage Analytics */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <BarChart2 className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Usage Analytics</h2>
        </div>
        
        <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg">
          <p className="text-gray-500">Analytics chart will be displayed here</p>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Average CPU</p>
            <p className="text-lg font-medium">38%</p>
            <p className="text-xs text-green-600">↓ 5% from last week</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Average Memory</p>
            <p className="text-lg font-medium">52%</p>
            <p className="text-xs text-red-600">↑ 8% from last week</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Average Network</p>
            <p className="text-lg font-medium">2.4 GB/day</p>
            <p className="text-xs text-green-600">↓ 0.3 GB from last week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
