/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(174.785deg, rgba(0, 0, 0, 1) 80%, rgba(91, 75, 174, 0.65) 100%)',
        'text-gradient':'linear-gradient(31deg, rgba(66,109,159,1) 20%, rgba(167,83,78,1) 99%)'
      },
      
    },
  },

  plugins: [],
}

