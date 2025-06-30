import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import purgeCss from "vite-plugin-purgecss";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["mixed-decls"],
      },
    },
  },

  build: {
    appType: "mpa",
    publicDir: "public",
    modulePreload: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        pages: path.resolve(__dirname, "pages/index.html"),
      },
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(css|scss|sass|less|styl|stylus)$/.test(name ?? "")) {
            return "assets/style[extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },

  plugins: [
    purgeCss({
      content: ["./pages/**/*.html"],
      safelist: ["prose"],
    }),
    handlebars({
      partialDirectory: "components",
    }),
    {
      name: "handlebars-watcher",
      configureServer(server) {
        const watcher = server.watcher;

        watcher.add([path.resolve(__dirname, "components/**/*.html")]);

        watcher.on("change", file => {
          if (file.endsWith(".html")) {
            server.ws.send({
              type: "full-reload",
              path: "*",
            });
          }
        });
      },
    },
    {
      name: "wrap-in-iife",
      generateBundle(outputOptions, bundle) {
        Object.keys(bundle).forEach(fileName => {
          const file = bundle[fileName];
          if (fileName.endsWith(".js") && "code" in file) {
            file.code = `(() => {\n${file.code}})()`;
          }
        });
      },
    },
  ],
});
