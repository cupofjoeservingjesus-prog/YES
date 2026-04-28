import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/supabase';

export default function Auth() {
  const { supabase, user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Instant Redirect if session exists
  useEffect(() => {
    if (user) navigate('/');
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (isSignUp) {
      // 🚀 SUPERIOR SIGN UP: Create Auth and Database Profile simultaneously
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { emailRedirectTo: window.location.origin }
      });

      if (error) {
        alert(`SYSTEM ACCESS DENIED: ${error.message.toUpperCase()}`);
      } else if (data?.user) {
        // Automatically inject a "Basic" tier record for the new user
        await supabase.from('profiles').insert([
          { id: data.user.id, tier: 'free', email: email }
        ]);
        alert("NEURAL LINK ESTABLISHED: CHECK EMAIL FOR VERIFICATION");
      }
    } else {
      // STANDARD SIGN IN
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(`ACCESS DENIED: ${error.message.toUpperCase()}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050505]">
      
      {/* SUPERIOR AMBIANCE: Neural Gold Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF3715_0%,transparent_70%)] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className={`w-full max-w-md relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        
        <div className="bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl ring-1 ring-white/5">
          
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 border border-[#D4AF37]/20 rounded-full bg-[#D4AF37]/5 mb-4">
               <span className="text-[8px] text-[#D4AF37] tracking-[0.6em] font-black uppercase">Identity Node</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter gold-shimmer uppercase leading-none">YES</h1>
            <p className="text-[9px] text-gray-600 tracking-[0.4em] uppercase mt-4 font-bold">Neural Generation Protocol</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-[0.4em] text-gray-500 font-bold ml-4">Credential // ID</label>
              <input 
                type="email" 
                placeholder="USER@NETWORK.COM"
                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-[11px] tracking-widest text-white outline-none focus:border-[#D4AF37]/30 transition-all placeholder:text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-[0.4em] text-gray-500 font-bold ml-4">Access Key // Pass</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-[11px] tracking-widest text-white outline-none focus:border-[#D4AF37]/30 transition-all placeholder:text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              disabled={loading}
              className="group relative w-full py-6 mt-2 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_-5px_#D4AF3760] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C]"></div>
              <span className="relative text-black font-black uppercase tracking-[0.3em] text-[11px]">
                {loading ? 'Linking...' : isSignUp ? 'Create Identity' : 'Authorize Access'}
              </span>
            </button>
          </form>

          <div className="mt-10 text-center border-t border-white/5 pt-6">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[9px] uppercase tracking-widest text-gray-500 hover:text-[#D4AF37] transition-all font-bold"
            >
              {isSignUp ? 'Return to Login' : 'Register New Node'}
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center opacity-30">
           <span className="text-[7px] uppercase tracking-[0.5em] text-white font-bold italic">Unbreakable Architecture</span>
        </div>
      </div>
    </div>
  );
}
