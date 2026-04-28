import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusSquare, 
  Library, 
  CreditCard, 
  LogOut, 
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../lib/supabase';

export default function Sidebar() {
  const { isElite, supabase } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const menuItems = [
    { name: 'Vault', path: '/', icon: LayoutDashboard },
    { name: 'Neural Forge', path: '/generate', icon: PlusSquare },
    { name: 'Archives', path: '/library', icon: Library },
    { name: 'Membership', path: '/pricing', icon: CreditCard },
  ];

  return (
    <aside className="w-72 h-screen bg-[#050505] border-r border-white/5 flex flex-col p-8 z-50">
      {/* BRANDING */}
      <div className="mb-12 px-2">
        <h1 className="text-3xl font-black tracking-[0.3em] gold-shimmer italic">YES</h1>
        <p className="text-[7px] uppercase tracking-[0.5em] text-gray-600 mt-2 font-bold">Neural OS v4.0</p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 group ${
                isActive 
                ? 'bg-white/5 text-white border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                : 'text-gray-500 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} className={isActive ? 'text-[#D4AF37]' : 'group-hover:text-white'} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ELITE STATUS CARD */}
      <div className={`mt-auto mb-6 p-6 rounded-[2rem] border transition-all duration-1000 ${
        isElite 
        ? 'bg-gradient-to-br from-[#D4AF37]/10 to-transparent border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]' 
        : 'bg-white/[0.02] border-white/5'
      }`}>
        <div className="flex items-center gap-3 mb-3">
          {isElite ? (
            <ShieldCheck size={16} className="text-[#D4AF37]" />
          ) : (
            <Zap size={16} className="text-gray-600" />
          )}
          <span className={`text-[8px] font-black uppercase tracking-widest ${isElite ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
            {isElite ? 'Elite Member' : 'Basic Node'}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 leading-relaxed font-bold">
          {isElite 
            ? 'Unlimited Neural Synthesis active.' 
            : 'Upgrade to unlock 4K Render Forge.'}
        </p>
        {!isElite && (
          <Link to="/pricing" className="block mt-4 text-[7px] uppercase tracking-widest text-[#D4AF37] font-black hover:tracking-[0.2em] transition-all">
            Expand Access →
          </Link>
        )}
      </div>

      {/* LOGOUT */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-4 px-6 py-4 text-gray-700 hover:text-red-500 transition-colors duration-300"
      >
        <LogOut size={16} />
        <span className="text-[10px] uppercase tracking-[0.3em] font-black">Disconnect</span>
      </button>
    </aside>
  );
}
