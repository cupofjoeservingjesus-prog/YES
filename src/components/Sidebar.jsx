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
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 h-screen border-r border-white/5 flex flex-col p-8 relative z-50 bg-[#020205]/40 backdrop-blur-xl"
    >
      {/* ELITE STATUS GLOW */}
      {isElite && (
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#BF953F]/40 to-transparent shadow-[0_0_15px_rgba(191,149,63,0.2)]" />
      )}

      {/* BRANDING */}
      <div className="mb-16 px-4">
        <h2 className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] bg-clip-text text-transparent">
          YES
        </h2>
        <p className="text-[8px] tracking-[0.5em] text-white/20 uppercase mt-2 font-bold">Neural Engine</p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500
              ${isActive 
                ? 'bg-white/[0.03] border border-white/10 text-white shadow-lg shadow-black' 
                : 'text-white/30 hover:text-white hover:bg-white/[0.01]'}
            `}
          >
            <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} className={isActive ? 'text-[#BF953F]' : ''} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* FOOTER STATUS CARD */}
      <div className="mt-auto px-2">
        <div className={`p-5 rounded-[2rem] border transition-all duration-700 ${
          isElite ? 'border-[#BF953F]/20 bg-[#BF953F]/5' : 'border-white/5 bg-white/[0.01]'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <Crown size={12} className={isElite ? 'text-[#BF953F]' : 'text-white/10'} />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/80">
              {isElite ? 'Elite Node' : 'Standard'}
            </span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-3">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: isElite ? '100%' : '20%' }}
               className="h-full bg-[#BF953F]"
             />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
