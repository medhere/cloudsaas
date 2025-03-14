import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Plus, Trash2, Edit2, Play, AlertTriangle, Check, X } from 'lucide-react';

const AppCron = () => {
  const { projectId, appId } = useParams();
  const [cronJobs, setCronJobs] = useState([
    { 
      id: 1, 
      name: 'Database Backup', 
      schedule: '0 0 * * *', 
      command: 'node scripts/backup.js', 
      lastRun: '2023-09-15 00:00:00', 
      nextRun: '2023-09-16 00:00:00',
      status: 'success',
      active: true
    },
    { 
      id: 2, 
      name: 'Clean Temp Files', 
      schedule: '0 */6 * * *', 
      command: 'node scripts/cleanup.js', 
      lastRun: '2023-09-15 18:00:00', 
      nextRun: '2023-09-16 00:00:00',
      status: 'success',
      active: true
    },
    { 
      id: 3, 
      name: 'Send Reports', 
      schedule: '0 8 * * 1', 
      command: 'node scripts/send-reports.js', 
      lastRun: '2023-09-11 08:00:00', 
      nextRun: '2023-09-18 08:00:00',
      status: 'failed',
      active: false
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState({ name: '', schedule: '', command: '', active: true });
  const [isEditing, setIsEditing] = useState(false);

  const openModal = (job = null) => {
    if (job) {
      setCurrentJob({ ...job });
      setIsEditing(true);
    } else {
      setCurrentJob({ name: '', schedule: '', command: '', active: true });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentJob({
      ...currentJob,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      setCronJobs(cronJobs.map(job => 
        job.id === currentJob.id ? { ...currentJob } : job
      ));
    } else {
      const newJob = {
        ...currentJob,
        id: Date.now(),
        lastRun: '-',
        nextRun: calculateNextRun(currentJob.schedule),
        status: 'pending'
      };
      setCronJobs([...cronJobs, newJob]);
    }
    
    closeModal();
  };

  const calculateNextRun = (schedule) => {
    // This is a simplified calculation for demo purposes
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString().replace('T', ' ').substring(0, 19);
  };

  const deleteJob = (id) => {
    setCronJobs(cronJobs.filter(job => job.id !== id));
  };

  const toggleJobStatus = (id) => {
    setCronJobs(cronJobs.map(job => 
      job.id === id ? { ...job, active: !job.active } : job
    ));
  };

  const runJobNow = (id) => {
    setCronJobs(cronJobs.map(job => {
      if (job.id === id) {
        const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        return { 
          ...job, 
          lastRun: now,
          status: 'running'
        };
      }
      return job;
    }));
    
    // Simulate job completion after 2 seconds
    setTimeout(() => {
      setCronJobs(cronJobs.map(job => {
        if (job.id === id) {
          return { 
            ...job, 
            status: Math.random() > 0.2 ? 'success' : 'failed'
          };
        }
        return job;
      }));
    }, 2000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'success':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Success</span>;
      case 'failed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Failed</span>;
      case 'running':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Running</span>;
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cron Tasks</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Cron Job
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Scheduled Tasks</h2>
        
        {cronJobs.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No cron jobs</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new scheduled task.</p>
            <div className="mt-6">
              <button
                onClick={() => openModal()}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus size={16} className="-ml-1 mr-2" />
                New Cron Job
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Command
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Run
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Run
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cronJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{job.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500 font-mono">{job.schedule}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500 font-mono truncate max-w-xs block">{job.command}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.lastRun}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.nextRun}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(job.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => toggleJobStatus(job.id)}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${job.active ? 'bg-blue-600' : 'bg-gray-200'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${job.active ? 'translate-x-5' : 'translate-x-0'}`}></span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => runJobNow(job.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Run now"
                          disabled={job.status === 'running'}
                        >
                          <Play size={16} />
                        </button>
                        <button 
                          onClick={() => openModal(job)}
                          className="text-gray-600 hover:text-gray-800"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteJob(job.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Cron Expression Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Format</h3>
            <p className="text-sm text-gray-600 mb-2">
              Cron expressions use the following format:
            </p>
            <div className="bg-gray-50 p-3 rounded-md font-mono text-sm">
              * * * * *<br/>
              ┬ ┬ ┬ ┬ ┬<br/>
              │ │ │ │ └─ day of week (0 - 6) (Sunday to Saturday)<br/>
              │ │ │ └─── month (1 - 12)<br/>
              │ │ └───── day of month (1 - 31)<br/>
              │ └─────── hour (0 - 23)<br/>
              └───────── minute (0 - 59)
            </div>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Examples</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <code className="text-sm font-mono">0 * * * *</code>
                <span className="text-sm text-gray-600">Every hour</span>
              </div>
              <div className="flex justify-between">
                <code className="text-sm font-mono">0 0 * * *</code>
                <span className="text-sm text-gray-600">Every day at midnight</span>
              </div>
              <div className="flex justify-between">
                <code className="text-sm font-mono">*/15 * * * *</code>
                <span className="text-sm text-gray-600">Every 15 minutes</span>
              </div>
              <div className="flex justify-between">
                <code className="text-sm font-mono">0 0 * * 0</code>
                <span className="text-sm text-gray-600">Every Sunday at midnight</span>
              </div>
              <div className="flex justify-between">
                <code className="text-sm font-mono">0 0 1 * *</code>
                <span className="text-sm text-gray-600">First day of every month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding/editing cron jobs */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {isEditing ? 'Edit Cron Job' : 'Add Cron Job'}
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={currentJob.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Database Backup"
                          />
                        </div>
                        <div>
                          <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                            Schedule (Cron Expression)
                          </label>
                          <input
                            type="text"
                            name="schedule"
                            id="schedule"
                            value={currentJob.schedule}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="0 0 * * *"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Format: minute hour day-of-month month day-of-week
                          </p>
                        </div>
                        <div>
                          <label htmlFor="command" className="block text-sm font-medium text-gray-700">
                            Command
                          </label>
                          <input
                            type="text"
                            name="command"
                            id="command"
                            value={currentJob.command}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="node scripts/backup.js"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="active"
                            id="active"
                            checked={currentJob.active}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                            Active
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isEditing ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppCron;
