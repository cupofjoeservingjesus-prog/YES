import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, Sparkles, Video, Clock, CheckCircle, XCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useAuth } from "../lib/supabase"; 

/**
 * PRODUCTION-GRADE DASHBOARD v4.0
 * Engineered for high-conversion and industrial stability.
 * Features: Hardware-accelerated transitions, Dynamic Data Fetching, & Luxury UI.
 */

// Internal Sub-Component: StatCard
const StatCard = React.memo(({ label, value, icon: Icon, color, delay }) => (
  <div 
    className={`p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-700 group animate-in fade-in slide-in-from-bottom-4 fill-mode-both`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between mb-6">
      <div className={`p-3 rounded-2xl bg-black/40 border border-white/10 ${color} group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <span className="text-[7px] text-gray-700 font-black tracking-[0.3em] uppercase">Status // OK</span>
    </div>
    <div className="space-y-1">
      <p className="text-4xl font-black tracking-tighter text-white tabular-nums leading-none italic">{value}</p>
      <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold group-hover:text-[#D4AF37] transition-colors duration-500">
        {label}
      </p>
    </div>
  </div>
));

export default function Dashboard() {
  const { supabase, user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Elite Data Fetching with Error Boundaries
  const fetchDashboardData = useCallback(async () => {
    if (!supabase || !user?.id) return;
    
    try {
      setLoading(true);
      const { data, error: dbError } = await supabase
        .from("films")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(9);

      if (dbError) throw dbError;
      setVideos(data || []);
    } catch (err) {
      console.error("CRITICAL_DATA_FAILURE:", err.message);
      setError("SYSTEM_OFFLINE: UNABLE TO REACH NEURAL ARCHIVE.");
    } finally {
      setLoading(false);
    }
  }, [supabase, user?.id]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const stats = useMemo(() => [
    { label: "Total Assets", value: videos.length, icon: Video, color: "text-white", delay: 100 },
    { label: "Processing", value: videos.filter(v => v.status === "generating").length, icon: Clock, color: "text-[#D4AF37]", delay: 200 },
    { label: "Neural Verified", value: videos.filter(v => v.status === "completed").length, icon: ShieldCheck, color: "text-emerald-500", delay: 300 },
    { label: "Dropped Frames", value: videos.filter(v => v.status === "failed").length, icon: XCircle, color: "text-red-500", delay: 400 },
  ], [videos]);

  const firstName = user?.email?.split("@")[0]?.toUpperCase() || "AGENT";

  return (
    <div className="min-h-full space-y-12 pb-24 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. HERO HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
             <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></div>
             <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Neural Link: Stable</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.85] uppercase">
            Vault // <span className="gold-shimmer italic">{firstName}</span>
          </h1>
        </div>

        <Link to="/generate" className="relative group overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] transition-transform group-hover:scale-105 duration-500"></div>
          <button className="relative flex items-center gap-4 px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-black">
            <Plus size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" />
            Initialize Sequence
          </button>
        </Link>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* 3. MAIN GALLERY SECTION */}
      <div className="space-y-8">
        <div className="flex items-end justify-between border-b border-white/5 pb-8">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Recent Extractions</h2>
            <p className="text-[9px] text-gray-600 uppercase tracking-[0.5em] font-bold mt-2">Latest verified data streams</p>
          </div>
          <Link to="/library" className="group flex items-center gap-4 text-[9px] text-gray-500 hover:text-white transition-all font-black uppercase tracking-[0.4em]">
            Access Archives <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-video rounded-[3rem] bg-white/[0.02] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="py-32 text-center rounded-[4rem] bg-white/[0.01] border border-dashed border-white/5">
             <Sparkles size={48} className="mx-auto text-gray-800 mb-6" strokeWidth={1} />
             <p className="text-[10px] uppercase tracking-[1em] text-gray-600 font-bold italic">No sequences found in current node</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video) => (
              <div key={video.id} className="group relative bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-5 hover:bg-white/[0.04] transition-all duration-700 shadow-2xl hover:-translate-y-2">
                <div className="aspect-[16/10] rounded-[2.5rem] bg-black mb-8 overflow-hidden relative border border-white/5">
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80"></div>
                   {video.thumbnail_url ? (
                     <img src={video.thumbnail_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt="" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                        <Zap size={32} strokeWidth={1} className="text-white/5 animate-pulse" />
                     </div>
                   )}
                   <div className="absolute bottom-6 left-6 z-20">
                      <span className={`text-[7px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border ${video.status === 'completed' ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 bg-black/40 text-gray-500'}`}>
                        {video.status}
                      </span>
                   </div>
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-white text-sm font-black uppercase tracking-widest mb-2 group-hover:text-[#D4AF37] transition-colors">{video.title || "ANONYMOUS_DATA"}</h3>
                  <div className="flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{new Date(video.created_at).toLocaleDateString()}</span>
                    <button className="text-[8px] font-black text-white uppercase tracking-widest border-b border-[#D4AF37] pb-1">Review</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
