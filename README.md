<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=25&duration=4000&pause=500&color=05F7C3&center=true&vCenter=true&width=700&lines=Zen+Starter;Stop+worrying+about+setup,+just+code)](https://git.io/typing-svg)

</div>

A premium Vite starter kit for rapid web development, designed to streamline your development process. It comes pre-configured with essential tools like TypeScript, Vite, SCSS, and modern UI components.

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass"/>
  <img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white" alt="PostCSS"/>
  <img src="https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebars.js&logoColor=white" alt="Handlebars"/>
  <img src="https://img.shields.io/badge/Lenis-000000?style=for-the-badge&logo=lenis&logoColor=white" alt="Lenis"/>
</p>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />

## ✨ Features

- **🚀 Vite**: Next-generation frontend tooling for a blazing fast development experience
- **🛡️ TypeScript**: Strong typing for more robust and maintainable code
- **🎨 SCSS**: CSS with superpowers, enabling variables, nesting, and mixins
- **🔧 ESLint & Prettier**: Code quality and formatting tools
- **⚡ PostCSS**: Advanced CSS processing with plugins
- **📝 Handlebars**: Templating engine for clean HTML organization
- **🌀 Lenis**: Buttery smooth scrolling experience
- **🎭 Ready-to-use Components**: Tabs, Modals, Accordions, Theme Switcher
- **📱 Responsive Design**: Mobile-first approach with modern breakpoints
- **🌙 Dark/Light Theme**: Built-in theme switching with persistence
- **📦 Modern Build**: Optimized for production with tree-shaking
- **🧹 PurgeCSS**: Automatic removal of unused CSS for optimal bundle size

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/)

### Installation

You can create a new project using `npm create`:
```bash
npm create zen@latest project-name
```

Alternatively, you can clone the repository manually:

1.  Clone the repository:
    ```bash
    git clone https://github.com/dmitry-conquer/zen-starter.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd zen-starter
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />

## 🛠️ Available Scripts

- `npm run dev` - Starts the development server
- `npm run host` - Starts the development server, accessible on your local network
- `npm run build` - Builds the project for production
- `npm run preview` - Serves the production build locally for preview
- `npm run lint` - Lints the TypeScript files in the project
- `npm run lint:fix` - Lints and automatically fixes problems in TypeScript files

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />

## 📁 Project Structure

```
zen-starter/
├── components/                    # Reusable HTML partials
│   ├── accordion.html            # Accordion component template
│   ├── footer.html               # Footer component template
│   ├── header.html               # Header component template
│   ├── modal.html                # Modal component template
│   └── tabs.html                 # Tabs component template
├── pages/                        # Project pages
│   ├── 404.html                  # 404 error page
│   └── index.html                # Main application page
├── public/                       # Static assets
│   ├── fonts/                    # Font files
│   └── images/                   # Image assets
├── src/
│   ├── scripts/                  # TypeScript source code
│   │   ├── components/           # UI component classes
│   │   │   ├── Accordion.ts      # Accordion component logic
│   │   │   ├── BackTopButton.ts  # Back to top button
│   │   │   ├── Header.ts         # Header component logic
│   │   │   ├── Tabs.ts           # Tabs component logic
│   │   │   ├── Theme.ts          # Theme switcher
│   │   │   └── index.ts          # Component exports
│   │   ├── services/             # Service layer
│   │   │   ├── api.ts            # API utilities
│   │   │   ├── scroll.ts         # Smooth scroll service
│   │   │   ├── storage.ts        # Local storage wrapper
│   │   │   └── index.ts          # Service exports
│   │   ├── types/                # TypeScript type definitions
│   │   │   └── global.d.ts       # Global type definitions
│   │   ├── utils/                # Utility functions
│   │   │   └── modal.ts          # Modal utilities
│   │   └── main.ts               # Main entry point
│   └── styles/                   # SCSS stylesheets
│       ├── core/                 # Core styles
│       │   ├── components/       # Component styles
│       │   │   ├── back-top-button.scss
│       │   │   ├── footer.scss
│       │   │   ├── header.scss
│       │   │   ├── modal.scss
│       │   │   └── index.scss
│       │   ├── helpers/          # SCSS helpers
│       │   │   ├── functions.scss
│       │   │   ├── media.scss
│       │   │   ├── mixins.scss
│       │   │   └── index.scss
│       │   ├── fonts.scss        # Font definitions
│       │   ├── globals.scss      # Global styles
│       │   ├── reset.scss        # CSS reset
│       │   ├── typography.scss   # Typography styles
│       │   ├── utils.scss        # Utility classes
│       │   ├── variables.scss    # SCSS variables
│       │   └── index.scss        # Core styles index
│       └── main.scss             # Main stylesheet
├── .eslintrc.js                  # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── index.html                    # Landing page
├── package.json                  # Project dependencies
├── postcss.config.js             # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── vite.config.js                # Vite configuration
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />

## 🎯 Key Components

### UI Components
- **Accordion**: Collapsible content sections with smooth animations
- **Tabs**: Tabbed interface with keyboard navigation
- **Modal**: Lightweight modal system with backdrop
- **Header**: Responsive navigation with mobile menu
- **BackTopButton**: Smooth scroll-to-top functionality
- **ThemeToggle**: Dark/light theme switcher

### Services
- **Scroll**: Lenis-powered smooth scrolling
- **Storage**: Type-safe local storage wrapper
- **API**: HTTP request utilities

### Utilities
- **Modal Management**: Easy modal initialization and control
- **Type Definitions**: Comprehensive TypeScript types

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />

## 🎨 Styling

The project uses a well-organized SCSS structure:

- **Variables**: Centralized design tokens
- **Mixins**: Reusable style patterns
- **Functions**: SCSS utility functions
- **Media Queries**: Responsive breakpoint helpers
- **Component Styles**: Modular component styling
- **Utility Classes**: Helper classes for common patterns

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />

## 🔧 Configuration

### Vite Configuration
- Multi-page application support
- SCSS preprocessing with modern compiler API
- PostCSS integration with autoprefixer
- Handlebars templating support
- PurgeCSS for unused CSS removal
- Optimized build output

### TypeScript Configuration
- Strict type checking
- Modern ES modules
- Path mapping for clean imports

### Code Quality
- ESLint with TypeScript support
- Prettier for consistent formatting
- Pre-commit hooks ready

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />