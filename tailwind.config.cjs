/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#0065BD",
        
"secondary": "#95959B",
        
"accent": "#ffffff",
        
"neutral": "#2b3440",
        
"base-100": "#ffffff",
        
"info": "#ffffff",
        
"success": "#36d399",
        
"warning": "#fbbd23",
        
"error": "#f87272",

        },
      },
    ],
  },

  plugins: [require('daisyui')],
};

module.exports = config;
