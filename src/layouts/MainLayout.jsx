import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useConfigStore } from '../hooks/useConfigStore';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { cn } from '../lib/utils';

export default function MainLayout() {
  const isSidebarOpen = useAuth((state) => state.isSidebarOpen);
  const isMobileMenuOpen = useAuth((state) => state.isMobileMenuOpen);
  const setMobileMenuOpen = useAuth((state) => state.setMobileMenuOpen);
  const theme = useConfigStore((state) => state.theme);

  // Robust HTML Class Sync
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={cn(
      "min-h-screen bg-body text-main font-sans overflow-x-hidden",
      !isSidebarOpen && "sidebar-collapsed"
    )}>
      <Sidebar />

      {/* Remove the style={{ paddingLeft }} and use lg:pl-[var(--sidebar-width)] */}
      <div className="flex flex-col min-h-screen shoji-slide relative z-10 lg:pl-[var(--sidebar-width)]">
        <Header />

        {/* Adjusted padding for mobile (p-4) vs desktop (p-10) */}
        <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-x-hidden overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>

      {/* Mobile Overlay - Ensure it's active */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}