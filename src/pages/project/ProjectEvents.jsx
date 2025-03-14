import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, RefreshCw, Filter, Download, Calendar, Clock, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';

const ProjectEvents = () => {
  const { projectId } = useParams();
  const [selectedLogType, setSelectedLogType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  
  // Mock data for event logs
  const [eventLogs, setEventLogs] = useState([
    { 
      id: 1, 
      timestamp: '2023-10-20T14:32:15Z', 
      type: 'system', 
      severity: 'info',
      source: 'system',
      message: 'Server started successfully',
    },
    { 
      id: 2, 
      timestamp: '2023-10-20T14:35:22Z', 
      type: 'docker', 
      severity: 'info',
      source: 'docker-daemon',
      message: 'Container frontend-app started (container-id: abc123)',
    },
    { 
      id: 3, 
      timestamp: '2023-10-20T15:12:45Z', 
      type: 'application', 
      severity: 'warning',
      source: 'backend-api',
      message: 'High memory usage detected (85%)',
    },
    { 
      id: 4, 
      timestamp: '2023-10-20T15:45:10Z', 
      type: 'security', 
      severity: 'error',
      source: 'auth-service',
      message: 'Failed login attempt from IP 192.168.1.105',
    },
    { 
      id: 5, 
      timestamp: '2023-10-20T16:02:33Z', 
      type: 'docker', 
      severity: 'info',
      source: 'docker-daemon',
      message: 'Image pulled: nginx:latest',
    },
    { 
      id: 6, 
      timestamp: '2023-10-20T16:15:20Z', 
      type: 'system', 
      severity: 'error',
      source: 'disk-monitor',
      message: 'Low disk space warning: /var/lib/docker (15% remaining)',
    },
    { 
      id: 7, 
      timestamp: '2023-10-20T16:30:05Z', 
      type: 'application', 
      severity: 'info',
      source: 'database',
      message: 'Database backup completed successfully',
    },
    { 
      id: 8, 
      timestamp: '2023-10-20T16:45:12Z', 
      type: 'security', 
      severity: 'warning',
      source: 'firewall',
      message: 'Multiple connection attempts blocked from IP 203.0.113.45',
    },
    { 
      id: 9, 
      timestamp: '2023-10-20T17:01:30Z', 
      type: 'docker', 
      severity: 'error',
      source: 'container:cache-service',
      message: 'Container exited with code 137 (OOM)',
    },
    { 
      id: 10, 
      timestamp: '2023-10-20T17:15:22Z', 
      type: 'system', 
      severity: 'info',
      source: 'update-service',
      message: 'System updates available: security patches (5)',
    },
  ]);
  
  // Filter logs based on selected type and severity
  const filteredLogs = eventLogs.filter(log => {
    const typeMatch = selectedLogType === 'all' || log.type === selectedLogType;
    const severityMatch = selectedSeverity === 'all' || log.severity === selectedSeverity;
    return typeMatch && severityMatch;
  });
  
  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  // Get icon based on severity
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'info':
        return <Info size={16} className="text-blue-500" />;
      case 'warning':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'error':
        return <XCircle size={16} className="text-red-500" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Info size={16} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events Log: {projectId}</h1>
        <div className="flex items-center space-x-3">
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            <RefreshCw size={16} className="mr-1" />
            <span>Refresh</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Download size={18} />
            <span>Export Logs</span>
          </button>
        </div>
      </div>
      
      {/* Log Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Filter className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Filter Logs</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="logType" className="block text-sm font-medium text-gray-700 mb-1">
              Log Type
            </label>
            <select
              id="logType"
              value={selectedLogType}
              onChange={(e) => setSelectedLogType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="system">System</option>
              <option value="docker">Docker</option>
              <option value="application">Application</option>
              <option value="security">Security</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
              Severity
            </label>
            <select
              id="severity"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="success">Success</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <select
              id="timeRange"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1h">Last Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d" selected>Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Logs
          </label>
          <input
            type="text"
            id="search"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by keyword, source, or message..."
          />
        </div>
      </div>
      
      {/* Log Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <FileText className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Log Summary</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Events</p>
            <p className="text-2xl font-medium">{eventLogs.length}</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-500">Info</p>
            <p className="text-2xl font-medium">
              {eventLogs.filter(log => log.severity === 'info').length}
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-500">Warnings</p>
            <p className="text-2xl font-medium">
              {eventLogs.filter(log => log.severity === 'warning').length}
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-500">Errors</p>
            <p className="text-2xl font-medium">
              {eventLogs.filter(log => log.severity === 'error').length}
            </p>
          </div>
        </div>
      </div>
      
      {/* Event Logs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Event Logs</h2>
          <div className="text-sm text-gray-500">
            Showing {filteredLogs.length} of {eventLogs.length} logs
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className={`hover:bg-gray-50 ${
                  log.severity === 'error' ? 'bg-red-50' : 
                  log.severity === 'warning' ? 'bg-yellow-50' : ''
                }`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatTimestamp(log.timestamp)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.type === 'system' ? 'bg-purple-100 text-purple-800' :
                      log.type === 'docker' ? 'bg-blue-100 text-blue-800' :
                      log.type === 'application' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getSeverityIcon(log.severity)}
                      <span className={`ml-1.5 text-sm ${
                        log.severity === 'info' ? 'text-blue-500' :
                        log.severity === 'warning' ? 'text-yellow-500' :
                        log.severity === 'error' ? 'text-red-500' :
                        'text-green-500'
                      }`}>
                        {log.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.source}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{log.message}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLogs.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No logs found matching your filters.
          </div>
        )}
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLogs.length}</span> of <span className="font-medium">{filteredLogs.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Log Management Tips */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Log Management Tips</h2>
        <div className="space-y-4 text-sm text-gray-700">
          <p>
            <strong>Regular Monitoring:</strong> Check logs regularly to identify potential issues before they become critical.
          </p>
          <p>
            <strong>Log Rotation:</strong> Configure log rotation to prevent logs from consuming too much disk space.
          </p>
          <p>
            <strong>Alert Configuration:</strong> Set up alerts for critical errors to receive notifications when important issues occur.
          </p>
          <p>
            <strong>Log Aggregation:</strong> Consider using a log aggregation tool for more advanced log analysis and visualization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectEvents;
