import React from 'react';
import { Filter, Download, RefreshCw } from 'lucide-react';

const ActivityLogs = () => {
  const activities = [
    { id: 1, user: 'John Doe', action: 'Deployed project', target: 'E-commerce Platform', timestamp: '2023-11-25 14:32:45', ip: '192.168.1.1' },
    { id: 2, user: 'Jane Smith', action: 'Created project', target: 'Mobile Backend', timestamp: '2023-11-24 09:15:22', ip: '192.168.1.2' },
    { id: 3, user: 'John Doe', action: 'Updated settings', target: 'API Server', timestamp: '2023-11-23 16:45:10', ip: '192.168.1.1' },
    { id: 4, user: 'Mike Johnson', action: 'Added team member', target: 'Sarah Williams', timestamp: '2023-11-22 11:20:33', ip: '192.168.1.3' },
    { id: 5, user: 'Jane Smith', action: 'Changed billing plan', target: 'Pro Plan', timestamp: '2023-11-21 13:55:18', ip: '192.168.1.2' },
    { id: 6, user: 'John Doe', action: 'Generated API key', target: 'Production API Key', timestamp: '2023-11-20 10:12:45', ip: '192.168.1.1' },
    { id: 7, user: 'Sarah Williams', action: 'Deleted project', target: 'Test Project', timestamp: '2023-11-19 15:30:22', ip: '192.168.1.4' },
    { id: 8, user: 'Mike Johnson', action: 'Updated environment variables', target: 'Marketing Website', timestamp: '2023-11-18 09:45:11', ip: '192.168.1.3' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Activity Logs</h1>
        <div className="flex items-center gap-2">
          <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
            <RefreshCw size={18} />
          </button>
          <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
            <Filter size={18} />
          </button>
          <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
            <Download size={18} />
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div>
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>All Users</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Mike Johnson</option>
                <option>Sarah Williams</option>
              </select>
            </div>
            
            <div>
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>All Actions</option>
                <option>Deployed project</option>
                <option>Created project</option>
                <option>Updated settings</option>
                <option>Added team member</option>
                <option>Changed billing plan</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-xs">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{activity.user}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.target}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 8 of 256 activities
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
