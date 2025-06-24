export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead"],
    },
    "postcss-combine-media-query": {},
    "postcss-sort-media-queries": {},
  },
};
