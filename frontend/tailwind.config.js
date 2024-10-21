/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, rgba(0,0,0,1) 40%, rgba(91,75,174,0.85) 100%)',
      },
      
    },
  },
  plugins: [],
}

