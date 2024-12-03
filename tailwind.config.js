module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // Remove the darkMode line if you don't need dark mode,
  // or set it to 'media' or 'class' based on your preference
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        primaryBlue: '#017fae',
        secondaryBlue: '#02b9f1',
        darkBlue: '#032046',
        hoverYellow: '#fff2cc',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
