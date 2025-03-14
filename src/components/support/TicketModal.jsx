import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

const TicketModal = ({ onClose }) => {
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    project: '',
    category: '',
    priority: 'medium',
    attachments: []
  });
  
  // Available projects
  const projects = [
    { id: 1, name: 'E-commerce Platform' },
    { id: 2, name: 'Marketing Website' },
    { id: 3, name: 'API Server' },
    { id: 4, name: 'Admin Dashboard' },
    { id: 5, name: 'Mobile Backend' }
  ];
  
  // Ticket categories
  const categories = [
    { id: 'technical', name: 'Technical Issue' },
    { id: 'billing', name: 'Billing Question' },
    { id: 'account', name: 'Account Management' },
    { id: 'feature', name: 'Feature Request' },
    { id: 'security', name: 'Security Concern' },
    { id: 'other', name: 'Other' }
  ];
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: value
    });
  };
  
  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setTicketData({
      ...ticketData,
      attachments: [...ticketData.attachments, ...files]
    });
  };
  
  // Remove attachment
  const removeAttachment = (index) => {
    const updatedAttachments = [...ticketData.attachments];
    updatedAttachments.splice(index, 1);
    setTicketData({
      ...ticketData,
      attachments: updatedAttachments
    });
  };
  
  // Submit ticket
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the ticket data to the server
    console.log('Submitting ticket:', ticketData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create Support Ticket</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
          <AlertTriangle className="text-blue-600 mr-3 mt-0.5" size={18} />
          <div>
            <p className="text-sm text-blue-700">
              Support tickets consume support hours from your account balance. You currently have <span className="font-bold">8.5 hours</span> remaining.
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Ticket Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Ticket Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief summary of your issue"
                value={ticketData.title}
                onChange={handleChange}
              />
            </div>
            
            {/* Project Selection */}
            <div>
              <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                Related Project *
              </label>
              <select
                id="project"
                name="project"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ticketData.project}
                onChange={handleChange}
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
                <option value="account">Account/Billing (Not project specific)</option>
              </select>
            </div>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ticketData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <div className="flex space-x-4">
                {['low', 'medium', 'high', 'critical'].map((priority) => (
                  <label key={priority} className="flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={ticketData.priority === priority}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {priority}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please provide detailed information about your issue"
                value={ticketData.description}
                onChange={handleChange}
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">
                Please include any relevant details, steps to reproduce, error messages, etc.
              </p>
            </div>
            
            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachments
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleFileUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF, PDF up to 10MB each
                  </p>
                </div>
              </div>
              
              {/* Attachment List */}
              {ticketData.attachments.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">Attached Files:</h4>
                  <ul className="mt-1 space-y-1">
                    {ticketData.attachments.map((file, index) => (
                      <li key={index} className="flex items-center justify-between py-1 px-2 text-sm bg-gray-50 rounded">
                        <span className="truncate max-w-xs">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium text-white"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
