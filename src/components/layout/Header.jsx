import React, { useState } from 'react';
import { Bell, Search, HelpCircle } from 'lucide-react';
import FullScreenModal from '../FullScreenModal';
import Documentation from '../../pages/Documentation';

const Header = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setShowSupportModal(true)} 
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <HelpCircle size={20} className="text-gray-600" />
        </button>
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
            3
          </span>
        </div>
      </div>
      {showSupportModal && (
        <FullScreenModal child={<Documentation/>} header="Documentation" onClose={() => setShowSupportModal(false)} />
      )}
    </header>
  );
};

export default Header;
