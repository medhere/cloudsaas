import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Plus, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';

const ProjectFirewall = () => {
  const { projectId } = useParams();
  const [showAddRuleForm, setShowAddRuleForm] = useState(false);
  const [firewallEnabled, setFirewallEnabled] = useState(true);
  
  // Mock data for firewall rules
  const [firewallRules, setFirewallRules] = useState([
    { id: 1, port: 80, protocol: 'tcp', source: '0.0.0.0/0', action: 'ALLOW', description: 'HTTP' },
    { id: 2, port: 443, protocol: 'tcp', source: '0.0.0.0/0', action: 'ALLOW', description: 'HTTPS' },
    { id: 3, port: 22, protocol: 'tcp', source: '0.0.0.0/0', action: 'ALLOW', description: 'SSH' },
    { id: 4, port: 3306, protocol: 'tcp', source: '192.168.1.0/24', action: 'ALLOW', description: 'MySQL' },
    { id: 5, port: 6379, protocol: 'tcp', source: '10.0.0.0/8', action: 'ALLOW', description: 'Redis' },
  ]);
  
  const handleAddRule = (e) => {
    e.preventDefault();
    // Implementation would go here
    setShowAddRuleForm(false);
  };
  
  const handleDeleteRule = (id) => {
    setFirewallRules(firewallRules.filter(rule => rule.id !== id));
  };
  
  const toggleFirewall = () => {
    setFirewallEnabled(!firewallEnabled);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Firewall Manager: {projectId}</h1>
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleFirewall}
            className={`px-4 py-2 rounded-md ${
              firewallEnabled 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {firewallEnabled ? 'Firewall Enabled' : 'Firewall Disabled'}
          </button>
          <button 
            onClick={() => setShowAddRuleForm(!showAddRuleForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Add Rule</span>
          </button>
        </div>
      </div>
      
      {/* Firewall Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Shield className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Firewall Status</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Status</p>
            <p className={`text-lg font-medium ${firewallEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {firewallEnabled ? 'Active' : 'Inactive'}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Rules</p>
            <p className="text-lg font-medium">{firewallRules.length}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Default Policy</p>
            <p className="text-lg font-medium">Deny</p>
          </div>
        </div>
      </div>
      
      {/* Add Rule Form */}
      {showAddRuleForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Add Firewall Rule</h2>
          <form onSubmit={handleAddRule}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-1">
                  Port
                </label>
                <input
                  type="number"
                  id="port"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 80"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="protocol" className="block text-sm font-medium text-gray-700 mb-1">
                  Protocol
                </label>
                <select
                  id="protocol"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="tcp">TCP</option>
                  <option value="udp">UDP</option>
                  <option value="icmp">ICMP</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                  Source IP/Range
                </label>
                <input
                  type="text"
                  id="source"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 0.0.0.0/0 or 192.168.1.10"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">
                  Action
                </label>
                <select
                  id="action"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="ALLOW">Allow</option>
                  <option value="DENY">Deny</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Allow HTTP traffic"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddRuleForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Rule
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Firewall Rules */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Firewall Rules</h2>
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            <RefreshCw size={16} className="mr-1" />
            <span>Refresh</span>
          </button>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Port
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Protocol
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {firewallRules.map((rule) => (
              <tr key={rule.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{rule.port}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {rule.protocol.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{rule.source}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    rule.action === 'ALLOW' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {rule.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{rule.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleDeleteRule(rule.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Firewall Tips */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="text-yellow-500 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Firewall Best Practices</h2>
        </div>
        
        <div className="space-y-4 text-sm text-gray-700">
          <p>
            <strong>Principle of Least Privilege:</strong> Only allow the minimum access necessary for your applications to function.
          </p>
          <p>
            <strong>Default Deny:</strong> Start with denying all traffic and then explicitly allow only what's needed.
          </p>
          <p>
            <strong>Limit SSH Access:</strong> Restrict SSH access to specific IP addresses when possible.
          </p>
          <p>
            <strong>Regular Audits:</strong> Periodically review your firewall rules to ensure they're still necessary and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectFirewall;
