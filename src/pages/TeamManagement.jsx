import React, { useState } from 'react';
import { UserPlus, Mail, MoreVertical, Shield, User, X, Check, Edit, ExternalLink, Search, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamManagement = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('Developer');

  // Teams you belong to
  const yourTeams = [
    { id: 1, name: 'Marketing Team', owner: 'Sarah Williams', status: 'Active', joinedDate: 'Jan 15, 2023' },
    { id: 2, name: 'Product Development', owner: 'Mike Johnson', status: 'Pending', joinedDate: 'Nov 10, 2023' },
    { id: 3, name: 'Design Team', owner: 'Alex Brown', status: 'Active', joinedDate: 'Mar 22, 2023' },
  ];

  // Team members in your team
  const teamMembers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Owner', status: 'Active', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', lastActive: '1 day ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Developer', status: 'Active', lastActive: '3 hours ago' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Developer', status: 'Active', lastActive: '5 days ago' },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Viewer', status: 'Pending', lastActive: 'Never' },
  ];

  // Search results for autocomplete
  const searchResults = [
    { id: 101, name: 'David Wilson', email: 'david@example.com', department: 'Engineering' },
    { id: 102, name: 'Emily Clark', email: 'emily@example.com', department: 'Marketing' },
    { id: 103, name: 'Daniel Lee', email: 'daniel@example.com', department: 'Product' },
    { id: 104, name: 'Olivia Martinez', email: 'olivia@example.com', department: 'Design' },
  ].filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roles = [
    { id: 'owner', name: 'Owner', description: 'Full access to all resources and billing' },
    { id: 'admin', name: 'Admin', description: 'Can manage team members and most settings' },
    { id: 'developer', name: 'Developer', description: 'Can deploy and manage projects' },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access to projects' },
  ];

  const handleOpenInviteModal = () => {
    setIsUpdateMode(false);
    setCurrentMember(null);
    setSearchQuery('');
    setSelectedRole('Developer');
    setShowInviteModal(true);
  };

  const handleOpenUpdateModal = (member) => {
    setIsUpdateMode(true);
    setCurrentMember(member);
    setSearchQuery(member.name);
    setSelectedRole(member.role);
    setShowInviteModal(true);
  };

  const handleCloseModal = () => {
    setShowInviteModal(false);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Owner':
        return <Shield size={16} className="text-purple-600" />;
      case 'Admin':
        return <Shield size={16} className="text-blue-600" />;
      case 'Developer':
        return <User size={16} className="text-green-600" />;
      case 'Viewer':
        return <User size={16} className="text-gray-600" />;
      default:
        return <User size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={handleOpenInviteModal}
        >
          <UserPlus size={18} />
          <span>Invite Member</span>
        </button>
      </div>
      
      {/* Teams You Belong To */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Teams You Belong To</h2>
          <p className="text-sm text-gray-500 mt-1">Teams that you have been invited to or are a member of</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {yourTeams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{team.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      team.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {team.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.joinedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      {team.status === 'Pending' ? (
                        <>
                          <button className="text-green-500 hover:text-green-700" title="Accept">
                            <Check size={18} />
                          </button>
                          <button className="text-red-500 hover:text-red-700" title="Reject">
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <button className="text-red-500 hover:text-red-700" title="Leave Team">
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Team Members */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your Team Members</h2>
          <p className="text-sm text-gray-500 mt-1">Manage members of your team and their access rights</p>
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
                      {getRoleIcon(member.role)}
                      <span className="text-sm text-gray-900 ml-2">{member.role}</span>
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
                      <button 
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit Member"
                        onClick={() => handleOpenUpdateModal(member)}
                      >
                        <Edit size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-blue-600" title="Send Email">
                        <Mail size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700" title="Remove Member">
                        <X size={18} />
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
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Roles and Permissions</h2>
              <p className="text-sm text-gray-500 mt-1">Learn about the different roles and their permissions</p>
            </div>
            <Link 
              to="/support" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View Documentation</span>
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Invite/Update Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {isUpdateMode ? 'Update Team Member' : 'Invite Team Member'}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Search User */}
              <div>
                <label htmlFor="search-user" className="block text-sm font-medium text-gray-700 mb-1">
                  Search User
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="search-user"
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isUpdateMode}
                  />
                </div>
                
                {/* Search Results */}
                {searchQuery && !isUpdateMode && searchResults.length > 0 && (
                  <div className="mt-1 border border-gray-200 rounded-md shadow-sm max-h-60 overflow-y-auto">
                    {searchResults.map((user) => (
                      <div 
                        key={user.id}
                        className="p-2 hover:bg-gray-50 cursor-pointer flex items-center"
                        onClick={() => {
                          setSearchQuery(user.name);
                          setCurrentMember(user);
                        }}
                      >
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-2">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email} • {user.department}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {searchQuery && !isUpdateMode && searchResults.length === 0 && (
                  <div className="mt-1 p-2 border border-gray-200 rounded-md text-sm text-gray-500 flex items-center">
                    <AlertTriangle size={16} className="text-yellow-500 mr-2" />
                    No users found matching "{searchQuery}"
                  </div>
                )}
              </div>
              
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <div 
                      key={role.id}
                      className={`border rounded-md p-3 flex items-center cursor-pointer ${
                        selectedRole === role.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedRole(role.name)}
                    >
                      <input
                        type="radio"
                        id={`role-${role.id}`}
                        name="role"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        checked={selectedRole === role.name}
                        onChange={() => setSelectedRole(role.name)}
                      />
                      <label htmlFor={`role-${role.id}`} className="ml-3 flex-1 cursor-pointer">
                        <div className="flex items-center">
                          {getRoleIcon(role.name)}
                          <span className="ml-2 font-medium">{role.name}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Custom Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a personal message to your invitation..."
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium text-white"
              >
                {isUpdateMode ? 'Update Member' : 'Send Invitation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
