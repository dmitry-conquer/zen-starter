# Basis Starter

A lightweight starter kit for building modern, multi-page static websites. It uses Vite, TypeScript, SCSS, and Handlebars, with a structure designed for easy integration into a CMS.

## Features

- Fast development and optimized production builds with Vite
- Multi-page setup with automatic page discovery
- Reusable Handlebars components
- TypeScript utilities and accessible UI components
- SCSS with PostCSS processing and responsive helpers
- Optional FTP/SFTP deployment

## Getting Started

```bash
npm install
npm run dev
```

The development server is available at `http://localhost:5173` by default.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run host` | Start the development server on the local network |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check TypeScript files with ESLint |
| `npm run lint:fix` | Fix supported ESLint issues |
| `npm run deploy` | Build and deploy the project |

## Project Structure

```text
components/  Reusable Handlebars components
pages/       HTML entry points
public/      Static assets
scripts/     Deployment scripts
src/         TypeScript and SCSS source files
dist/        Generated production build
```

## Deployment

Copy `.env.example` to `.env` and add the FTP/SFTP credentials required by the deployment script. Then run:

```bash
npm run deploy
```
