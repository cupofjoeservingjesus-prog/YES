@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --radius: 0.75rem;
  }
}

/* THE NEURAL ENGINE STYLING */
body {
  margin: 0;
  background-color: #020205;
  /* Cinematic Navy Spotlight */
  background-image: radial-gradient(circle at 50% -20%, #0a1128 0%, #020205 85%);
  background-attachment: fixed;
  color: white;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* HIGH-END TEXTURE OVERLAY */
body::before {
  content: "";
  fixed: inset-0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-image: url('https://grainy-gradients.vercel.app/noise.svg');
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}

/* GOLD SHIMMER ENGINE */
@layer utilities {
  .text-gold {
    background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #AA771C 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 5s linear infinite;
  }

  .backdrop-blur-4xl {
    backdrop-filter: blur(80px);
    -webkit-backdrop-filter: blur(80px);
  }
}

@keyframes shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

/* CUSTOM SCROLLBAR (Luxury Minimalist) */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #020205;
}

::-webkit-scrollbar-thumb {
  background: rgba(191, 149, 63, 0.2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #BF953F;
}
