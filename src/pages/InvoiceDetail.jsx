import React from 'react';
import { ArrowLeft, Download, Building, Calendar, CreditCard } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const InvoiceDetail = () => {
  const { id } = useParams();
  
  // Mock invoice data - in a real app, you would fetch this based on the ID
  const invoice = {
    id: id || 'INV-001',
    number: '001',
    date: 'November 1, 2023',
    dueDate: 'November 15, 2023',
    status: 'Paid',
    amount: '$49.00',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      company: 'Acme Inc.',
      address: '123 Main St, Suite 100, San Francisco, CA 94105'
    },
    items: [
      { description: 'Pro Plan - Monthly Subscription', quantity: 1, unitPrice: '$49.00', amount: '$49.00' }
    ],
    subtotal: '$49.00',
    tax: '$0.00',
    total: '$49.00',
    notes: 'Thank you for your business!'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/billing" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Invoice {invoice.id}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
              invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {invoice.status}
            </span>
            <span className="text-sm text-gray-500">
              {invoice.date}
            </span>
          </div>
          <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
            <Download size={16} />
            <span>Download PDF</span>
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Billed To</h3>
              <p className="font-medium">{invoice.customer.name}</p>
              <p>{invoice.customer.company}</p>
              <p className="text-sm text-gray-500">{invoice.customer.address}</p>
              <p className="text-sm text-gray-500">{invoice.customer.email}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-md">
                  <Building size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">From</p>
                  <p className="font-medium">CloudSaaS Inc.</p>
                  <p className="text-sm text-gray-500">billing@cloudsaas.io</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-md">
                  <Calendar size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Due Date</p>
                  <p className="font-medium">{invoice.dueDate}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-md">
                  <CreditCard size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Method</p>
                  <p className="font-medium">Visa ending in 4242</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.unitPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-col items-end mb-8">
            <div className="w-full max-w-xs">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm font-medium">{invoice.subtotal}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-500">Tax</span>
                <span className="text-sm font-medium">{invoice.tax}</span>
              </div>
              <div className="flex justify-between py-2 font-medium">
                <span>Total</span>
                <span>{invoice.total}</span>
              </div>
            </div>
          </div>
          
          {invoice.notes && (
            <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
              <p className="font-medium mb-1">Notes</p>
              <p>{invoice.notes}</p>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium">
            Cancel Invoice
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium">
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
