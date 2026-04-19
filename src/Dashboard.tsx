import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Play, Plus, Zap, Clock, CheckCircle, XCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();

  const videosQuery = trpc.videos.list.useQuery(undefined, { enabled: isAuthenticated });
  const creditsQuery = trpc.credits.get.useQuery(undefined, { enabled: isAuthenticated });

  if (authLoading || videosQuery.isLoading || creditsQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Welcome to YES! Platform</h1>
          <p className="text-muted-foreground">Sign in to start creating AI videos</p>
          <Button onClick={() => navigate("/login")} size="lg">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const videos = videosQuery.data || [];
  const credits = creditsQuery.data;

  const stats = [
    {
      label: "Total Videos",
      value: videos.length,
      icon: Play,
      color: "text-blue-400",
    },
    {
      label: "Generating",
      value: videos.filter((v) => v.status === "processing").length,
      icon: Clock,
      color: "text-amber-400",
    },
    {
      label: "Completed",
      value: videos.filter((v) => v.status === "completed").length,
      icon: CheckCircle,
      color: "text-emerald-400",
    },
    {
      label: "Credits Left",
      value: credits?.videosRemaining || 0,
      icon: Zap,
      color: "text-purple-400",
    },
  ];

  const recentVideos = videos.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/10 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back, <span className="gradient-text">{user?.name || "Creator"}</span> 🎬
            </h1>
            <p className="text-muted-foreground">
              {user?.email && `Signed in as ${user.email}`}
            </p>
          </div>
          <Button
            onClick={() => navigate("/create")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Video
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Videos */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Videos</h2>
            {videos.length > 6 && (
              <Button
                variant="outline"
                onClick={() => navigate("/library")}
                className="text-primary hover:text-primary"
              >
                View All
              </Button>
            )}
          </div>

          {recentVideos.length === 0 ? (
            <Card className="p-12 text-center bg-card/30 border-dashed border-border/50">
              <div className="space-y-3">
                <Play className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                <p className="text-foreground font-semibold">No videos yet</p>
                <p className="text-muted-foreground text-sm">
                  Create your first AI-generated video to get started
                </p>
                <Button
                  onClick={() => navigate("/create")}
                  className="bg-primary hover:bg-primary/90 gap-2 mt-4"
                >
                  <Zap className="h-4 w-4" />
                  Create Your First Video
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentVideos.map((video) => (
                <Card
                  key={video.id}
                  onClick={() => navigate(`/video/${video.id}`)}
                  className="group cursor-pointer overflow-hidden bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-black overflow-hidden">
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title || "Video"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-black">
                        <Play className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity h-12 w-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                        <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      {video.status === "processing" && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/90 text-black text-xs font-medium">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Processing
                        </div>
                      )}
                      {video.status === "completed" && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-medium">
                          <CheckCircle className="h-3 w-3" />
                          Ready
                        </div>
                      )}
                      {video.status === "failed" && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/90 text-white text-xs font-medium">
                          <XCircle className="h-3 w-3" />
                          Failed
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {video.title || "Untitled Video"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {video.type === "ai_generated" ? "🤖 AI Generated" : "📤 Uploaded"}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
