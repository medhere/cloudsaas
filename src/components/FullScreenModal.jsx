import { X } from 'lucide-react';

const FullScreenModal = ({ child, header, onClose }) => {
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="px-4 py-6 mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">{header}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        {child}
      </div>
    </div>
  );
};

export default FullScreenModal;
