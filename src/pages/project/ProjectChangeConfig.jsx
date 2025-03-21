import React, { useState, useEffect } from 'react';
import { ArrowLeft, Server, Cpu, HardDrive, Database, Wifi } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ProjectChangeConfig = () => {
  const { projectId } = useParams();

  const [projectName, setProjectName] = useState('');
  const [projectSlug, setProjectSlug] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectHostname, setProjectHostname] = useState('');
  const [cpuCount, setCpuCount] = useState(2);
  const [ram, setRam] = useState(4);
  const [diskSpace, setDiskSpace] = useState(50);
  const [networkSpeed, setNetworkSpeed] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState('existing');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Exchange rates (simplified)
  const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110.5,
    CAD: 1.25
  };

  // Pricing calculation
  useEffect(() => {
    // Base price calculation in USD
    const cpuPrice = cpuCount * 10;
    const ramPrice = ram * 5;
    const diskPrice = diskSpace * 0.5;
    const networkPrice = networkSpeed * 15;
    
    const basePrice = cpuPrice + ramPrice + diskPrice + networkPrice;
    
    // Convert to selected currency
    const convertedPrice = basePrice / exchangeRates[currency];
    
    setTotalPrice(convertedPrice.toFixed(2));
  }, [cpuCount, ram, diskSpace, networkSpeed, currency]);

  // Generate slug from project name
  useEffect(() => {
    setProjectSlug(projectName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  }, [projectName]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to={-1} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Update Project - {projectId}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Project Details</h2>
          <p className="text-sm text-gray-500">Basic information about your project</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="project-name" className="block mb-1 text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="project-name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Awesome Project"
            />
          </div>
          
          <div>
            <label htmlFor="project-slug" className="block mb-1 text-sm font-medium text-gray-700">
              Project Slug
            </label>
            <div className="flex">
              <input
                type="text"
                id="project-slug"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={projectSlug}
                onChange={(e) => setProjectSlug(e.target.value)}
                placeholder="my-awesome-project"
              />
            </div>
          </div>

          <div>
            <label htmlFor="project-desc" className="block mb-1 text-sm font-medium text-gray-700">
              Project Description
            </label>
            <input
              type="text"
              id="project-desc"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              placeholder="Describe your awesome project"
            />
          </div>

          <div>
            <label htmlFor="project-hostname" className="block mb-1 text-sm font-medium text-gray-700">
              Project Hostname
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                https://
              </span>
              <input
                type="text"
                id="project-hostname"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={projectHostname}
                onChange={(e) => setProjectHostname(e.target.value)}
                placeholder="my-awesome-project"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              This will be the Hostname of your project: https://{projectHostname || 'your-project'} <br />
              This cannot be changed except all applications are deleted.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Server Specifications</h2>
          <p className="text-sm text-gray-500">Configure the resources for your project</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Cpu size={18} className="text-gray-500" />
                  <label htmlFor="cpu-count" className="block text-sm font-medium text-gray-700">
                    CPU Cores
                  </label>
                </div>
                <span className="text-sm font-medium text-gray-900">{cpuCount} Cores</span>
              </div>
              <input
                type="range"
                id="cpu-count"
                min="1"
                max="16"
                step="1"
                value={cpuCount}
                onChange={(e) => setCpuCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>1 Core</span>
                <span>16 Cores</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Database size={18} className="text-gray-500" />
                  <label htmlFor="ram" className="block text-sm font-medium text-gray-700">
                    Memory (RAM)
                  </label>
                </div>
                <span className="text-sm font-medium text-gray-900">{ram} GB</span>
              </div>
              <input
                type="range"
                id="ram"
                min="1"
                max="64"
                step="1"
                value={ram}
                onChange={(e) => setRam(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>1 GB</span>
                <span>64 GB</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <HardDrive size={18} className="text-gray-500" />
                  <label htmlFor="disk-space" className="block text-sm font-medium text-gray-700">
                    Disk Space
                  </label>
                </div>
                <span className="text-sm font-medium text-gray-900">{diskSpace} GB</span>
              </div>
              <input
                type="range"
                id="disk-space"
                min="10"
                max="1000"
                step="10"
                value={diskSpace}
                onChange={(e) => setDiskSpace(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>10 GB</span>
                <span>1000 GB</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wifi size={18} className="text-gray-500" />
                  <label htmlFor="network-speed" className="block text-sm font-medium text-gray-700">
                    Network Speed
                  </label>
                </div>
                <span className="text-sm font-medium text-gray-900">{networkSpeed} Gbps</span>
              </div>
              <input
                type="range"
                id="network-speed"
                min="1"
                max="10"
                step="1"
                value={networkSpeed}
                onChange={(e) => setNetworkSpeed(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>1 Gbps</span>
                <span>10 Gbps</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Total Monthly Cost</h3>
                <div className="flex items-center mt-1">
                  <label htmlFor="currency" className="block mr-2 text-sm text-gray-500">
                    Currency:
                  </label>
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="p-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CAD">CAD (C$)</option>
                  </select>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  {currency === 'USD' && '$'}
                  {currency === 'EUR' && '€'}
                  {currency === 'GBP' && '£'}
                  {currency === 'JPY' && '¥'}
                  {currency === 'CAD' && 'C$'}
                  {totalPrice}
                </div>
                <p className="text-sm text-gray-500">per month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Payment Method</h2>
          <p className="text-sm text-gray-500">Select how you want to pay for this project</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="payment-existing"
                name="payment-method"
                type="radio"
                checked={paymentMethod === 'existing'}
                onChange={() => setPaymentMethod('existing')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="payment-existing" className="block ml-3 text-sm font-medium text-gray-700">
                Use existing payment method
              </label>
            </div>
            
            {paymentMethod === 'existing' && (
              <div className="p-4 border border-gray-200 rounded-md ml-7">
                <div className="flex items-center">
                  <div className="p-2 mr-4 bg-blue-100 rounded-md">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/2025</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <input
                id="payment-new"
                name="payment-method"
                type="radio"
                checked={paymentMethod === 'new'}
                onChange={() => setPaymentMethod('new')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="payment-new" className="block ml-3 text-sm font-medium text-gray-700">
                Use a new payment method
              </label>
            </div>
            
            {paymentMethod === 'new' && (
              <div className="p-4 space-y-4 border border-gray-200 rounded-md ml-7">
                <div>
                  <label htmlFor="card-number" className="block mb-1 text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div>
                  <label htmlFor="card-name" className="block mb-1 text-sm font-medium text-gray-700">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="card-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="card-expiry" className="block mb-1 text-sm font-medium text-gray-700">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="card-expiry"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="card-cvc" className="block mb-1 text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="card-cvc"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Link 
          to="/projects" 
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button 
          type="button" 
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Update Project
        </button>
      </div>
    </div>
  );
};

export default ProjectChangeConfig;
