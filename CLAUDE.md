# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@fellesdatakatalog/ui` is a React component library for FDK (Felles Datakatalog / Norwegian Data Catalog) frontend applications. It provides reusable UI components built on top of the Norwegian Design System (`@digdir/designsystemet`).

## Commands

- `yarn storybook` - Start Storybook dev server on port 6006
- `yarn test` - Run Vitest tests
- `yarn build` - Build library (Vite build + TypeScript declarations)
- `yarn watch` - Build in watch mode during development
- `yarn build-storybook` - Build static Storybook site

## Architecture

### Component Structure

Components live in `src/components/` and follow this pattern:
- `index.tsx` - Component implementation with JSDoc comments
- `[component].stories.tsx` - Storybook documentation
- `styles.module.scss` or `[component].module.scss` - CSS Modules

All components are exported from `src/index.ts`.

### Core Styling

The `src/components/core/` directory contains foundational SCSS files:
- `_tokens.scss` - Design tokens
- `_mixins.scss` - Reusable SCSS mixins
- `_ds-overrides.scss` - Design system component overrides

These are exported directly for consumers who need SCSS-level access.

### Build Output

The library builds to:
- `dist/shared-ui.es.js` (ESM)
- `dist/shared-ui.cjs` (CommonJS)
- `dist/styles.css` (bundled CSS)
- `dist/types/` (TypeScript declarations)

### Key Dependencies

- **React 19** - Uses `'use client'` directives for RSC compatibility
- **@digdir/designsystemet-react** - Base UI components (peer dependency)
- **@navikt/aksel-icons** - Icon library
- **CSS Modules** with camelCase class name convention

### Testing

Uses Vitest with `@vitest/browser` (Playwright provider). Storybook stories serve as test cases via `@storybook/addon-vitest`.

## Development Notes

- Node.js >=22 and Yarn >=4.9.4 required
- Run `corepack enable` before `yarn install`
- Props interfaces are exported (e.g., `RadioGroupProps`, `CheckboxGroupProps`)
- Components use `React.forwardRef` where ref forwarding is needed
