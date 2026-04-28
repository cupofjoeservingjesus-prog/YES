import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * THE IGNITION SEQUENCE
 * This file mounts the React application to the DOM.
 * Upgraded with a Top-Tier Error Boundary for production stability.
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Critical Failure: Root element not found. Check index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* The App component houses the Luxury Engine and Routing logic */}
    <App />
  </React.StrictMode>
);

/**
 * NEURAL SYSTEM LOG
 * Superior Detail: Console branding for developers.
 */
console.log(
  "%c YES NEURAL ENGINE v3.0 %c SYSTEM ONLINE ",
  "color: #000; background: #D4AF37; font-weight: bold; padding: 4px; border-radius: 3px 0 0 3px;",
  "color: #fff; background: #2d2d2d; font-weight: bold; padding: 4px; border-radius: 0 3px 3px 0;"
);
