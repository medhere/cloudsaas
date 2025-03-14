import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, AlertTriangle, Shield, User, X, Check, Wallet, CreditCard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const TeamInvite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdateMode = location.state?.isUpdateMode || false;
  const memberToUpdate = location.state?.member || null;

  const [searchQuery, setSearchQuery] = useState(isUpdateMode ? memberToUpdate?.name || '' : '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState(isUpdateMode ? [memberToUpdate] : []);
  const [currentMember, setCurrentMember] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Developer');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [totalPrice, setTotalPrice] = useState(0);

  // Search results for autocomplete
  const searchResults = [
    { id: 101, name: 'David Wilson', email: 'david@example.com', department: 'Engineering' },
    { id: 102, name: 'Emily Clark', email: 'emily@example.com', department: 'Marketing' },
    { id: 103, name: 'Daniel Lee', email: 'daniel@example.com', department: 'Product' },
    { id: 104, name: 'Olivia Martinez', email: 'olivia@example.com', department: 'Design' },
    { id: 105, name: 'Robert Johnson', email: 'robert@example.com', department: 'Sales' },
    { id: 106, name: 'Sophia Brown', email: 'sophia@example.com', department: 'Customer Support' },
    { id: 107, name: 'William Davis', email: 'william@example.com', department: 'Finance' },
    { id: 108, name: 'Emma Taylor', email: 'emma@example.com', department: 'HR' },
  ].filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Available projects
  const availableProjects = [
    { id: 1, name: 'Web Application', description: 'Main customer-facing web app' },
    { id: 2, name: 'Mobile API', description: 'Backend API for mobile applications' },
    { id: 3, name: 'Admin Dashboard', description: 'Internal admin tools' },
    { id: 4, name: 'Analytics Platform', description: 'Data analytics and reporting' },
    { id: 5, name: 'Marketing Website', description: 'Public marketing website' },
  ];

  // Available menu permissions
  const availableMenus = [
    { id: 'dashboard', name: 'Dashboard', description: 'View main dashboard' },
    { id: 'projects', name: 'Projects', description: 'Access and manage projects' },
    { id: 'team', name: 'Team', description: 'Manage team members' },
    { id: 'analytics', name: 'Analytics', description: 'View analytics data' },
    { id: 'activity', name: 'Activity', description: 'View activity logs' },
    { id: 'billing', name: 'Billing', description: 'Access billing information' },
    { id: 'settings', name: 'Settings', description: 'Change account settings' },
    { id: 'security', name: 'Security', description: 'Manage security settings' },
    { id: 'support', name: 'Support', description: 'Access support resources' },
  ];

  // Roles
  const roles = [
    { id: 'owner', name: 'Owner', description: 'Full access to all resources and billing' },
    { id: 'admin', name: 'Admin', description: 'Can manage team members and most settings' },
    { id: 'developer', name: 'Developer', description: 'Can deploy and manage projects' },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access to projects' },
  ];

  // Payment methods
  const savedPaymentMethods = [
    { id: 1, type: 'card', last4: '4242', brand: 'visa', expiry: '12/2025' },
    { id: 2, type: 'card', last4: '1234', brand: 'mastercard', expiry: '10/2024' },
  ];

  // Calculate total price based on number of members
  useEffect(() => {
    const basePrice = 5; // Base price per member
    const totalMembers = selectedMembers.length;
    
    // Each member increments by $1
    let calculatedPrice = 0;
    for (let i = 0; i < totalMembers; i++) {
      calculatedPrice += basePrice + i;
    }
    
    setTotalPrice(calculatedPrice);
  }, [selectedMembers]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(query.length >= 5);
  };

  // Handle selecting a user from dropdown
  const handleSelectUser = (user) => {
    setCurrentMember(user);
    setShowPermissionModal(true);
    setShowDropdown(false);
  };

  // Handle adding a member after permission selection
  const handleAddMember = () => {
    if (currentMember) {
      const memberWithPermissions = {
        ...currentMember,
        role: selectedRole,
        projects: [...selectedProjects],
        menus: [...selectedMenus]
      };
      
      // Check if member already exists
      const exists = selectedMembers.some(member => member.id === currentMember.id);
      
      if (!exists) {
        setSelectedMembers([...selectedMembers, memberWithPermissions]);
      } else {
        // Update existing member
        setSelectedMembers(selectedMembers.map(member => 
          member.id === currentMember.id ? memberWithPermissions : member
        ));
      }
      
      setShowPermissionModal(false);
      setCurrentMember(null);
      setSelectedRole('Developer');
      setSelectedProjects([]);
      setSelectedMenus([]);
      setSearchQuery('');
    }
  };

  // Handle removing a member
  const handleRemoveMember = (memberId) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== memberId));
  };

  // Handle project selection
  const handleProjectToggle = (projectId) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  // Handle menu permission selection
  const handleMenuToggle = (menuId) => {
    if (selectedMenus.includes(menuId)) {
      setSelectedMenus(selectedMenus.filter(id => id !== menuId));
    } else {
      setSelectedMenus([...selectedMenus, menuId]);
    }
  };

  // Get role icon
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
      <div className="flex items-center gap-4">
        <Link to="/team" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">
          {isUpdateMode ? 'Update Team Member' : 'Invite Team Members'}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Search Section */}
          {!isUpdateMode && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Search Users</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search by name or email (min 5 characters)"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              
              {/* Search Results Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div className="mt-2 border border-gray-200 rounded-md shadow-sm max-h-60 overflow-y-auto">
                  {searchResults.map((user) => (
                    <div 
                      key={user.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer flex items-center border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSelectUser(user)}
                    >
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email} • {user.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {showDropdown && searchResults.length === 0 && (
                <div className="mt-2 p-3 border border-gray-200 rounded-md text-sm text-gray-500 flex items-center">
                  <AlertTriangle size={16} className="text-yellow-500 mr-2" />
                  No users found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
          
          {/* Selected Members */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">
              {isUpdateMode ? 'Member Details' : 'Selected Members'}
            </h2>
            
            {selectedMembers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {isUpdateMode ? 'No member selected' : 'No members selected yet'}
              </div>
            ) : (
              <div className="space-y-4">
                {selectedMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <div className="flex items-center mt-1">
                          {getRoleIcon(member.role)}
                          <span className="text-sm ml-1">{member.role}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setCurrentMember(member);
                          setSelectedRole(member.role);
                          setSelectedProjects(member.projects || []);
                          setSelectedMenus(member.menus || []);
                          setShowPermissionModal(true);
                        }}
                      >
                        Edit
                      </button>
                      
                      {!isUpdateMode && (
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Billing Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h2 className="text-lg font-medium mb-4">Billing Summary</h2>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Members:</span>
                  <span className="font-medium">{selectedMembers.length}</span>
                </div>
                
                {selectedMembers.map((member, index) => (
                  <div key={member.id} className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">{member.name}</span>
                    <span className="text-gray-700">${5 + index}.00/month</span>
                  </div>
                ))}
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total:</span>
                  <span>${totalPrice}.00/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  You will be charged immediately and on a monthly basis.
                </p>
              </div>
              
              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="font-medium">Payment Method</h3>
                
                <div 
                  className={`flex items-center p-3 border rounded-md cursor-pointer ${
                    paymentMethod === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <input
                    type="radio"
                    id="wallet"
                    name="payment"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="wallet" className="ml-3 flex items-center cursor-pointer flex-1">
                    <Wallet size={18} className="text-blue-600 mr-2" />
                    <div>
                      <p className="font-medium">Wallet Balance</p>
                      <p className="text-sm text-gray-500">$250.00 available</p>
                    </div>
                  </label>
                </div>
                
                {savedPaymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className={`flex items-center p-3 border rounded-md cursor-pointer ${
                      paymentMethod === `card-${method.id}` ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod(`card-${method.id}`)}
                  >
                    <input
                      type="radio"
                      id={`card-${method.id}`}
                      name="payment"
                      checked={paymentMethod === `card-${method.id}`}
                      onChange={() => setPaymentMethod(`card-${method.id}`)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={`card-${method.id}`} className="ml-3 flex items-center cursor-pointer flex-1">
                      <CreditCard size={18} className="text-blue-600 mr-2" />
                      <div>
                        <p className="font-medium">
                          {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last4}
                        </p>
                        <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                      </div>
                    </label>
                  </div>
                ))}
                
                <div 
                  className={`flex items-center p-3 border rounded-md cursor-pointer ${
                    paymentMethod === 'new-card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('new-card')}
                >
                  <input
                    type="radio"
                    id="new-card"
                    name="payment"
                    checked={paymentMethod === 'new-card'}
                    onChange={() => setPaymentMethod('new-card')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="new-card" className="ml-3 cursor-pointer">
                    <p className="font-medium">Add new payment method</p>
                  </label>
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  className={`w-full py-2 px-4 rounded-md font-medium ${
                    selectedMembers.length > 0
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={selectedMembers.length === 0}
                >
                  {isUpdateMode ? 'Update Member' : 'Invite Members'}
                </button>
                
                <button 
                  className="w-full mt-3 py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
                  onClick={() => navigate('/team')}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Permission Modal */}
      {showPermissionModal && currentMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Set Permissions for {currentMember.name}
              </h3>
              <button 
                onClick={() => setShowPermissionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Role Selection */}
              <div>
                <h4 className="font-medium mb-3">Role</h4>
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
              
              {/* Project Access */}
              <div>
                <h4 className="font-medium mb-3">Project Access</h4>
                <div className="space-y-2">
                  {availableProjects.map((project) => (
                    <div 
                      key={project.id}
                      className={`border rounded-md p-3 flex items-center cursor-pointer ${
                        selectedProjects.includes(project.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleProjectToggle(project.id)}
                    >
                      <input
                        type="checkbox"
                        id={`project-${project.id}`}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedProjects.includes(project.id)}
                        onChange={() => handleProjectToggle(project.id)}
                      />
                      <label htmlFor={`project-${project.id}`} className="ml-3 flex-1 cursor-pointer">
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-gray-500">{project.description}</p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Menu Permissions */}
              <div>
                <h4 className="font-medium mb-3">Menu Permissions</h4>
                <div className="space-y-2">
                  {availableMenus.map((menu) => (
                    <div 
                      key={menu.id}
                      className={`border rounded-md p-3 flex items-center cursor-pointer ${
                        selectedMenus.includes(menu.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleMenuToggle(menu.id)}
                    >
                      <input
                        type="checkbox"
                        id={`menu-${menu.id}`}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedMenus.includes(menu.id)}
                        onChange={() => handleMenuToggle(menu.id)}
                      />
                      <label htmlFor={`menu-${menu.id}`} className="ml-3 flex-1 cursor-pointer">
                        <p className="font-medium">{menu.name}</p>
                        <p className="text-sm text-gray-500">{menu.description}</p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowPermissionModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium text-white"
              >
                {isUpdateMode ? 'Update Permissions' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamInvite;
