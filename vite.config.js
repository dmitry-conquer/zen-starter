import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Constants
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.resolve(__dirname, "pages");
const COMPONENTS_DIR = path.resolve(__dirname, "components");
const SRC_DIR = path.resolve(__dirname, "src");

// Build input configuration
const buildInput = {};
fs.readdirSync(PAGES_DIR).forEach(file => {
  if (file.endsWith(".html")) {
    const name = path.parse(file).name;
    buildInput[name] = path.resolve(PAGES_DIR, file);
  }
});
buildInput.main = path.resolve(SRC_DIR, "scripts/main.ts");

// CSS configuration
const cssConfig = {
  devSourcemap: true,
  preprocessorOptions: {
    scss: {
      api: "modern-compiler",
      silenceDeprecations: ["mixed-decls"],
    },
  },
};

// Build configuration
const buildConfig = {
  appType: "mpa",
  publicDir: "public",
  modulePreload: false,
  rollupOptions: {
    input: buildInput,
    output: {
      entryFileNames: "assets/[name].js",
      assetFileNames: ({ name }) => {
        if (/\.(css|scss|sass|less|styl|stylus)$/.test(name ?? "")) {
          return "assets/style[extname]";
        }
        return "assets/[name][extname]";
      },
    },
  },
};

// Custom plugins
const plugins = [
  // Handlebars plugin
  handlebars({
    partialDirectory: COMPONENTS_DIR,
  }),

  // Handlebars watcher plugin
  {
    name: "handlebars-watcher",
    configureServer(server) {
      const watcher = server.watcher;
      watcher.add([`${COMPONENTS_DIR}/**/*.html`]);

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

  // IIFE wrapper plugin
  {
    name: "wrap-in-iife",
    generateBundle(outputOptions, bundle) {
      Object.keys(bundle).forEach(fileName => {
        const file = bundle[fileName];
        if (fileName.includes("main.js") && "code" in file) {
          file.code = `(() => {\n${file.code}})()`;
        }
      });
    },
  },
];

export default defineConfig({
  css: cssConfig,
  build: buildConfig,
  plugins: plugins,
});
