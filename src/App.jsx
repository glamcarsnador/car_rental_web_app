import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthGate from './components/AuthGate';
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import Dashboard from './pages/Dashboard';
import Gantt from './pages/Gantt';
import Reservations from './pages/Reservations';
import Cars from './pages/cars';
import Clients from './pages/clients';
import Violations from './pages/Violations';
import Finances from './pages/Finances';
import Tools from './pages/tools';
import { useConfigStore } from './hooks/useConfigStore';

export default function App() {
  // Initialize configuration (Theme/Persistence)
  React.useEffect(() => {
    useConfigStore.getState().initTheme();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected ERP Shell */}
        <Route
          path="/"
          element={
            <AuthGate>
              <MainLayout />
            </AuthGate>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="gantt" element={<Gantt />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="cars" element={<Cars />} />
          <Route path="clients" element={<Clients />} />
          <Route path="violations" element={<Violations />} />
          <Route path="finances" element={<Finances />} />
          <Route path="tools" element={<Tools />} />
          
          {/* Catch-all for protected area */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Global Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}