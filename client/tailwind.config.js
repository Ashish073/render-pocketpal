module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1f2937',
          text: '#ffffff',
        },
        light: {
          bg: '#ffffff',
          text: '#333333',
        },
      },
    },
  },
  variants: {
    extend: {
      // Enable dark mode variant
      backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
      borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
      textColor: ['dark', 'dark-hover', 'dark-active'],
      divideColor: ['dark'],
    },
  },
  plugins: [],
}
