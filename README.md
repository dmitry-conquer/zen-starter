<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=25&duration=4000&pause=500&color=05F7C3&center=true&vCenter=true&width=700&lines=Zen+Starter;Stop+worrying+about+setup,+just+code)](https://git.io/typing-svg)

</div>

A modern and intuitive starter template for web projects, designed to streamline your development process. It comes pre-configured with essential tools like TypeScript, Vite, and SCSS.

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass"/>
  <img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white" alt="PostCSS"/>
  <img src="https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebars.js&logoColor=white" alt="Handlebars"/>
</p>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />

## ✨ Features

- **Vite**: Next-generation frontend tooling for a blazing fast development experience.
- **TypeScript**: Strong typing for more robust and maintainable code.
- **SCSS**: CSS with superpowers, enabling variables, nesting, and mixins.
- **ESLint**: Pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- **PostCSS**: A tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.
- **Handlebars**: Templating engine to keep your HTML clean and organized.

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
    git clone https://github.com/your-username/zen-starter.git
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

- `npm run dev` - Starts the development server.
- `npm run host` - Starts the development server, accessible on your local network.
- `npm run build` - Builds the project for production.
- `npm run preview` - Serves the production build locally for preview.
- `npm run lint` - Lints the TypeScript files in the project.
- `npm run lint:fix` - Lints and automatically fixes problems in TypeScript files.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />

## 📁 Project Structure

```
zen-starter/
├── components/          # Reusable HTML partials (header, footer, etc.)
├── pages/               # Project pages (HTML files)
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── scripts/         # TypeScript source code
│   │   ├── components/  # TS classes for UI components
│   │   ├── services/    # Services (API, etc.)
│   │   └── main.ts      # Main entry point
│   └── styles/          # SCSS stylesheets
│       ├── components/  # Styles for components
│       ├── helpers/     # Mixins, functions, etc.
│       └── main.scss    # Main stylesheet
├── index.html           # List of all pages for easy navigation
└── vite.config.js       # Vite configuration
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" alt="line" />

## 📝 License

This project is licensed under the MIT License.