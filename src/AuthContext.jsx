import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/supabase'; 

/**
 * YES_AUTH_TERMINAL v4.0 // ELITE EDITION
 * Features: Automatic Profile Provisioning, Session Persistence, & Hardware-Accelerated UI.
 */

export default function Auth() {
  const { supabase, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 🛡️ REDIRECT ENGINE: Kick to Dashboard if session is active
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/');
    }
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [user, authLoading, navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    
    try {
      if (isSignUp) {
        // 🚀 PROVISIONING: Auth + Database Entry
        const { data, error } = await supabase.auth.signUp({ 
          email: email.trim().toLowerCase(), 
          password,
          options: { emailRedirectTo: window.location.origin }
        });

        if (error) throw error;

        if (data?.user) {
          // Immediately register the node in the 'profiles' table
          await supabase.from('profiles').insert([
            { 
              id: data.user.id, 
              tier: 'free', 
              email: email.trim().toLowerCase() 
            }
          ]);
          alert("NEURAL LINK ESTABLISHED: CHECK EMAIL TO ACTIVATE NODE.");
        }
      } else {
        // 🛡️ ACCESS REQUEST: Standard Sign-In
        const { error } = await supabase.auth.signInWithPassword({ 
          email: email.trim().toLowerCase(), 
          password 
        });
        if (error) throw error;
        // Navigation is handled by the useEffect redirect
      }
    } catch (error) {
      alert(`SYSTEM ERROR: ${error.message.toUpperCase()}`);
    } finally {
      setLoading(false);
    }
  };

  // Prevent UI flickering while checking session status
  if (authLoading) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050505] selection:bg-[#D4AF37] selection:text-black font-sans">
      
      {/* CINEMATIC NEURAL OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF3715_0%,transparent_70%)] animate-pulse duration-[4000ms]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className={`w-full max-w-md relative z-10 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        
        <div className="bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/5">
          
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 border border-[#D4AF37]/20 rounded-full bg-[#D4AF37]/5 mb-6">
               <span className="text-[8px] text-[#D4AF37] tracking-[0.5em] font-black uppercase">Identity Node 0x82</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter gold-shimmer uppercase leading-none">YES</h1>
            <p className="text-[9px] text-gray-600 tracking-[0.4em] uppercase mt-5 font-bold italic">Verification Protocol Required</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="group space-y-2">
              <label className="text-[8px] uppercase tracking-[0.5em] text-gray-500 font-black ml-4 group-focus-within:text-[#D4AF37] transition-colors">Credential // ID</label>
              <input 
                type="email" 
                placeholder="USER@NETWORK.COM"
                className="w-full bg-black/60 border border-white/5 rounded-2xl px-6 py-5 text-[11px] tracking-widest text-white outline-none focus:border-[#D4AF37]/30 focus:bg-black transition-all placeholder:text-gray-800 font-bold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="group space-y-2">
              <label className="text-[8px] uppercase tracking-[0.5em] text-gray-500 font-black ml-4 group-focus-within:text-[#D4AF37] transition-colors">Access Key // Pass</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-black/60 border border-white/5 rounded-2xl px-6 py-5 text-[11px] tracking-widest text-white outline-none focus:border-[#D4AF37]/30 focus:bg-black transition-all placeholder:text-gray-800 font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button 
              disabled={loading}
              className="group relative w-full py-6 mt-4 rounded-2xl overflow-hidden transition-all duration-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] group-hover:opacity-90 transition-opacity"></div>
              <span className="relative text-black font-black uppercase tracking-[0.4em] text-[11px]">
                {loading ? 'Initializing...' : isSignUp ? 'Create Identity' : 'Authorize Access'}
              </span>
            </button>
          </form>

          <div className="mt-12 text-center border-t border-white/5 pt-8">
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[9px] uppercase tracking-[0.3em] text-gray-600 hover:text-[#D4AF37] transition-all font-bold hover:tracking-[0.4em]"
            >
              {isSignUp ? 'Back to Terminal Log' : 'Register New Node Access'}
            </button>
          </div>
        </div>

        {/* SYSTEM DECORATION */}
        <div className="mt-10 flex justify-between items-center px-10 opacity-20">
           <span className="text-[7px] uppercase tracking-widest text-white font-mono font-bold">Encrypted: AES_256</span>
           <span className="text-[7px] uppercase tracking-widest text-white font-mono font-bold">Node: 0x882A</span>
        </div>
      </div>
    </div>
  );
}
