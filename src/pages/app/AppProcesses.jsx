import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Cpu, MemoryStick, HardDrive, Play, Square, RefreshCw, Plus, Trash2, AlertTriangle, BarChart2 } from 'lucide-react';

const AppProcesses = () => {
  const { projectId, appId } = useParams();
  const [processes, setProcesses] = useState([
    { 
      id: 'web.1', 
      type: 'web', 
      status: 'running', 
      uptime: '10d 4h', 
      cpu: 12, 
      memory: 256, 
      command: 'npm start' 
    },
    { 
      id: 'worker.1', 
      type: 'worker', 
      status: 'running', 
      uptime: '10d 4h', 
      cpu: 8, 
      memory: 192, 
      command: 'npm run worker' 
    },
    { 
      id: 'scheduler.1', 
      type: 'scheduler', 
      status: 'crashed', 
      uptime: '0m', 
      cpu: 0, 
      memory: 0, 
      command: 'npm run scheduler' 
    },
  ]);

  const [resources, setResources] = useState({
    cpu: { used: 20, limit: 100 },
    memory: { used: 448, limit: 1024 },
    disk: { used: 1.2, limit: 5 }
  });

  const restartProcess = (id) => {
    setProcesses(processes.map(p => 
      p.id === id ? { ...p, status: 'starting', uptime: '0m' } : p
    ));
    
    // Simulate restart
    setTimeout(() => {
      setProcesses(processes.map(p => 
        p.id === id ? { ...p, status: 'running', uptime: '0m' } : p
      ));
    }, 2000);
  };

  const stopProcess = (id) => {
    setProcesses(processes.map(p => 
      p.id === id ? { ...p, status: 'stopping' } : p
    ));
    
    // Simulate stop
    setTimeout(() => {
      setProcesses(processes.map(p => 
        p.id === id ? { ...p, status: 'stopped', uptime: '0m', cpu: 0, memory: 0 } : p
      ));
    }, 1500);
  };

  const startProcess = (id) => {
    setProcesses(processes.map(p => 
      p.id === id ? { ...p, status: 'starting' } : p
    ));
    
    // Simulate start
    setTimeout(() => {
      setProcesses(processes.map(p => 
        p.id === id ? { ...p, status: 'running', uptime: '0m', cpu: Math.floor(Math.random() * 10) + 1, memory: Math.floor(Math.random() * 100) + 100 } : p
      ));
    }, 2000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'running':
        return <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Running</span>;
      case 'starting':
        return <span className="inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">Starting</span>;
      case 'stopping':
        return <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">Stopping</span>;
      case 'stopped':
        return <span className="inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 bg-gray-100 rounded-full">Stopped</span>;
      case 'crashed':
        return <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">Crashed</span>;
      default:
        return <span className="inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Process & Resources</h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 text-white bg-green-600 rounded-md">
            <Plus size={16} className="mr-2" />
            Add Process
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center text-lg font-medium">
              <Cpu size={18} className="mr-2 text-blue-500" />
              CPU Usage
            </h2>
            <span className="text-xl font-bold">{resources.cpu.used}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(resources.cpu.used / resources.cpu.limit) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-right text-gray-500">
            {resources.cpu.used} / {resources.cpu.limit} %
          </p>
          <div className="mt-4">
            <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <BarChart2 size={14} className="mr-1" />
              View CPU metrics
            </a>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center text-lg font-medium">
              <MemoryStick size={18} className="mr-2 text-purple-500" />
              Memory Usage
            </h2>
            <span className="text-xl font-bold">{resources.memory.used} MB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${(resources.memory.used / resources.memory.limit) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-right text-gray-500">
            {resources.memory.used} / {resources.memory.limit} MB
          </p>
          <div className="mt-4">
            <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <BarChart2 size={14} className="mr-1" />
              View memory metrics
            </a>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center text-lg font-medium">
              <HardDrive size={18} className="mr-2 text-green-500" />
              Disk Usage
            </h2>
            <span className="text-xl font-bold">{resources.disk.used} GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${(resources.disk.used / resources.disk.limit) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-right text-gray-500">
            {resources.disk.used} / {resources.disk.limit} GB
          </p>
          <div className="mt-4">
            <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <BarChart2 size={14} className="mr-1" />
              View disk metrics
            </a>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-medium">Running Processes</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Process
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Uptime
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  CPU
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Memory
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Command
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processes.map((process, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{process.id}</span>
                    <span className="inline-flex px-2 ml-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                      {process.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(process.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {process.uptime}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {process.cpu}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {process.memory} MB
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-500 whitespace-nowrap">
                    {process.command}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <div className="flex space-x-3">
                      {process.status === 'running' || process.status === 'starting' ? (
                        <button 
                          onClick={() => stopProcess(process.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Stop"
                        >
                          <Square size={16} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => startProcess(process.id)}
                          className="text-green-500 hover:text-green-700"
                          title="Start"
                        >
                          <Play size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => restartProcess(process.id)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Restart"
                      >
                        <RefreshCw size={16} />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-medium">Resource Allocation</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="cpu-limit" className="block mb-1 text-sm font-medium text-gray-700">
              CPU Limit (%)
            </label>
            <input
              type="range"
              id="cpu-limit"
              min="10"
              max="200"
              value={resources.cpu.limit}
              onChange={(e) => setResources({...resources, cpu: {...resources.cpu, limit: parseInt(e.target.value)}})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>10%</span>
              <span>{resources.cpu.limit}%</span>
              <span>200%</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="memory-limit" className="block mb-1 text-sm font-medium text-gray-700">
              Memory Limit (MB)
            </label>
            <input
              type="range"
              id="memory-limit"
              min="128"
              max="4096"
              step="128"
              value={resources.memory.limit}
              onChange={(e) => setResources({...resources, memory: {...resources.memory, limit: parseInt(e.target.value)}})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>128 MB</span>
              <span>{resources.memory.limit} MB</span>
              <span>4096 MB</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="disk-limit" className="block mb-1 text-sm font-medium text-gray-700">
              Disk Limit (GB)
            </label>
            <input
              type="range"
              id="disk-limit"
              min="1"
              max="20"
              value={resources.disk.limit}
              onChange={(e) => setResources({...resources, disk: {...resources.disk, limit: parseInt(e.target.value)}})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>1 GB</span>
              <span>{resources.disk.limit} GB</span>
              <span>20 GB</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md">
              Save Resource Limits
            </button>
            <p className="mt-2 text-sm text-gray-500">
              Note: Changing resource limits may cause your application to restart.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium">Auto-scaling Settings</h3>
            <div className="mt-2 space-y-4">
              <div className="flex items-center">
                <input
                  id="auto-scaling"
                  name="auto-scaling"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="auto-scaling" className="block ml-2 text-sm text-gray-900">
                  Enable auto-scaling (Premium feature)
                </label>
              </div>
              
              <div>
                <label htmlFor="min-instances" className="block mb-1 text-sm font-medium text-gray-700">
                  Minimum Instances
                </label>
                <select
                  id="min-instances"
                  name="min-instances"
                  disabled
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue="1"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="max-instances" className="block mb-1 text-sm font-medium text-gray-700">
                  Maximum Instances
                </label>
                <select
                  id="max-instances"
                  name="max-instances"
                  disabled
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue="3"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppProcesses;
