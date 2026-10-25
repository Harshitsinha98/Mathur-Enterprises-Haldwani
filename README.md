# Mathur Enterprises, Haldwani: Website

The website for **Mathur Enterprises**, which runs three businesses: Solar Solutions, Rajhans Auto (e-rickshaw) and Okaya Distributor.
Built with Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion. It has an English / हिंदी toggle.

## Pages
| Route | Content |
|---|---|
| `/` | Sunrise hero, the 3 businesses, why-us bento, moments scroller, awards, team preview, branches |
| `/solar` | Solar portfolio: solutions, PM Surya Ghar subsidy calculator, process timeline, installation map, geo-tagged gallery |
| `/rajhans-ev` | RAJHANSev models (no prices), benefits, e-scooty, delivery gallery |
| `/okaya` | Okaya product range, dealer enquiry |
| `/team` | Full org chart (photo or initials avatar) |
| `/contact` | Call / WhatsApp, enquiry form (opens WhatsApp), branches, map |

## Develop
```bash
npm install
npm run dev       # local server
npm run build     # production build -> dist/
```

## Images
Originals stay untouched in `/images` and `/team member pic`. **`photos.json`** lists every photo used on the site (`id → file`).
`scripts/optimize-images.mjs` runs automatically before every build. It converts new or changed photos into WebP (640px + 1600px) in `public/img` and strips EXIF/GPS data.
For step-by-step instructions (in Hinglish) on adding, replacing or removing photos, see **[PHOTOS.md](PHOTOS.md)**.

## Content
All text, in both English and Hindi, lives in `src/data/content.ts`: team, branches, products, installations and awards.

## Quick actions & AI assistant
- **Mobile:** a bottom dock with Call, WhatsApp, AI (Mathur Mitra) and a page-aware button that opens the Quick Enquiry builder. The button reads "Free site survey" on Solar, "Book test ride" on Rajhans and "Get a quote" on Okaya.
- **Desktop:** AI and WhatsApp bubbles in the bottom-right corner.
- **Quick Enquiry:** 3 taps (business, need and when, town). It then opens WhatsApp with a structured message.
- **Mathur Mitra (AI):** `api/chat.ts` is a Vercel Function. Set **one** of these in Vercel → Project → Settings → Environment Variables, then redeploy:
  - `GEMINI_API_KEY` (optional `GEMINI_MODEL`, default `gemini-3.8-flash`)
  - `OPENAI_API_KEY` (optional `OPENAI_MODEL`, default `gpt-5.4-mini`)

  If no key is set, or the provider fails, the chat automatically uses the built-in rule-based assistant in `src/lib/assistant.ts`, so it never breaks. The API key stays on the server.
  Keep `KNOWLEDGE` in `api/chat.ts` in sync with `src/data/content.ts` when business details change.

## SEO
- `src/data/seo.ts`: title and description for every page.
- `src/data/faq.ts`: FAQs, shown on the home page and published as FAQPage schema.
- `src/data/business.ts`: legal name, **GSTIN and Udyam number** (fill these from the certificates; empty values stay hidden).
- `scripts/seo.mts` runs after `vite build`. It writes a static HTML file per route with its own meta tags, LocalBusiness/FAQ JSON-LD and readable page text (for crawlers that don't run JS), plus `sitemap.xml`, `robots.txt` and `llms.txt`.
- The site URL comes from `SITE_URL`, or else Vercel's production domain. Once you have a custom domain, set `SITE_URL=https://yourdomain.in` in Vercel.

## Deploy (Vercel)
Import the repo in Vercel. The framework is auto-detected as **Vite**, the build command is `npm run build` and the output folder is `dist`.
`vercel.json` already contains the SPA rewrite and long-term caching for images.
