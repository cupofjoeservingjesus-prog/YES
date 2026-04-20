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
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "films",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => onChange(payload)
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [supabase, userId, onChange]);
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="p-5 rounded-xl border bg-card hover:border-primary/30 transition hover:shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden animate-pulse">
      <div className="aspect-video bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-3 w-1/2 bg-muted rounded" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 border border-dashed rounded-2xl">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
        <Sparkles className="h-6 w-6 text-primary" />
      </div>

      <p className="text-lg font-semibold">No videos yet</p>
      <p className="text-sm text-muted-foreground mt-1 mb-6">
        Create your first AI video to get started
      </p>

      <Link to="/create" className="inline-flex">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition">
          <Zap size={15} />
          Create video
        </button>
      </Link>
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

    return () => {
      mounted = false;
    };
  }, [supabase, user?.id]);

  const handleRealtime = useCallback((payload) => {
    setVideos((prev) => {
      if (payload.eventType === "INSERT") {
        if (prev.some((v) => v.id === payload.new.id)) return prev;
        return [payload.new, ...prev];
      }
      if (payload.eventType === "UPDATE") {
        return prev.map((v) =>
          v.id === payload.new.id ? { ...v, ...payload.new } : v
        );
      }
      if (payload.eventType === "DELETE") {
        return prev.filter((v) => v.id !== payload.old.id);
      }
      return prev;
    });
  }, []);

  useRealtime(supabase, user?.id, handleRealtime);

  const stats = useMemo(
    () => [
      {
        label: "Total",
        value: videos.length,
        icon: Video,
        color: "text-blue-500",
      },
      {
        label: "Processing",
        value: videos.filter((v) => v.status === "generating").length,
        icon: Clock,
        color: "text-amber-500",
      },
      {
        label: "Completed",
        value: videos.filter((v) => v.status === "completed").length,
        icon: CheckCircle,
        color: "text-emerald-500",
      },
      {
        label: "Failed",
        value: videos.filter((v) => v.status === "failed").length,
        icon: XCircle,
        color: "text-red-500",
      },
    ],
    [videos]
  );

  const firstName = user?.email?.split("@")[0] || "there";

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Welcome back,{" "}
            <span className="text-primary capitalize">{firstName}</span> 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {user ? `Signed in as ${user.email}` : "Guest mode"}
          </p>
        </div>

        <Link to="/create" className="inline-flex">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition">
            <Plus size={16} />
            New Video
          </button>
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 text-red-500 text-sm border border-red-500/20">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent Videos */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">
              Recent Videos
            </h2>
            <p className="text-sm text-muted-foreground">
              Your latest creations
            </p>
          </div>

          {videos.length > 0 && (
            <Link to="/library" className="text-sm text-primary flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
