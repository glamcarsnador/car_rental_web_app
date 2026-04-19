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
      "min-h-screen bg-body-bg text-main-text font-sans transition-all",
      !isSidebarOpen && "sidebar-collapsed"
    )}>
      {/* Sidebar is fixed to the left */}
      <Sidebar />

      {/* Main Container slides using padding */}
      <div
        className="flex flex-col min-h-screen shoji-slide"
        style={{ paddingLeft: 'var(--sidebar-width)' }}
      >
        <Header />

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
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}