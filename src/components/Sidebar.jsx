import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Video, Zap, Settings, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ isElite }) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Vault', path: '/' },
    { icon: Video, label: 'Generate', path: '/generate' },
    { icon: Zap, label: 'Neural Flow', path: '/flow' },
    { icon: Settings, label: 'System', path: '/settings' },
  ];

  return (
    <motion.div 
      initial={{ x: -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-72 h-screen border-r border-white/5 flex flex-col p-8 relative z-50 bg-midnight/80 backdrop-blur-4xl"
    >
      {/* ELITE EDGE GLOW: Ties into the brand gold token */}
      {isElite && (
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-gold-primary/50 to-transparent shadow-[0_0_25px_rgba(191,149,63,0.3)]" />
      )}

      {/* BRANDING: Neural Core Logo */}
      <div className="mb-16 px-4">
        <h2 className="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-gold-primary via-gold-shimmer to-gold-dark bg-clip-text text-transparent animate-shimmer-gold bg-[length:200%_auto]">
          YES
        </h2>
        <p className="text-[8px] tracking-[0.6em] text-white/20 uppercase mt-3 font-black">Neural Engine v4.2</p>
      </div>

      {/* NAVIGATION: Kinetic Luxury Interaction */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-700 relative overflow-hidden
              ${isActive 
                ? 'bg-white/[0.04] border border-white/10 text-white shadow-[0_10px_40px_rgba(0,0,0,0.6)]' 
                : 'text-white/30 hover:text-white hover:bg-white/[0.02]'}
            `}
          >
            <item.icon 
              size={18} 
              strokeWidth={isActive ? 2.5 : 1.5} 
              className={isActive ? 'text-gold-primary' : 'group-hover:text-gold-shimmer transition-colors'} 
            />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{item.label}</span>
            
            {/* Active Indicator Light */}
            {({ isActive }) => isActive && (
              <motion.div 
                layoutId="activeGlow" 
                className="absolute left-0 w-[2px] h-4 bg-gold-primary rounded-full"
              />
            )}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER: Elite Node Status Portal */}
      <div className="mt-auto px-2">
        <div className={`p-6 rounded-[2.5rem] border transition-all duration-1000 relative overflow-hidden ${
          isElite ? 'border-gold-primary/20 bg-gold-primary/5' : 'border-white/5 bg-white/[0.01]'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Crown size={12} className={isElite ? 'text-gold-primary animate-pulse' : 'text-white/10'} />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/90">
                {isElite ? 'Elite Node' : 'Standard'}
              </span>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-gold-primary animate-ping" />
              <div className="w-1 h-1 rounded-full bg-gold-primary" />
            </div>
          </div>
          
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: isElite ? '100%' : '35%' }}
               transition={{ duration: 2.5, ease: "circOut" }}
               className="h-full bg-gradient-to-r from-gold-dark via-gold-primary to-gold-shimmer"
             />
          </div>
          <p className="text-[7px] text-white/20 mt-4 uppercase tracking-[0.2em] text-center font-bold">
            Neural Link: <span className="text-gold-primary">Optimal</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
