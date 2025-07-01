import autoprefixer from "autoprefixer";
import postcssCombineMediaQuery from "postcss-combine-media-query";
import postcssSortMediaQueries from "postcss-sort-media-queries";

export default {
  plugins: [
    postcssCombineMediaQuery,
    postcssSortMediaQueries,
    autoprefixer({
      overrideBrowserslist: ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead"],
    }),
  ],
};
