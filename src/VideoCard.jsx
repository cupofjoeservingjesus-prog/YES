import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Play, CheckCircle, XCircle, Loader2,
  Download, Share2, Heart, Eye, MoreVertical,
  Youtube, Instagram, Twitter, Facebook
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const statusConfig = {
  generating: { icon: Loader2, label: "Generating", color: "bg-amber-500/90 text-black", spin: true },
  processing: { icon: Loader2, label: "Processing", color: "bg-amber-500/90 text-black", spin: true },
  completed: { icon: CheckCircle, label: "Ready", color: "bg-emerald-500/90 text-white", spin: false },
  failed: { icon: XCircle, label: "Failed", color: "bg-red-500/90 text-white", spin: false },
};

const shareOptions = [
  { icon: Youtube, label: "YouTube", color: "text-red-500" },
  { icon: Instagram, label: "Instagram", color: "text-pink-500" },
  { icon: Twitter, label: "Twitter", color: "text-sky-400" },
  { icon: Facebook, label: "Facebook", color: "text-blue-500" },
];

export default function VideoCard({ video }) {
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes || 0);

  const status = statusConfig[video.status] || statusConfig.generating;
  const StatusIcon = status.icon;

  const handleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = (e) => {
    e.preventDefault();
    setShowShare(!showShare);
    setShowMenu(false);
  };

  const handleDownload = (e) => {
    e.preventDefault();
    if (video.video_url) {
      const a = document.createElement("a");
      a.href = video.video_url;
      a.download = video.title || "yes-video";
      a.click();
    }
  };

  const handleShareTo = (e, platform) => {
    e.preventDefault();
    const url = encodeURIComponent(video.video_url || window.location.href);
    const text = encodeURIComponent(video.title || "Check out my YES video!");
    const shareUrls = {
      YouTube: `https://youtube.com`,
      Instagram: `https://instagram.com`,
      Twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      Facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
    };
    window.open(shareUrls[platform], "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      <Link
        to={`/video/${video.id}`}
        className="block rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
      >
        {/* THUMBNAIL */}
        <div className="relative aspect-video bg-black overflow-hidden">
          {video.thumbnail_url ? (
            <img
              src={video.thumbnail_url}
              alt={video.title || "Video"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-black">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <Play className="h-14 w-14 text-white/20 relative z-10" />
              </div>
            </div>
          )}

          {/* CINEMATIC OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* PLAY BUTTON */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl"
            >
              <Play className="h-7 w-7 text-white fill-white ml-1" />
            </motion.div>
          </div>

          {/* STATUS BADGE */}
          <div className="absolute top-3 left-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${status.color}`}
            >
              <StatusIcon className={`h-3 w-3 ${status.spin ? "animate-spin" : ""}`} />
              {status.label}
            </motion.div>
          </div>

          {/* DURATION BADGE */}
          {video.duration && (
            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur text-xs text-white font-medium">
              {video.duration}
            </div>
          )}

          {/* TOP RIGHT ACTIONS */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`w-8 h-8 rounded-full backdrop-blur flex items-center justify-center transition-all ${
                liked ? "bg-red-500/80" : "bg-black/60 hover:bg-black/80"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${liked ? "text-white fill-white" : "text-white"}`} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition"
            >
              <Share2 className="h-3.5 w-3.5 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDownload}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition"
            >
              <Download className="h-3.5 w-3.5 text-white" />
            </motion.button>
          </div>

          {/* SHARE DROPDOWN */}
          <AnimatePresence>
            {showShare && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="absolute top-14 right-3 glass rounded-xl p-3 z-20 min-w-[140px]"
                onClick={(e) => e.preventDefault()}
              >
                <p className="text-xs text-white/50 mb-2 font-medium">Share to</p>
                {shareOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={(e) => handleShareTo(e, opt.label)}
                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg hover:bg-white/10 transition text-sm"
                  >
                    <opt.icon className={`h-4 w-4 ${opt.color}`} />
                    <span className="text-white/80">{opt.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INFO */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200 font-heading">
            {video.title || "Untitled Video"}
          </h3>

          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              {video.type === "ai_generated" ? "🤖 AI Generated" : "📤 Uploaded"}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {likeCount > 0 && (
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {likeCount}
                </span>
              )}
              {video.views > 0 && (
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {video.views}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground/60 mt-1">
            {video.created_at
              ? new Date(video.created_at).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric"
                })
              : ""}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
