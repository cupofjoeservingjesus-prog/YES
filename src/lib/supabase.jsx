import { createClient } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

// ────────────────────────────────────────────────────────────
// MARKET DOMINANCE PIPELINE CONFIG
// ────────────────────────────────────────────────────────────
const supabaseUrl = 'https://gaqxxnpbdyuhqnuymwvx.supabase.co';
const supabaseAnonKey = 'sb_publishable_9Re17X2fK5AX9aSdN8KAJg_-A24dYj_';

// Initializing with "Auto-Refresh" enabled for zero-friction sessions
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Optimized Profile Fetcher with Memoization
  const fetchProfile = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      if (data) setProfile(data);
    } catch (err) {
      console.warn("PROFILE_SYNC_ISSUE:", err.message);
      // Fallback for new users who haven't had a profile record created yet
      setProfile({ subscription_tier: 'free' });
    }
  }, []);

  useEffect(() => {
    // 1. Initial Deep-Sync
    const syncSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    syncSession();

    // 2. Real-Time Auth Interceptor
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  // 3. SECURE REAL-TIME SUBSCRIPTION ENGINE
  useEffect(() => {
    if (!user?.id) return;

    // Use a unique channel ID to prevent cross-talk
    const channelId = `nexus-gate-${user.id}`;
    const channel = supabase
      .channel(channelId)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'profiles',
        filter: `id=eq.${user.id}`
      }, (payload) => {
        // Log update for dev-audit, then update state immediately
        console.log("SUBSCRIPTION_LEVEL_CHANGE_DETECTED");
        setProfile(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  // MARKET DOMINANCE FLAGS
  const isElite = useMemo(() => profile?.subscription_tier === 'elite', [profile]);
  const isAdmin = useMemo(() => profile?.role === 'admin', [profile]);

  const value = useMemo(() => ({
    supabase,
    user,
    profile,
    isElite,
    isAdmin,
    loading,
    signOut: () => supabase.auth.signOut(),
    refreshProfile: () => fetchProfile(user?.id)
  }), [user, profile, isElite, isAdmin, loading, fetchProfile]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("CRITICAL_ERR: useAuth accessed outside of Provider context.");
  }
  return context;
};
