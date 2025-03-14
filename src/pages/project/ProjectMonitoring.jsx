import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart2, RefreshCw, Clock, AlertCircle, Bell, Cpu, HardDrive, Activity, Zap, Wifi, Database, Plus } from 'lucide-react';

const ProjectMonitoring = () => {
  const { projectId } = useParams();
  const [timeRange, setTimeRange] = useState('24h');
  const [showAlertForm, setShowAlertForm] = useState(false);
  
  // Mock data for monitoring metrics
  const metrics = {
    cpu: {
      current: 42,
      average: 38,
      peak: 78,
      data: [25, 30, 45, 60, 35, 25, 42, 50, 35, 40, 45, 55, 40, 35, 30, 45, 55, 65, 78, 45, 35, 40, 42]
    },
    memory: {
      current: 65,
      average: 60,
      peak: 85,
      data: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 80, 75, 70, 65, 60, 65, 70, 75, 70, 65, 60, 65, 65]
    },
    disk: {
      current: 38,
      average: 36,
      peak: 40,
      data: [30, 31, 32, 33, 34, 35, 36, 36, 37, 37, 38, 38, 38, 39, 39, 39, 40, 40, 40, 39, 39, 38, 38]
    },
    network: {
      inbound: {
        current: 2.5,
        average: 1.8,
        peak: 5.2,
        data: [1.2, 1.5, 1.8, 2.0, 2.2, 2.5, 3.0, 3.5, 4.0, 4.5, 5.2, 4.8, 4.0, 3.5, 3.0, 2.5, 2.0, 1.8, 1.5, 2.0, 2.2, 2.5, 2.5]
      },
      outbound: {
        current: 1.2,
        average: 0.9,
        peak: 2.8,
        data: [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.5, 1.8, 2.0, 2.2, 2.5, 2.8, 2.5, 2.0, 1.8, 1.5, 1.2, 1.0, 0.9, 1.0, 1.1, 1.2]
      }
    }
  };
  
  // Mock data for alerts
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: 'High CPU Usage',
      metric: 'cpu',
      threshold: 80,
      condition: 'above',
      duration: '5m',
      status: 'active',
      notifications: ['email', 'slack']
    },
    {
      id: 2,
      name: 'Memory Warning',
      metric: 'memory',
      threshold: 90,
      condition: 'above',
      duration: '10m',
      status: 'active',
      notifications: ['email']
    },
    {
      id: 3,
      name: 'Disk Space Critical',
      metric: 'disk',
      threshold: 95,
      condition: 'above',
      duration: '5m',
      status: 'inactive',
      notifications: ['email', 'sms']
    },
    {
      id: 4,
      name: 'Network Spike',
      metric: 'network.inbound',
      threshold: 8,
      condition: 'above',
      duration: '2m',
      status: 'active',
      notifications: ['slack']
    }
  ]);
  
  const handleAddAlert = (e) => {
    e.preventDefault();
    // Implementation would go here
    setShowAlertForm(false);
  };
  
  const toggleAlertStatus = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id 
        ? { ...alert, status: alert.status === 'active' ? 'inactive' : 'active' } 
        : alert
    ));
  };
  
  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  
  // Simple chart component using div heights
  const SimpleChart = ({ data, color }) => {
    const max = Math.max(...data);
    
    return (
      <div className="flex items-end h-24 space-x-1">
        {data.map((value, index) => (
          <div 
            key={index}
            className={`w-2 bg-${color}-500 rounded-t`}
            style={{ height: `${(value / max) * 100}%` }}
          ></div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Monitoring: {projectId}</h1>
        <div className="flex items-center space-x-3">
          <div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1h">Last Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            <RefreshCw size={16} className="mr-1" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      
      {/* Resource Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CPU Usage */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Cpu className="text-blue-600 mr-2" size={20} />
              <h2 className="text-lg font-semibold">CPU Usage</h2>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              metrics.cpu.current > 70 ? 'bg-red-100 text-red-800' :
              metrics.cpu.current > 50 ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {metrics.cpu.current}%
            </span>
          </div>
          
          <SimpleChart data={metrics.cpu.data} color="blue" />
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-gray-500">Current</p>
              <p className="font-medium">{metrics.cpu.current}%</p>
            </div>
            <div>
              <p className="text-gray-500">Average</p>
              <p className="font-medium">{metrics.cpu.average}%</p>
            </div>
            <div>
              <p className="text-gray-500">Peak</p>
              <p className="font-medium">{metrics.cpu.peak}%</p>
            </div>
          </div>
        </div>
        
        {/* Memory Usage */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Database className="text-purple-600 mr-2" size={20} />
              <h2 className="text-lg font-semibold">Memory Usage</h2>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              metrics.memory.current > 70 ? 'bg-red-100 text-red-800' :
              metrics.memory.current > 50 ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {metrics.memory.current}%
            </span>
          </div>
          
          <SimpleChart data={metrics.memory.data} color="purple" />
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-gray-500">Current</p>
              <p className="font-medium">{metrics.memory.current}%</p>
            </div>
            <div>
              <p className="text-gray-500">Average</p>
              <p className="font-medium">{metrics.memory.average}%</p>
            </div>
            <div>
              <p className="text-gray-500">Peak</p>
              <p className="font-medium">{metrics.memory.peak}%</p>
            </div>
          </div>
        </div>
        
        {/* Disk Usage */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <HardDrive className="text-green-600 mr-2" size={20} />
              <h2 className="text-lg font-semibold">Disk Usage</h2>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              metrics.disk.current > 70 ? 'bg-red-100 text-red-800' :
              metrics.disk.current > 50 ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {metrics.disk.current}%
            </span>
          </div>
          
          <SimpleChart data={metrics.disk.data} color="green" />
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-gray-500">Current</p>
              <p className="font-medium">{metrics.disk.current}%</p>
            </div>
            <div>
              <p className="text-gray-500">Average</p>
              <p className="font-medium">{metrics.disk.average}%</p>
            </div>
            <div>
              <p className="text-gray-500">Peak</p>
              <p className="font-medium">{metrics.disk.peak}%</p>
            </div>
          </div>
        </div>
        
        {/* Network Usage */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Wifi className="text-orange-600 mr-2" size={20} />
              <h2 className="text-lg font-semibold">Network</h2>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {metrics.network.inbound.current} MB/s
            </span>
          </div>
          
          <SimpleChart data={metrics.network.inbound.data} color="orange" />
          
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
            <div>
              <p className="text-gray-500">Inbound</p>
              <p className="font-medium">{metrics.network.inbound.current} MB/s</p>
              <p className="text-xs text-gray-400">Peak: {metrics.network.inbound.peak} MB/s</p>
            </div>
            <div>
              <p className="text-gray-500">Outbound</p>
              <p className="font-medium">{metrics.network.outbound.current} MB/s</p>
              <p className="text-xs text-gray-400">Peak: {metrics.network.outbound.peak} MB/s</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed Monitoring */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <BarChart2 className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Detailed Metrics</h2>
        </div>
        
        <div className="h-80 flex items-center justify-center border border-gray-200 rounded-lg">
          <p className="text-gray-500">Detailed metrics chart will be displayed here</p>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center">
            <Cpu size={16} className="mr-2" />
            <span>CPU</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center">
            <Database size={16} className="mr-2" />
            <span>Memory</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center">
            <HardDrive size={16} className="mr-2" />
            <span>Disk I/O</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center">
            <Wifi size={16} className="mr-2" />
            <span>Network</span>
          </button>
        </div>
      </div>
      
      {/* Container Monitoring */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Container Monitoring</h2>
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            <RefreshCw size={16} className="mr-1" />
            <span>Refresh</span>
          </button>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Container
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPU
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Memory
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Network
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uptime
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">frontend-app</div>
                <div className="text-xs text-gray-500">nginx:latest</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Running
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">15%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">128MB</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  <div>↓ 2.5 MB/s</div>
                  <div>↑ 1.2 MB/s</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">3d 5h 12m</div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">backend-api</div>
                <div className="text-xs text-gray-500">node:16</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Running
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">45%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">512MB</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  <div>↓ 0.8 MB/s</div>
                  <div>↑ 1.5 MB/s</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">3d 5h 10m</div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">database</div>
                <div className="text-xs text-gray-500">postgres:13</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Running
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">25%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">768MB</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  <div>↓ 0.2 MB/s</div>
                  <div>↑ 0.3 MB/s</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">5d 12h 45m</div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">redis-cache</div>
                <div className="text-xs text-gray-500">redis:6</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Running
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">10%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">256MB</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  <div>↓ 0.5 MB/s</div>
                  <div>↑ 0.4 MB/s</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">5d 12h 45m</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Alerts */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Bell className="text-blue-600 mr-2" size={20} />
            <h2 className="text-lg font-semibold">Monitoring Alerts</h2>
          </div>
          <button 
            onClick={() => setShowAlertForm(!showAlertForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Add Alert</span>
          </button>
        </div>
        
        {showAlertForm && (
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium mb-4">Create New Alert</h3>
            <form onSubmit={handleAddAlert}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="alertName" className="block text-sm font-medium text-gray-700 mb-1">
                    Alert Name
                  </label>
                  <input
                    type="text"
                    id="alertName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., High CPU Usage"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="metric" className="block text-sm font-medium text-gray-700 mb-1">
                    Metric
                  </label>
                  <select
                    id="metric"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="cpu">CPU Usage</option>
                    <option value="memory">Memory Usage</option>
                    <option value="disk">Disk Usage</option>
                    <option value="network.inbound">Network Inbound</option>
                    <option value="network.outbound">Network Outbound</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <select
                    id="condition"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="threshold" className="block text-sm font-medium text-gray-700 mb-1">
                    Threshold
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      id="threshold"
                      className="w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 80"
                      required
                    />
                    <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md">
                      %
                    </span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select
                    id="duration"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="1m">1 minute</option>
                    <option value="5m">5 minutes</option>
                    <option value="10m">10 minutes</option>
                    <option value="15m">15 minutes</option>
                    <option value="30m">30 minutes</option>
                    <option value="1h">1 hour</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notifications
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notifyEmail"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifyEmail" className="ml-2 block text-sm text-gray-700">
                        Email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notifySlack"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifySlack" className="ml-2 block text-sm text-gray-700">
                        Slack
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notifySMS"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifySMS" className="ml-2 block text-sm text-gray-700">
                        SMS
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAlertForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Alert
                </button>
              </div>
            </form>
          </div>
        )}
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alert Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notifications
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{alert.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {alert.metric.replace('.', ' ')} {alert.condition} {alert.threshold}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    For {alert.duration}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {alert.notifications.map((notification, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded"
                      >
                        {notification}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    alert.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {alert.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => toggleAlertStatus(alert.id)}
                      className={`${
                        alert.status === 'active' 
                          ? 'text-yellow-600 hover:text-yellow-900' 
                          : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {alert.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                    <button 
                      onClick={() => deleteAlert(alert.id)}
                      className="text-red-600 hover:text-red-900 ml-3"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {alerts.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No alerts configured. Click "Add Alert" to create one.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectMonitoring;
