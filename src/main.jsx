@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --midnight: #020205;
  --gold-shimmer: linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #AA771C 100%);
}

body {
  margin: 0;
  background-color: var(--midnight);
  /* Luxury Navy Glow */
  background: radial-gradient(circle at 50% -20%, #0a1128 0%, #020205 80%);
  background-attachment: fixed;
  color: white;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

/* Custom Gold Text Utility */
.text-gold {
  background: var(--gold-shimmer);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 8s linear infinite;
}

@keyframes shimmer {
  to { background-position: 200% center; }
}
