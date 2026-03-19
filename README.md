# Astro + React + shadcn/ui Project

This project has been migrated from Vite to Astro with SSR (Server-Side Rendering) support.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   │   ├── pages/   # Page components
│   │   └── ui/      # shadcn/ui components
│   ├── layouts/     # Astro layouts
│   ├── pages/       # Astro pages (file-based routing)
│   ├── lib/         # Utility functions
│   └── index.css    # Global styles
├── astro.config.mjs # Astro configuration
└── package.json
```

## Key Changes

- Removed Vite and all AI-related dependencies (lovable-tagger, react-router-dom, @tanstack/react-query)
- Added Astro with SSR support using Node.js adapter
- Converted pages to Astro format with React components using `client:load` directive
- Maintained all shadcn/ui components and styling
- Updated build scripts to use Astro CLI

## Technologies

- Astro 5.0 with SSR
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Radix UI primitives
