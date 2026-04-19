import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ErrorBoundary from "./ErrorBoundary";

// ─────────────────────────────────────────────
// Root element guard
// ─────────────────────────────────────────────
const rootElement = document.getElementById("root");

if (!rootElement) {
  document.body.innerHTML = `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #05060a;
      font-family: system-ui, sans-serif;
    ">
      <div style="text-align: center; color: #ff4444;">
        <h1 style="font-size: 2rem; margin-bottom: 8px;">❌ App Failed to Load</h1>
        <p style="color: #888;">Root element missing. Please contact support.</p>
      </div>
    </div>
  `;
  throw new Error("Root div not found");
}

// ─────────────────────────────────────────────
// Performance: mark app start time
// ─────────────────────────────────────────────
if (typeof performance !== "undefined") {
  performance.mark("app-init");
}

console.log("🚀 YES Studio booting...");

// ─────────────────────────────────────────────
// Render
// ─────────────────────────────────────────────
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
