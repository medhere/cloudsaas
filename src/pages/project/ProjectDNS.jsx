import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Globe, Plus, Trash2, ExternalLink, RefreshCw } from 'lucide-react';

const ProjectDNS = () => {
  const { projectId } = useParams();
  const [showAddRecordForm, setShowAddRecordForm] = useState(false);
  const [newRecordType, setNewRecordType] = useState('A');
  
  // Mock data for DNS records
  const [dnsRecords, setDnsRecords] = useState([
    { id: 1, name: '@', type: 'A', value: '123.45.67.89', ttl: 3600 },
    { id: 2, name: 'www', type: 'CNAME', value: '@', ttl: 3600 },
    { id: 3, name: 'api', type: 'A', value: '123.45.67.89', ttl: 3600 },
    { id: 4, name: 'mail', type: 'MX', value: 'mail.example.com', priority: 10, ttl: 3600 },
    { id: 5, name: '@', type: 'TXT', value: 'v=spf1 include:_spf.example.com ~all', ttl: 3600 },
  ]);
  
  const handleAddRecord = (e) => {
    e.preventDefault();
    // Implementation would go here
    setShowAddRecordForm(false);
  };
  
  const handleDeleteRecord = (id) => {
    setDnsRecords(dnsRecords.filter(record => record.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">DNS Manager: {projectId}</h1>
        <button 
          onClick={() => setShowAddRecordForm(!showAddRecordForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add DNS Record</span>
        </button>
      </div>
      
      {/* Domain Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Globe className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Domain Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Primary Domain</p>
            <p className="font-medium flex items-center">
              example.com
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600">
                <ExternalLink size={14} />
              </a>
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Nameservers</p>
            <ul className="text-sm">
              <li>ns1.PaaS10.com</li>
              <li>ns2.PaaS10.com</li>
            </ul>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-sm">Nov 15, 2023 - 10:30 AM</p>
          </div>
        </div>
      </div>
      
      {/* Add Record Form */}
      {showAddRecordForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Add DNS Record</h2>
          <form onSubmit={handleAddRecord}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="recordName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="recordName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., www or @"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="recordType" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="recordType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newRecordType}
                  onChange={(e) => setNewRecordType(e.target.value)}
                  required
                >
                  <option value="A">A</option>
                  <option value="AAAA">AAAA</option>
                  <option value="CNAME">CNAME</option>
                  <option value="MX">MX</option>
                  <option value="TXT">TXT</option>
                  <option value="NS">NS</option>
                  <option value="SRV">SRV</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="recordValue" className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type="text"
                  id="recordValue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={newRecordType === 'A' ? '123.45.67.89' : newRecordType === 'CNAME' ? 'example.com' : ''}
                  required
                />
              </div>
              
              {newRecordType === 'MX' && (
                <div>
                  <label htmlFor="recordPriority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <input
                    type="number"
                    id="recordPriority"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="10"
                    required
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="recordTTL" className="block text-sm font-medium text-gray-700 mb-1">
                  TTL (seconds)
                </label>
                <input
                  type="number"
                  id="recordTTL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="3600"
                  defaultValue="3600"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddRecordForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Record
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* DNS Records */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">DNS Records</h2>
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            <RefreshCw size={16} className="mr-1" />
            <span>Refresh</span>
          </button>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TTL
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dnsRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{record.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    record.type === 'A' ? 'bg-blue-100 text-blue-800' :
                    record.type === 'CNAME' ? 'bg-green-100 text-green-800' :
                    record.type === 'MX' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {record.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {record.value}
                    {record.priority && <span className="text-xs text-gray-400 ml-1">(Priority: {record.priority})</span>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{record.ttl} seconds</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleDeleteRecord(record.id)}
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
      
      {/* DNS Management Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">DNS Management Guide</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Common DNS Record Types</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li><strong>A Record</strong>: Maps a domain to an IPv4 address</li>
              <li><strong>AAAA Record</strong>: Maps a domain to an IPv6 address</li>
              <li><strong>CNAME Record</strong>: Maps a domain to another domain name</li>
              <li><strong>MX Record</strong>: Specifies mail servers for the domain</li>
              <li><strong>TXT Record</strong>: Stores text information (often used for verification)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Propagation Time</h3>
            <p className="text-sm text-gray-700">
              DNS changes may take up to 48 hours to propagate globally, although most changes are visible within a few hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDNS;
