import React from 'react';
import { NavLink } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Car,
  Users,
  ShieldAlert,
  Wallet,
  Settings,
  Menu
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/', icon: LayoutDashboard, key: 'dashboard' },
  { path: '/gantt', icon: Calendar, key: 'gantt' },
  { path: '/reservations', icon: BookOpen, key: 'reservations' },
  { path: '/cars', icon: Car, key: 'cars' },
  { path: '/clients', icon: Users, key: 'clients' },
  { path: '/violations', icon: ShieldAlert, key: 'violations' },
  { path: '/finances', icon: Wallet, key: 'finances' },
  { path: '/tools', icon: Settings, key: 'tools' },
];

export default function Sidebar() {
  const isSidebarOpen = useAuth((state) => state.isSidebarOpen);
  const toggleSidebar = useAuth((state) => state.toggleSidebar);
  const isMobileMenuOpen = useAuth((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useAuth((state) => state.toggleMobileMenu);
  const setMobileMenuOpen = useAuth((state) => state.setMobileMenuOpen);
  const { t } = useTranslation();

  const NavContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full bg-sidebar relative z-50 overflow-hidden transition-colors duration-300">
      {/* Stationary Burger Button */}
      <div className="h-20 flex items-center shrink-0">
        <button
          onClick={mobile ? toggleMobileMenu : toggleSidebar}
          className="w-20 h-20 flex items-center justify-center text-muted hover:text-main hover:bg-module transition-colors focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {navItems.map((item) => {
          const label = t(item.key);
          return (
            <div key={item.path} className="relative group">
              <NavLink
                to={item.path}
                onClick={() => mobile && setMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center h-12 px-4 rounded-xl transition-colors duration-200",
                  isActive
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-muted hover:bg-module hover:text-main"
                )}
              >
                <item.icon size={20} className="shrink-0" />
                <span className={cn(
                  "ml-4 whitespace-nowrap transition-opacity duration-300 ease-in-out",
                  (!isSidebarOpen && !mobile) ? "opacity-0" : "opacity-100"
                )}>
                  {label}
                </span>
              </NavLink>

              {/* Tooltip for Collapsed State */}
              {!isSidebarOpen && !mobile && (
                <div className="fixed left-20 px-3 py-2 bg-module text-main text-xs rounded-lg border border-border opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-[60] ml-2 shadow-xl">
                  {label}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop/Tablet Base */}
      <aside
        className="fixed left-0 top-0 bottom-0 z-50 hidden lg:block border-r border-border shoji-slide overflow-hidden transition-colors"
        style={{ width: 'var(--sidebar-width)' }}
      >
        <NavContent />
      </aside>

      {/* Tablet/Mobile Overlay */}
      <aside className={cn(
        "fixed inset-0 z-[100] lg:hidden transition-all duration-500",
        isMobileMenuOpen ? "visible" : "invisible"
      )}>
        {/* The Foggy Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* FIX: We only active the trap when the menu is open. 
      We also add a fallback focus to the container itself.
  */}
        <FocusTrap
          active={isMobileMenuOpen}
          focusTrapOptions={{
            fallbackFocus: '#mobile-menu-container',
            clickOutsideDeactivates: true
          }}
        >
          <div
            id="mobile-menu-container"
            className={cn(
              "relative h-full outline-none transition-all duration-500 ease-out",
              isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
            style={{ width: 'clamp(280px, 80vw, 320px)' }}
          >
            <NavContent mobile />
          </div>
        </FocusTrap>
      </aside>       </>
  );
}