import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search, Grid, List, SlidersHorizontal,
  Sparkles, Play, Download, Share2, Heart,
  Trash2, Eye, Clock, CheckCircle, XCircle,
  Loader2, Filter, TrendingUp, Star, Zap,
  Youtube, Instagram, Twitter, Facebook,
  Music, Film, Image, MoreVertical
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useAuth } from "./AuthContext";
import VideoCard from "./VideoCard";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const FILTERS = ["All", "Completed", "Processing", "Failed"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name", label: "By Name" },
  { value: "views", label: "Most Viewed" },
  { value: "likes", label: "Most Liked" },
];
const VIEW_MODES = ["grid", "masonry", "list", "theater"];

// ─────────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/3 overflow-hidden">
      <div className="aspect-video bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded-lg bg-white/5 animate-shimmer" />
        <div className="h-3 w-1/2 rounded-lg bg-white/5 animate-shimmer" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Stats Bar
// ─────────────────────────────────────────────
function StatsBar({ videos }) {
  const stats = useMemo(() => ({
    total: videos.length,
    completed: videos.filter(v => v.status === "completed").length,
    processing: videos.filter(v => v.status === "processing" || v.status === "generating").length,
    failed: videos.filter(v => v.status === "failed").length,
    totalViews: videos.reduce((a, v) => a + (v.views || 0), 0),
  }), [videos]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {[
        { label: "Total", value: stats.total, icon: Film, color: "text-purple-400" },
        { label: "Ready", value: stats.completed, icon: CheckCircle, color: "text-emerald-400" },
        { label: "Processing", value: stats.processing, icon: Loader2, color: "text-amber-400" },
        { label: "Failed", value: stats.failed, icon: XCircle, color: "text-red-400" },
        { label: "Total Views", value: stats.totalViews.toLocaleString(), icon: Eye, color: "text-blue-400" },
      ].map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass rounded-2xl p-4 flex items-center gap-3 hover-lift"
        >
          <div className={`p-2 rounded-xl bg-white/5 ${s.color}`}>
            <s.icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xl font-bold font-heading">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Theater Mode Card
// ─────────────────────────────────────────────
function TheaterCard({ video, onSelect, selected }) {
  return (
    <motion.div
      layoutId={`theater-${video.id}`}
      onClick={() => onSelect(video)}
      whileHover={{ scale: 1.02 }}
      className={`relative cursor-pointer rounded-xl overflow-hidden border transition-all ${
        selected ? "border-primary shadow-lg shadow-primary/30" : "border-white/10"
      }`}
    >
      <div className="aspect-video bg-black">
        {video.thumbnail_url ? (
          <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900/40 to-black">
            <Play className="h-8 w-8 text-white/20" />
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
        <p className="text-xs font-medium text-white line-clamp-1">{video.title || "Untitled"}</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// List Row
// ─────────────────────────────────────────────
function ListRow({ video }) {
  return (
    <Link to={`/video/${video.id}`}>
      <motion.div
        whileHover={{ x: 4 }}
        className="flex items-center gap-4 p-4 glass rounded-2xl hover:border-primary/30 transition-all group"
      >
        <div className="relative w-24 aspect-video rounded-xl overflow-hidden bg-black flex-shrink-0">
          {video.thumbnail_url ? (
            <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900/40 to-black">
              <Play className="h-4 w-4 text-white/20" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {video.title || "Untitled Video"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {video.type === "ai_generated" ? "🤖 AI Generated" : "📤 Uploaded"} •{" "}
            {video.created_at ? new Date(video.created_at).toLocaleDateString() : ""}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {video.views > 0 && (
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{video.views}</span>
          )}
          {video.likes > 0 && (
            <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{video.likes}</span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            video.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
            video.status === "failed" ? "bg-red-500/20 text-red-400" :
            "bg-amber-500/20 text-amber-400"
          }`}>
            {video.status}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function VideoLibrary() {
  const { supabase, user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (!supabase || !user?.id) return;
    setLoading(true);

    supabase
      .from("films")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setVideos(data || []);
        setLoading(false);
      });

    const channel = supabase
      .channel("library-realtime")
      .on("postgres_changes", {
        event: "*", schema: "public", table: "films",
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        setVideos((prev) => {
          if (payload.eventType === "INSERT") return [payload.new, ...prev];
          if (payload.eventType === "UPDATE") return prev.map(v => v.id === payload.new.id ? { ...v, ...payload.new } : v);
          if (payload.eventType === "DELETE") return prev.filter(v => v.id !== payload.old.id);
          return prev;
        });
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [supabase, user?.id]);

  const filtered = useMemo(() => {
    return videos
      .filter(v => activeFilter === "All" || v.status?.toLowerCase() === activeFilter.toLowerCase())
      .filter(v => !search || v.title?.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.created_at) - new Date(a.created_at);
        if (sortBy === "oldest") return new Date(a.created_at) - new Date(b.created_at);
        if (sortBy === "name") return (a.title || "").localeCompare(b.title || "");
        if (sortBy === "views") return (b.views || 0) - (a.views || 0);
        if (sortBy === "likes") return (b.likes || 0) - (a.likes || 0);
        return 0;
      });
  }, [videos, activeFilter, search, sortBy]);

  return (
    <div className="space-y-8 pb-20">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold font-heading tracking-tight">
            Video <span className="gradient-text">Library</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            {videos.length} video{videos.length !== 1 ? "s" : ""} in your collection
          </p>
        </div>
        <Link to="/create">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-sm hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
          >
            <Zap className="h-4 w-4" />
            New Video
          </motion.button>
        </Link>
      </motion.div>

      {/* STATS */}
      <StatsBar videos={videos} />

      {/* CONTROLS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {/* SEARCH */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your videos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>

          {/* SORT */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="glass rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value} className="bg-[#0a0b14]">{o.label}</option>
            ))}
          </select>

          {/* VIEW MODES */}
          <div className="flex glass rounded-xl overflow-hidden">
            {[
              { mode: "grid", icon: Grid },
              { mode: "list", icon: List },
              { mode: "theater", icon: Film },
            ].map(({ mode, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-3 transition-all ${
                  viewMode === mode
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === f
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
              {f !== "All" && (
                <span className="ml-2 text-xs opacity-60">
                  {videos.filter(v => v.status?.toLowerCase() === f.toLowerCase()).length}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ERROR */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* THEATER MODE */}
      {viewMode === "theater" && selectedVideo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl overflow-hidden border border-white/10"
        >
          <div className="aspect-video bg-black relative">
            {selectedVideo.video_url ? (
              <video
                src={selectedVideo.video_url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : selectedVideo.thumbnail_url ? (
              <img src={selectedVideo.thumbnail_url} alt={selectedVideo.title} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Play className="h-20 w-20 text-white/10" />
              </div>
            )}
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold font-heading">{selectedVideo.title || "Untitled"}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {selectedVideo.created_at ? new Date(selectedVideo.created_at).toLocaleDateString() : ""}
            </p>
          </div>
        </motion.div>
      )}

      {/* CONTENT */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-28 glass rounded-3xl border border-dashed border-white/10"
        >
          <div className="text-6xl mb-6">🎬</div>
          <p className="text-foreground font-bold text-2xl font-heading mb-2">
            {search || activeFilter !== "All" ? "No videos match" : "Your library is empty"}
          </p>
          <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
            {search || activeFilter !== "All"
              ? "Try a different search term or filter"
              : "Create your first AI video and it will appear here"}
          </p>
          {!search && activeFilter === "All" && (
            <Link to="/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
              >
                <Zap className="h-4 w-4" />
                Create Your First Video
              </motion.button>
            </Link>
          )}
        </motion.div>
      ) : viewMode === "list" ? (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.04 }}
              >
                <ListRow video={video} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : viewMode === "theater" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((video) => (
            <TheaterCard
              key={video.id}
              video={video}
              selected={selectedVideo?.id === video.id}
              onSelect={setSelectedVideo}
            />
          ))}
        </div>
      ) : (
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence>
              {filtered.map((video, i) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <VideoCard video={video} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      )}
    </div>
  );
}
