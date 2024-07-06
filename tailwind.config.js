/** @type {import('tailwindcss').Config} */

// Github issue: https://github.com/nativewind/nativewind/issues/77#issuecomment-2169567817

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-white': '#f2f2f2',
        'custom-black': '#444',
        'custom-skyblue': '#CCE4FB',
        'custom-blue': '#40A3FF',
        'custom-deepblue': '#2C73FF',
        'custom-grey': '#D9D9D9',
        'custom-pink': '#FFD6D6',
        'custom-deepyellow': '#FFF500',
        'custom-yellow': '#FFF8D6',
      },
    },
  },
  plugins: [],
};
