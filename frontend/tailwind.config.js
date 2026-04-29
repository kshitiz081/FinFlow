module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trading: {
          up: '#10b981',
          down: '#ef4444',
          neutral: '#6b7280',
        },
      },
    },
  },
  plugins: [],
}
