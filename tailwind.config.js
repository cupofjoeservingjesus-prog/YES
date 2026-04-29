/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  // ENGINEERED PATHING: Ensures no luxury styles are dropped during Vercel's build process
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // PROPRIETARY BRANDING: Specifically mapped for the Sidebar and Dashboard code
        gold: {
          primary: "#BF953F",
          shimmer: "#FCF6BA",
          dark: "#AA771C",
          DEFAULT: "#BF953F",
        },
        // NEURAL VOID: Deep obsidian black
        midnight: "#020205",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // INDUSTRIAL ROUNDING: Mimics high-end hardware curves
        "4xl": "2.5rem",
        "5xl": "3.5rem",
      },
      animation: {
        "shimmer-gold": "shimmerGold 3s linear infinite",
        "pulse-gentle": "pulseGentle 4s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "neural-flow": "neuralFlow 20s linear infinite",
      },
      keyframes: {
        shimmerGold: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulseGentle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)", filter: "blur(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        neuralFlow: {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
        }
      },
      backgroundImage: {
        // ATMOSPHERIC GRADIENTS
        "luxury-gradient": "radial-gradient(circle at 50% -20%, #0a1128 0%, #020205 80%)",
        "gold-conic": "conic-gradient(from 180deg at 50% 50%, #BF953F, #FCF6BA, #AA771C, #BF953F)",
      },
      transitionTimingFunction: {
        // HEAVY LUXURY: A custom curve that feels more expensive than 'ease-in-out'
        "luxury": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
