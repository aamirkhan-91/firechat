// eslint-disable-next-line @typescript-eslint/no-var-requires
// const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
    colors: {
      green: {
        DEFAULT: '#DCF8C6',
      },
      // yellow: {
      //   DEFAULT: colors.amber[400],
      //   light: colors.yellow[300],
      //   dark: colors.yellow[500],
      // },
      white: {
        DEFAULT: '#fff',
        dark: '#fefefe',
        darker: '#f2f2f2',
        hover: '#f5f6f6',
      },
      purple: {
        DEFAULT: '#673ab7',
        dark: '#512da8',
        light: '#d1c4e9',
        hover: '#7356b9',
      },
      blue: {
        DEFAULT: '#1e88e5',
        light: '#60a5fa',
        hover: '#6ab7ff',
      },
      red: {
        DEFAULT: '#ff0033',
        light: '#ff5722',
        hover: '#ff4c70',
      },
      border: {
        DEFAULT: '#d1d7db',
      },
    },
    textColor: {
      primary: '#212121',
      secondary: '#757575',
      white: '#eee',
      error: '#ff0033',
      purple: '#512da8',
      blue: '#1e88e5',
      icon: '#80868a',
    },
    extend: {},
  },
  plugins: [],
};
