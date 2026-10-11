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

## Deploy (Vercel)
Import the repo in Vercel. The framework is auto-detected as **Vite**, the build command is `npm run build` and the output folder is `dist`.
`vercel.json` already contains the SPA rewrite and long-term caching for images.
