import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Zap, Plus, Library, Home, Menu, X, WifiOff, Clock, LogOut, Crown } from "lucide-react";
import { useAuth } from "./AuthContext";
import { AnimatePresence, motion } from "framer-motion";

// ─────────────────────────────────────────────
// Background
// ─────────────────────────────────────────────
function SuperHumanBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#05060a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_80%_40%,rgba(168,85,247,0.18),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_55%)]" />
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/10 blur-[140px] rounded-full top-[-200px] left-[-200px] animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full bottom-[-200px] right-[-200px] animate-pulse" />
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

// ─────────────────────────────────────────────
// Banners
// ─────────────────────────────────────────────
function NetworkOfflineBanner() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      className="relative z-50 flex items-center justify-center gap-2 bg-yellow-500/20 border-b border-yellow-500/30 text-yellow-300 text-sm py-2 px-4"
    >
      <WifiOff size={14} />
      You're offline — changes won't save until you reconnect.
    </motion.div>
  );
}

function SessionExpiredBanner({ onDismiss }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      className="relative z-50 flex items-center justify-center gap-3 bg-red-500/20 border-b border-red-500/30 text-red-300 text-sm py-2 px-4"
    >
      <Clock size={14} />
      Your session expired.
      <button
        onClick={() => navigate("/login")}
        className="underline hover:text-white transition"
      >
        Log in again
      </button>
      <button
        onClick={onDismiss}
        className="ml-2 text-red-400 hover:text-white transition"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Nav items
// ─────────────────────────────────────────────
const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/create", label: "Create", icon: Plus },
  { path: "/library", label: "Library", icon: Library },
];

const publicNavItems = [
  { path: "/pricing", label: "Pricing", icon: Zap },
];

// ─────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────
export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, sessionExpired, networkError } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <SuperHumanBackground />

      {/* BANNERS */}
      <AnimatePresence>
        {networkError && <NetworkOfflineBanner key="offline" />}
        {sessionExpired && !bannerDismissed && (
          <SessionExpiredBanner
            key="expired"
            onDismiss={() => setBannerDismissed(true)}
          />
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition">
                <Zap size={18} />
              </div>
              <div className="leading-tight">
                <div className="font-semibold tracking-wide">YES STUDIO</div>
                <div className="text-[10px] text-white/50">AI Film Engine</div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-1">
              {user ? (
                navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${
                        active
                          ? "bg-white/10 text-white shadow-inner shadow-white/10"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })
              ) : (
                publicNavItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${
                        active
                          ? "bg-white/10 text-white shadow-inner shadow-white/10"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })
              )}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
              <Link to="/create">
                <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm shadow-lg shadow-indigo-500/20 hover:scale-105 transition">
                  <Plus size={14} />
                  Create
                </button>
              </Link>

              {/* SIGN OUT */}
              {user && (
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-white/40 text-xs truncate max-w-[120px]">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    title="Sign out"
                  >
                    <LogOut size={14} className="text-white/60" />
                  </button>
                </div>
              )}

              {/* MOBILE MENU */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE NAV */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-white/80 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              {user && (
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-white/5 text-sm"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* CONTENT */}
      <main className="relative max-w-6xl mx-auto px-4 py-8">
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <Outlet />
        </div>
      </main>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>

    </div>
  );
}
