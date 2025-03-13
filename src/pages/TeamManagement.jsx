import React from 'react';
import { UserPlus, Mail, MoreVertical, Shield, User } from 'lucide-react';

const TeamManagement = () => {
  const teamMembers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Owner', status: 'Active', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', lastActive: '1 day ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Developer', status: 'Active', lastActive: '3 hours ago' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Developer', status: 'Active', lastActive: '5 days ago' },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Viewer', status: 'Pending', lastActive: 'Never' },
  ];

  const roles = [
    { name: 'Owner', description: 'Full access to all resources and billing', icon: <Shield size={16} className="text-purple-600" /> },
    { name: 'Admin', description: 'Can manage team members and most settings', icon: <Shield size={16} className="text-blue-600" /> },
    { name: 'Developer', description: 'Can deploy and manage projects', icon: <User size={16} className="text-green-600" /> },
    { name: 'Viewer', description: 'Read-only access to projects', icon: <User size={16} className="text-gray-600" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <UserPlus size={18} />
          <span>Invite Member</span>
        </button>
      </div>
      
      {/* Team Members */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Team Members</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your team members and their access rights</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {member.role === 'Owner' && <Shield size={16} className="text-purple-600 mr-2" />}
                      {member.role === 'Admin' && <Shield size={16} className="text-blue-600 mr-2" />}
                      {member.role === 'Developer' && <User size={16} className="text-green-600 mr-2" />}
                      {member.role === 'Viewer' && <User size={16} className="text-gray-600 mr-2" />}
                      <span className="text-sm text-gray-900">{member.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600">
                        <Mail size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Roles and Permissions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Roles and Permissions</h2>
          <p className="text-sm text-gray-500 mt-1">Learn about the different roles and their permissions</p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div key={role.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                {role.icon}
                <h3 className="text-md font-medium ml-2">{role.name}</h3>
              </div>
              <p className="text-sm text-gray-500">{role.description}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${role.name === 'Viewer' ? 'bg-gray-300' : 'bg-green-500'} mr-2`}></div>
                  <span className="text-sm">View projects and deployments</span>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${role.name === 'Viewer' ? 'bg-gray-300' : 'bg-green-500'} mr-2`}></div>
                  <span className="text-sm">Access logs and analytics</span>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${['Developer', 'Admin', 'Owner'].includes(role.name) ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></div>
                  <span className="text-sm">Deploy projects</span>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${['Admin', 'Owner'].includes(role.name) ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></div>
                  <span className="text-sm">Manage team members</span>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${role.name === 'Owner' ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></div>
                  <span className="text-sm">Billing and subscription</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
