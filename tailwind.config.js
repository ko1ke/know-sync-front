module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      body: [
        'Avenir',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'Hiragino Sans',
        'ヒラギノ角ゴシック',
        'メイリオ',
        'Meiryo',
        'YuGothic',
        'Yu Gothic',
        'ＭＳ Ｐゴシック',
        'MS PGothic',
        'sans-serif',
      ],
    },
  },
  variants: {
    extend: {
      textDecoration: ['active'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
