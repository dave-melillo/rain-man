import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Casino dark theme
        casino: {
          dark: "#0d0d1a",      // Darkest background
          darker: "#1a1a2e",    // Card backgrounds
          card: "#16213e",      // Elevated cards
          felt: "#0f3d3e",      // Green felt
          "felt-light": "#1a5f5f", // Lighter felt for hover
          gold: "#ffc107",      // Gold highlights
          "gold-dark": "#d4a106", // Darker gold
          red: "#dc3545",       // Red for hits
          blue: "#0d6efd",      // Blue for doubles
          purple: "#6f42c1",    // Purple for splits
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      boxShadow: {
        "casino": "0 4px 20px rgba(0, 0, 0, 0.5)",
        "gold": "0 0 20px rgba(255, 193, 7, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
