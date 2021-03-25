module.exports = ({env}) => ({
  plugins: {
    'postcss-import': {},
    '@tailwindcss/jit': {},
    autoprefixer: {},
    cssnano: env === "production" ? {preset: "default", discardComments: {removeAll: true}} : false
  },
})
