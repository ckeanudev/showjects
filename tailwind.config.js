/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "light-1": "#FFFFFF",
        "light-2": "#F8F9FA",
        "light-3": "#E9ECEF",
        "light-4": "#DEE2E6",
        "light-5": "#CED4DA",

        "dark-1": "#212529",
        "dark-2": "#343A40",
        "dark-3": "#495057",
        "dark-4": "#6C757D",
        "dark-5": "#ADB5BD",

        "accent-1": "#00AFB9",
        "accent-1_hover": "#10B6BF",
        "accent-2": "#E63946",
        "accent-2_hover": "#EC4B57",
      },
      backgroundImage: {
        "home-section": "url(/images/bg-home-desktop.svg)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
