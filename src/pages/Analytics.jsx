import React from 'react';
import { BarChart, PieChart, LineChart, Calendar, Download } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usage & Analytics</h1>
        <div className="flex items-center gap-2">
          <div>
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>
          <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
            <Calendar size={18} />
          </button>
          <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
            <Download size={18} />
          </button>
        </div>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Deployments</p>
              <p className="text-2xl font-bold">1,284</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% from last period
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <BarChart className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Compute Usage</p>
              <p className="text-2xl font-bold">4,128 hrs</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                8% from last period
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <LineChart className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bandwidth</p>
              <p className="text-2xl font-bold">2.4 TB</p>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                5% from last period
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <BarChart className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Estimated Cost</p>
              <p className="text-2xl font-bold">$245.12</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                2% from last period
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <PieChart className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Usage Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">CPU Usage</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg">
            <div className="text-center">
              <LineChart size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">CPU usage chart would appear here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Memory Usage</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg">
            <div className="text-center">
              <LineChart size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">Memory usage chart would appear here</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Usage */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Project Usage</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compute (hrs)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bandwidth
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Storage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  E-commerce Platform
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1,245
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  845 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  125 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $98.45
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  API Server
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1,120
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1.2 TB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  85 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $78.32
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  Marketing Website
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  720
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  320 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $42.18
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  Mobile Backend
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  845
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  125 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  45 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $26.17
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
