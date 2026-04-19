import React from 'react';
import { supabase } from '../lib/supabase';
import { Car } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Login() {
  const { t, language } = useTranslation();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  return (
    <div className="min-h-screen bg-body flex items-center justify-center p-4 transition-colors duration-500">
      <div className="max-w-md w-full space-y-8 bg-module/50 p-8 rounded-2xl border border-border backdrop-blur-sm shadow-2xl">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 text-accent mb-4">
            <Car size={48} />
          </div>
          <h2 className="text-3xl font-bold text-main">Glam Cars ERP</h2>
          <p className="text-muted font-medium">{t('industrial_erp')}</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-card hover:bg-module text-main font-bold py-4 px-4 rounded-xl transition-all duration-200 border border-border shadow-lg"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          {language === 'EN' ? 'Sign in with Google' : 'تسجيل الدخول باستخدام جوجل'}
        </button>

        <p className="text-center text-xs text-muted font-medium">
          {language === 'EN' 
            ? 'This system is restricted to whitelisted personnel only.' 
            : 'هذا النظام مخصص للموظفين المصرح لهم فقط.'}
        </p>
      </div>
    </div>
  );
}
