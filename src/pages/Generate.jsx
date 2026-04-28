import React, { useState } from 'react';

/**
 * THE NEURAL FORGE (Generate Page)
 * This is the high-fidelity video generation interface.
 * Upgraded with glassmorphism and metallic gold accents.
 */
export default function Generate() {
  const [isRendering, setIsRendering] = useState(false);

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in duration-1000">
      
      {/* Header Section */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold mb-2">Neural Forge</h2>
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase">Create <span className="gold-shimmer">Sequence</span></h1>
        </div>
        <div className="flex gap-4">
           <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-gray-400 backdrop-blur-md">
             Engine: <span className="text-white font-bold">YES-V3-ALPHA</span>
           </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        
        {/* Left: Configuration Panel */}
        <aside className="w-full lg:w-96 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          
          <div className="space-y-4">
            <label className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold ml-1">Cinematic Prompt</label>
            <textarea 
              className="w-full bg-black/40 border border-white/5 rounded-[2rem] p-6 text-sm text-gray-200 focus:border-[#D4AF37]/50 focus:bg-black/60 outline-none transition-all h-64 resize-none shadow-2xl ring-0"
              placeholder="Describe your cinematic vision... (e.g. 'A futuristic library floating in space, hyper-detailed, 8k')"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold ml-1">Ratio</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-[10px] uppercase tracking-widest text-white outline-none hover:bg-white/10 cursor-pointer appearance-none">
                <option>16:9 Cinematic</option>
                <option>9:16 Vertical</option>
                <option>2.39:1 Anamorphic</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold ml-1">Motion</label>
              <div className="h-12 flex items-center">
                <input type="range" className="w-full accent-[#D4AF37] bg-white/10 rounded-lg appearance-none cursor-pointer h-1" />
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsRendering(true)}
            className="mt-4 w-full py-6 rounded-[2rem] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] text-black font-black uppercase tracking-[0.3em] text-[10px] shadow-[0_20px_50px_rgba(212,175,55,0.2)] hover:shadow-[0_25px_60px_rgba(212,175,55,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-500"
          >
            {isRendering ? 'Connecting Neural Link...' : 'Initialize Render'}
          </button>
        </aside>

        {/* Right: Premium Preview Viewport */}
        <section className="flex-1 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[4.5rem] relative overflow-hidden flex items-center justify-center group shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
          
          {/* Status Indicators */}
          <div className="absolute top-12 left-12 flex items-center gap-3">
             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]"></div>
             <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold italic">Monitor_01 // Live Feed</span>
          </div>

          <div className="text-center relative z-10 p-10">
             {isRendering ? (
               <div className="flex flex-col items-center gap-8">
                 <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className="absolute inset-0 border-t-2 border-[#D4AF37] rounded-full animate-spin"></div>
                    <div className="absolute inset-4 border-b-2 border-[#D4AF37]/30 rounded-full animate-spin-slow"></div>
                 </div>
                 <p className="gold-shimmer text-[11px] tracking-[0.8em] font-black animate-pulse">SYNTHESIZING DATA</p>
               </div>
             ) : (
               <div className="flex flex-col items-center opacity-10 group-hover:opacity-30 transition-all duration-1000 transform group-hover:scale-110">
                 <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center mb-8">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    </svg>
                 </div>
                 <p className="text-[11px] uppercase tracking-[1.5em] font-light text-white">Standby for Sequence</p>
               </div>
             )}
          </div>

          {/* Corner Decors */}
          <div className="absolute top-12 right-12 text-[8px] text-gray-700 font-mono tracking-[0.5em] uppercase">
            REF: YES_FORGE_X_2026
          </div>
          <div className="absolute bottom-12 right-12 text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold border-l border-white/10 pl-6">
            Resolution: <span className="text-[#D4AF37]">Native 4K</span>
          </div>
        </section>

      </div>
    </div>
  );
}
