import React from 'react';
import { supabase } from '../lib/supabase';
import { ShieldAlert, LogOut } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Unauthorized() {
  const { t, language } = useTranslation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-body flex items-center justify-center p-4 transition-colors duration-500">
      <div className="max-w-md w-full text-center space-y-6 bg-module/50 p-10 rounded-2xl border border-red-500/20 backdrop-blur-sm shadow-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 text-red-500 mb-4">
          <ShieldAlert size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-main">
            {language === 'EN' ? 'Access Denied' : 'تم رفض الوصول'}
          </h2>
          <p className="text-muted font-medium">
            {language === 'EN' 
              ? 'Your account is not whitelisted for access to this ERP system. Please contact the administrator for permission.' 
              : 'حسابك غير مدرج في القائمة البيضاء للوصول إلى هذا النظام. يرجى الاتصال بالمسؤول للحصول على إذن.'}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 bg-module hover:bg-border text-main font-bold py-3 px-8 rounded-xl transition-all duration-200 border border-border"
        >
          <LogOut size={20} />
          {t('logout')}
        </button>
      </div>
    </div>
  );
}
