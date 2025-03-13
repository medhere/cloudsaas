import React from 'react';
import { MessageSquare, FileText, HelpCircle, ExternalLink } from 'lucide-react';

const Support = () => {
  const faqs = [
    {
      question: 'How do I deploy my first project?',
      answer: 'To deploy your first project, go to the Projects page and click on "New Project". Follow the setup wizard to connect your repository and configure your deployment settings.'
    },
    {
      question: 'How do I add team members to my account?',
      answer: 'You can add team members from the Team Management page. Click on "Invite Member" and enter their email address. You can also set their role and permissions.'
    },
    {
      question: 'How do I set up custom domains?',
      answer: 'To set up a custom domain, go to your project settings and navigate to the "Domains" tab. Add your domain and follow the instructions to configure DNS settings.'
    },
    {
      question: 'What are the billing cycles?',
      answer: 'Billing cycles run monthly, starting from the day you subscribed to a paid plan. You can view your next billing date in the Billing section.'
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Support</h1>
      
      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <MessageSquare className="text-blue-600" size={24} />
          </div>
          <h2 className="text-lg font-semibold mb-2">Live Chat</h2>
          <p className="text-sm text-gray-500 mb-4">
            Chat with our support team in real-time for immediate assistance.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full">
            Start Chat
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="p-3 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <FileText className="text-purple-600" size={24} />
          </div>
          <h2 className="text-lg font-semibold mb-2">Documentation</h2>
          <p className="text-sm text-gray-500 mb-4">
            Browse our comprehensive documentation for detailed guides and tutorials.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md w-full">
            View Docs
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="p-3 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <HelpCircle className="text-green-600" size={24} />
          </div>
          <h2 className="text-lg font-semibold mb-2">Submit a Ticket</h2>
          <p className="text-sm text-gray-500 mb-4">
            Create a support ticket for complex issues requiring detailed investigation.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full">
            Create Ticket
          </button>
        </div>
      </div>
      
      {/* FAQs */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer p-4 bg-gray-50">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 p-4 text-sm">{faq.answer}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
      
      {/* Documentation */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Popular Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-start">
            <div className="p-2 bg-blue-100 rounded-md mr-3">
              <FileText className="text-blue-600" size={18} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Getting Started Guide</h3>
              <p className="text-sm text-gray-500">Learn the basics of deploying your first application</p>
            </div>
          </a>
          
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-start">
            <div className="p-2 bg-blue-100 rounded-md mr-3">
              <FileText className="text-blue-600" size={18} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Environment Variables</h3>
              <p className="text-sm text-gray-500">How to configure and use environment variables</p>
            </div>
          </a>
          
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-start">
            <div className="p-2 bg-blue-100 rounded-md mr-3">
              <FileText className="text-blue-600" size={18} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Custom Domains</h3>
              <p className="text-sm text-gray-500">Setting up and managing custom domains</p>
            </div>
          </a>
          
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-start">
            <div className="p-2 bg-blue-100 rounded-md mr-3">
              <FileText className="text-blue-600" size={18} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Team Collaboration</h3>
              <p className="text-sm text-gray-500">Working with teams and managing permissions</p>
            </div>
          </a>
        </div>
        
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
            <span>View all documentation</span>
            <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Email Support</h3>
            <p className="text-sm text-gray-500 mb-1">For general inquiries:</p>
            <a href="mailto:support@apphost.io" className="text-blue-600 hover:text-blue-800">support@apphost.io</a>
            
            <p className="text-sm text-gray-500 mt-3 mb-1">For billing questions:</p>
            <a href="mailto:billing@apphost.io" className="text-blue-600 hover:text-blue-800">billing@apphost.io</a>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Business Hours</h3>
            <p className="text-sm text-gray-500 mb-1">Monday - Friday:</p>
            <p className="text-sm font-medium">9:00 AM - 6:00 PM EST</p>
            
            <p className="text-sm text-gray-500 mt-3 mb-1">Weekend Support:</p>
            <p className="text-sm font-medium">Emergency tickets only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
