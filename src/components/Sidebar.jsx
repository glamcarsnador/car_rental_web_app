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
import { cn } from '../lib/utils';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/gantt', icon: Calendar, label: 'Gantt' },
  { path: '/reservations', icon: BookOpen, label: 'Reservations' },
  { path: '/cars', icon: Car, label: 'Cars' },
  { path: '/clients', icon: Users, label: 'Clients' },
  { path: '/violations', icon: ShieldAlert, label: 'Violations' },
  { path: '/finances', icon: Wallet, label: 'Finances' },
  { path: '/tools', icon: Settings, label: 'Tools' },
];

export default function Sidebar() {
  const isSidebarOpen = useAuth((state) => state.isSidebarOpen);
  const toggleSidebar = useAuth((state) => state.toggleSidebar);
  const isMobileMenuOpen = useAuth((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useAuth((state) => state.toggleMobileMenu);
  const setMobileMenuOpen = useAuth((state) => state.setMobileMenuOpen);

  const NavContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full bg-[#0F172A] relative z-50 overflow-hidden">
      {/* Stationary Burger Button */}
      <div className="h-20 flex items-center shrink-0">
        <button
          onClick={mobile ? toggleMobileMenu : toggleSidebar}
          className="w-20 h-20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {navItems.map((item) => (
          <div key={item.path} className="relative group">
            <NavLink
              to={item.path}
              onClick={() => mobile && setMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center h-12 px-4 rounded-xl transition-colors duration-200",
                isActive
                  ? "bg-indigo-600/10 text-indigo-400 font-semibold"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
              )}
            >
              <item.icon size={20} className="shrink-0" />
              <span className={cn(
                "ml-4 whitespace-nowrap transition-opacity duration-300 ease-in-out",
                (!isSidebarOpen && !mobile) ? "opacity-0" : "opacity-100"
              )}>
                {item.label}
              </span>
            </NavLink>

            {/* Tooltip for Collapsed State */}
            {!isSidebarOpen && !mobile && (
              <div className="fixed left-20 px-3 py-2 bg-slate-800 text-slate-100 text-xs rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-[60] ml-2 shadow-xl">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop/Tablet Base */}
      <aside
        className="fixed left-0 top-0 bottom-0 z-50 hidden lg:block border-r border-slate-800 shoji-slide overflow-hidden"
        style={{ width: 'var(--sidebar-width)' }}
      >
        <NavContent />
      </aside>

      {/* Tablet/Mobile Overlay */}
      <aside className={cn(
        "fixed inset-0 z-50 lg:hidden transition-all duration-300",
        isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none invisible"
      )}>
        <FocusTrap active={isMobileMenuOpen}>
          <div className={cn(
            "bg-[#0F172A] h-full shadow-2xl transition-transform duration-300 ease-in-out w-[280px]",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <NavContent mobile />
          </div>
        </FocusTrap>
      </aside>
    </>
  );
}