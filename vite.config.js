import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pagesDir = path.resolve(__dirname, "pages");
const input = {};

fs.readdirSync(pagesDir).forEach(file => {
  if (file.endsWith(".html")) {
    const name = path.parse(file).name;
    input[name] = path.resolve(pagesDir, file);
  }
});

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
      input,
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
      name: "handlebars-watcher",
      configureServer(server) {
        const watcher = server.watcher;
        
        watcher.add([
          path.resolve(__dirname, "components/**/*.html"),
        ]);
        
        watcher.on("change", (file) => {
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