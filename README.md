# Sultan Dates (سلطان للتمور) — Luxury E-Commerce Storefront

A high-performance, animation-rich, SEO-optimized **Next.js 15 (App Router)** storefront for **Sultan Dates**, offering premium organic dates harvested directly from ancient palm groves in **Al-Madinah Al-Munawwarah** and **Al-Qassim**.

---

## ✨ Features & Architecture

### 🌴 Visual Design & Aesthetics
- **Color Theme**: Rich Palm Tree Emerald (`#1F6F43`, `#165331`), Royal Forest (`#0D2818`), Soft Oasis Cream (`#EDF3E8`), and Gold Accents (`#C59B27`).
- **Branding**: Sultan's Calligraphy Emblem (`sultan-logo.png`), custom preloader, and floating oasis particles.
- **Typography**: `Plus Jakarta Sans` for clean body copy, `Cinzel` for royal headings, and Arabic typography accents.
- **Micro-Interactions**: Smooth entrance and scroll animations powered by `motion/react` (Framer Motion).

### 🛒 Storefront & Shopping Flow
- **Product Catalog**:
  - Sacred Ajwa Al-Madinah (VIP, Jumbo, Seven-Day Pack)
  - Royal King Medjool
  - Mabroom & Amber Al-Madinah
  - Sukkari Rutab & Safawi
  - Artisanal Stuffed Dates (Roasted Pistachios, Almonds, Belgian Chocolate)
  - Pure Date Molasses & Baking Pastes
- **Variant Selector**: 1kg, 500g, 250g weight selections with real-time price calculations.
- **Client-Side Cart**: Persisted in `localStorage` under `sultan_dates_cart`.
- **Checkout Machine**: Multistep mock checkout with Bank Transfer (MCB / Meezan), JazzCash, and EasyPaisa options with automatic order total computation and WhatsApp support.

### 🔍 Complete SEO Readiness
- Next.js 15 Metadata API with canonical URLs, OpenGraph, and Twitter Card tags.
- Schema.org JSON-LD Structured Data (`Store`, `Organization`, `WebSite`).
- Automated Dynamic XML Sitemap (`/sitemap.xml` via `src/app/sitemap.ts`).
- Crawlers Configuration (`/robots.txt` via `src/app/robots.ts`).
- Semantic HTML5 structure with optimized headings (`h1` hierarchy) and descriptive alt attributes.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

### 4. Type Check
```bash
npm run lint
```

---

## 📁 Project Structure

```
sultan-dates/
├── public/
│   ├── assets/images/
│   │   ├── sultan-logo.png
│   │   ├── sultan-logo.jpeg
│   │   └── products/ (ghee, honey, pickles, spices, poultry)
│   ├── favicon.ico
│   └── logo.jpeg
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root Layout with JSON-LD & OG tags
│   │   ├── page.tsx           # Home Route
│   │   ├── shop/page.tsx      # Shop Route
│   │   ├── about/page.tsx     # About Route
│   │   ├── contact/page.tsx   # Contact Route
│   │   ├── cart/page.tsx      # Cart Route
│   │   ├── sitemap.ts         # Dynamic XML Sitemap
│   │   └── robots.ts          # Robots.txt Configuration
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar/        # Fixed & Scroll-aware Navbar with Marquee
│   │   │   └── Footer/        # Royal Footer with links & contacts
│   │   └── ui/
│   │       ├── CheckoutModal.tsx # Multistep Checkout Modal
│   │       ├── FloatingIcons.tsx # Palm leaf & sparkle particle engine
│   │       └── Preloader.tsx     # Sultan Dates Logo Preloader
│   ├── context/
│   │   ├── CartContext.tsx    # Global Cart Provider
│   │   └── ModalContext.tsx   # Global Modal State
│   ├── views/
│   │   ├── Home/              # Hero, Marquee, Categories, Benefits, Contact
│   │   ├── Shop/              # Filterable Catalog & Product Cards
│   │   ├── About/             # Heritage, Pillars, FAQs
│   │   ├── Contact/           # Inquiry Form & Support Desk
│   │   └── Cart/              # Cart Management & Summary
│   └── index.css              # Tailwind v4 Theme Tokens & Components
├── README.md                  # Project Guide
├── SEO_GUIDE.md               # Search Engine Optimization Strategy
└── PROJECT_TRACKER.md         # Milestones & Tracker
```

---

## 📄 Documentation Files
- [SEO_GUIDE.md](./SEO_GUIDE.md) — Comprehensive keyword strategy, on-page optimization, and schema guide.
- [PROJECT_TRACKER.md](./PROJECT_TRACKER.md) — Progress logs and future roadmap.
