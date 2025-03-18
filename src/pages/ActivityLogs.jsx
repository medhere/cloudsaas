import React from 'react';
import { Filter, Download, RefreshCw, AlertTriangle } from 'lucide-react';

const ActivityLogs = () => {
  const activities = [
    { id: 1, user: 'John Doe', action: 'Deployed project', target: 'E-commerce Platform', timestamp: '2023-11-25 14:32:45' },
    { id: 2, user: 'Jane Smith', action: 'Created project', target: 'Mobile Backend', timestamp: '2023-11-24 09:15:22' },
    { id: 3, user: 'John Doe', action: 'Updated settings', target: 'API Server', timestamp: '2023-11-23 16:45:10' },
    { id: 4, user: 'Mike Johnson', action: 'Added team member', target: 'Sarah Williams', timestamp: '2023-11-22 11:20:33' },
    { id: 5, user: 'Jane Smith', action: 'Changed billing plan', target: 'Pro Plan', timestamp: '2023-11-21 13:55:18' },
    { id: 6, user: 'John Doe', action: 'Generated API key', target: 'Production API Key', timestamp: '2023-11-20 10:12:45' },
    { id: 7, user: 'Sarah Williams', action: 'Deleted project', target: 'Test Project', timestamp: '2023-11-19 15:30:22' },
    { id: 8, user: 'Mike Johnson', action: 'Updated environment variables', target: 'Marketing Website', timestamp: '2023-11-18 09:45:11' },
  ];

  const alerts = [
    { id: 1, type: 'red', header: 'High CPU usage on "API Server"', info: 'CPU usage has been above 90% for 15 minutes', created_at: '24/04/2005' },
    { id: 2, type: 'yellow', header: 'Storage limit approaching', info: 'Project "CMS" is at 85% of storage limit', created_at: '24/04/2005' },
    { id: 3, type: '', header: '', info: '', created_at: '24/04/2005' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold">Activity Logs and Alerts</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100">
            <RefreshCw size={18} />
          </button>
          <button className="p-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100">
            <Filter size={18} />
          </button>
          <button className="p-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <h2 className="m-4 mb-1 text-lg font-semibold">Activity Logs</h2>
        <div className="flex flex-col gap-4 p-4 border-b border-gray-200 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <select className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>All Users</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Mike Johnson</option>
                <option>Sarah Williams</option>
              </select>
            </div>

            <div>
              <select className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
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
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Target
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {activity.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-600 bg-gray-200 rounded-full">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{activity.user}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {activity.target}
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
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold">Alerts</h2>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 border-l-4 border-${alert.type || 'gray'}-500 rounded bg-${alert.type || 'gray'}-50`}>
              <div className="flex">
                <AlertTriangle className={`mr-3 text-${alert.type || 'gray'}-500`} size={20} />
                <div>
                  <p className={`text-sm font-medium text-${alert.type || 'gray'}-800`}>High CPU usage on "API Server"</p>
                  <p className={`mt-1 text-xs text-${alert.type || 'gray'}-700`}>CPU usage has been above 90% for 15 minutes</p>
                  <p className='pt-1 text-xs font-medium'>Date-time: {alert.created_at}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
