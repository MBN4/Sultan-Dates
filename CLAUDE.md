# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Urban Village is a marketing/e-commerce storefront for a fictional regenerative-produce brand — a single-page-feel, animation-heavy Next.js site with a client-side shopping cart and a mock checkout. There is no backend or database; product/content data is hardcoded and the cart lives in `localStorage`.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — **type-checks only** (`tsc --noEmit`); there is no ESLint and no test suite
- `npm run clean` — delete the `.next` build cache

There are no tests in this repo.

## Stack

- **Next.js 15 (App Router)** + **React 19**, TypeScript (`strict: false`, but `strictNullChecks: true`)
- **Tailwind CSS v4** configured CSS-first (no `tailwind.config.js`) — the theme and custom utilities live in `src/index.css` via `@theme` and `@layer`. PostCSS is wired through `postcss.config.mjs`.
- **motion** (Framer Motion, imported as `motion/react`) for all animation
- **lucide-react** for icons
- Path alias: `@/*` → `./src/*` (see `tsconfig.json`)

## Architecture

The App Router layer is intentionally thin; all real UI lives in `src/views`.

- **`src/app/<route>/page.tsx`** — each route file only sets `metadata` and renders the matching view component (e.g. `app/shop/page.tsx` → `<Shop />`). Add a new page by creating both a route folder here and a view.
- **`src/app/layout.tsx`** — root layout. Wraps everything in `CartProvider` and mounts the persistent chrome: `Preloader`, `FloatingIcons`, `Navbar`, `Footer`. Imports the global stylesheet as `@/index.css`.
- **`src/views/<Name>/`** — the actual page implementations, each a `'use client'` component. Convention: `index.tsx` holds presentation, `data.ts` holds all content (hero copy, product arrays, filters, etc.) exported as plain objects/arrays. **Edit copy and product listings in `data.ts`, not in the JSX.**
- **`src/components/layout/`** — `Navbar` and `Footer` (each also has its own `data.ts`).
- **`src/components/ui/`** — shared widgets: `CheckoutModal`, `FloatingIcons`, `Preloader`.
- **`src/context/CartContext.tsx`** — global cart state.

### Cart & checkout

`CartContext` exposes `addToCart / removeFromCart / updateQuantity / clearCart / cartTotal / cartCount` via the `useCart()` hook and persists to `localStorage` under the key `urban_village_cart`.

Important data quirk: **prices are strings** like `"$6.50"`. `cartTotal` computes with `parseFloat(price.replace('$',''))`, so any new product's `price` must be a `$`-prefixed string or totals break. Product `id` may be a `number` or `string` (bundles use their title as the id).

`CheckoutModal` is a **mock, frontend-only** flow — a `method → address | payment-info → success` step machine (Cash on Delivery / JazzCash / EasyPaisa, i.e. Pakistan-oriented). It calls `clearCart()` on finish but sends nothing to any server.

## Design system

Custom Tailwind tokens are defined in `src/index.css` `@theme` and used throughout:
- Colors: `lime` (`#4D7C0F`, the primary accent — appears everywhere as `text-lime`, `bg-lime`), `forest`, `forest-dark`, `cream`. The page background is `#E9F0E1`.
- Fonts: `font-sans` (Inter), `font-serif` (Playfair Display, used italic for headings), `font-mono` (JetBrains Mono).
- Custom component classes (also in `index.css`): `section-padding`, `glass-card`, `hero-gradient`, `vertical-text`, `animate-float`.

## Notes

- `@google/genai` is listed as a dependency and `.env.example` documents `GEMINI_API_KEY` / `APP_URL` (artifacts of the AI Studio scaffold), but no source file currently uses Gemini or reads these vars.
- All product/decorative imagery is served locally from `public/assets/images/products/<category>/` (`ghee`, `pickles`, `poultry`, `spices`) and referenced by absolute `/assets/...` paths. The logo lives at `public/assets/images/urban-village-logo.png`. Keep filenames web-safe (kebab-case, no spaces/`&`).
