import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Loader2, XCircle, CheckCircle, Share2, Download, Copy, Check } from "lucide-react";
import { useAuth } from "./AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import ShareModal from "./ShareModal";

function useRealtimeVideo(supabase, id, onUpdate) {
  useEffect(() => {
    if (!supabase || !id) return;
    const channel = supabase
      .channel(`video-${id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "films", filter: `id=eq.${id}` },
        (payload) => { if (payload?.new) onUpdate(payload.new); }
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [supabase, id, onUpdate]);
}

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { supabase, isLoadingAuth } = useAuth();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (isLoadingAuth) return;
    if (!supabase || !id) { setLoading(false); return; }

    const fetchVideo = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("films").select("*").eq("id", id).single();
      if (!mounted) return;
      if (error) { setError(error.message); setLoading(false); return; }
      setVideo(data);
      setLoading(false);
    };

    fetchVideo();
    return () => { mounted = false; };
  }, [supabase, id, isLoadingAuth]);

  const handleUpdate = useCallback((newData) => {
    if (newData) setVideo(newData);
  }, []);

  useRealtimeVideo(supabase, id, handleUpdate);

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/video/${id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!video?.video_url) return;
    const a = document.createElement("a");
    a.href = video.video_url;
    a.download = `${video.title || "video"}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading || isLoadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-10 w-10 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 space-y-4"
      >
        <XCircle className="mx-auto h-12 w-12 text-destructive/50" />
        <p className="text-muted-foreground">{error || "Video not found"}</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-all"
        >
          Go Home
        </button>
      </motion.div>
    );
  }

  const isGenerating = video.status === "generating";
  const isFailed = video.status === "failed";
  const isReady = video.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* Back Button */}
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </motion.button>

      {/* Video Player */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative aspect-video bg-black rounded-3xl flex items-center justify-center overflow-hidden group"
      >
        {/* Background glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-3xl rounded-full -top-48" />
        </div>

        {isReady && video.video_url ? (
          <video
            src={video.video_url}
            controls
            className="w-full h-full relative z-10"
            poster={video.thumbnail_url}
          />
        ) : isGenerating ? (
          <div className="text-center space-y-4 z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 mx-auto text-primary" />
            </motion.div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Generating your masterpiece...</p>
              <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-purple-500"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        ) : isFailed ? (
          <div className="text-center space-y-3 z-10">
            <XCircle className="h-12 w-12 mx-auto text-red-500" />
            <p className="text-sm text-white font-medium">Generation failed</p>
            <p className="text-xs text-muted-foreground">Please try again</p>
          </div>
        ) : (
          <div className="text-center space-y-3 z-10">
            <Clock className="h-10 w-10 mx-auto text-muted-foreground animate-pulse" />
            <p className="text-sm text-white font-medium">Processing...</p>
          </div>
        )}
      </motion.div>

      {/* Video Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold font-heading tracking-tight">{video.title || "Untitled Video"}</h1>
              {video.story && (
                <p className="text-muted-foreground mt-3 leading-relaxed">{video.story}</p>
              )}
            </div>
            {isReady && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 shrink-0"
              >
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Ready</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Status Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Created {new Date(video.created_at).toLocaleDateString()}</span>
          <span>•</span>
          <span className="capitalize">{video.type === "ai_generated" ? "🤖 AI Generated" : "📤 Uploaded"}</span>
        </div>
      </motion.div>

      {/* Action Buttons */}
      {isReady && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/40 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Share2 size={18} />
            Share to Social Media
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-3 glass text-foreground text-sm font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Download size={18} />
            Download Video
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-5 py-3 glass text-foreground text-sm font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {copied ? (
              <>
                <Check size={18} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy Link
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        video={video}
      />
    </motion.div>
  );
}
