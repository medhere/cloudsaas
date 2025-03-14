import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import MainLayout from './components/layout/MainLayout';
import ProjectLayout from './components/layout/ProjectLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectCreate from './pages/ProjectCreate';
import TeamManagement from './pages/TeamManagement';
import TeamInvite from './pages/TeamInvite';
import Analytics from './pages/Analytics';
import ActivityLogs from './pages/ActivityLogs';
import Billing from './pages/Billing';
import InvoiceDetail from './pages/InvoiceDetail';
import Settings from './pages/Settings';
import Security from './pages/Security';
import Support from './pages/Support';
import Announcements from './pages/Announcements';
import AnnouncementDetail from './pages/AnnouncementDetail';
import Documentation from './pages/Documentation';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';

// Project pages
import ProjectOverview from './pages/project/ProjectOverview';
import ProjectManage from './pages/project/ProjectManage';
import ProjectApplications from './pages/project/ProjectApplications';
import ProjectMarketplace from './pages/project/ProjectMarketplace';
import ProjectKeys from './pages/project/ProjectKeys';
import ProjectDeployment from './pages/project/ProjectDeployment';
import ProjectDNS from './pages/project/ProjectDNS';
import ProjectNetwork from './pages/project/ProjectNetwork';
import ProjectShell from './pages/project/ProjectShell';
import ProjectFirewall from './pages/project/ProjectFirewall';
import ProjectRegistry from './pages/project/ProjectRegistry';
import ProjectEvents from './pages/project/ProjectEvents';
import ProjectMonitoring from './pages/project/ProjectMonitoring';

function App() {
  return (
    <Routes>
      {/* Home Pages with Floating Top Menu */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="features" element={<FeaturesPage />} />
      </Route>
      
      {/* Dashboard Pages with Sidebar */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/create" element={<ProjectCreate />} />
        <Route path="team" element={<TeamManagement />} />
        <Route path="team/invite" element={<TeamInvite />} />
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
      
      {/* Project Pages with Project Sidebar */}
      <Route path="/project/:slug" element={<ProjectLayout />}>
        <Route index element={<ProjectOverview />} />
        <Route path="manage" element={<ProjectManage />} />
        <Route path="applications" element={<ProjectApplications />} />
        <Route path="marketplace" element={<ProjectMarketplace />} />
        <Route path="keys" element={<ProjectKeys />} />
        <Route path="deployment" element={<ProjectDeployment />} />
        <Route path="dns" element={<ProjectDNS />} />
        <Route path="network" element={<ProjectNetwork />} />
        <Route path="shell" element={<ProjectShell />} />
        <Route path="firewall" element={<ProjectFirewall />} />
        <Route path="registry" element={<ProjectRegistry />} />
        <Route path="events" element={<ProjectEvents />} />
        <Route path="monitoring" element={<ProjectMonitoring />} />
      </Route>
      
      {/* Documentation as a standalone section */}
      <Route path="/documentation/*" element={<Documentation />} />
    </Routes>
  );
}

export default App;
