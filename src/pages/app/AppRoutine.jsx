import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Trash2, RefreshCw, Clock, AlertTriangle, CheckCircle, XCircle, Calendar, BarChart2, Globe, List } from 'lucide-react';

const AppRoutine = () => {
  const { projectId, appId } = useParams();
  const [activeTab, setActiveTab] = useState('cleanup');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Cleanup tasks
  const [cleanupTasks, setCleanupTasks] = useState([
    { id: 1, name: 'Clear temporary files', schedule: 'Daily', lastRun: '2023-06-15 14:30', status: 'success' },
    { id: 2, name: 'Prune Docker images', schedule: 'Weekly', lastRun: '2023-06-10 08:15', status: 'success' },
    { id: 3, name: 'Rotate logs', schedule: 'Daily', lastRun: '2023-06-15 00:00', status: 'success' },
    { id: 4, name: 'Remove old backups', schedule: 'Monthly', lastRun: '2023-06-01 03:00', status: 'failed' },
  ]);
  
  // App events
  const [appEvents, setAppEvents] = useState([
    { id: 1, type: 'deployment', description: 'Application deployed successfully', timestamp: '2023-06-15 10:23:45', status: 'success' },
    { id: 2, type: 'restart', description: 'Application restarted', timestamp: '2023-06-14 15:30:12', status: 'success' },
    { id: 3, type: 'config', description: 'Environment variables updated', timestamp: '2023-06-13 09:15:00', status: 'success' },
    { id: 4, type: 'error', description: 'Application crashed due to memory limit', timestamp: '2023-06-12 22:45:30', status: 'error' },
  ]);
  
  // App URLs
  const [appUrls, setAppUrls] = useState([
    { id: 1, url: `https://${appId}.example.com`, primary: true, status: 'active' },
    { id: 2, url: `https://api.${appId}.example.com`, primary: false, status: 'active' },
    { id: 3, url: `https://staging.${appId}.example.com`, primary: false, status: 'active' },
    { id: 4, url: `https://dev.${appId}.example.com`, primary: false, status: 'inactive' },
  ]);

  const handleRunCleanup = (taskId) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCleanupTasks(tasks => 
        tasks.map(task => 
          task.id === taskId 
            ? { ...task, lastRun: new Date().toLocaleString(), status: 'success' } 
            : task
        )
      );
      setIsLoading(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }, 1500);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'error':
      case 'failed':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <AlertTriangle size={16} className="text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Routine Tasks</h1>
        {showSuccessMessage && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center">
            <CheckCircle size={16} className="mr-2" />
            Task executed successfully
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('cleanup')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'cleanup'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Trash2 size={16} className="mr-2" />
                Cleanup Tasks
              </div>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'events'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                App Events
              </div>
            </button>
            <button
              onClick={() => setActiveTab('urls')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'urls'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Globe size={16} className="mr-2" />
                App URLs
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'cleanup' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-medium">Scheduled Cleanup Tasks</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                  <RefreshCw size={16} className="mr-2" />
                  Run All Tasks
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cleanupTasks.map((task) => (
                      <tr key={task.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-gray-400" />
                            {task.schedule}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.lastRun}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            {getStatusIcon(task.status)}
                            <span className="ml-2 capitalize">{task.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => handleRunCleanup(task.id)}
                            disabled={isLoading}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            {isLoading ? (
                              <RefreshCw size={16} className="mr-1 animate-spin" />
                            ) : (
                              <RefreshCw size={16} className="mr-1" />
                            )}
                            Run Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-medium">Recent Application Events</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appEvents.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{event.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            {getStatusIcon(event.status)}
                            <span className="ml-2 capitalize">{event.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'urls' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-medium">Application URLs</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                  <Globe size={16} className="mr-2" />
                  Add New URL
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appUrls.map((url) => (
                      <tr key={url.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          <a href={url.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {url.url}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {url.primary ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Primary
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Secondary
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {url.status === 'active' ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-3">
                            <button className="text-blue-600 hover:text-blue-900">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppRoutine;
