import React from 'react';
import { Shield, Key, Clock, Lock } from 'lucide-react';

const Security = () => {
  const loginHistory = [
    { id: 1, date: 'Nov 25, 2023 14:32:45', ip: '192.168.1.1', location: 'San Francisco, CA', device: 'Chrome on macOS' },
    { id: 2, date: 'Nov 24, 2023 09:15:22', ip: '192.168.1.1', location: 'San Francisco, CA', device: 'Safari on iOS' },
    { id: 3, date: 'Nov 22, 2023 16:45:10', ip: '192.168.1.1', location: 'San Francisco, CA', device: 'Chrome on macOS' },
    { id: 4, date: 'Nov 20, 2023 11:20:33', ip: '192.168.1.1', location: 'San Francisco, CA', device: 'Firefox on Windows' },
  ];

  const sshKeys = [
    { id: 1, name: 'MacBook Pro', fingerprint: 'SHA256:uNgZ5...', added: 'Oct 15, 2023' },
    { id: 2, name: 'Work Laptop', fingerprint: 'SHA256:pQrS7...', added: 'Sep 10, 2023' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Security</h1>
      
      {/* Two-Factor Authentication */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-start">
          <div className="p-3 bg-blue-100 rounded-full mr-4">
            <Shield className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            
            <div className="p-4 border border-green-200 bg-green-50 rounded-md flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-green-800">Two-factor authentication is enabled</span>
              </div>
              <button className="text-sm text-red-600 hover:text-red-800">
                Disable
              </button>
            </div>
            
            <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Recovery Codes</h3>
              <p className="text-sm text-gray-500 mb-3">
                Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View recovery codes
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* SSH Keys */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-start">
          <div className="p-3 bg-purple-100 rounded-full mr-4">
            <Key className="text-purple-600" size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">SSH Keys</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage SSH keys to securely deploy to your projects.
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-md">
                Add New Key
              </button>
            </div>
            
            {sshKeys.length > 0 ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fingerprint
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sshKeys.map((key) => (
                      <tr key={key.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {key.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {key.fingerprint}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {key.added}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-red-600 hover:text-red-800">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 border border-gray-200 rounded-lg">
                <p className="text-gray-500">No SSH keys added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Login History */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-start">
          <div className="p-3 bg-green-100 rounded-full mr-4">
            <Clock className="text-green-600" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4">Login History</h2>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Device
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loginHistory.map((login) => (
                    <tr key={login.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {login.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {login.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {login.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {login.device}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-800">
              View full login history
            </button>
          </div>
        </div>
      </div>
      
      {/* Password */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-start">
          <div className="p-3 bg-red-100 rounded-full mr-4">
            <Lock className="text-red-600" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4">Password</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
