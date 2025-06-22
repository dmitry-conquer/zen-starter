# Zen Starter

A modern starter template for web projects with TypeScript, Vite, Tailwind CSS, and Bun.

## 🚀 Quick Start

### Install dependencies
```bash
bun install
```

### Development
```bash
bun run dev
```

### Build project
```bash
bun run build
```

### Preview build
```bash
bun run preview
```

## 🛠 Technologies

- **Bun** - fast JavaScript runtime and package manager
- **TypeScript** - typed JavaScript
- **Vite** - fast build tool
- **Tailwind CSS** - utility-first CSS framework
- **Sass** - CSS preprocessor
- **ESLint** - code linter
- **Prettier** - code formatter

## 📁 Project Structure

```
zen-starter/
├── components/          # HTML components
├── pages/              # Project pages
├── public/             # Static files
├── src/
│   ├── fonts/          # Fonts
│   ├── scripts/        # TypeScript code
│   └── styles/         # SCSS styles
├── bunfig.toml         # Bun configuration
└── package.json        # Dependencies and scripts
```

## 🔧 Commands

```bash
# Development
bun run dev          # Local server
bun run host         # Network accessible server

# Build
bun run build        # Build project
bun run preview      # Preview build

# Linting
bun run lint         # Code check
bun run lint:fix     # Auto fix
```

## ⚡ Bun Benefits

- **Speed**: 20-100x faster package installation
- **Efficiency**: Less memory usage
- **Compatibility**: Full compatibility with npm packages
- **TypeScript**: Built-in support

## 🐛 Troubleshooting

### Windows Issues
```bash
# If errors occur, use:
bun install --no-scripts
```

### Permission Issues
- Run PowerShell as administrator
- Or use WSL2

## 📝 License

MIT