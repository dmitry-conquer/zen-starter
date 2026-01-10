import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import process from "node:process";

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
    },
  },
};

// Build configuration
const buildConfig = {
  appType: "mpa",
  publicDir: "public",
  modulePreload: false,
  reportCompressedSize: false,
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
  handlebars({
    partialDirectory: COMPONENTS_DIR,
  }),
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
  {
    name: "wrap-in-iife",
    generateBundle(outputOptions, bundle) {
      Object.keys(bundle).forEach(fileName => {
        const file = bundle[fileName];
        if (fileName.includes("main.js") && "code" in file) {
          file.code = `(() => {\n${file.code}})();`;
        }
      });
    },
  },
  {
    name: "flatten-html-output",
    async writeBundle(outputOptions) {
      const outDir = outputOptions.dir || "dist";
      const pagesDir = path.join(outDir, "pages");

      if (!fs.existsSync(pagesDir)) return;

      const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith(".html"));

      htmlFiles.forEach(file => {
        const sourcePath = path.join(pagesDir, file);
        const targetPath = path.join(outDir, file);
        fs.renameSync(sourcePath, targetPath);
      });

      if (fs.readdirSync(pagesDir).length === 0) {
        fs.rmdirSync(pagesDir);
      }
    },
  },
  {
    name: "build-complete-message",
    buildStart() {
      this.buildStartTime = Date.now();
      
      // Progress bar animation
      const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
      let frameIndex = 0;
      
      process.stdout.write("\n");
      this.progressInterval = setInterval(() => {
        process.stdout.write(`\r${frames[frameIndex]} Building...`);
        frameIndex = (frameIndex + 1) % frames.length;
      }, 80);
    },
    closeBundle() {
      // Clear progress animation
      if (this.progressInterval) {
        clearInterval(this.progressInterval);
        process.stdout.write("\r" + " ".repeat(30) + "\r");
      }
      
      const duration = ((Date.now() - this.buildStartTime) / 1000).toFixed(2);
      const time = new Date().toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // ANSI colors
      const green = "\x1b[32m";
      const bold = "\x1b[1m";
      const reset = "\x1b[0m";

      const distDir = path.resolve(__dirname, "dist/assets");
      const getFileSize = (filePath) => {
        if (!fs.existsSync(filePath)) return null;
        return (fs.statSync(filePath).size / 1024).toFixed(2);
      };

      const cssSize = getFileSize(path.join(distDir, "style.css"));
      const jsSize = getFileSize(path.join(distDir, "main.js"));

      console.log("=".repeat(50));
      console.log(green + bold + "✓ Build completed successfully!" + reset);
      console.log("-".repeat(50));
      console.log(`Time:     ${time}`);
      console.log(`Duration: ${duration}s`);
      console.log("-".repeat(50));
      
      if (cssSize) {
        console.log(`style.css  ${cssSize.padStart(8)} kB`);
      }
      if (jsSize) {
        console.log(`main.js    ${jsSize.padStart(8)} kB`);
      }
      
      console.log("=".repeat(50) + "\n");
    },
  },
];

export default defineConfig({
  logLevel: "warn",
  css: cssConfig,
  build: buildConfig,
  plugins: plugins,
});
