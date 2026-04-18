import React from 'react';
import { supabase } from '../lib/supabase';
import { ShieldAlert, LogOut } from 'lucide-react';

export default function Unauthorized() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900/50 p-10 rounded-2xl border border-red-900/30 backdrop-blur-sm">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-900/20 text-red-500 mb-4">
          <ShieldAlert size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Access Denied</h2>
          <p className="text-slate-400">
            Your account is not whitelisted for access to this ERP system. Please contact the administrator for permission.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
