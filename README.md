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
The original photos stay untouched in `/images` (~231 MB). `npm run images` converts the mapped ones into
compressed WebP files (640px + 1600px) in `public/img` (~15 MB in total). It also strips EXIF/GPS metadata.

**Add or replace a photo:**
1. Put the file in `/images`.
2. Add `"some-id": "file name.jpg"` to the `MAP` in `scripts/optimize-images.mjs`.
3. Run `npm run images` and commit `public/img` + `src/data/image-sizes.json`.
4. Use the id in `src/data/content.ts`. For a team member, set `photo: "some-id"`.

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

## Deploy (Vercel)
Import the repo in Vercel. The framework is auto-detected as **Vite**, the build command is `npm run build` and the output folder is `dist`.
`vercel.json` already contains the SPA rewrite and long-term caching for images.
