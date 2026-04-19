import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const RATE_LIMIT_SECONDS = 60;

export default function LoginPage({ onLogin }) {
  const { supabase } = useAuth();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [mode, setMode] = useState("login"); // "login" | "forgot"
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimitTimer, setRateLimitTimer] = useState(0);

  // ─────────────────────────────────────────────
  // Rate limit countdown
  // ─────────────────────────────────────────────
  const startRateLimitCountdown = () => {
    setRateLimitTimer(RATE_LIMIT_SECONDS);
    const interval = setInterval(() => {
      setRateLimitTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ─────────────────────────────────────────────
  // Login handler
  // ─────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    if (rateLimitTimer > 0) return;

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      // Detect rate limiting from Supabase
      if (
        error.message.toLowerCase().includes("rate") ||
        error.message.toLowerCase().includes("too many") ||
        error.status === 429
      ) {
        setError(`Too many attempts. Please wait ${RATE_LIMIT_SECONDS} seconds.`);
        startRateLimitCountdown();
      } else if (error.message.toLowerCase().includes("invalid")) {
        setError("Incorrect email or password. Please try again.");
      } else {
        setError(error.message);
      }
    } else {
      onLogin();
    }
  };

  // ─────────────────────────────────────────────
  // Forgot password handler
  // ─────────────────────────────────────────────
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address above.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccessMsg(
        `✅ Password reset email sent to ${email}. Check your inbox.`
      );
    }
  };

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/30 hover:border-purple-500/50 transition-colors"
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
            {mode === "login" ? "YES!" : "Reset Password"}
          </h2>
          <p className="text-gray-400 text-sm">
            {mode === "login" ? "Welcome back, creator" : "Recover your account"}
          </p>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-sm mb-4 text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Success message */}
        <AnimatePresence>
          {successMsg && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-green-400 text-sm mb-4 text-center"
            >
              {successMsg}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={mode === "login" ? handleLogin : handleForgotPassword}>
          {/* Email — always shown */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              required
            />
          </div>

          {/* Password — login mode only */}
          <AnimatePresence>
            {mode === "login" && (
              <motion.div
                key="password"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    required
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || rateLimitTimer > 0}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-500 hover:to-purple-600 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {loading
              ? mode === "login" ? "🔄 Logging in..." : "📧 Sending..."
              : rateLimitTimer > 0
              ? `⏱️ Try again in ${rateLimitTimer}s`
              : mode === "login"
              ? "✨ Log In"
              : "📧 Send Reset Email"}
          </button>
        </form>

        {/* Forgot password link (login mode only) */}
        {mode === "login" && (
          <div className="mt-4 text-center">
            <button
              onClick={() => { setMode("forgot"); setError(""); setSuccessMsg(""); }}
              className="text-purple-400 text-sm hover:text-purple-300 transition font-medium"
            >
              🔐 Forgot Password?
            </button>
          </div>
        )}

        {/* Back to login link (forgot mode only) */}
        {mode === "forgot" && (
          <div className="mt-4 text-center">
            <button
              onClick={() => { setMode("login"); setError(""); setSuccessMsg(""); }}
              className="text-purple-400 text-sm hover:text-purple-300 transition font-medium"
            >
              ← Back to Login
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-xs">
            Don't have an account?{" "}
            <a href="#signup" className="text-purple-400 hover:text-purple-300 font-medium transition">
              Sign Up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
