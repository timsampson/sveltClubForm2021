module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: ['./public/index.html', './src/**/*.svelte'],
    options: {
      defaultExtractor: content => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
  darkMode: false, 
  theme: {
    extend: {},
  },
    plugins: [
    require("@tailwindcss/forms"),
  ],
  variants: {
    extend: { backgroundColor: ['odd','even', 'disabled'] },
  },
}