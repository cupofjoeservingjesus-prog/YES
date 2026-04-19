import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "./Layout"; // keep eager — it's the shell

// ─────────────────────────────────────────────
// Lazy load heavy pages (splits the 518kb bundle)
// ─────────────────────────────────────────────
const LoginPage = lazy(() => import("./LoginPage"));
const Dashboard = lazy(() => import("./Dashboard"));
const CreateVideo = lazy(() => import("./CreateVideo"));
const PictureToVideo = lazy(() => import("./PictureToVideo"));
const CreatorAnalytics = lazy(() => import("./CreatorAnalytics"));
const VideoLibrary = lazy(() => import("./VideoLibrary"));
const VideoDetail = lazy(() => import("./VideoDetail"));
const Pricing = lazy(() => import("./Pricing"));
const PageNotFound = lazy(() => import("./PageNotFound"));

// ─────────────────────────────────────────────
// Loading spinner (single source of truth)
// ─────────────────────────────────────────────
export function FullScreenLoader({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Login wrapper
// ─────────────────────────────────────────────
function LoginWrapper() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;
  return <LoginPage onLogin={() => navigate("/", { replace: true })} />;
}

// ─────────────────────────────────────────────
// App
// ─────────────────────────────────────────────
export default function App() {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) return <FullScreenLoader message="Starting up..." />;

  return (
    <Suspense fallback={<FullScreenLoader message="Loading page..." />}>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Protected */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateVideo />} />
          <Route path="picture-to-video" element={<PictureToVideo />} />
          <Route path="analytics" element={<CreatorAnalytics />} />
          <Route path="library" element={<VideoLibrary />} />
          <Route path="video/:id" element={<VideoDetail />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Suspense>
  );
}
