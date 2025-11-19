## My Portion

A simple Next.js app to calculate meal portions per cookware. Enter cookware details (weight, weight with meal, serving count) and view a breakdown of portion weights easy to understand.

## Requirements

- Node.js 18+ (or 20+ recommended)
- npm 9+

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build & Start

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Tech stack

- Next.js 15 (App Router, Turbopack)
- React 19
- Material UI 7 (`@mui/material`, `@emotion/*`)
- Zustand for lightweight state (`src/store/useCookware.tsx`)
- TypeScript

## Usage

1. Start the dev server.
2. Add a cookware item with its tare weight, weight with meal, and desired serving count.
3. The portion table will show per-serving weights. If the meal weight is not greater than the tare weight, the table remains hidden.

## Scripts

- `dev`: start development server (Turbopack)
- `build`: production build (Turbopack)
- `start`: start production server
- `lint`: run ESLint

## Deployment

This project is compatible with most Node/Next.js hosts and Vercel. Build the app (`npm run build`) and run with `npm start`, or connect the repository to Vercel for automatic deployments.

### Vercel CI

- Leave the default Vercel **Build Command** (`npm run build`). The script now runs `npm run lint`, `npm run test`, and `next build --turbopack` sequentially, ensuring deployments only proceed when lint, Vitest coverage, and production builds all succeed.

## Notes

- Material UI is configured for Next.js App Router via `@mui/material-nextjs` and Emotion. See `src/components/ClientThemeProvider.tsx` and `src/app/layout.tsx`.
