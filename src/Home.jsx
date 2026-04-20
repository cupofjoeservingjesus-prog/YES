import React, { useState, useEffect } from "react";
import { Link } from "wouter"; // ✅ FIXED (was react-router-dom)
import { 
  Zap, Music, Share2, BarChart3, Download, 
  Sparkles, Play, ChevronRight, Star
} from "lucide-react";

const stats = [
  { value: "50,000+", label: "Creators" },
  { value: "2M+", label: "Videos Created" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "Rating" },
];

function FloatingOrb({ className }) {
  return (
    <div className={`absolute rounded-full blur-[120px] opacity-20 animate-pulse ${className}`} />
  );
}

export default function Home() {
  const [videoIndex, setVideoIndex] = useState(0);

  const sampleVideos = [
    "A warrior standing on a mountain at sunset",
    "A futuristic city at night with neon lights",
    "A woman dancing in slow motion on a beach",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % sampleVideos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#05060a] text-white overflow-x-hidden">

      {/* BACKGROUND */}
      <FloatingOrb className="w-[600px] h-[600px] bg-indigo-500 top-[-200px] left-[-200px]" />

      {/* NAV */}
      <nav className="flex justify-between p-6 border-b border-white/10">
        <div className="font-bold">YES STUDIO</div>

        <div className="flex gap-3">
          <Link href="/login" className="border px-4 py-2 rounded">
            Sign In
          </Link>

          <Link href="/login" className="bg-purple-600 px-4 py-2 rounded">
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="text-center mt-20 px-4">
        <h1 className="text-4xl font-bold mb-4">
          Create AI Videos
        </h1>

        <p className="text-white/50 mb-6">
          {sampleVideos[videoIndex]}
        </p>

        <Link
          href="/login"
          className="bg-purple-600 px-6 py-3 rounded"
        >
          Start Now
        </Link>
      </div>

    </div>
  );
}
