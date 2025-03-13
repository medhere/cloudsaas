import React from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Account Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your account information and preferences</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Profile Information */}
          <div>
            <h3 className="text-md font-medium mb-4">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue="Acme Inc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue="Software Developer"
                />
              </div>
            </div>
          </div>
          
          {/* API Keys */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-md font-medium mb-4">API Keys</h3>
            <p className="text-sm text-gray-500 mb-4">
              API keys allow you to authenticate requests to our API. Keep your API keys secure.
            </p>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Production API Key</p>
                  <p className="text-sm text-gray-500">Created on Oct 15, 2023</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Reveal
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    Revoke
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  readOnly
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                  value="••••••••••••••••••••••••••••••"
                />
              </div>
            </div>
            
            <button className="text-blue-600 hover:text-blue-800 text-sm">
              + Generate New API Key
            </button>
          </div>
          
          {/* Notification Preferences */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-md font-medium mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="email-alerts"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="email-alerts" className="font-medium text-gray-700">Email Alerts</label>
                  <p className="text-gray-500">Receive email notifications for important events</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="deployment-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="deployment-notifications" className="font-medium text-gray-700">Deployment Notifications</label>
                  <p className="text-gray-500">Get notified when deployments succeed or fail</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="billing-alerts"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="billing-alerts" className="font-medium text-gray-700">Billing Alerts</label>
                  <p className="text-gray-500">Receive notifications about billing events and invoices</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="marketing-emails"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="marketing-emails" className="font-medium text-gray-700">Marketing Emails</label>
                  <p className="text-gray-500">Receive updates about new features and promotions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
