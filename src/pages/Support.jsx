import React, { useState } from 'react';
import { MessageSquare, HelpCircle, Clock, Plus, CreditCard, Wallet, AlertTriangle, X, Bell, Calendar, ChevronRight, ThumbsUp, Send, Star, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import TicketModal from '../components/support/TicketModal';

const Support = () => {
  const [showTickets, setShowTickets] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showSupportHoursModal, setShowSupportHoursModal] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedHoursPackage, setSelectedHoursPackage] = useState('basic');
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [chatLoaded, setChatLoaded] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const loadChatScripts = () => {
    if (chatLoaded) return;

    setChatLoading(true);

    const chatBaseUrl = import.meta.env.VITE_CHAT_BASE_URL;

    // Load jQuery first
    const jqueryScript = document.createElement("script");
    jqueryScript.id = "jq";
    jqueryScript.src = `${chatBaseUrl}/js/min/jquery.min.js`;
    jqueryScript.async = true;

    // Load the main script
    jqueryScript.onload = () => {
      const mainScript = document.createElement("script");
      mainScript.id = "sbinit";
      mainScript.src = `${chatBaseUrl}/js/main.js`;
      mainScript.async = true;
      document.body.appendChild(mainScript);

      mainScript.onload = () => {
        setChatLoaded(true);
        setChatLoading(false);
      };
    };

    document.body.appendChild(jqueryScript);
  };

  const removeChatScripts = () => {
    const chatBaseUrl = import.meta.env.VITE_CHAT_BASE_URL;

    // Remove scripts
    document.getElementById("jq")?.remove();
    document.getElementById("sbinit")?.remove();

    // Remove chat UI and styles
    document.querySelector(".sb-body")?.remove();
    document.querySelector(`link[href="${chatBaseUrl}/css/main.css"]`)?.remove();

    // Remove any chat-related elements
    document.querySelectorAll('[id^="sb-"]').forEach((el) => el.remove());

    setChatLoaded(false);
  };


  React.useEffect(() => {
    // Cleanup function
    return () => {
      removeChatScripts()
    };
  }, []);

  // Support hours packages
  const supportPackages = [
    { id: 'basic', name: 'Basic', hours: 5, price: 99, description: 'For small teams with occasional support needs' },
    { id: 'standard', name: 'Standard', hours: 10, price: 179, description: 'For growing teams with regular support requirements' },
    { id: 'premium', name: 'Premium', hours: 20, price: 299, description: 'For businesses with complex support needs' },
    { id: 'enterprise', name: 'Enterprise', hours: 50, price: 599, description: 'For large organizations requiring extensive support' }
  ];

  // Payment methods
  const savedPaymentMethods = [
    { id: 1, type: 'card', last4: '4242', brand: 'visa', expiry: '12/2025' },
    { id: 2, type: 'card', last4: '1234', brand: 'mastercard', expiry: '10/2024' },
  ];

  // Previous support tickets
  const previousTickets = [
    {
      id: 'TKT-1001',
      title: 'API Integration Issue',
      project: 'E-commerce Platform',
      category: 'Technical',
      status: 'Resolved',
      created: '2023-11-10T14:30:00',
      updated: '2023-11-11T09:15:00',
      hoursUsed: 1.5
    },
    {
      id: 'TKT-1002',
      title: 'Database Connection Failure',
      project: 'Admin Dashboard',
      category: 'Critical',
      status: 'In Progress',
      created: '2023-11-15T10:45:00',
      updated: '2023-11-15T16:20:00',
      hoursUsed: 2.25
    },
    {
      id: 'TKT-1003',
      title: 'Custom Domain Setup',
      project: 'Marketing Website',
      category: 'Configuration',
      status: 'Waiting for Customer',
      created: '2023-11-18T09:00:00',
      updated: '2023-11-18T11:30:00',
      hoursUsed: 0.75
    },
    {
      id: 'TKT-1004',
      title: 'Billing Discrepancy',
      project: 'Account',
      category: 'Billing',
      status: 'Open',
      created: '2023-11-20T13:15:00',
      updated: '2023-11-20T13:15:00',
      hoursUsed: 0
    }
  ];

  // Recent announcements
  const recentAnnouncements = [
    {
      id: 1,
      title: 'Scheduled Maintenance',
      date: 'Nov 15, 2023',
      preview: 'Scheduled maintenance on our database servers. Expect brief downtime...',
      priority: 'high'
    },
    {
      id: 2,
      title: 'New Feature Release',
      date: 'Nov 10, 2023',
      preview: 'We\'ve added new deployment options for static sites...',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Security Update',
      date: 'Nov 5, 2023',
      preview: 'Important security patches have been applied to all servers...',
      priority: 'high'
    }
  ];

  // Support overview data
  const supportOverview = {
    hoursRemaining: 8.5,
    activeTickets: 2,
    avgResponseTime: '1h 15m',
    lastTicketUpdate: '2 hours ago',
    supportLevel: 'Standard',
    supportExpiry: 'Dec 15, 2023'
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Waiting for Customer':
        return 'bg-yellow-100 text-yellow-800';
      case 'Open':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle feedback submission
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the feedback data to the server
    console.log('Submitting feedback:', { rating: feedbackRating, text: feedbackText });
    setFeedbackRating(0);
    setFeedbackText('');
    setShowFeedbackForm(false);
    // Show success message or toast notification
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Support</h1>

      {/* Support Options Cards */}
      {!showTickets && !showFeedbackForm && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Live Chat Card */}
            <div className="overflow-hidden transition-colors bg-white border border-gray-200 rounded-lg shadow hover:border-blue-500">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-lg">
                  <MessageSquare className="text-blue-600" size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Live Chat Support</h3>
                <p className="mb-4 text-gray-600">
                  Chat with our support team in real-time for immediate assistance.
                </p>
                <div className="flex items-center">
                  {chatLoaded ? (
                    <div className="flex items-center mb-4 text-sm text-green-600">
                      <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                      <span>Agents are online...</span>
                    </div>
                  ) : chatLoading ? (
                    <div className="flex items-center mb-4 text-sm text-yellow-600">
                      <span className="w-2 h-2 mr-2 bg-yellow-500 rounded-full animate-pulse"></span>
                      <span>Loading chat...</span>
                    </div>
                  ) : (
                    <div className="flex items-center mb-4 text-sm text-blue-600">
                      <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
                      <span>Awaiting requests...</span>
                    </div>
                  )}
                </div>
                {chatLoaded ?
                  <button
                    onClick={() => removeChatScripts()}
                    className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-200"
                  >
                    End Chat
                  </button>
                  :
                  <button
                    onClick={() => loadChatScripts()}
                    disabled={chatLoaded || chatLoading}
                    className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-200"
                  >
                    {chatLoading ? "Loading..." : chatLoaded ? "Chat Loaded" : "Start Chat"}
                  </button>
                }
              </div>
            </div>

            {/* Support Tickets Card */}
            <div className="overflow-hidden transition-colors bg-white border border-gray-200 rounded-lg shadow hover:border-blue-500">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-green-100 rounded-lg">
                  <HelpCircle className="text-green-600" size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Support Tickets</h3>
                <p className="mb-4 text-gray-600">
                  Create and manage support tickets for complex issues that require in-depth assistance.
                </p>
                <div className="flex items-center mb-4 text-sm text-green-600">
                  <Clock size={16} className="mr-1" />
                  <span>{supportOverview.hoursRemaining} support hours remaining</span>
                </div>
                <button
                  onClick={() => setShowTickets(true)}
                  className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Manage Tickets
                </button>
              </div>
            </div>

            {/* Feedback Card */}
            <div className="overflow-hidden transition-colors bg-white border border-gray-200 rounded-lg shadow hover:border-purple-500">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-lg">
                  <ThumbsUp className="text-purple-600" size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Submit Feedback</h3>
                <p className="mb-4 text-gray-600">
                  Help us improve our support services by providing your feedback and suggestions.
                </p>
                <div className="flex items-center mb-4 text-sm text-purple-600">
                  <Star size={16} className="mr-1 fill-purple-600" />
                  <span>Rate your experience with us</span>
                </div>
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Give Feedback
                </button>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Documentation</h2>
              <div className="flex items-center justify-between p-4 border rounded-lg border-grey-200">
                <div>
                  <h3 className="font-medium text-gray-800">Up-to-date information</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Get all needed information on product, usage, and troubleshooting.
                  </p>
                </div>
                <div className='flex items-end gap-2'>
                  <Link to="../documentation" className="flex items-center px-4 py-2 bg-white border rounded-md text-grey-700 border-grey-600 hover:bg-grey-100">
                    <Book size={16} />
                    <span>Open Documentation</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>


          {/* Support Overview */}
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Support Overview</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-blue-50">
                  <h3 className="mb-2 text-sm font-medium text-blue-800">Support Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Support Level:</span>
                      <span className="font-medium">{supportOverview.supportLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hours Remaining:</span>
                      <span className="font-medium">{supportOverview.hoursRemaining} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expiry Date:</span>
                      <span className="font-medium">{supportOverview.supportExpiry}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-green-50">
                  <h3 className="mb-2 text-sm font-medium text-green-800">Ticket Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Tickets:</span>
                      <span className="font-medium">{supportOverview.activeTickets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Response Time:</span>
                      <span className="font-medium">{supportOverview.avgResponseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Update:</span>
                      <span className="font-medium">{supportOverview.lastTicketUpdate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Announcements */}
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Announcements</h2>
                <Link to="/announcements" className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mr-4 ${announcement.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                        <Bell className={`${announcement.priority === 'high' ? 'text-red-600' : 'text-yellow-600'}`} size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                          <div className="flex items-center text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            <span className="text-sm">{announcement.date}</span>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{announcement.preview}</p>
                        <div className="flex justify-end mt-2">
                          <Link
                            to={`/announcements/${announcement.id}`}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                          >
                            Read more
                            <ChevronRight size={16} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}


      {/* Support Tickets Section */}
      {showTickets && (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Support Tickets</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Create and manage support tickets for complex issues
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowTickets(false)}
                  className="px-3 py-1 text-gray-500 bg-gray-100 rounded-md hover:text-gray-700 hover:bg-gray-200"
                >
                  Back to Support
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                  onClick={() => setShowSupportHoursModal(true)}
                >
                  <Clock size={18} />
                  <span>Buy Support Hours</span>
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  onClick={() => setShowTicketModal(true)}
                >
                  <Plus size={18} />
                  <span>Create Ticket</span>
                </button>
              </div>
            </div>

            <div className="flex items-start p-4 mb-6 border border-blue-200 rounded-lg bg-blue-50">
              <div className="p-2 mr-3 bg-blue-100 rounded-full">
                <Clock className="text-blue-600" size={18} />
              </div>
              <div>
                <h3 className="font-medium text-blue-800">Support Hours Balance</h3>
                <p className="mt-1 text-sm text-blue-700">You have <span className="font-bold">{supportOverview.hoursRemaining} hours</span> of support time remaining</p>
              </div>
            </div>

            {/* Previous Tickets */}
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Ticket
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Hours Used
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {previousTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                        </div>
                        <div className="text-sm text-gray-500">{ticket.title}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {ticket.project}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {ticket.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(ticket.created)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {ticket.hoursUsed > 0 ? `${ticket.hoursUsed} hrs` : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Submit Feedback</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Help us improve our support services by providing your feedback
                </p>
              </div>
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="px-3 py-1 text-gray-500 bg-gray-100 rounded-md hover:text-gray-700 hover:bg-gray-200"
              >
                Back to Support
              </button>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  How would you rate our support services?
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFeedbackRating(rating)}
                      className="p-2 focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={`${rating <= feedbackRating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label htmlFor="feedback" className="block mb-2 text-sm font-medium text-gray-700">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please share your experience with our support team and any suggestions for improvement..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                ></textarea>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={feedbackRating === 0}
                  className={`px-4 py-2 rounded-md text-sm font-medium text-white flex items-center ${feedbackRating === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  <Send size={16} className="mr-2" />
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Support Hours Purchase Modal */}
      {showSupportHoursModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Purchase Support Hours</h3>
              <button
                onClick={() => setShowSupportHoursModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Package Selection */}
              <div>
                <h4 className="mb-3 font-medium">Select Support Package</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {supportPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`border rounded-md p-4 cursor-pointer ${selectedHoursPackage === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      onClick={() => setSelectedHoursPackage(pkg.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{pkg.name}</h5>
                        <span className="font-bold text-blue-600">${pkg.price}</span>
                      </div>
                      <div className="flex items-center mb-2 text-sm text-gray-600">
                        <Clock size={16} className="mr-1" />
                        <span>{pkg.hours} support hours</span>
                      </div>
                      <p className="text-sm text-gray-500">{pkg.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="mb-3 font-medium">Payment Method</h4>

                <div
                  className={`flex items-center p-3 border rounded-md cursor-pointer ${paymentMethod === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <input
                    type="radio"
                    id="wallet"
                    name="payment"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="wallet" className="flex items-center flex-1 ml-3 cursor-pointer">
                    <Wallet size={18} className="mr-2 text-blue-600" />
                    <div>
                      <p className="font-medium">Wallet Balance</p>
                      <p className="text-sm text-gray-500">$250.00 available</p>
                    </div>
                  </label>
                </div>

                {savedPaymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center p-3 border rounded-md cursor-pointer mt-2 ${paymentMethod === `card-${method.id}` ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    onClick={() => setPaymentMethod(`card-${method.id}`)}
                  >
                    <input
                      type="radio"
                      id={`card-${method.id}`}
                      name="payment"
                      checked={paymentMethod === `card-${method.id}`}
                      onChange={() => setPaymentMethod(`card-${method.id}`)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={`card-${method.id}`} className="flex items-center flex-1 ml-3 cursor-pointer">
                      <CreditCard size={18} className="mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">
                          {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last4}
                        </p>
                        <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                      </div>
                    </label>
                  </div>
                ))}

                <div
                  className={`flex items-center p-3 border rounded-md cursor-pointer mt-2 ${paymentMethod === 'new-card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  onClick={() => setPaymentMethod('new-card')}
                >
                  <input
                    type="radio"
                    id="new-card"
                    name="payment"
                    checked={paymentMethod === 'new-card'}
                    onChange={() => setPaymentMethod('new-card')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="new-card" className="ml-3 cursor-pointer">
                    <p className="font-medium">Add new payment method</p>
                  </label>
                </div>
              </div>

              {/* Order Summary */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="mb-3 font-medium">Order Summary</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">
                    {supportPackages.find(p => p.id === selectedHoursPackage)?.name} Package
                  </span>
                  <span className="font-medium">
                    ${supportPackages.find(p => p.id === selectedHoursPackage)?.price}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Support Hours</span>
                  <span className="font-medium">
                    {supportPackages.find(p => p.id === selectedHoursPackage)?.hours} hours
                  </span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-blue-600">
                    ${supportPackages.find(p => p.id === selectedHoursPackage)?.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowSupportHoursModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Purchase Hours
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {showTicketModal && (
        <TicketModal onClose={() => setShowTicketModal(false)} />
      )}
    </div>
  );
};

export default Support;