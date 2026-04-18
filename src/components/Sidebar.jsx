import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Car, 
  Users, 
  ShieldAlert, 
  Wallet, 
  Settings,
  ChevronLeft,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/gantt', icon: Calendar, label: 'Gantt Calendar' },
  { path: '/reservations', icon: BookOpen, label: 'Reservations' },
  { path: '/cars', icon: Car, label: 'Cars' },
  { path: '/clients', icon: Users, label: 'Clients' },
  { path: '/violations', icon: ShieldAlert, label: 'Violations' },
  { path: '/finances', icon: Wallet, label: 'Finances' },
  { path: '/tools', icon: Settings, label: 'Tools' },
];

export default function Sidebar({ isOpen, setIsOpen, isMobileOpen, setIsMobileOpen }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "grid-in-sidebar hidden lg:flex flex-col bg-[#0F172A] border-r border-slate-800 transition-all duration-300 relative",
          isOpen ? "w-[280px]" : "w-0 overflow-hidden border-0"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800 h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Car size={24} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Glam Cars</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-600/10 text-indigo-400 font-semibold" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
              )}
            >
              <item.icon size={20} className="shrink-0 transition-transform group-hover:scale-110" />
              <span className="whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-[#0F172A] border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800 h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Car size={24} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Glam Cars</span>
          </div>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-indigo-600/10 text-indigo-400 font-semibold" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
              )}
            >
              <item.icon size={20} className="shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
