# Sultan Dates (سلطان) — Search Engine Optimization (SEO) Strategy Guide

This guide details the SEO foundation implemented in **Sultan Dates** and the roadmap for ranking on Google search for primary date varieties, gift sets, and health keywords.

---

## 🎯 Target Keyword Clusters

### 1. High-Intent Commercial Keywords
- `buy ajwa dates online pakistan`
- `best medjool dates price in pakistan`
- `original ajwa dates madinah price`
- `buy mabroom dates online`
- `royal amber dates price`
- `sukkari rutab dates online`
- `luxury date gift box pakistan`
- `ramadan eid dates hampers`
- `chocolate stuffed dates online`

### 2. Informational & Health Search Queries
- `benefits of ajwa dates 7 in morning`
- `ajwa dates heart health benefits`
- `how to store fresh dates and rutab`
- `sunnah dates nutrition facts`
- `organic date syrup molasses benefits`

### 3. Localized & Brand Keywords
- `sultan dates pakistan`
- `sultan dates online store`
- `saudi dates delivery lahore karachi islamabad`
- `authentic madinah dates supplier pakistan`

---

## 🏗️ Technical SEO Architecture Implemented

| Component | Implementation | Location |
| :--- | :--- | :--- |
| **Next.js Metadata API** | Standardized titles, descriptions, canonical URLs, and OpenGraph images | `src/app/**/page.tsx` & `src/app/layout.tsx` |
| **Schema.org Structured Data** | JSON-LD `Store`, `Organization`, and `WebSite` metadata | `src/app/layout.tsx` |
| **XML Sitemap** | Auto-generating XML sitemap with daily/weekly change frequencies | `src/app/sitemap.ts` (`/sitemap.xml`) |
| **Robots.txt** | Clean indexing directive allowing search engine bots | `src/app/robots.ts` (`/robots.txt`) |
| **OpenGraph & Twitter Cards** | Social sharing previews with branded emblem and descriptions | `src/app/layout.tsx` |
| **Semantic Hierarchy** | Proper `<h1>`, `<section>`, `<article>`, and descriptive `alt` tags | `src/views/**` |
| **Responsive Web Vitals** | Zero layout shifts, asynchronous image decoding, CSS `@theme` tokens | `src/index.css` & components |

---

## 📋 On-Page SEO Checklist for New Content

When adding new products or blog articles:
1. **Title Tag**: Keep within 50–60 characters. Format: `[Product Name] - [Key Benefit] | Sultan Dates`.
2. **Meta Description**: Keep within 140–160 characters, containing target keyword and a clear CTA.
3. **Product Images**:
   - Filename format: `ajwa-al-madinah-vip-1kg.png` (kebab-case).
   - Add descriptive `alt` text: `alt="Authentic Grade A+ Ajwa Al-Madinah dates in luxury Sultan Dates box"`.
4. **Internal Linking**:
   - Link from Home / About pages to specific category filters (`/shop`).
   - Mention complementary items (e.g. Arabic Coffee / Stuffed Dates).

---

## 🔮 Future SEO Expansions

- [ ] **Blog Section (`/blog`)**: Create articles on date varieties, prophetic health traditions, and date recipes.
- [ ] **Google Search Console**: Verify domain ownership and submit `/sitemap.xml`.
- [ ] **Google Merchant Center**: Export JSON product feed for Google Shopping free listings.
- [ ] **Customer Reviews Schema**: Add `AggregateRating` and `Review` JSON-LD schema when customer reviews are collected.
