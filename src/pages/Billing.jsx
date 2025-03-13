import React from 'react';
import { CreditCard, Download, Plus } from 'lucide-react';

const Billing = () => {
  const invoices = [
    { id: 'INV-001', date: 'Nov 1, 2023', amount: '$49.00', status: 'Paid' },
    { id: 'INV-002', date: 'Oct 1, 2023', amount: '$49.00', status: 'Paid' },
    { id: 'INV-003', date: 'Sep 1, 2023', amount: '$49.00', status: 'Paid' },
    { id: 'INV-004', date: 'Aug 1, 2023', amount: '$49.00', status: 'Paid' },
    { id: 'INV-005', date: 'Jul 1, 2023', amount: '$49.00', status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Billing</h1>
      
      {/* Current Plan */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-2">
              Pro Plan
            </div>
            <p className="text-gray-600">Your next billing date is December 1, 2023</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Upgrade Plan
            </button>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="text-md font-medium mb-4">Plan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Projects</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-semibold">10</p>
                <p className="text-sm text-gray-500">of 15</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '66.7%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Team Members</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-semibold">8</p>
                <p className="text-sm text-gray-500">of 10</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Storage</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-semibold">250 GB</p>
                <p className="text-sm text-gray-500">of 500 GB</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Payment Methods</h2>
          <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
            <Plus size={16} />
            <span>Add Method</span>
          </button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md mr-4">
              <CreditCard className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-gray-500">Expires 12/2025</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Default
            </span>
            <button className="text-gray-500 hover:text-gray-700 text-sm">
              Edit
            </button>
          </div>
        </div>
      </div>
      
      {/* Invoices */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Invoices</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Download
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <Download size={16} />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
