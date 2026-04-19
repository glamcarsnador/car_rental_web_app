import React from 'react';
import { supabase } from '../lib/supabase';
import { Car } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Login() {
  const { t, language } = useTranslation();

  const handleGoogleLogin = async () => {
    const origin = window.location.origin;
    // We add the trailing slash specifically because Supabase is strict about matching
    const targetRedirect = `${origin}/car_rental_web_app/`;

    console.log("SENDING TO SUPABASE WITH REDIRECT:", targetRedirect);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Force the redirect to the current domain
        redirectTo: targetRedirect,
        // This ensures the redirect is handled as a flow, not a site default
        skipBrowserRedirect: false,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
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
          className="w-full flex items-center justify-center gap-3 bg-card hover:bg-module text-main font-bold py-4 px-4 rounded-xl transition-all duration-200 border border-border shadow-lg group"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-6 h-6 transition-transform group-hover:scale-110"
          />
          <span>
            {language === 'EN' ? 'Sign in with Google' : 'تسجيل الدخول باستخدام جوجل'}
          </span>
        </button>

        <p className="text-center text-xs text-muted font-medium leading-relaxed">
          {language === 'EN'
            ? 'This system is restricted to whitelisted personnel only.'
            : 'هذا النظام مخصص للموظفين المصرح لهم فقط.'}
        </p>
      </div>
    </div>
  );
}