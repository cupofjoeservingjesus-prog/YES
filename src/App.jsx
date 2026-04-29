import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from './lib/supabase';

// Components & Pages
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import Pricing from './pages/Pricing';
import Auth from './pages/Auth';

/**
 * LUXURY LOADING COMPONENT
 * Replaces the standard spinner with a neural initialization bar
 */
const NeuralLoader = () => (
  <div className="h-screen w-screen bg-[#020205] flex flex-col items-center justify-center z-[100]">
    <motion.div 
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-[10px] tracking-[1em] uppercase text-[#BF953F] mb-6 font-light"
    >
      Initializing Neural Core
    </motion.div>
    <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden">
      <motion.div 
        animate={{ x: [-200, 200] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BF953F] to-transparent"
      />
    </div>
  </div>
);

/**
 * PAGE TRANSITION WRAPPER
 * Provides the cinematic "blur and rise" effect when switching routes
 */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15, filter: "blur(12px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -15, filter: "blur(12px)" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="h-full w-full"
  >
    {children}
  </motion.div>
);

/**
 * PROTECTED ROUTE (THE BOUNCER)
 * Checks authentication and handles the loading transition
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <NeuralLoader />;
  
  return user ? children : <Navigate to="/auth" replace />;
};

/**
 * MAIN APPLICATION COMPONENT
 * Blends the "Brain" (Supabase) with the "Luxury Skin" (Navy/Gold UI)
 */
export default function App() {
  const { isElite, user, loading } = useAuth();

  // Show full-screen loader on initial boot
  if (loading) return <NeuralLoader />;

  return (
    <Router>
      <div className="flex h-screen bg-[#020205] text-white overflow-hidden relative">
        
        {/* GLOBAL ATMOSPHERIC LAYERS */}
        {/* 1. The Deep Navy Spotlight */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0a1128_0%,#020205_80%)] pointer-events-none z-0" />
        
        {/* 2. The Luxury Noise Texture */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[60]" />

        {/* SIDEBAR - Only rendered for authenticated users */}
        {user && <Sidebar isElite={isElite} />}

        {/* MAIN CONTENT STAGE */}
        <main className="flex-1 relative overflow-y-auto z-10">
          <AnimatePresence mode="wait">
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/auth" element={
                <PageTransition>
                  <Auth />
                </PageTransition>
              } />
              
              <Route path="/pricing" element={
                <PageTransition>
                  <Pricing />
                </PageTransition>
              } />

              {/* PRIVATE ELITE ROUTES */}
              <Route path="/" element={
                <ProtectedRoute>
                  <PageTransition>
                    <Dashboard />
                  </PageTransition>
                </ProtectedRoute>
              } />
              
              <Route path="/generate" element={
                <ProtectedRoute>
                  <PageTransition>
                    <Generate />
                  </PageTransition>
                </ProtectedRoute>
              } />

              {/* CATCH-ALL REDIRECT */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* GLOBAL DECORATIVE BORDER (Subtle Luxury Detail) */}
        <div className="fixed inset-0 border-[1px] border-white/5 pointer-events-none z-50 m-4" />
      </div>
    </Router>
  );
}
