import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AuthGate({ children }) {
  const { user, profile, loading, initialized, initialize } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  if (loading || !initialized) {
    return (
      <div className="min-h-screen bg-body-bg flex items-center justify-center transition-colors duration-500">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent-indigo border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-text font-medium animate-pulse">Establishing Secure Session...</p>
        </div>
      </div>
    );
  }

  // Not logged in -> Redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but not whitelisted -> Redirect to unauthorized
  if (!profile || !profile.is_whitelisted) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
