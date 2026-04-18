import React from 'react';
import { supabase } from '../lib/supabase';
import { Car } from 'lucide-react';

export default function Login() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-600/20 text-indigo-500 mb-4">
            <Car size={48} />
          </div>
          <h2 className="text-3xl font-bold text-white">Glam Cars ERP</h2>
          <p className="text-slate-400">Please sign in to access the dashboard</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-4 px-4 rounded-xl transition-all duration-200"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          Sign in with Google
        </button>

        <p className="text-center text-xs text-slate-500">
          This system is restricted to whitelisted personnel only.
        </p>
      </div>
    </div>
  );
}
