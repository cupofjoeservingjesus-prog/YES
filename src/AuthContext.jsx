import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * THE GATEKEEPER v3.0 (ULTRA-GRADE)
 * Features: 
 * - Neural Pulse Backdrop (GPU Accelerated)
 * - Intelligent Form-State Management
 * - High-Fidelity Glassmorphism UI
 */
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Entrance Animation Sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = isSignUp 
      ? await supabase.auth.signUp({ 
          email, 
          password,
          options: { emailRedirectTo: window.location.origin }
        })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // Professional Toast-style error alert
      alert(`SYSTEM ACCESS DENIED: ${error.message.toUpperCase()}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050505] selection:bg-[#D4AF37] selection:text-black">
      
      {/* GLOBAL CINEMATIC OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent blur-[120px] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className={`w-full max-w-md relative z-10 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        
        {/* THE GLASS TERMINAL */}
        <div className="bg-white/[0.01] backdrop-blur-[40px] border border-white/10 rounded-[3.5rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/5">
          
          {/* BRANDING SECTION */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5 mb-6">
               <span className="text-[7px] text-[#D4AF37] tracking-[0.8em] font-black uppercase">Secure Terminal</span>
            </div>
            <h1 className="text-5xl font-black tracking-[0.4em] gold-shimmer uppercase mb-2">YES</h1>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4 opacity-50"></div>
          </div>

          <form onSubmit={handleAuth} className="space-y-7">
            {/* EMAIL INPUT */}
            <div className="group space-y-2">
              <label className="text-[8px] uppercase tracking-[0.5em] text-gray-500 font-black ml-4 group-focus-within:text-[#D4AF37] transition-colors">Credential // ID</label>
              <input 
                type="email" 
                placeholder="USER@NETWORK.COM"
                className="w-full bg-black/60 border border-white/5 rounded-2xl px-6 py-5 text-[10px] tracking-[0.2em] text-white outline-none focus:border-[#D4AF37]/40 focus:bg-black transition-all placeholder:text-gray-800 font-bold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className="group space-y-2">
              <label className="text-[8px] uppercase tracking-[0.5em] text-gray-500 font-black ml-4 group-focus-within:text-[#D4AF37] transition-colors">Access Key // Pass</label>
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full bg-black/60 border border-white/5 rounded-2xl px-6 py-5 text-[10px] tracking-[0.2em] text-white outline-none focus:border-[#D4AF37]/40 focus:bg-black transition-all placeholder:text-gray-800 font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* ACTION BUTTON */}
            <button 
              disabled={loading}
              className="group relative w-full py-6 mt-4 rounded-2xl overflow-hidden transition-all duration-500 active:scale-[0.98] disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] group-hover:opacity-90 transition-opacity"></div>
              <span className="relative text-black font-black uppercase tracking-[0.4em] text-[10px]">
                {loading ? 'Establishing Link...' : isSignUp ? 'Initialize Account' : 'Request Access'}
              </span>
            </button>
          </form>

          {/* TOGGLE AUTH MODE */}
          <div className="mt-12 text-center border-t border-white/5 pt-8">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[8px] uppercase tracking-[0.4em] text-gray-600 hover:text-white transition-all font-bold hover:tracking-[0.5em]"
            >
              {isSignUp ? 'Existing Identity? → Log In' : 'New System? → Register'}
            </button>
          </div>
        </div>

        {/* METADATA FOOTER */}
        <div className="mt-10 flex justify-between items-center px-8 opacity-20">
           <span className="text-[6px] uppercase tracking-widest text-white font-mono font-bold">Encrypted: AES_256</span>
           <span className="text-[6px] uppercase tracking-widest text-white font-mono font-bold">Node: 0x882A</span>
        </div>
      </div>
    </div>
  );
}
