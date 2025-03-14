import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DocumentationContent from '../components/support/Documentation';

const Documentation = () => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/support');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <button
          onClick={handleBackClick}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back to Support</span>
        </button>
        <h1 className="text-2xl font-bold">Documentation</h1>
      </div>
      
      <DocumentationContent />
    </div>
  );
};

export default Documentation;
