import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  appType: "mpa",
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["mixed-decls"],
      },
    },
  },
  build: {
    modulePreload: false,
    rollupOptions: {
      input: {
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
    handlebars({
      partialDirectory: "components",
    }),
    {
      name: "wrap-in-iife",
      generateBundle(outputOptions, bundle) {
        Object.keys(bundle).forEach(fileName => {
          const file = bundle[fileName];
          if (fileName.slice(-3) === ".js" && "code" in file) {
            file.code = `(() => {\n${file.code}})()`;
          }
        });
      },
    },
  ],

  server: {
    open: true,
  },
});
