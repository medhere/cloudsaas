import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Plus, Edit, Trash2, Check, X, Shield } from 'lucide-react';

const AppUsersACL = () => {
  const { projectId, appId } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Mock data for users with access control
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', permissions: ['deploy', 'restart', 'logs', 'env', 'shell'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', permissions: ['deploy', 'logs', 'env'] },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', permissions: ['logs'] },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'DevOps', permissions: ['deploy', 'restart', 'logs', 'env', 'shell', 'domains'] },
  ];

  // Available permissions
  const availablePermissions = [
    { id: 'deploy', name: 'Deployment', description: 'Can deploy new versions of the application' },
    { id: 'restart', name: 'Restart', description: 'Can restart the application' },
    { id: 'logs', name: 'View Logs', description: 'Can view application logs' },
    { id: 'env', name: 'Environment Variables', description: 'Can modify environment variables' },
    { id: 'shell', name: 'Shell Access', description: 'Can access the application shell' },
    { id: 'domains', name: 'Domain Management', description: 'Can manage application domains' },
    { id: 'ssl', name: 'SSL Management', description: 'Can manage SSL certificates' },
    { id: 'config', name: 'Configuration', description: 'Can modify application configuration' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Access Control: {appId}</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-gray-400 mr-3" />
            <h2 className="text-lg font-medium">User Permissions</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Manage which users have access to this application and what actions they can perform.
          </p>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                    user.role === 'Developer' ? 'bg-blue-100 text-blue-800' : 
                    user.role === 'DevOps' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.map(permission => (
                      <span key={permission} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permission Details */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-gray-400 mr-3" />
            <h2 className="text-lg font-medium">Available Permissions</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            These are the permissions that can be assigned to users for this application.
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {availablePermissions.map(permission => (
            <div key={permission.id} className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium text-gray-900">{permission.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{permission.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Add User Access</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">User Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  id="role"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option>Admin</option>
                  <option>Developer</option>
                  <option>DevOps</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-2">
                  {availablePermissions.map(permission => (
                    <div key={permission.id} className="flex items-center">
                      <input
                        id={`permission-${permission.id}`}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`permission-${permission.id}`} className="ml-2 block text-sm text-gray-900">
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppUsersACL;
