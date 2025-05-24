import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import viteJoinMediaQueries from "vite-join-media-queries";

export default defineConfig({
  appType: "mpa",
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    modulePreload: false,
    rollupOptions: {
      input: {
        main: "index.html",
        nested: "pages/index.html",
      },
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name][extname]";
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(name ?? "")) {
            return "assets/fonts/[name][extname]";
          }
          if (/\.(css|scss|sass|less|styl|stylus)$/.test(name ?? "")) {
            return "assets/style[extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
  plugins: [
    viteJoinMediaQueries(),
    handlebars({
      partialDirectory: "components",
    }),
  ],
});
