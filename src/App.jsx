import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
  // Since we're using createBrowserRouter in main.jsx, this component just renders its children
  return <Outlet />;
}

export default App;
