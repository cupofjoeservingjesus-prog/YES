import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Eye,
  Share2,
  Download,
  Heart,
  MessageCircle,
  Award,
  Zap,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";

export default function CreatorAnalytics() {
  const { supabase, user } = useAuth();
  const [stats, setStats] = useState({
    totalViews: 0,
    totalShares: 0,
    totalDownloads: 0,
    totalEarnings: 0,
    avgEngagement: 0,
    topVideo: null,
    videos: [],
  });
  const [timeframe, setTimeframe] = useState("week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // TODO: Fetch analytics from Supabase
      // For now, mock data
      setStats({
        totalViews: 15420,
        totalShares: 3240,
        totalDownloads: 1850,
        totalEarnings: 342.50,
        avgEngagement: 8.5,
        topVideo: {
          title: "My Journey to Success",
          views: 5420,
          earnings: 125.50,
        },
        videos: [
          {
            id: 1,
            title: "My Journey to Success",
            views: 5420,
            shares: 1240,
            downloads: 520,
            engagement: 12.5,
            earnings: 125.50,
          },
          {
            id: 2,
            title: "Daily Motivation",
            views: 4320,
            shares: 980,
            downloads: 650,
            engagement: 9.2,
            earnings: 98.40,
          },
          {
            id: 3,
            title: "Behind the Scenes",
            views: 3680,
            shares: 720,
            downloads: 420,
            engagement: 6.8,
            earnings: 84.20,
          },
          {
            id: 4,
            title: "Tips & Tricks",
            views: 2000,
            shares: 300,
            downloads: 260,
            engagement: 4.2,
            earnings: 34.40,
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass rounded-2xl p-6 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
            <TrendingUp size={16} />
            {trend}%
          </div>
        )}
      </div>
      <div>
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="text-2xl font-bold font-heading mt-1">{value}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight">
            Creator Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your impact and earnings
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-2">
          {["day", "week", "month", "year"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeframe === tf
                  ? "bg-primary text-white"
                  : "glass text-foreground hover:bg-white/10"
              }`}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Eye}
          label="Total Views"
          value={stats.totalViews.toLocaleString()}
          trend={24}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          icon={Share2}
          label="Total Shares"
          value={stats.totalShares.toLocaleString()}
          trend={18}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          icon={Download}
          label="Total Downloads"
          value={stats.totalDownloads.toLocaleString()}
          trend={12}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          icon={DollarSign}
          label="Total Earnings"
          value={`$${stats.totalEarnings.toFixed(2)}`}
          trend={32}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
        />
      </div>

      {/* Engagement & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Average Engagement */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Avg Engagement</h3>
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold font-heading">{stats.avgEngagement}%</p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full"
                style={{ width: `${stats.avgEngagement}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">+2.3% from last period</p>
          </div>
        </motion.div>

        {/* Top Video */}
        {stats.topVideo && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Top Video</h3>
              <Award className="h-5 w-5 text-amber-400" />
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground truncate">{stats.topVideo.title}</p>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  {stats.topVideo.views.toLocaleString()} views
                </p>
                <p className="text-emerald-400 font-medium">
                  ${stats.topVideo.earnings.toFixed(2)} earned
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Creator Rank */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Creator Rank</h3>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold font-heading">#247</p>
            <p className="text-xs text-muted-foreground">
              Top 5% of creators worldwide
            </p>
            <div className="pt-2 border-t border-white/10">
              <p className="text-xs text-emerald-400 font-medium">
                ↑ Up 12 positions this month
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Videos Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 space-y-4"
      >
        <h3 className="font-semibold text-foreground text-lg">Your Videos</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                  Video
                </th>
                <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                  Views
                </th>
                <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                  Shares
                </th>
                <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                  Downloads
                </th>
                <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                  Engagement
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                  Earnings
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.videos.map((video, i) => (
                <motion.tr
                  key={video.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 text-foreground font-medium">
                    {video.title}
                  </td>
                  <td className="text-center py-3 px-4 text-muted-foreground">
                    {video.views.toLocaleString()}
                  </td>
                  <td className="text-center py-3 px-4 text-muted-foreground">
                    {video.shares.toLocaleString()}
                  </td>
                  <td className="text-center py-3 px-4 text-muted-foreground">
                    {video.downloads.toLocaleString()}
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-16 h-2 bg-white/10 rounded-full">
                        <div
                          className="h-2 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                          style={{ width: `${video.engagement * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {video.engagement}%
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 text-emerald-400 font-medium">
                    ${video.earnings.toFixed(2)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Monetization Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 space-y-4 border border-primary/20"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground text-lg">Monetization</h3>
          <DollarSign className="h-5 w-5 text-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Revenue Share</p>
            <p className="text-lg font-semibold text-foreground">30%</p>
            <p className="text-xs text-muted-foreground">Of video views</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Pending Payout</p>
            <p className="text-lg font-semibold text-emerald-400">$342.50</p>
            <p className="text-xs text-muted-foreground">Available next month</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Payout Method</p>
            <p className="text-lg font-semibold text-foreground">e-Transfer</p>
            <p className="text-xs text-muted-foreground">Monthly payments</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-muted-foreground mb-3">
            Upgrade to Pro to unlock higher revenue share (40%) and exclusive features.
          </p>
          <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/40 transition-all">
            Upgrade to Pro
          </button>
        </div>
      </motion.div>
    </div>
  );
}
