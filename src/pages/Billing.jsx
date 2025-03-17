import React, { useState } from 'react';
import { Download, X, CreditCard, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Billing = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('100');
  const [selectedCard, setSelectedCard] = useState('visa-4242');

  const invoices = [
    { id: 'INV-001', date: 'Nov 1, 2023', amount: '$49.00', status: 'Paid' },
    { id: 'INV-002', date: 'Oct 1, 2023', amount: '$49.00', status: 'Paid' },
    { id: 'INV-003', date: 'Sep 1, 2023', amount: '$49.00', status: 'Paid' },
    { id: 'INV-004', date: 'Aug 1, 2023', amount: '$49.00', status: 'Paid' },
    { id: 'INV-005', date: 'Jul 1, 2023', amount: '$49.00', status: 'Paid' },
  ];

  const paymentMethods = [
    { id: 'visa-4242', type: 'visa', last4: '4242', expiry: '12/2025', isDefault: true },
    { id: 'mastercard-5555', type: 'mastercard', last4: '5555', expiry: '10/2024', isDefault: false },
    { id: 'amex-0005', type: 'amex', last4: '0005', expiry: '08/2026', isDefault: false },
  ];

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="4" fill="#1434CB" />
            <path d="M13.3 13.5H10L8 21H11.3L13.3 13.5Z" fill="white" />
            <path d="M20.3 13.7C19.6 13.5 18.8 13.3 18 13.3C15.8 13.3 14.3 14.4 14.3 16C14.3 17.2 15.4 17.8 16.2 18.2C17 18.6 17.3 18.9 17.3 19.2C17.3 19.7 16.7 19.9 16.1 19.9C15.2 19.9 14.3 19.7 13.5 19.3L13.1 19.1L12.7 21.7C13.5 22 14.8 22.3 16.1 22.3C18.5 22.3 19.9 21.2 19.9 19.5C19.9 18.5 19.3 17.8 18.1 17.2C17.4 16.8 16.9 16.6 16.9 16.2C16.9 15.9 17.3 15.6 18.1 15.6C18.8 15.6 19.4 15.7 19.8 15.9L20.1 16L20.5 13.8L20.3 13.7Z" fill="white" />
            <path d="M24 13.5H22C21.5 13.5 21.1 13.6 20.9 14.1L18 21H20.4C20.4 21 20.7 20.2 20.8 19.9C21.1 19.9 23.1 19.9 23.5 19.9C23.6 20.3 23.7 21 23.7 21H26L24 13.5ZM21.5 17.9C21.7 17.4 22.4 15.5 22.4 15.5C22.4 15.5 22.6 15 22.7 14.7L22.8 15.4C22.8 15.4 23.2 17.5 23.3 17.9H21.5Z" fill="white" />
          </svg>
        );
      case 'mastercard':
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="4" fill="#F7F7F7" />
            <path d="M16 23C19.866 23 23 19.866 23 16C23 12.134 19.866 9 16 9C12.134 9 9 12.134 9 16C9 19.866 12.134 23 16 23Z" fill="#EA001B" fillOpacity="0.8" />
            <path d="M23 23C26.866 23 30 19.866 30 16C30 12.134 26.866 9 23 9C19.134 9 16 12.134 16 16C16 19.866 19.134 23 23 23Z" fill="#FFA200" fillOpacity="0.8" />
            <path d="M19.5 16C19.5 14.07 20.57 12.4 22.13 11.57C21.108 10.59 19.8 10 18.36 10C15.4 10 13 12.69 13 16C13 19.31 15.4 22 18.36 22C19.8 22 21.108 21.41 22.13 20.43C20.57 19.6 19.5 17.93 19.5 16Z" fill="#FF5F00" />
          </svg>
        );
      case 'amex':
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="4" fill="#006FCF" />
            <path d="M4.5 16.2L6.5 12H9.5L11.5 16.2L13.5 12H16.5V20H13.5V15L11.5 20H9.5L7.5 15V20H4.5V16.2Z" fill="white" />
            <path d="M17.5 12H27.5L28.5 14H26.5C27.3 14 28 14.7 28 15.5V18.5C28 19.3 27.3 20 26.5 20H17.5V12ZM20.5 15V14H24.5V15H20.5ZM20.5 18V17H24.5V18H20.5Z" fill="white" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="4" fill="#E5E7EB" />
            <path d="M9 11H23V13H9V11Z" fill="#9CA3AF" />
            <path d="M9 15H16V17H9V15Z" fill="#9CA3AF" />
            <path d="M9 19H14V21H9V19Z" fill="#9CA3AF" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Billing</h1>
      
      {/* Usage Summary */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold">Usage Summary</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">Projects</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-lg font-semibold">10</p>
              <p className="text-sm text-gray-500">of 15</p>
            </div>
            <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '66.7%' }}></div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">Team Members</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-lg font-semibold">8</p>
              <p className="text-sm text-gray-500">of 10</p>
            </div>
            <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">Support Hours</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-lg font-semibold">5</p>
              <p className="text-sm text-gray-500">of 20</p>
            </div>
            <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wallet */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold">Wallet Balance</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">$250.00</p>
            <p className="mt-1 text-sm text-gray-500">Available balance</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={() => setShowDepositModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Plus size={16} />
              <span>Deposit Funds</span>
            </button>
          </div>
        </div>
        
        <div className="pt-4 mt-6 border-t border-gray-200">
          <h3 className="mb-2 font-medium text-md">Recent Transactions</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
              <div>
                <p className="font-medium">Deposit</p>
                <p className="text-sm text-gray-500">Nov 5, 2023</p>
              </div>
              <p className="font-medium text-green-600">+$100.00</p>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
              <div>
                <p className="font-medium">Project Charge</p>
                <p className="text-sm text-gray-500">Nov 1, 2023</p>
              </div>
              <p className="font-medium text-red-600">-$49.00</p>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
              <div>
                <p className="font-medium">Deposit</p>
                <p className="text-sm text-gray-500">Oct 15, 2023</p>
              </div>
              <p className="font-medium text-green-600">+$200.00</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Payment Methods</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="relative p-4 border border-gray-200 rounded-lg">
              <button 
                className="absolute text-red-500 top-3 right-3 hover:text-red-700"
                aria-label="Delete payment method"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center mb-3">
                {getCardIcon(method.type)}
              </div>
              
              <div>
                <p className="font-medium">{method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in {method.last4}</p>
                <p className="text-sm text-gray-500">Expires {method.expiry}</p>
              </div>
              
              {method.isDefault && (
                <span className="inline-block px-2 py-1 mt-2 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  Default
                </span>
              )}
            </div>
          ))}
          
          {/* <div className="flex flex-col items-center justify-center p-4 text-center border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="p-3 mb-2 bg-gray-100 rounded-full">
              <Plus size={24} className="text-gray-500" />
            </div>
            <p className="font-medium text-gray-700">Add Payment Method</p>
            <p className="mt-1 text-sm text-gray-500">Add a new credit or debit card</p>
          </div> */}
        </div>
      </div>
      
      {/* Invoices */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold">Invoices</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Invoice
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Download
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <Link to={`./invoice/${invoice.id}`} className="hover:text-blue-600">
                      {invoice.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
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

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Deposit Funds</h3>
              <button 
                onClick={() => setShowDepositModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block mb-1 text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    id="amount"
                    className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.id}
                      className={`border rounded-md p-3 flex items-center cursor-pointer ${
                        selectedCard === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedCard(method.id)}
                    >
                      <input
                        type="radio"
                        id={`card-${method.id}`}
                        name="payment-method"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        checked={selectedCard === method.id}
                        onChange={() => setSelectedCard(method.id)}
                      />
                      <label htmlFor={`card-${method.id}`} className="flex items-center flex-1 ml-3">
                        <div className="mr-3">
                          {getCardIcon(method.type)}
                        </div>
                        <div>
                          <p className="font-medium">{method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in {method.last4}</p>
                          <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowDepositModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
