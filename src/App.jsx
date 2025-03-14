import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectCreate from './pages/ProjectCreate';
import TeamManagement from './pages/TeamManagement';
import Analytics from './pages/Analytics';
import ActivityLogs from './pages/ActivityLogs';
import Billing from './pages/Billing';
import InvoiceDetail from './pages/InvoiceDetail';
import Settings from './pages/Settings';
import Security from './pages/Security';
import Support from './pages/Support';
import Announcements from './pages/Announcements';
import AnnouncementDetail from './pages/AnnouncementDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/create" element={<ProjectCreate />} />
        <Route path="team" element={<TeamManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="activity" element={<ActivityLogs />} />
        <Route path="billing" element={<Billing />} />
        <Route path="billing/invoices/:id" element={<InvoiceDetail />} />
        <Route path="settings" element={<Settings />} />
        <Route path="security" element={<Security />} />
        <Route path="support" element={<Support />} />
        <Route path="support/announcements" element={<Announcements />} />
        <Route path="support/announcements/:id" element={<AnnouncementDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
