import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Trash2, RefreshCw, Clock, AlertTriangle, CheckCircle, XCircle, Calendar, BarChart2, Globe, List } from 'lucide-react';

const AppRoutine = () => {
  const { projectId, appId } = useParams();
  const [activeTab, setActiveTab] = useState('cleanup');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Cleanup tasks
  const [cleanupTasks, setCleanupTasks] = useState([
    { id: 1, name: 'Clear temporary files', schedule: 'Daily', lastRun: '2023-06-15 14:30', status: 'success' },
    { id: 2, name: 'Prune Docker images', schedule: 'Weekly', lastRun: '2023-06-10 08:15', status: 'success' },
    { id: 3, name: 'Rotate logs', schedule: 'Daily', lastRun: '2023-06-15 00:00', status: 'success' },
    { id: 4, name: 'Remove old backups', schedule: 'Monthly', lastRun: '2023-06-01 03:00', status: 'failed' },
  ]);
  
  // App events
  const [appEvents, setAppEvents] = useState([
    { id: 1, type: 'deployment', description: 'Application deployed successfully', timestamp: '2023-06-15 10:23:45', status: 'success' },
    { id: 2, type: 'restart', description: 'Application restarted', timestamp: '2023-06-14 15:30:12', status: 'success' },
    { id: 3, type: 'config', description: 'Environment variables updated', timestamp: '2023-06