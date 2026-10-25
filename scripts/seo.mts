/**
 * Post-build SEO step (runs after `vite build`).
 * - Writes one static HTML file per route (dist/solar.html …) with its own title, description, canonical,
 *   structured data and a crawler-readable text version of the page inside #root. React replaces that text
 *   on load, but search engines and AI crawlers that don't run JavaScript can still read it.
 * - Writes sitemap.xml, robots.txt and llms.txt.
 *
 * Site URL: SITE_URL env, else Vercel's production domain, else the default below.
 */
import fs from "node:fs";
import path from "node:path";
import { branches, brand, home, installations, okaya, rajhans, solar, team, verticals } from "../src/data/content.ts";
import { business } from "../src/data/business.ts";
import { faqs } from "../src/data/faq.ts";
import { routeMeta } from "../src/data/seo.ts";
import { story } from "../src/data/story.ts";

const DIST = path.resolve(import.meta.dirname, "..", "dist");
const SITE = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "https://mathur-enterprises-haldwani.vercel.app"
).replace(/\/$/, "");

const PHONE = "+91-9368780920";
const PHONE2 = "+91-9084735451";
const EMAIL = "Aakashmathur3@gmail.com";
const today = new Date().toISOString().slice(0, 10);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const url = (p: string) => (p === "/" ? `${SITE}/` : `${SITE}${p}`);

/* ----------------------------- structured data ----------------------------- */
const orgId = `${SITE}/#business`;
const localBusiness = {
  "@type": ["LocalBusiness", "Store"],
  "@id": orgId,
  name: business.legalName,
  alternateName: ["Haldwani Solar House", "Rajhans Auto Agency Haldwani", "Mathur Enterprises Haldwani"],
  description: routeMeta["/"].description,
  url: `${SITE}/`,
  logo: `${SITE}/favicon.svg`,
  image: `${SITE}/img/brand-poster-lg.webp`,
  telephone: PHONE,
  email: EMAIL,
  foundingDate: String(brand.since),
  founder: { "@type": "Person", name: business.owner, jobTitle: "Director" },
  employee: [{ "@type": "Person", name: "Kapil Mathur", jobTitle: "CEO" }],
  ...(business.gstin ? { taxID: business.gstin, vatID: business.gstin } : {}),
  ...(business.udyam ? { identifier: { "@type": "PropertyValue", propertyID: "Udyam Registration Number", value: business.udyam } } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: "42, Rudrapur–Haldwani Road, Dahariya (opp. Shri Balaji Honda Showroom)",
    addressLocality: "Haldwani",
    addressRegion: "Uttarakhand",
    postalCode: "263139",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 29.1943, longitude: 79.5106 },
  contactPoint: [
    { "@type": "ContactPoint", telephone: PHONE, contactType: "sales", availableLanguage: ["en", "hi"] },
    { "@type": "ContactPoint", telephone: PHONE2, contactType: "customer service", availableLanguage: ["en", "hi"] },
  ],
  areaServed: ["Haldwani", "Kashipur", "Lalkuan", "Rudrapur", "Pantnagar", "Halduchaur", "Kichha", "Bazpur", "Nainital district", "Udham Singh Nagar", "Bareilly", "Uttarakhand", "Uttar Pradesh"].map(
    (name) => ({ "@type": "Place", name }),
  ),
  knowsAbout: ["Rooftop solar", "PM Surya Ghar Muft Bijli Yojana", "Net metering", "Electric rickshaw", "E-scooter", "Inverter batteries", "Solar batteries"],
  brand: ["RAJHANSev", "Okaya", "Luno", "Waaree", "Solastice", "Havells"].map((name) => ({ "@type": "Brand", name })),
  award: ["REDA RenewX 2026", "Uttarakhand 2047 Conference recognition", "Havells Certificate of Appreciation", "LUNO Solarpreneur"],
  makesOffer: verticals.map((v) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: v.name.en, description: v.body.en, url: url(v.path) } })),
  hasCredential: business.certificates.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: c.label.en,
    identifier: c.value,
    url: `${SITE}${c.file}`,
  })),
  sameAs: business.profiles,
};
const website = { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: business.legalName, inLanguage: ["en-IN", "hi-IN"], publisher: { "@id": orgId } };
const faqPage = {
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q.en, acceptedAnswer: { "@type": "Answer", text: f.a.en } })),
};
const crumbs = (p: string) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
    ...(p === "/" ? [] : [{ "@type": "ListItem", position: 2, name: routeMeta[p].title.split("|")[0].trim(), item: url(p) }]),
  ],
});

/* ------------------------- crawler-readable page text ------------------------- */
const li = (xs: string[]) => `<ul>${xs.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
const contactBlock = `<h2>Contact</h2><p>${esc(business.address)}. Phone/WhatsApp ${PHONE}, phone ${PHONE2}, email ${EMAIL}.</p>`;

const bodies: Record<string, string> = {
  "/": `<h1>Mathur Enterprises, Haldwani: ${esc(brand.tagline.en)}</h1><p>${esc(home.sub.en)}</p>
${verticals.map((v) => `<h2><a href="${v.path}">${esc(v.name.en)}</a></h2><p>${esc(v.body.en)}</p>`).join("")}
<h2>Why Mathur Enterprises</h2>${li(home.why.map((w) => `${w.title.en}: ${w.body.en}`))}
<h2>Frequently asked questions</h2>${faqs.map((f) => `<h3>${esc(f.q.en)}</h3><p>${esc(f.a.en)}</p>`).join("")}${contactBlock}`,
  "/solar": `<h1>${esc(solar.title.en)}</h1><p>${esc(solar.sub.en)}</p><h2>Solar solutions</h2>${li(solar.products.map((p) => `${p.title.en}: ${p.body.en}`))}
<h2>${esc(solar.processTitle.en)}</h2><ol>${solar.process.map((s) => `<li>${esc(`${s.title.en}: ${s.body.en}`)}</li>`).join("")}</ol>
<h2>PM Surya Ghar subsidy</h2><p>Total subsidy (central + state) up to ₹85,800 for 3 kW and above; about ₹33,000 for 1 kW and ₹66,000 for 2 kW.</p>
<h2>Installations</h2><p>${esc([...new Set(installations.map((i) => i.town.en))].join(", "))}.</p>${contactBlock}`,
  "/rajhans-ev": `<h1>${esc(rajhans.title.en)}</h1><p>${esc(rajhans.sub.en)}</p><h2>RAJHANSev models</h2>${li(rajhans.models.map((m) => `RAJHANSev ${m.name} (${m.kind === "cargo" ? "cargo / loader" : "passenger e-rickshaw"})`))}
<h2>${esc(rajhans.benefitsTitle.en)}</h2>${li(rajhans.benefits.map((b) => `${b.title.en}: ${b.body.en}`))}<h2>${esc(rajhans.scootyTitle.en)}</h2><p>${esc(rajhans.scootyBody.en)}</p>${contactBlock}`,
  "/okaya": `<h1>${esc(okaya.title.en)}</h1><p>${esc(okaya.sub.en)}</p><h2>${esc(okaya.productsTitle.en)}</h2>${li(okaya.products.map((p) => `${p.title.en}: ${p.body.en}`))}
<h2>${esc(okaya.dealerTitle.en)}</h2><p>${esc(okaya.dealerBody.en)}</p>${contactBlock}`,
  "/story": `<h1>${esc(story.title.en)}</h1><blockquote>${esc(story.quote.en)}</blockquote><p>${esc(story.intro.en)}</p>
${story.chapters.map((c) => `<h2>${esc(c.year)}: ${esc(c.title.en)}</h2><p>${esc(c.body.en)}${c.highlight ? " " + esc(c.highlight.en) : ""}</p>`).join("")}
<h2>${esc(story.letterTitle.en)}</h2>${story.letter.map((p) => `<p>${esc(p.en)}</p>`).join("")}<p>${esc(story.belief.en)}</p><p>${esc(story.ahead.en)}</p>
<p>${esc(story.signoff.en)} — ${esc(story.signByline.en)}, ${esc(story.signByRole.en)}.</p><p>${esc(story.motto.en)}</p>`,
  "/team": `<h1>Team of Mathur Enterprises</h1>${team.map((tier) => `<h2>${esc(tier.title.en)}</h2>${li(tier.members.map((m) => `${m.name}, ${m.role.en}`))}`).join("")}`,
  "/contact": `<h1>Contact Mathur Enterprises, Haldwani</h1>${contactBlock}<h2>Branches</h2>${li(branches.map((b) => `${b.name.en}: ${b.area.en}`))}`,
  "/privacy": `<h1>Privacy Policy</h1><p>${esc(routeMeta["/privacy"].description)}</p>`,
  "/terms": `<h1>Terms of Service</h1><p>${esc(routeMeta["/terms"].description)}</p>`,
};

/* --------------------------------- write HTML --------------------------------- */
const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const setMeta = (html: string, re: RegExp, tag: string) => (re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`));

for (const [p, m] of Object.entries(routeMeta)) {
  const graph = { "@context": "https://schema.org", "@graph": [localBusiness, website, crumbs(p), ...(p === "/" ? [faqPage] : [])] };
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`);
  html = setMeta(html, /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(m.description)}" />`);
  html = setMeta(html, /<meta property="og:title"[^>]*\/>/, `<meta property="og:title" content="${esc(m.title)}" />`);
  html = setMeta(html, /<meta property="og:description"[^>]*\/>/, `<meta property="og:description" content="${esc(m.description)}" />`);
  html = setMeta(html, /<meta property="og:image"[^>]*\/>/, `<meta property="og:image" content="${SITE}/img/brand-poster-lg.webp" />`);
  html = setMeta(html, /<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${url(p)}" />`);
  html = setMeta(html, /<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${url(p)}" />`);
  html = setMeta(html, /<meta name="twitter:card"[^>]*\/>/, `<meta name="twitter:card" content="summary_large_image" />`);
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`);
  html = html.replace('<div id="root"></div>', `<div id="root"><main class="seo-fallback">${bodies[p] ?? ""}</main></div>`);
  const file = p === "/" ? "index.html" : `${p.slice(1)}.html`;
  fs.writeFileSync(path.join(DIST, file), html);
}

/* ------------------------------ sitemap / robots ------------------------------ */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.entries(routeMeta)
  .map(([p, m]) => `  <url><loc>${url(p)}</loc><lastmod>${today}</lastmod><priority>${m.priority.toFixed(1)}</priority></url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);

fs.writeFileSync(
  path.join(DIST, "robots.txt"),
  `# Search engines and AI assistants are welcome to read this site.
User-agent: *
Allow: /
Disallow: /api/

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`,
);

/* ---------------------------------- llms.txt ---------------------------------- */
fs.writeFileSync(
  path.join(DIST, "llms.txt"),
  `# Mathur Enterprises, Haldwani

> ${routeMeta["/"].description}

- Founded: ${brand.since} (founder's journey began in ${brand.journeyStart}). Director: ${business.owner}. CEO: Kapil Mathur.
- Address: ${business.address} (opp. Shri Balaji Honda Showroom).
- Phone/WhatsApp: ${PHONE} · Phone: ${PHONE2} · Email: ${EMAIL}
- Branches: ${branches.map((b) => b.name.en).join(", ")}.
- Areas served: Haldwani, Kashipur, Lalkuan, Rudrapur, Pantnagar, Halduchaur, Kichha, Bazpur, Nainital district, Udham Singh Nagar, Bareilly (UP).
${business.gstin ? `- GSTIN: ${business.gstin}\n` : ""}${business.udyam ? `- Udyam Registration: ${business.udyam}\n` : ""}${business.certificates.length ? `- Certificates: ${business.certificates.map((c) => `${c.label.en} ${SITE}${c.file}`).join("; ")}\n` : ""}
## Businesses
${verticals.map((v) => `- [${v.name.en}](${url(v.path)}): ${v.body.en}`).join("\n")}

## Key facts
- PM Surya Ghar rooftop solar subsidy (central + state): up to ₹85,800 for 3 kW and above. About ₹33,000 for 1 kW and ₹66,000 for 2 kW.
- RAJHANSev models: ${rajhans.models.map((m) => m.name).join(", ")}.
- Okaya products: ${okaya.products.map((p) => p.title.en).join(", ")}.
- Prices are shared only in a quotation (call or WhatsApp).

## FAQ
${faqs.map((f) => `### ${f.q.en}\n${f.a.en}`).join("\n\n")}

## Pages
${Object.entries(routeMeta)
  .map(([p, m]) => `- [${m.title}](${url(p)})`)
  .join("\n")}
`,
);

console.log(`✓ SEO: ${Object.keys(routeMeta).length} pages, sitemap.xml, robots.txt, llms.txt for ${SITE}`);
