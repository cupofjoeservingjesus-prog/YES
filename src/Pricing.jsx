import React, { useState, useMemo } from 'react';
import { Check, Zap, Crown, ShieldCheck, Copy, Terminal, ChevronRight, Sparkles } from 'lucide-react';

/**
 * YES_PRICING_SYSTEM v6.0 // ELITE EDITION
 * Engineered for maximum conversion and manual e-transfer fulfillment.
 * Includes Hardware-Accelerated Blur and Adaptive Shadow Engines.
 */

export default function Pricing() {
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  // BUSINESS CONFIGURATION
  const ETRANSFER_EMAIL = "PAYMENTS@YOURDOMAIN.COM"; 
  const ELITE_PRICE = "$49";
  
  // High-IQ Reference Code Generation
  const SESSION_REF = useMemo(() => "YES-" + Math.random().toString(36).substring(2, 8).toUpperCase(), []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-full py-16 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. CINEMATIC OVERVIEW */}
      <div className="text-center max-w-4xl mx-auto mb-24">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-10 backdrop-blur-md">
          <Sparkles size={14} className="text-[#D4AF37]" />
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.5em]">Neural Network // Subscription Access</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.85] mb-8">
          The <span className="gold-shimmer italic">Elite</span> <br /> Tier
        </h1>
        <p className="text-[11px] text-gray-500 uppercase tracking-[0.4em] font-bold max-w-xl mx-auto leading-relaxed">
          Transition from a casual observer to a <span className="text-white">Neural Architect</span>. Unlock unlimited computing power and private server priority.
        </p>
      </div>

      {/* 2. POWER TIER ARCHITECTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        
        {/* THE OBSERVER (FREE) */}
        <div className="group relative p-12 rounded-[4rem] bg-white/[0.01] border border-white/5 flex flex-col justify-between hover:bg-white/[0.02] transition-all duration-700">
          <div>
            <div className="flex justify-between items-start mb-12">
              <div className="p-4 rounded-3xl bg-black border border-white/5 text-gray-600"><Zap size={28} /></div>
              <span className="text-[8px] font-black text-gray-700 uppercase tracking-[0.6em]">Node Level 01</span>
            </div>
            <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Standard</h4>
            <div className="flex items-baseline gap-2 mb-10">
              <span className="text-5xl font-black text-white">$0</span>
              <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">/ Access</span>
            </div>
            
            <ul className="space-y-6">
              {['3 Sequences / Mo', 'Public Render Queue', 'Standard Res Extraction', '72-Hour Storage'].map((f) => (
                <li key={f} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div> {f}
                </li>
              ))}
            </ul>
          </div>
          <button disabled className="mt-16 w-full py-7 rounded-3xl border border-white/5 text-gray-800 text-[10px] font-black uppercase tracking-[0.5em] cursor-not-allowed">
            Current Tier Active
          </button>
        </div>

        {/* THE ARCHITECT (ELITE) */}
        <div className="relative group p-1 bg-gradient-to-br from-[#D4AF37]/50 via-transparent to-[#AA771C]/30 rounded-[4rem] shadow-[0_50px_100px_-30px_rgba(212,175,55,0.2)]">
          <div className="bg-[#080808] rounded-[3.8rem] p-12 h-full flex flex-col justify-between relative overflow-hidden">
            
            {/* Visual Flair */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4AF37]/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-[3000ms]"></div>
            <div className="absolute top-10 right-10 opacity-20"><Crown size={40} className="text-[#D4AF37]" /></div>

            <div>
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em]">Unlimited Processing</h3>
                <div className="px-5 py-1.5 bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)]">Premium</div>
              </div>
              <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">The Architect Pass</h4>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-6xl font-black text-white leading-none">{ELITE_PRICE}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ Per Month</span>
              </div>

              <ul className="space-y-6">
                {[
                  'Unlimited AI Video Renders',
                  'Instant Priority Queue',
                  'Native 4K HDR Extractions',
                  'Permanent Private Vault',
                  'Commercial Project Rights'
                ].map((f) => (
                  <li key={f} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <div className="bg-[#D4AF37]/10 p-1 rounded-md">
                      <Check size={14} className="text-[#D4AF37]" strokeWidth={4} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => setShowPayment(true)}
              className="mt-16 group/btn relative w-full py-7 rounded-3xl overflow-hidden transition-all duration-500 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] group-hover/btn:brightness-110 transition-all"></div>
              <span className="relative flex items-center justify-center gap-4 text-black text-[11px] font-black uppercase tracking-[0.5em]">
                Elevate Access <ChevronRight size={16} strokeWidth={3} className="group-hover/btn:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. PAYMENT PORTAL (MANUAL BRIDGE) */}
      {showPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-[#050505] border border-white/10 p-12 rounded-[4.5rem] max-w-md w-full relative shadow-[0_0_150px_rgba(212,175,55,0.25)] ring-1 ring-white/5">
            
            <button onClick={() => setShowPayment(false)} className="absolute top-12 right-12 text-gray-600 hover:text-white transition-all uppercase text-[9px] font-black tracking-[0.5em] group flex items-center gap-2">
              Exit <span className="group-hover:translate-x-1 transition-transform">[X]</span>
            </button>
            
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-b from-[#D4AF37]/20 to-transparent rounded-full flex items-center justify-center mx-auto mb-8 border border-[#D4AF37]/30 shadow-[inset_0_0_20px_rgba(212,175,55,0.2)]">
                <ShieldCheck className="text-[#D4AF37]" size={40} strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Secure Gateway</h2>
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] mt-3 font-bold italic">Manual Fulfillment Node</p>
            </div>

            <div className="space-y-7">
              {/* Recipient */}
              <div className="group p-7 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all">
                <p className="text-[8px] text-gray-600 uppercase tracking-[0.4em] font-black mb-4 group-hover:text-[#D4AF37] transition-colors">Interac Recipient</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white font-bold tracking-[0.1em]">{ETRANSFER_EMAIL}</span>
                  <button onClick={() => handleCopy(ETRANSFER_EMAIL)} className="p-2 hover:bg-[#D4AF37] hover:text-black rounded-xl transition-all"><Copy size={18}/></button>
                </div>
              </div>

              {/* Reference ID */}
              <div className="group p-7 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[2.5rem] shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]">
                <p className="text-[8px] text-[#D4AF37] uppercase tracking-[0.5em] font-black mb-4 italic">Important: Message / Note</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white font-black tracking-[0.2em]">{SESSION_REF}</span>
                  <button onClick={() => handleCopy(SESSION_REF)} className="p-2 bg-[#D4AF37] text-black rounded-xl hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.3)]"><Copy size={18}/></button>
                </div>
              </div>

              <div className="text-center pt-6">
                 <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold leading-relaxed">
                   Transfer <span className="text-white">{ELITE_PRICE} CAD</span> to the address above. <br />
                   Verify reference matches ID exactly.
                 </p>
                 <div className="h-[1px] w-12 bg-[#D4AF37]/30 mx-auto mt-6"></div>
                 <p className="text-[7px] text-gray-700 uppercase tracking-widest mt-4">Node Processing Time: 1-4 Hours</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
