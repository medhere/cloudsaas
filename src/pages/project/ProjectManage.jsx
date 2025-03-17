import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Power, RefreshCw, Settings, Archive, Trash2, AlertTriangle } from 'lucide-react';

const ProjectManage = () => {
  const { projectId } = useParams();
  const [isShutdownModalOpen, setIsShutdownModalOpen] = useState(false);
  const [isRefreshModalOpen, setIsRefreshModalOpen] = useState(false);
  
  // Mock data for backups
  const backups = [
    { id: 1, name: 'Daily Backup', date: 'Nov 15, 2023 - 02:00 AM', size: '4.2 GB', type: 'Automated' },
    { id: 2, name: 'Pre-Deployment Backup', date: 'Nov 10, 2023 - 10:15 AM', size: '4.1 GB', type: 'Manual' },
    { id: 3, name: 'Weekly Backup', date: 'Nov 8, 2023 - 02:00 AM', size: '4.0 GB', type: 'Automated' },
    { id: 4, name: 'Monthly Backup', date: 'Nov 1, 2023 - 02:00 AM', size: '3.8 GB', type: 'Automated' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Project: {projectId}</h1>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
            Running
          </span>
        </div>
      </div>
      
      {/* Server Actions */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold">Server Actions</h2>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button 
            onClick={() => setIsShutdownModalOpen(true)}
            className="flex items-center justify-center p-4 transition-colors border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200"
          >
            <Power className="mr-2 text-red-600" size={20} />
            <span className="font-medium">Shutdown</span>
          </button>
          
          <button 
            onClick={() => setIsRefreshModalOpen(true)}
            className="flex items-center justify-center p-4 transition-colors border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-200"
          >
            <RefreshCw className="mr-2 text-yellow-600" size={20} />
            <span className="font-medium">Refresh</span>
          </button>
          
          <Link to="../change-config"
             className="flex items-center justify-center p-4 transition-colors border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200"
          >
            <Settings className="mr-2 text-blue-600" size={20} />
            <span className="font-medium">Change Configuration</span>
          </Link>
        </div>
      </div>
      
      {/* Backup Management */}
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Backup Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <Archive size={16} />
            <span>Create Backup</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backups.map((backup) => (
                <tr key={backup.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{backup.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{backup.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      backup.type === 'Automated' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <button className="mr-3 text-blue-600 hover:text-blue-900">Restore</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Danger Zone */}
      <div className="p-6 bg-white border-l-4 border-red-500 rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold">Danger Zone</h2>
        
        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
          <div>
            <h3 className="font-medium text-red-800">Reset/Delete Project</h3>
            <p className="mt-1 text-sm text-red-600">
              Once you reset/delete a project, there is no going back. Please be certain.
            </p>
          </div>
          <div className='flex items-end gap-2'>
            <button className="flex items-center px-4 py-2 text-yellow-700 bg-white border border-yellow-600 rounded-md hover:bg-yellow-100">
              <Trash2 size={16} />
              <span>Reset Project</span>
            </button>
            <button className="flex items-center px-4 py-2 text-red-800 bg-white border border-red-600 rounded-md hover:bg-red-100">
              <Trash2 size={16} />
              <span>Delete Project</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Shutdown Modal */}
      {isShutdownModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4 text-red-600">
              <AlertTriangle size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Confirm Shutdown</h3>
            </div>
            <p className="mb-4 text-gray-600">
              Are you sure you want to shutdown this project? All running applications will be stopped.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsShutdownModalOpen(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Shutdown
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Refresh Modal */}
      {isRefreshModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4 text-yellow-600">
              <AlertTriangle size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Confirm Refresh</h3>
            </div>
            <p className="mb-4 text-gray-600">
              Are you sure you want to refresh this project? This will cause a brief downtime for all applications.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsRefreshModalOpen(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
              >
                Reboot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManage;
