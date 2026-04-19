import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useTimeStore = create((set, get) => ({
  currentTime: new Date(),
  drift: 0, // Server Time minus Local Time in ms
  isSynced: false,

  sync: async () => {
    try {
      const startTime = Date.now();
      const { data, error } = await supabase.rpc('get_server_time');
      const endTime = Date.now();
      
      if (error) throw error;

      // Estimate network latency (half round trip)
      const latency = (endTime - startTime) / 2;
      const serverTime = new Date(data).getTime();
      const localTimeAtServerMoment = endTime - latency;
      
      const drift = serverTime - localTimeAtServerMoment;
      
      set({ 
        drift, 
        isSynced: true,
        currentTime: new Date(Date.now() + drift)
      });
      
      console.log(`[TimeStore] Synced with Morocco Server. Drift: ${drift}ms, Latency: ${latency}ms`);
    } catch (err) {
      console.error('[TimeStore] Sync failed:', err);
      // Fallback to local time if sync fails
      set({ isSynced: false });
    }
  },

  updateTime: () => {
    set({ currentTime: new Date(Date.now() + get().drift) });
  }
}));

// Initialize the heartbeat
let tickInterval;
export const initTimeHeartbeat = () => {
  if (tickInterval) clearInterval(tickInterval);
  
  // Initial sync
  useTimeStore.getState().sync();
  
  // Heartbeat every second
  tickInterval = setInterval(() => {
    useTimeStore.getState().updateTime();
  }, 1000);

  // Re-sync on visibility change (browser tab becomes active)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      useTimeStore.getState().sync();
    }
  });
};
