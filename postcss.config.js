import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";
import autoprefixer from "autoprefixer";
import postcssCombineMediaQuery from "postcss-combine-media-query";
import postcssSortMediaQueries from "postcss-sort-media-queries";

export default {
  plugins: [
    purgeCSSPlugin({
      content: ["./pages/**/*.html", "./components/**/*.html"],
    }),
    postcssCombineMediaQuery,
    postcssSortMediaQueries,
    autoprefixer({
      overrideBrowserslist: ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead"],
    }),
  ],
};
