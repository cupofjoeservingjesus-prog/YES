import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, Sparkles, Video, Clock, CheckCircle, XCircle, ArrowRight, Zap } from "lucide-react";
import { useAuth } from "./AuthContext";
import VideoCard from "./VideoCard";

function useRealtime(supabase, userId, onChange) {
  useEffect(() => {
    if (!supabase || !userId) return;
    const channel = supabase
      .channel("dashboard-realtime")
      .on("postgres_changes", {
          event: "*", schema: "public", table: "films",
          filter: `user_id=eq.${userId}`,
        }, (payload) => onChange(payload))
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [supabase, userId, onChange]);
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="relative overflow-hidden p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 group animate-fadeInUp">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary/20 blur-3xl rounded-full -top-20 -left-20" />
      </div>
      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-xl mb-3 ${color} bg-white/5 group-hover:bg-white/10 transition-colors`}>
          <Icon className={`h-5 w-5`} />
        </div>
        <p className="text-3xl font-bold tracking-tight tabular-nums font-heading">{value}</p>
        <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
      <div className="aspect-video bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded-lg bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer" />
        <div className="h-3 w-1/2 rounded-lg bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="relative text-center py-20 rounded-3xl border border-dashed border-border overflow-hidden group animate-fadeInUp">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-5 mx-auto group-hover:animate-float">
          <Sparkles className="h-7 w-7 text-primary animate-pulse-glow" />
        </div>
        <p className="text-foreground font-semibold text-lg font-heading">No videos yet</p>
        <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-xs mx-auto">
          Create your first AI-generated video and watch your library come to life
        </p>
        <Link to="/create" className="no-underline inline-flex">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105">
            <Zap size={15} />
            Create your first video
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { supabase, user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    if (!supabase || !user?.id) {
      setVideos([]);
      setLoading(false);
      return;
    }

    supabase
      .from("films")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) setError(error.message);
        else setVideos(data || []);
        setLoading(false);
      });

    return () => { mounted = false; };
  }, [supabase, user?.id]);

  const handleRealtime = useCallback((payload) => {
    setVideos((prev) => {
      if (payload.eventType === "INSERT") {
        if (prev.some((v) => v.id === payload.new.id)) return prev;
        return [payload.new, ...prev];
      }
      if (payload.eventType === "UPDATE") {
        return prev.map((v) => v.id === payload.new.id ? { ...v, ...payload.new } : v);
      }
      if (payload.eventType === "DELETE") {
        return prev.filter((v) => v.id !== payload.old.id);
      }
      return prev;
    });
  }, []);

  useRealtime(supabase, user?.id, handleRealtime);

  const stats = useMemo(() => [
    { label: "Total Videos", value: videos.length, icon: Video, color: "text-blue-400" },
    { label: "Generating", value: videos.filter((v) => v.status === "generating").length, icon: Clock, color: "text-amber-400" },
    { label: "Ready", value: videos.filter((v) => v.status === "completed").length, icon: CheckCircle, color: "text-emerald-400" },
    { label: "Failed", value: videos.filter((v) => v.status === "failed").length, icon: XCircle, color: "text-red-400" },
  ], [videos]);

  const firstName = user?.email?.split("@")[0] || "there";

  return (
    <div className="space-y-10">

      <div className="flex items-start justify-between gap-4 animate-fadeInDown">
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-heading">
            Welcome back, <span className="gradient-text capitalize">{firstName}</span> 👋
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {user ? `Signed in as ${user.email}` : "Guest mode — sign in to save videos"}
          </p>
        </div>
        <Link to="/create" className="no-underline shrink-0">
          <button className="group inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/40 transition-all duration-200 hover:scale-105 active:scale-95">
            <Plus size={18} />
            New Video
          </button>
        </Link>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={s.label} style={{ animationDelay: `${i * 100}ms` }}>
            <StatCard {...s} />
          </div>
        ))}
      </div>

      <div className="animate-fadeInUp" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight font-heading">Recent Videos</h2>
            <p className="text-xs text-muted-foreground mt-1">Your latest creations</p>
          </div>
          {videos.length > 0 && (
            <Link to="/library" className="group inline-flex items-center gap-1 text-sm text-primary no-underline font-medium transition-colors">
              View all
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((video) => <VideoCard key={video.id} video={video} />)}
          </div>
        )}
      </div>

    </div>
  );
}
