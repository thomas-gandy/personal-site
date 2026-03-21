# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project layout

All source lives under `site/`. Run all commands from that directory.

```
site/
├── src/app/
│   ├── components/     # Homepage sections (Introduction, Experience, Projects, Notes)
│   ├── ui/             # Reusable primitives (HeroText, NotePage, Flashcards, Dots, etc.)
│   ├── notes/          # MDX-driven notes, one subdirectory per topic
│   └── case-studies/   # Case study pages
├── mdx-components.tsx  # Global MDX component overrides
└── next.config.ts      # MDX + Three.js config
```

## Commands

```bash
cd site
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
```

There are no tests.

## Architecture

**Framework**: Next.js 15 App Router, TypeScript, Mantine 8 for UI, MDX for content.

**Notes pages** are single `page.mdx` files that use the `NotePage` wrapper component via MDX's default export pattern:

```mdx
import NotePage from '@/src/app/ui/NotePage'

export default ({ children }) => (
  <NotePage title="Getting started with" highlight="Kubernetes">
    {children}
  </NotePage>
)

Your markdown content here...
```

`NotePage` props: `title?` (text before highlight), `highlight` (colored word), `after?` (text after highlight), `description?` (subtitle). It renders the `HeroText` hero banner and a `Container` wrapper. To add a new note, create a directory under `notes/` with a single `page.mdx` file using this pattern.

**MDX component mapping** is defined in `site/mdx-components.tsx`. HTML elements `a`, `code`, `pre`, and `ul` are remapped to Mantine equivalents globally — do not redefine these inside individual MDX files.

**`HeroText`** (`ui/HeroText.tsx`) uses a compound component pattern: `HeroText.Title`, `HeroText.TitleHighlight`, and `HeroText.Description` are sub-components accessed as static properties. Notes pages should use `NotePage` instead of `HeroText` directly.

**Theming**: Mantine's `ColorSchemeScript` and `MantineProvider` in `layout.tsx` handle dark/light mode automatically (`defaultColorScheme="auto"`). Three.js is transpiled via `transpilePackages` in `next.config.ts`.

**Path alias**: `@/*` resolves to the `site/` root (e.g. `@/src/app/ui/HeroText`).
