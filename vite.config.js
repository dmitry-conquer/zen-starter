import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import viteJoinMediaQueries from "vite-join-media-queries";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    modulePreload: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./src/index.html"),
        // nested: resolve(__dirname, "./src/pages/index.html"),
      },
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
   css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  plugins: [
    viteJoinMediaQueries(),
    handlebars({
      partialDirectory: resolve(__dirname, "components"),
    }),
  ],
});
