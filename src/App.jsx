import React, { useState } from 'react';

export default function Generate() {
  const [isRendering, setIsRendering] = useState(false);

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in duration-1000">
      
      {/* Header Section */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold mb-2">Neural Forge</h2>
          <h1 className="text-4xl font-black tracking-tighter">CREATE <span className="gold-shimmer">SEQUENCE</span></h1>
        </div>
        <div className="flex gap-4">
           <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] uppercase tracking-widest text-gray-400">
             Model: <span className="text-white">YES-V3-ALPHA</span>
           </div>
        </div>
      </header>

      <div className="flex-1 flex gap-8 min-h-0">
        
        {/* Left: Configuration Panel */}
        <aside className="w-96 flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar">
          
          <div className="space-y-3">
            <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">Cinematic Prompt</label>
            <textarea 
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm focus:border-[#D4AF37]/50 outline-none transition-all h-48 resize-none ring-0 shadow-inner"
              placeholder="A futuristic city submerged in neon gold light, drone shot, 8k resolution..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">Aspect Ratio</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-[10px] uppercase tracking-widest outline-none appearance-none">
                <option>16:9 Cinema</option>
                <option>9:16 Mobile</option>
                <option>1:1 Square</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">Motion Scale</label>
              <input type="range" className="w-full accent-[#D4AF37] bg-white/10 rounded-lg appearance-none cursor-pointer h-1" />
            </div>
          </div>

          <button 
            onClick={() => setIsRendering(true)}
            className="mt-4 w-full py-5 rounded-2xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] text-black font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_40px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            {isRendering ? 'Processing Neural Link...' : 'Initialize Render'}
          </button>
        </aside>

        {/* Right: Preview Viewport */}
        <section className="flex-1 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden flex items-center justify-center group shadow-2xl">
          
          {/* Viewport UI Decor */}
          <div className="absolute top-8 left-8 flex items-center gap-2">
             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
             <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500">Live Viewport</span>
          </div>

          <div className="text-center relative z-10">
             {isRendering ? (
               <div className="flex flex-col items-center gap-6">
                 <div className="w-24 h-24 border-t-2 border-[#D4AF37] rounded-full animate-spin"></div>
                 <p className="gold-shimmer text-[10px] tracking-[0.6em] animate-pulse">SYNTHESIZING FRAME DATA</p>
               </div>
             ) : (
               <div className="flex flex-col items-center opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                 <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 </div>
                 <p className="text-[10px] uppercase tracking-[1em] font-bold">Waiting for Input</p>
               </div>
             )}
          </div>

          {/* Corner Decors */}
          <div className="absolute top-0 right-0 p-8 text-[8px] text-gray-700 font-mono tracking-widest">
            SEC_552_AUTH_001
          </div>
          <div className="absolute bottom-8 right-8 text-[9px] text-white/40 uppercase tracking-widest font-bold">
            Resolution: <span className="text-[#D4AF37]">4K_UHD</span>
          </div>
        </section>

      </div>
    </div>
  );
}
