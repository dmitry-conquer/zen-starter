# ZEN Starter

Professional Vite-based starter kit for modern static site development with TypeScript, SCSS, and enterprise-grade tooling.

[![License](https://img.shields.io/badge/license-MIT-3ecf8e?style=flat-square)](LICENSE)
[![Vite](https://img.shields.io/badge/vite-7.x-646cff?style=flat-square)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-3178c6?style=flat-square)](https://www.typescriptlang.org/)

---

## Quick Start

```bash
npm create zen@latest
cd my-project
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run host` | Dev server with network access |
| `npm run build` | Production build with TypeScript compilation |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and deploy via FTP/SFTP |
| `npm run lint` | Run ESLint code quality check |
| `npm run lint:fix` | Auto-fix linting issues |

---

## Project Structure

```
zen-starter/
├── components/          # Handlebars partials (HTML templates)
├── pages/               # Multi-page entry points
├── public/              # Static assets (fonts, images)
├── scripts/             # Build/deploy scripts
├── src/
│   ├── scripts/
│   │   ├── components/  # TypeScript UI components
│   │   ├── services/    # Core services (scroll, storage, api)
│   │   └── utilities/   # Helper functions and utilities
│   └── styles/
│       └── core/        # SCSS architecture (variables, mixins, components)
├── dist/                # Build output
└── index.html           # Development welcome page
```

---

## Features

### Build System

- **Vite 7** — Lightning-fast HMR and optimized production builds
- **Multi-page Architecture** — Automatic entry point discovery from `/pages`
- **Handlebars Templates** — Reusable HTML partials with live reload
- **IIFE Wrapper** — Scripts wrapped for safe CMS integration

### TypeScript Components

| Component | Description |
|-----------|-------------|
| `Accordion` | Accessible single-panel expansion with ARIA support |
| `Tabs` | Full keyboard navigation (arrows, home/end) |
| `Header` | Mobile menu with submenu support and touch detection |
| `Theme` | Light/dark toggle with system preference detection |
| `Marquee` | Continuous scrolling content |
| `BackTopButton` | Scroll-to-top with visibility threshold |

### Services

| Service | Description |
|---------|-------------|
| `Scroll` | Lenis smooth scrolling integration |
| `Storage` | localStorage wrapper |
| `api` | Fetch utilities (get/post) |

### Utilities

| Utility | Description |
|---------|-------------|
| `AdaptiveDOM` | Move elements between containers by breakpoint |
| `modal` | MicroModal wrapper with scroll lock |
| `helpers` | Touch device detection |

### Styling

- **SCSS** with modern compiler API
- **PostCSS** pipeline: autoprefixer, media query combining/sorting
- **CSS Variables** ready architecture
- **Responsive** mixins and breakpoint system

---

## Dependencies

### Runtime

| Package | Purpose |
|---------|---------|
| `lenis` | Smooth scroll library |
| `micromodal` | Accessible modal dialogs |

### Development

| Package | Purpose |
|---------|---------|
| `vite` | Build tool and dev server |
| `typescript` | Type checking |
| `sass` | SCSS compilation |
| `postcss` | CSS post-processing |
| `eslint` + `prettier` | Code quality |
| `vite-plugin-handlebars` | HTML templating |
| `ftp-deploy` | SFTP deployment |

---

## Configuration

### Vite (`vite.config.js`)

- Multi-page input from `/pages/*.html`
- Handlebars partials from `/components`
- Custom plugins: HTML watcher, IIFE wrapper, output flattening
- Clean asset naming: `style.css`, `script.js`

### TypeScript (`tsconfig.json`)

- Target: ES2022
- Strict mode enabled
- Bundler module resolution

### PostCSS (`postcss.config.js`)

- Autoprefixer (> 0.5%, last 2 versions)
- Media query combining and sorting

### Deploy (`scripts/deploy.js`)

FTP/SFTP deployment with `.env` configuration:

```env
FTP_SERVER=your-server.com
FTP_USER=username
FTP_PASSWORD=password
FTP_REMOTE_PATH=/path/to/remote/
```

---

## Usage Examples

### Initialize Components

```typescript
import { AccordionCollection, TabsCollection, Theme } from "./components";

document.addEventListener("DOMContentLoaded", () => {
  new AccordionCollection();
  new TabsCollection();
  new Theme();
});
```

### Smooth Scroll

```typescript
import { Scroll } from "./services";

const scroll = new Scroll();
scroll.initSmoothScroll();
```

```html
<body data-smooth-scroll="true">
```

### Adaptive DOM

```html
<div data-adaptive-dom="mobile-container,768,first">
  <!-- Moves to #mobile-container when viewport ≤ 768px -->
</div>
```

### Handlebars Partials

```html
<!-- pages/index.html -->
{{> header }}
{{> footer }}
```

```html
<!-- components/header.html -->
<header class="header" data-js-header>...</header>
```

---

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox ESR+
- Safari (last 2 versions)
- No IE support

---

## License

MIT © [Dmytro Frolov](https://github.com/dmitry-conquer)
