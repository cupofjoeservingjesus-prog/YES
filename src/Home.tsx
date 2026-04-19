import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Zap, Music, Share2, BarChart3, Download, 
  Sparkles, Play, ChevronRight, Star,
  Youtube, Instagram, Twitter
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "50,000+", label: "Creators" },
  { value: "2M+", label: "Videos Created" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "Rating" },
];

const features = [
  {
    icon: Zap,
    title: "AI Video Generation",
    desc: "Generate cinematic videos from text in seconds. Powered by Kling AI — the most advanced video model on earth.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: Music,
    title: "Music Studio",
    desc: "Upload custom tracks, browse templates, or choose from religious & cinematic collections.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Share2,
    title: "One-Click Sharing",
    desc: "Share instantly to YouTube, TikTok, Instagram, Snapchat, Twitter, Facebook, LinkedIn & WhatsApp.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: BarChart3,
    title: "Creator Analytics",
    desc: "Track views, earnings, engagement and performance across all platforms in real time.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Download,
    title: "Multi-Format Export",
    desc: "Export optimized for every platform — 9:16 for TikTok, 16:9 for YouTube, 1:1 for Instagram.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Sparkles,
    title: "CapCut-Style Effects",
    desc: "Transitions, zoom, blur, color grading, text animations — all with one click.",
    color: "from-rose-500 to-red-600",
  },
];

const plans = [
  { name: "Free", price: "$0", videos: "3 videos/mo", color: "border-white/10" },
  { name: "Starter", price: "$9", videos: "20 videos/mo", color: "border-white/10" },
  { name: "Pro", price: "$29", videos: "100 videos/mo", color: "border-purple-500/50" },
  { name: "Advanced", price: "$59", videos: "300 videos/mo", color: "border-amber-500/50", popular: true },
  { name: "Premium", price: "$99", videos: "Unlimited", color: "border-amber-500/50" },
  { name: "Gold Elite", price: "$199", videos: "Unlimited + API", color: "border-yellow-400/50" },
];

const testimonials = [
  { name: "Sarah M.", role: "Travel Vlogger", text: "YES Platform transformed my content creation!", avatar: "SM" },
  { name: "Jason T.", role: "Marketing Expert", text: "The best tool for viral videos. Absolutely incredible!", avatar: "JT" },
  { name: "Priya K.", role: "Content Creator", text: "I replaced my entire editing workflow with YES.", avatar: "PK" },
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

      {/* BACKGROUND ORBS */}
      <FloatingOrb className="w-[600px] h-[600px] bg-indigo-500 top-[-200px] left-[-200px]" />
      <FloatingOrb className="w-[500px] h-[500px] bg-purple-500 top-[400px] right-[-200px]" />
      <FloatingOrb className="w-[400px] h-[400px] bg-blue-500 bottom-[200px] left-[100px]" />

      {/* NAV */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap size={18} />
          </div>
          <div>
            <div className="font-bold tracking-widest text-white">YES STUDIO</div>
            <div className="text-[10px] text-white/40">AI Film Engine</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#testimonials" className="hover:text-white transition">Reviews</a>
          <a href="#about" className="hover:text-white transition">About</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 text-sm border border-white/20 rounded-xl hover:bg-white/10 transition text-white">
            Sign In
          </Link>
          <Link to="/login" className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/40 transition hover:scale-105">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative text-center py-28 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-8 animate-fadeInDown">
          <Sparkles size={14} />
          Powered by Kling AI — The World's Most Advanced Video Model
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fadeInUp font-heading">
          Create Extraordinary<br />
          <span className="gradient-text">Videos in Minutes</span>
        </h1>
        <p className="text-white/50 text-xl mb-10 max-w-2xl mx-auto animate-fadeInUp">
          AI-powered video generation meets creative freedom. The most powerful, beautiful, and intuitive video creation platform ever built.
        </p>

        {/* ANIMATED PROMPT */}
        <div className="glass rounded-2xl p-4 max-w-xl mx-auto mb-10 text-left animate-fadeInUp">
          <p className="text-xs text-white/40 mb-2 uppercase tracking-widest">AI is generating...</p>
          <p className="text-white/80 text-sm transition-all duration-700">"{sampleVideos[videoIndex]}"</p>
          <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-shimmer w-3/4" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap animate-fadeInUp">
          <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/40 transition hover:scale-105">
            <Zap size={20} />
            Start Free — 3 Videos
          </Link>
          <button className="inline-flex items-center gap-2 px-8 py-4 glass rounded-2xl font-semibold text-lg hover:bg-white/10 transition">
            <Play size={20} />
            Watch Demo
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-20">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 animate-fadeInUp">
              <p className="text-3xl font-bold gradient-text font-heading">{s.value}</p>
              <p className="text-white/50 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm uppercase tracking-widest mb-3">Everything You Need</p>
          <h2 className="text-4xl font-bold font-heading">Why Creators Choose YES</h2>
          <p className="text-white/40 mt-3 max-w-xl mx-auto">We combined the best of CapCut, Adobe Premiere, and Runway AI into one superhuman platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={f.title} className="glass rounded-2xl p-6 hover-lift group animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} mb-4 group-hover:scale-110 transition`}>
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 font-heading">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PLATFORMS */}
      <section className="py-16 px-8 text-center">
        <p className="text-white/40 text-sm uppercase tracking-widest mb-8">Share Everywhere Instantly</p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {["YouTube", "TikTok", "Instagram", "Snapchat", "Twitter", "Facebook", "LinkedIn", "WhatsApp"].map((p) => (
            <div key={p} className="glass px-5 py-2.5 rounded-full text-sm text-white/70 hover:text-white hover:border-purple-500/50 transition cursor-pointer">
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm uppercase tracking-widest mb-3">Loved By Creators</p>
          <h2 className="text-4xl font-bold font-heading">Join 50,000+ Creators</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6 hover-lift animate-fadeInUp">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-white/70 text-sm mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm uppercase tracking-widest mb-3">Simple Pricing</p>
          <h2 className="text-4xl font-bold font-heading">Choose Your Plan</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {plans.map((p) => (
            <div key={p.name} className={`glass rounded-2xl p-5 border ${p.color} text-center hover-lift relative`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                  Popular
                </div>
              )}
              <p className="font-bold text-lg font-heading">{p.name}</p>
              <p className="text-3xl font-bold gradient-text my-2">{p.price}</p>
              <p className="text-white/40 text-xs mb-4">{p.videos}</p>
              <Link to="/login" className="block w-full py-2 glass rounded-xl text-sm hover:bg-white/10 transition">
                Start
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center">
        <div className="glass rounded-3xl p-16 max-w-3xl mx-auto border border-purple-500/20">
          <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-6 animate-pulse-glow" />
          <h2 className="text-4xl font-bold font-heading mb-4">Ready to Create?</h2>
          <p className="text-white/50 mb-8">Join 50,000+ creators making extraordinary videos with YES.</p>
          <Link to="/login" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/40 transition hover:scale-105">
            <Zap size={20} />
            Get Started Free
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-8 border-t border-white/10 text-center text-white/30 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap size={14} />
          </div>
          <span className="font-bold text-white/60">YES STUDIO</span>
        </div>
        <div className="flex items-center justify-center gap-6 mb-4 flex-wrap">
          {["Contact", "Blog", "Support", "Terms", "Privacy"].map((l) => (
            <a key={l} href="#" className="hover:text-white transition">{l}</a>
          ))}
        </div>
        © 2024 YES Studio. All rights reserved.
      </footer>

    </div>
  );
}
