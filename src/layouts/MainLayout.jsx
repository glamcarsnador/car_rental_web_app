import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { cn } from '../lib/utils';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A192F] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div 
        className={cn(
          "grid transition-all duration-300 ease-in-out min-h-screen",
          "grid-areas-mobile lg:grid-areas-desktop",
          isSidebarOpen ? "lg:grid-cols-[280px_1fr]" : "lg:grid-cols-[0px_1fr]"
        )}
        style={{
          gridTemplateAreas: isSidebarOpen 
            ? '"sidebar header" "sidebar main" "sidebar footer"'
            : '"header header" "main main" "footer footer"',
          gridTemplateRows: 'auto 1fr auto',
        }}
      >
        {/* Sidebar Module */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          isMobileOpen={isMobileMenuOpen}
          setIsMobileOpen={setIsMobileMenuOpen}
        />

        {/* Header Module */}
        <Header 
          isSidebarOpen={isSidebarOpen} 
          setIsMobileOpen={setIsMobileMenuOpen}
        />

        {/* Main Content Region */}
        <main className="grid-in-main p-6 sm:p-8 lg:p-10 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>

        {/* Footer Module */}
        <Footer />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
