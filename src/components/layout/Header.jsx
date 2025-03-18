import React, { useState } from 'react';
import { Bell, Search, HelpCircle, AlertTriangle } from 'lucide-react';
import FullScreenModal from '../FullScreenModal';
import Documentation from '../../pages/Documentation';

const Header = () => {
  const [showDocumentationModal, setShowDocumentationModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowDocumentationModal(true)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <HelpCircle size={20} className="text-gray-600" />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowActivityModal(true)}
            className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
            3
          </span>
        </div>
      </div>
      {showDocumentationModal && (
        <FullScreenModal width={50} child={<Documentation />} header="Documentation" onClose={() => setShowDocumentationModal(false)} />
      )}

      {showActivityModal && (
        <FullScreenModal width={50} child={<Activties />} header="Activties" onClose={() => setShowActivityModal(false)} />
      )}

    </header>
  );
};


const Activties = () => {
  const activities = [
    { id: 1, action: 'Deployed project', target: 'E-commerce Platform' },
    { id: 2, action: 'Created project', target: 'Mobile Backend' },
    { id: 3, action: 'Updated settings', target: 'API Server' },
    { id: 4, action: 'Added team member', target: 'Sarah Williams' },
    { id: 5, action: 'Changed billing plan', target: 'Pro Plan' },
    { id: 6, action: 'Generated API key', target: 'Production API Key' },
    { id: 7, action: 'Deleted project', target: 'Test Project' },
    { id: 8, action: 'Updated environment variables', target: 'Marketing Website' }
  ];

  const alerts = [
    { id: 1, type: 'red', header: 'High CPU usage on "API Server"' },
    { id: 2, type: 'yellow', header: 'Storage limit approaching' }
  ];

  return (
    <div className="space-y-6">
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <h2 className="m-4 mb-1 text-lg font-semibold">Activity Logs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Header;
