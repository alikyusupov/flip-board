# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Nx 23** monorepo — task orchestration, caching, and code generation
- **Angular 21** with standalone components (no NgModules)
- **Vitest** (via `vitest-angular` runner) for unit tests
- **ESLint 9** (flat config) + **Prettier** for linting/formatting
- **SCSS** for styles; `@angular/build:application` (esbuild-based) for bundling

## Commands

All tasks run through Nx. The project name is `angular-monorepo`.

```bash
# Dev server
npx nx serve angular-monorepo

# Production build → dist/apps/angular-monorepo
npx nx build angular-monorepo

# Run tests (watch mode off by default)
npx nx test angular-monorepo

# Lint
npx nx lint angular-monorepo

# Format
npx nx format:write

# Run a single test file
npx nx test angular-monorepo --testFile=apps/angular-monorepo/src/app/app.spec.ts

# See all available targets for a project
npx nx show project angular-monorepo

# Run a target across all projects
npx nx run-many -t test
npx nx run-many -t lint

# Visualise the project graph
npx nx graph
```

## Generating new projects

```bash
# New application (e2e disabled, eslint, scss, vitest preconfigured via nx.json generators)
npx nx g @nx/angular:app <name>

# New shared library
npx nx g @nx/angular:lib <name>
```

## Architecture

### Monorepo layout

```
apps/          # Deployable applications
  angular-monorepo/   # Main app
libs/          # Shared libraries (none yet — create with nx g)
```

Path aliases for libs are declared in `tsconfig.base.json → compilerOptions.paths` and auto-updated by Nx generators.

### Angular application bootstrap (standalone, no NgModule)

`main.ts` calls `bootstrapApplication(App, appConfig)`.

- **`app.config.ts`** — the single source of truth for app-level providers (`provideRouter`, HTTP client, state, etc.). Add all global providers here.
- **`app.routes.ts`** — root route array. Feature routes should be lazy-loaded via `loadChildren` pointing to a lib's route file.
- **`app.ts`** — root component; keep it minimal (just the router outlet and top-level layout).

### TypeScript

Strict mode is fully enabled in `tsconfig.json` (`strict`, `noImplicitOverride`, `noImplicitReturns`, `strictTemplates`, `strictInjectionParameters`). The base config (`tsconfig.base.json`) targets ES2015/ESNext modules; per-app configs extend it and target ES2022 with `moduleResolution: bundler`.

### Module boundary enforcement

`@nx/enforce-module-boundaries` is active in the root `eslint.config.mjs`. When adding libs, apply Nx `tags` in `project.json` and tighten `depConstraints` in the root ESLint config to control what can import what.

### Test setup

Tests use `vitest/globals` (no explicit imports needed for `describe`/`it`/`expect`). The spec tsconfig includes all `src/**/*.ts` files. Tests run in watch-off mode by default; pass `--watch` to flip it.
