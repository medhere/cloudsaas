import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Billing from './pages/Billing'
import Settings from './pages/Settings'
import TeamManagement from './pages/TeamManagement'
import ActivityLogs from './pages/ActivityLogs'
import Security from './pages/Security'
import Analytics from './pages/Analytics'
import Support from './pages/Support'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
        <Route path="team" element={<TeamManagement />} />
        <Route path="activity" element={<ActivityLogs />} />
        <Route path="security" element={<Security />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="support" element={<Support />} />
      </Route>
    </Routes>
  )
}

export default App
