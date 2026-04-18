import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuth = create((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  initialized: false,
  isHandshakeComplete: false,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setHandshakeComplete: (status) => set({ isHandshakeComplete: status }),

  initialize: async () => {
    if (get().initialized) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;
      
      let profile = null;
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        profile = data;
      }

      set({ user, profile, loading: false, initialized: true });

      // Artificial short delay for the "handshake" aesthetic if requested
      // but the user said they stay active indefinitely, so we must ensure it ends.
      setTimeout(() => {
        set({ isHandshakeComplete: true });
      }, 800);

      supabase.auth.onAuthStateChange(async (event, session) => {
        const newUser = session?.user ?? null;
        if (event === 'SIGNED_OUT') {
          set({ user: null, profile: null, loading: false, isHandshakeComplete: false });
          return;
        }

        if (newUser) {
          const { data } = await supabase.from('profiles').select('*').eq('id', newUser.id).maybeSingle();
          set({ user: newUser, profile: data, loading: false, isHandshakeComplete: true });
        } else {
          set({ user: null, profile: null, loading: false, isHandshakeComplete: false });
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ loading: false, initialized: true, isHandshakeComplete: true });
    }
  }
}));


