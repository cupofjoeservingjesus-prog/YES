import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────
// Supabase client
// ─────────────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
const AuthContext = createContext({
  user: null,
  supabase: null,
  loading: true,
  sessionExpired: false,
  networkError: false,
  signOut: async () => {},
});

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Session error:", error.message);
      }
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_OUT") {
        setSessionExpired(true);
        setUser(null);
      } else if (_event === "SIGNED_IN") {
        setSessionExpired(false);
        setUser(session?.user ?? null);
      } else if (_event === "TOKEN_REFRESHED") {
        setUser(session?.user ?? null);
      } else {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    // Network status listeners
    const handleOffline = () => setNetworkError(true);
    const handleOnline = () => setNetworkError(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSessionExpired(false);
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  }, []);

  const value = {
    user,
    supabase,
    loading,
    sessionExpired,
    networkError,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}

export default AuthContext;
