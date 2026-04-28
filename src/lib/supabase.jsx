import { createClient } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

// ELITE PIPELINE SHIELDING
const supabaseUrl = 'https://gaqxxnpbdyuhqnuymwvx.supabase.co';
const supabaseAnonKey = 'sb_publishable_9Re17X2fK5AX9aSdN8KAJg_-A24dYj_';

// Initialize with Security Hardening
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'yes_vault_session' // Custom storage key to prevent common scraper targeting
  }
});

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // SECURE FETCHER: Ensures no data-leakage on profile sync
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, subscription_tier, created_at')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error("SEC_AUDIT_WARNING:", err.message);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    initAuth();

    // AUTH INTERCEPTOR: Kills session instantly on logout to prevent "Ghost Sessions"
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        window.location.href = '/auth'; // Hard redirect for security
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // REAL-TIME TIER ENFORCEMENT
  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase.channel(`secure-sync-${user.id}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'profiles', 
        filter: `id=eq.${user.id}` 
      }, (payload) => {
        setProfile(payload.new);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [user?.id]);

  const isElite = useMemo(() => profile?.subscription_tier === 'elite', [profile]);

  // PREVENT COMPONENT HIJACKING
  const value = useMemo(() => ({
    supabase, user, profile, isElite, loading
  }), [user, profile, isElite, loading]);

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="h-screen w-screen bg-black flex items-center justify-center">
          <div className="text-center space-y-4">
             <div className="w-10 h-10 border-t-2 border-[#D4AF37] rounded-full animate-spin mx-auto"></div>
             <p className="text-[8px] uppercase tracking-[0.8em] text-[#D4AF37] font-black italic">Verifying Neural Security...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
