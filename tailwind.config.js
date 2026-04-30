import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // ─── TYPOGRAPHY ────────────────────────────────────────────────────────
      fontFamily: {
        // Cormorant Garamond: editorial luxury for headings
        heading: ["Cormorant Garamond", "Georgia", "serif"],
        // DM Sans: refined, legible body copy (not generic like Inter)
        body: ["DM Sans", "sans-serif"],
        // JetBrains Mono: technical precision
        mono: ["JetBrains Mono", "monospace"],
        // Cinzel: decorative caps for labels, badges, accents
        display: ["Cinzel", "serif"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "display-sm": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["5rem",   { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["7rem",   { lineHeight: "1",    letterSpacing: "-0.04em" }],
        "display-xl": ["9rem",   { lineHeight: "0.95", letterSpacing: "-0.05em" }],
      },

      letterSpacing: {
        "luxury":      "0.15em",
        "luxury-wide": "0.25em",
        "luxury-xl":   "0.4em",
        "tight-xl":    "-0.04em",
      },

      lineHeight: {
        "luxury": "1.15",
        "display": "1.05",
      },

      // ─── COLORS ────────────────────────────────────────────────────────────
      colors: {
        // Semantic tokens — mapped to CSS variables in index.css
        border:     "hsl(var(--border) / <alpha-value>)",
        input:      "hsl(var(--input) / <alpha-value>)",
        ring:       "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",

        primary: {
          DEFAULT:    "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT:    "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },

        // ── Gold palette (supports Tailwind opacity modifiers: text-gold/50) ──
        gold: {
          50:       "hsl(43 100% 96%)",
          100:      "hsl(43 95%  88%)",
          200:      "hsl(43 90%  75%)",
          300:      "hsl(43 80%  65%)",
          400:      "hsl(43 70%  55%)",
          DEFAULT:  "#BF953F",          // primary gold
          shimmer:  "#FCF6BA",          // bright shimmer highlight
          dark:     "#AA771C",          // deep antique gold
          deep:     "#7A5218",          // richest shadow tone
          muted:    "hsl(43 30% 45%)",  // desaturated, for subtle accents
        },

        // ── Dark surface scale ──────────────────────────────────────────────
        midnight:  "#020205",   // true black base
        obsidian:  "#0D0D0F",   // main background
        charcoal:  "#1A1A1F",   // card / panel surface
        smoke:     "#2A2A32",   // elevated surface, border fill
        ash:       "#3D3D47",   // disabled / muted border
        silver: {
          DEFAULT: "#A8A8B8",
          muted:   "#6B6B7A",
          bright:  "#D4D4E0",
        },

        // ── Semantic state colors ───────────────────────────────────────────
        success: {
          DEFAULT: "hsl(142 60% 45%)",
          muted:   "hsl(142 30% 20%)",
        },
        warning: {
          DEFAULT: "hsl(38 90% 55%)",
          muted:   "hsl(38 40% 20%)",
        },
        danger: {
          DEFAULT: "hsl(0 70% 55%)",
          muted:   "hsl(0 40% 18%)",
        },
      },

      // ─── SPACING & LAYOUT ──────────────────────────────────────────────────
      spacing: {
        "4.5":  "1.125rem",
        "13":   "3.25rem",
        "15":   "3.75rem",
        "18":   "4.5rem",
        "22":   "5.5rem",
        "26":   "6.5rem",
        "30":   "7.5rem",
        "34":   "8.5rem",
        "88":   "22rem",
        "100":  "25rem",
        "112":  "28rem",
        "128":  "32rem",
        "144":  "36rem",
      },

      // ─── BORDER RADIUS ─────────────────────────────────────────────────────
      borderRadius: {
        sm:    "calc(var(--radius) - 4px)",
        md:    "calc(var(--radius) - 2px)",
        lg:    "var(--radius)",
        xl:    "calc(var(--radius) + 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2.5rem",
        "5xl": "3.5rem",
      },

      // ─── SHADOWS & GLOWS ───────────────────────────────────────────────────
      boxShadow: {
        // Gold glow family
        "gold-xs":     "0 0 8px  rgba(191, 149, 63, 0.15)",
        "gold-sm":     "0 0 15px rgba(191, 149, 63, 0.20)",
        "gold":        "0 0 30px rgba(191, 149, 63, 0.30)",
        "gold-lg":     "0 0 50px rgba(191, 149, 63, 0.35)",
        "gold-xl":     "0 0 80px rgba(191, 149, 63, 0.40)",
        "gold-inset":  "inset 0 1px 0 rgba(252, 246, 186, 0.15)",
        // Depth shadows for dark surfaces
        "luxury-sm":   "0 4px  16px rgba(0, 0, 0, 0.50)",
        "luxury":      "0 8px  32px rgba(0, 0, 0, 0.60)",
        "luxury-lg":   "0 16px 48px rgba(0, 0, 0, 0.70)",
        "luxury-xl":   "0 24px 64px rgba(0, 0, 0, 0.80)",
        "luxury-2xl":  "0 40px 80px rgba(0, 0, 0, 0.90)",
        // Glass / elevation
        "glass":       "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-gold":  "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(252, 246, 186, 0.10)",
        // Lifted card
        "card":        "0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(191,149,63,0.08)",
        "card-hover":  "0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(191,149,63,0.20)",
      },

      // ─── BACKGROUNDS ──────────────────────────────────────────────────────
      backgroundImage: {
        // Core luxury gradients
        "luxury-radial":
          "radial-gradient(ellipse at 50% -10%, #0a1128 0%, #020205 70%)",
        "luxury-gradient":
          "radial-gradient(circle at 50% -20%, #0a1128 0%, #020205 80%)",
        "luxury-vignette":
          "radial-gradient(ellipse at center, transparent 40%, rgba(2,2,5,0.9) 100%)",

        // Gold shimmer stripe (use with animate-shimmer-gold)
        "gold-shimmer":
          "linear-gradient(105deg, transparent 30%, rgba(252,246,186,0.4) 50%, transparent 70%)",

        // Gold gradients
        "gold-linear":
          "linear-gradient(135deg, #AA771C 0%, #BF953F 40%, #FCF6BA 60%, #BF953F 80%, #AA771C 100%)",
        "gold-conic":
          "conic-gradient(from 180deg at 50% 50%, #BF953F, #FCF6BA, #AA771C, #BF953F)",
        "gold-radial":
          "radial-gradient(ellipse at center, #FCF6BA 0%, #BF953F 40%, #AA771C 100%)",

        // Surface gradients
        "surface-card":
          "linear-gradient(145deg, #1A1A1F 0%, #0D0D0F 100%)",
        "surface-elevated":
          "linear-gradient(145deg, #2A2A32 0%, #1A1A1F 100%)",

        // Noise overlay (use as pseudo-element bg for texture)
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",

        // Mesh gradient for hero sections
        "mesh-luxury":
          "radial-gradient(at 20% 20%, hsla(43,70%,30%,0.15) 0px, transparent 50%), radial-gradient(at 80% 80%, hsla(220,60%,10%,0.3) 0px, transparent 50%), radial-gradient(at 50% 0%, hsla(43,50%,20%,0.1) 0px, transparent 60%)",
      },

      backgroundSize: {
        "400": "400% 400%",
        "200": "200% 200%",
      },

      // ─── TRANSITIONS ──────────────────────────────────────────────────────
      transitionTimingFunction: {
        "luxury":        "cubic-bezier(0.16, 1, 0.3, 1)",
        "luxury-in":     "cubic-bezier(0.4, 0, 1, 1)",
        "luxury-out":    "cubic-bezier(0, 0, 0.2, 1)",
        "bounce-luxury": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "silk":          "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },

      transitionDuration: {
        "400":  "400ms",
        "600":  "600ms",
        "800":  "800ms",
        "1200": "1200ms",
        "1500": "1500ms",
        "2000": "2000ms",
      },

      // ─── ANIMATIONS ───────────────────────────────────────────────────────
      animation: {
        // Gold effects
        "shimmer-gold":   "shimmerGold 3s linear infinite",
        "shimmer-slow":   "shimmerGold 6s linear infinite",
        "pulse-gold":     "pulseGold 3s ease-in-out infinite",
        "glow-gold":      "glowGold 4s ease-in-out infinite",

        // Entrances
        "fade-in":        "fadeIn 0.6s ease-luxury forwards",
        "fade-in-up":     "fadeInUp 0.8s ease-luxury forwards",
        "fade-in-down":   "fadeInDown 0.8s ease-luxury forwards",
        "fade-in-left":   "fadeInLeft 0.8s ease-luxury forwards",
        "fade-in-right":  "fadeInRight 0.8s ease-luxury forwards",
        "scale-in":       "scaleIn 0.5s ease-luxury forwards",
        "slide-up":       "slideUp 0.7s ease-luxury forwards",

        // Ambient / looping
        "float":          "float 6s ease-in-out infinite",
        "float-slow":     "float 10s ease-in-out infinite",
        "neural-flow":    "neuralFlow 20s linear infinite",
        "rotate-slow":    "rotateSlow 30s linear infinite",
        "breathe":        "breathe 6s ease-in-out infinite",

        // Utility
        "pulse-gentle":   "pulseGentle 4s ease-in-out infinite",
        "spin-slow":      "spin 8s linear infinite",
        "ping-slow":      "ping 3s cubic-bezier(0,0,0.2,1) infinite",
      },

      keyframes: {
        // ── Gold shimmer (slide a bright stripe across) ──
        shimmerGold: {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },

        // ── Gold pulse opacity ──
        pulseGold: {
          "0%, 100%": { opacity: "1",   filter: "brightness(1)" },
          "50%":      { opacity: "0.7", filter: "brightness(1.3)" },
        },

        // ── Gold glow pulse ──
        glowGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(191,149,63,0.2)" },
          "50%":      { boxShadow: "0 0 50px rgba(191,149,63,0.5), 0 0 80px rgba(252,246,186,0.15)" },
        },

        // ── Entrances ──
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)",    filter: "blur(0)" },
        },
        fadeInDown: {
          "0%":   { opacity: "0", transform: "translateY(-24px)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)",     filter: "blur(0)" },
        },
        fadeInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-24px)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateX(0)",     filter: "blur(0)" },
        },
        fadeInRight: {
          "0%":   { opacity: "0", transform: "translateX(24px)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateX(0)",    filter: "blur(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        // ── Ambient ──
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        neuralFlow: {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        rotateSlow: {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)",    opacity: "1" },
          "50%":      { transform: "scale(1.04)", opacity: "0.85" },
        },
        pulseGentle: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.6" },
        },
      },

      // ─── SCREENS ──────────────────────────────────────────────────────────
      screens: {
        "xs":  "480px",
        "3xl": "1920px",
        "4xl": "2560px",
      },

      // ─── BACKDROP BLUR ────────────────────────────────────────────────────
      backdropBlur: {
        "xs":  "2px",
        "4xl": "48px",
        "5xl": "64px",
      },

      // ─── Z-INDEX ──────────────────────────────────────────────────────────
      zIndex: {
        "1":   "1",
        "2":   "2",
        "60":  "60",
        "70":  "70",
        "80":  "80",
        "90":  "90",
        "100": "100",
      },

      // ─── ASPECT RATIO ─────────────────────────────────────────────────────
      aspectRatio: {
        "golden": "1.618 / 1",
        "3/4":    "3 / 4",
        "9/16":   "9 / 16",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
