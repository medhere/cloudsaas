import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Power, RefreshCw, Settings, Archive, Trash2, AlertTriangle } from 'lucide-react';

const ProjectManage = () => {
  const { projectId } = useParams();
  const [isShutdownModalOpen, setIsShutdownModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  
  // Mock data for backups
  const backups = [
    { id: 1, name: 'Daily Backup', date: 'Nov 15, 2023 - 02:00 AM', size: '4.2 GB', type: 'Automated' },
    { id: 2, name: 'Pre-Deployment Backup', date: 'Nov 10, 2023 - 10:15 AM', size: '4.1 GB', type: 'Manual' },
    { id: 3, name: 'Weekly Backup', date: 'Nov 8, 2023 - 02:00 AM', size: '4.0 GB', type: 'Automated' },
    { id: 4, name: 'Monthly Backup', date: 'Nov 1, 2023 - 02:00 AM', size: '3.8 GB', type: 'Automated' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Project: {projectId}</h1>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
            Running
          </span>
        </div>
      </div>
      
      {/* Server Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Server Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setIsShutdownModalOpen(true)}
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
          >
            <Power className="text-red-600 mr-2" size={20} />
            <span className="font-medium">Shutdown Server</span>
          </button>
          
          <button 
            onClick={() => setIsResetModalOpen(true)}
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-200 transition-colors"
          >
            <RefreshCw className="text-yellow-600 mr-2" size={20} />
            <span className="font-medium">Reboot Server</span>
          </button>
          
          <button 
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <Settings className="text-blue-600 mr-2" size={20} />
            <span className="font-medium">Change Configuration</span>
          </button>
        </div>
      </div>
      
      {/* Backup Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Backup Management</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Archive size={16} />
            <span>Create Backup</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Restore</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
        <h2 className="text-lg font-semibold mb-4">Danger Zone</h2>
        
        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
          <div>
            <h3 className="font-medium text-red-800">Delete Project</h3>
            <p className="text-sm text-red-600 mt-1">
              Once you delete a project, there is no going back. Please be certain.
            </p>
          </div>
          <button className="bg-white text-red-600 border border-red-300 hover:bg-red-50 px-4 py-2 rounded-md flex items-center gap-2">
            <Trash2 size={16} />
            <span>Delete Project</span>
          </button>
        </div>
      </div>
      
      {/* Shutdown Modal */}
      {isShutdownModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center text-red-600 mb-4">
              <AlertTriangle size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Confirm Shutdown</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to shutdown this server? All running applications will be stopped.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsShutdownModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Shutdown
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Reset Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center text-yellow-600 mb-4">
              <AlertTriangle size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Confirm Reboot</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to reboot this server? This will cause a brief downtime for all applications.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
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
