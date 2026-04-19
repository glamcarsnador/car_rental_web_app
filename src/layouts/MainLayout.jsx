import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { cn } from '../lib/utils';

export default function MainLayout() {
  const isSidebarOpen = useAuth((state) => state.isSidebarOpen);
  const isMobileMenuOpen = useAuth((state) => state.isMobileMenuOpen);
  const setMobileMenuOpen = useAuth((state) => state.setMobileMenuOpen);

  return (
    <div className={cn(
      "min-h-screen bg-body text-main font-sans transition-colors duration-300",
      !isSidebarOpen && "sidebar-collapsed"
    )}>
      {/* Sidebar is fixed to the left */}
      <Sidebar />

      {/* Main Container slides using padding */}
      <div
        className="flex flex-col min-h-screen shoji-slide relative z-10" // Added z-10 here
        style={{ paddingLeft: 'var(--sidebar-width)' }}
      >
        <Header />

        {/* REMOVED 'relative z-0' from main below */}
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}