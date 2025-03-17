import React, { useState } from 'react';
import { UserPlus, Mail, Shield, User, X, Check, Edit, ExternalLink, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TeamManagement = () => {
  const navigate = useNavigate();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

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

  const handleOpenInvitePage = () => {
    navigate('./invite');
  };

  const handleOpenUpdateModal = (member) => {
    setIsUpdateMode(true);
    setCurrentMember(member);
    navigate('/team/invite', { state: { isUpdateMode: true, member } });
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={handleOpenInvitePage}
        >
          <UserPlus size={18} />
          <span>Invite Member</span>
        </button>
      </div>
      
      {/* Teams You Belong To */}
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Teams You Belong To</h2>
          <p className="mt-1 text-sm text-gray-500">Teams that you have been invited to or are a member of</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Team Name
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Owner
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Joined Date
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
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
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {team.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      team.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {team.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {team.joinedDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
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
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your Team Members</h2>
          <p className="mt-1 text-sm text-gray-500">Manage members of your team and their access rights</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 font-medium text-gray-600 bg-gray-200 rounded-full">
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
                      <span className="ml-2 text-sm text-gray-900">{member.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {member.lastActive}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
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
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Roles and Permissions</h2>
              <p className="mt-1 text-sm text-gray-500">Learn about the different roles and their permissions</p>
            </div>
            <Link 
              to="/support" 
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <span>View Documentation</span>
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
