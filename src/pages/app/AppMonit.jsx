import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart2, Activity, AlertCircle, Clock, Settings, Plus, RefreshCw, CheckCircle, XCircle, Bell, Eye, EyeOff } from 'lucide-react';

const AppMonit = () => {
  const { projectId, appId } = useParams();
  const [activeTab, setActiveTab] = useState('monitors');
  const [isLoading, setIsLoading] = useState(false);
  
  // Monitors
  const [monitors, setMonitors] = useState([
    { 
      id: 1, 
      name: 'HTTP Status Check', 
      type: 'http', 
      endpoint: `https://${appId}.example.com/health`, 
      interval: '1m', 
      status: 'healthy',
      lastCheck: '2023-06-15 14:30:45',
      enabled: true
    },
    { 
      id: 2, 
      name: 'API Response Time', 
      type: 'http', 
      endpoint: `https://api.${appId}.example.com/status`, 
      interval: '5m', 
      status: 'degraded',
      lastCheck: '2023-06-15 14:25:12',
      enabled: true
    },
    { 
      id: 3, 
      name: 'Database Connection', 
      type: 'tcp', 
      endpoint: 'internal:5432', 
      interval: '2m', 
      status: 'healthy',
      lastCheck: '2023-06-15 14:28:33',
      enabled: true
    },
    { 
      id: 4, 
      name: 'Memory Usage', 
      type: 'resource', 
      endpoint: 'memory', 
      interval: '10m', 
      status: 'critical',
      lastCheck: '2023-06-15 14:20:00',
      enabled: true
    },
    { 
      id: 5, 
      name: 'Disk Space', 
      type: 'resource', 
      endpoint: 'disk', 
      interval: '30m', 
      status: 'healthy',
      lastCheck: '2023-06-15 14:00:00',
      enabled: false
    },
  ]);
  
  // Alerts
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      monitorName: 'Memory Usage', 
      message: 'Memory usage exceeded 90% threshold', 
      timestamp: '2023-06-15 14:20:00', 
      severity: 'critical',
      acknowledged: false
    },
    { 
      id: 2, 
      monitorName: 'API Response Time', 
      message: 'Response time above 500ms threshold', 
      timestamp: '2023-06-15 14:25:12', 
      severity: 'warning',
      acknowledged: false
    },
    { 
      id: 3, 
      monitorName: 'HTTP Status Check', 
      message: 'Endpoint returned 503 status', 
      timestamp: '2023-06-14 22:15:30', 
      severity: 'critical',
      acknowledged: true
    },
    { 
      id: 4, 
      monitorName: 'Database Connection', 
      message: 'Connection timeout after 5s', 
      timestamp: '2023-06-14 18:45:10', 
      severity: 'critical',
      acknowledged: true
    },
  ]);

  const handleToggleMonitor = (monitorId) => {
    setMonitors(monitors.map(monitor => 
      monitor.id === monitorId 
        ? { ...monitor, enabled: !monitor.enabled } 
        : monitor
    ));
  };

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, acknowledged: true } 
        : alert
    ));
  };

  const handleRefreshMonitor = (monitorId) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMonitors(monitors.map(monitor => 
        monitor.id === monitorId 
          ? { 
              ...monitor, 
              lastCheck: new Date().toLocaleString(),
              status: ['healthy', 'degraded', 'critical'][Math.floor(Math.random() * 3)]
            } 
          : monitor
      ));
      setIsLoading(false);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'healthy':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Healthy</span>;
      case 'degraded':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Degraded</span>;
      case 'critical':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Critical</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'critical':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Critical</span>;
      case 'warning':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Warning</span>;
      case 'info':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Info</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Application Monitoring</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <Plus size={16} className="mr-2" />
            Add Monitor
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('monitors')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'monitors'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Activity size={16} className="mr-2" />
                Monitors
              </div>
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'alerts'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <AlertCircle size={16} className="mr-2" />
                Alerts
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Settings size={16} className="mr-2" />
                Settings
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'monitors' && (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-medium">Active Monitors</h2>
                <p className="text-sm text-gray-500">Monitors automatically check your application's health at regular intervals.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interval</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Check</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {monitors.map((monitor) => (
                      <tr key={monitor.id} className={!monitor.enabled ? 'bg-gray-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{monitor.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{monitor.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{monitor.endpoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{monitor.interval}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {monitor.enabled ? getStatusBadge(monitor.status) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Disabled</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{monitor.lastCheck}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleRefreshMonitor(monitor.id)}
                              disabled={isLoading || !monitor.enabled}
                              className={`text-blue-600 hover:text-blue-900 flex items-center ${(!monitor.enabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {isLoading ? (
                                <RefreshCw size={16} className="mr-1 animate-spin" />
                              ) : (
                                <RefreshCw size={16} className="mr-1" />
                              )}
                              Check
                            </button>
                            <button 
                              onClick={() => handleToggleMonitor(monitor.id)}
                              className="text-gray-600 hover:text-gray-900 flex items-center"
                            >
                              {monitor.enabled ? (
                                <>
                                  <EyeOff size={16} className="mr-1" />
                                  Disable
                                </>
                              ) : (
                                <>
                                  <Eye size={16} className="mr-1" />
                                  Enable
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-medium">Recent Alerts</h2>
                <p className="text-sm text-gray-500">Alerts are generated when monitors detect issues with your application.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monitor</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {alerts.map((alert) => (
                      <tr key={alert.id} className={alert.acknowledged ? 'bg-gray-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.monitorName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getSeverityBadge(alert.severity)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {alert.acknowledged ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Acknowledged</span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Active</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {!alert.acknowledged && (
                            <button 
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <CheckCircle size={16} className="mr-1" />
                              Acknowledge
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-medium">Monitoring Settings</h2>
                <p className="text-sm text-gray-500">Configure notification preferences and monitoring thresholds.</p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-md font-medium mb-3">Notification Channels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell size={16} className="mr-2 text-gray-500" />
                        <span>Email Notifications</span>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="toggle-email" className="sr-only" defaultChecked />
                        <label htmlFor="toggle-email" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell size={16} className="mr-2 text-gray-500" />
                        <span>Slack Notifications</span>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="toggle-slack" className="sr-only" defaultChecked />
                        <label htmlFor="toggle-slack" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell size={16} className="mr-2 text-gray-500" />
                        <span>SMS Notifications</span>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="toggle-sms" className="sr-only" />
                        <label htmlFor="toggle-sms" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white shadow"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-md font-medium mb-3">Alert Thresholds</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cpu-threshold" className="block text-sm font-medium text-gray-700 mb-1">CPU Usage Threshold (%)</label>
                      <input 
                        type="range" 
                        id="cpu-threshold" 
                        min="0" 
                        max="100" 
                        defaultValue="80" 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="memory-threshold" className="block text-sm font-medium text-gray-700 mb-1">Memory Usage Threshold (%)</label>
                      <input 
                        type="range" 
                        id="memory-threshold" 
                        min="0" 
                        max="100" 
                        defaultValue="90" 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="disk-threshold" className="block text-sm font-medium text-gray-700 mb-1">Disk Usage Threshold (%)</label>
                      <input 
                        type="range" 
                        id="disk-threshold" 
                        min="0" 
                        max="100" 
                        defaultValue="85" 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-md font-medium mb-3">Response Time Thresholds</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="warning-threshold" className="block text-sm font-medium text-gray-700 mb-1">Warning Threshold (ms)</label>
                        <input 
                          type="number" 
                          id="warning-threshold" 
                          defaultValue="300" 
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        />
                      </div>
                      <div>
                        <label htmlFor="critical-threshold" className="block text-sm font-medium text-gray-700 mb-1">Critical Threshold (ms)</label>
                        <input 
                          type="number" 
                          id="critical-threshold" 
                          defaultValue="500" 
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppMonit;
