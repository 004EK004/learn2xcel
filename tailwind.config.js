/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        midnight: "#0b1220",
        "deep-blue": "#0a1f44",
        "electric-cyan": "#22d3ee",
        "excel-green": "#22c55e",
        "soft-white": "#f8fafc",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["\"JetBrains Mono\"", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(34, 211, 238, 0.35)",
        "glow-green": "0 0 24px rgba(34, 197, 94, 0.35)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at top, rgba(34, 211, 238, 0.25), transparent 55%)",
      },
    },
  },
  plugins: [],
};
