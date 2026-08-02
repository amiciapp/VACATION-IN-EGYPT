# Migration Plan: Vite → Next.js

## Why
- SSR for all 30 languages → perfect SEO (no JS-dependency for meta tags)
- Image optimization via `next/image` (built-in WebP/AVIF)
- Automatic code splitting & route-based chunks
- API routes for exchange rate, weather (no external API exposure)
- Better i18n with `next-intl`

## Steps

### 1. Scaffold Next.js
```bash
npx create-next-app@latest vacation-egypt-next --typescript --tailwind --app
```

### 2. Migrate Page Structure
```
app/page.tsx          →  app/[locale]/page.tsx
app/src/pages/TripPage.tsx  →  app/[locale]/trip/[tripId]/page.tsx
app/src/pages/CityPage.tsx  →  app/[locale]/city/[cityName]/page.tsx
app/src/pages/NotFound.tsx  →  app/[locale]/not-found.tsx
```

### 3. i18n with next-intl
- Replace `react-i18next` + `i18next-http-backend` with `next-intl`
- Translation files in `messages/{locale}.json`
- Dynamic `generateStaticParams` for all 32 locales

### 4. Replace Routing
- `react-router` → Next.js App Router
- `Link` from `react-router` → `next/link`
- `useParams` → `params` prop in server components

### 5. Image Optimization
- Replace `<img>` with `next/image`
- Move images to `public/` or use remote patterns

### 6. Meta Tags
- Remove `useSEO.ts` hook entirely
- Use `generateMetadata()` or `Metadata` export per page

### 7. Deploy
- Netlify supports Next.js via `@netlify/plugin-nextjs`
- Or Vercel (native Next.js support, recommended)

## Estimated effort
- 2-3 days for experienced dev
- 4-5 days including i18n setup

## Checklist
- [ ] Create Next.js app
- [ ] Set up next-intl
- [ ] Port all pages
- [ ] Replace image tags
- [ ] Set up metadata generation
- [ ] Configure deployment
- [ ] Test all 32 language variants
