import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/supabase'; // Links to your new security file

// Components & Pages
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import Pricing from './pages/Pricing';
import Auth from './pages/Auth';

// THE BOUNCER: Checks if user is logged in before showing a page
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-[#D4AF37] rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/auth" />;
};

export default function App() {
  const { isElite } = useAuth();

  return (
    <Router>
      <div className="flex h-screen bg-black text-white overflow-hidden">
        {/* Pass Elite status to Sidebar for the gold glow */}
        <Sidebar isElite={isElite} />

        <main className="flex-1 relative overflow-y-auto p-8">
          <Routes>
            {/* Public Pages */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Locked "Elite" Pages */}
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/generate" element={
              <ProtectedRoute>
                <Generate />
              </ProtectedRoute>
            } />

            {/* Error handling: send them home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
