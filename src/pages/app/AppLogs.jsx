import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, RefreshCw, Search, Filter, Clock } from 'lucide-react';

const AppLogs = () => {
  const { projectId, appId } = useParams();
  const [logType, setLogType] = useState('application');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock log data
  const logs = [
    { timestamp: '2023-06-15 14:32:45', level: 'INFO', message: 'Application started successfully', service: 'app' },
    { timestamp: '2023-06-15 14:32:44', level: 'INFO', message: 'Connected to database', service: 'app' },
    { timestamp: '2023-06-15 14:32:43', level: 'INFO', message: 'Loading environment variables', service: 'app' },
    { timestamp: '2023-06-15 14:30:12', level: 'WARN', message: 'High memory usage detected (75%)', service: 'system' },
    { timestamp: '2023-06-15 14:28:55', level: 'ERROR', message: 'Failed to connect to external API: timeout', service: 'app' },
    { timestamp: '2023-06-15 14:25:33', level: 'INFO', message: 'User authentication successful: user123', service: 'auth' },
    { timestamp: '2023-06-15 14:24:18', level: 'DEBUG', message: 'Processing request: GET /api/users', service: 'app' },
    { timestamp: '2023-06-15 14:22:01', level: 'INFO', message: 'Cache invalidated', service: 'cache' },
    { timestamp: '2023-06-15 14:20:45', level: 'ERROR', message: 'Database query failed: relation "users" does not exist', service: 'db' },
    { timestamp: '2023-06-15 14:18:22', level: 'INFO', message: 'Scheduled task completed: cleanup', service: 'scheduler' },
  ];

  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Application Logs: {appId}</h1>
        <div className="flex space-x-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Log Type Selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setLogType('application')}
            className={`px-4 py-2 rounded-md ${
              logType === 'application' 
                ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Application Logs
          </button>
          <button 
            onClick={() => setLogType('system')}
            className={`px-4 py-2 rounded-md ${
              logType === 'system' 
                ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            System Logs
          </button>
          <button 
            onClick={() => setLogType('access')}
            className={`px-4 py-2 rounded-md ${
              logType === 'access' 
                ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Access Logs
          </button>
          <button 
            onClick={() => setLogType('error')}
            className={`px-4 py-2 rounded-md ${
              logType === 'error' 
                ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Error Logs
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-50">
            <Clock size={16} />
            <span>Time Range</span>
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.level === 'ERROR' ? 'bg-red-100 text-red-800' : 
                      log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800' : 
                      log.level === 'INFO' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.service}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Viewer */}
      <div className="bg-gray-900 text-gray-100 rounded-lg shadow p-4 font-mono text-sm overflow-x-auto">
        <pre className="whitespace-pre-wrap">
          {filteredLogs.map((log, index) => (
            <div key={index} className={`py-1 ${
              log.level === 'ERROR' ? 'text-red-400' : 
              log.level === 'WARN' ? 'text-yellow-400' : 
              log.level === 'INFO' ? 'text-blue-400' : 
              'text-gray-400'
            }`}>
              {`[${log.timestamp}] [${log.level}] [${log.service}] ${log.message}`}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default AppLogs;
