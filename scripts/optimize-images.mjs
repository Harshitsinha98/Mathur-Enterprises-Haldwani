// Turns the photos listed in /photos.json into small WebP files in /public/img.
// Originals are never modified. Runs automatically before every build (and with `npm run images`).
// Only photos that are new or changed are re-encoded (tracked by a content hash in public/img/manifest.json).
import sharp from "sharp";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "img");
const SIZES_FILE = path.join(ROOT, "src", "data", "image-sizes.json");
const MANIFEST = path.join(OUT, "manifest.json");
const SIZES = { sm: 640, lg: 1600 };

const MAP = JSON.parse(await fs.readFile(path.join(ROOT, "photos.json"), "utf8"));
const readJson = async (f) => JSON.parse(await fs.readFile(f, "utf8").catch(() => "{}"));
const manifest = await readJson(MANIFEST);
const dims = await readJson(SIZES_FILE);

await fs.mkdir(OUT, { recursive: true });
let made = 0, kept = 0;
const missing = [];

for (const [id, rel] of Object.entries(MAP)) {
  const src = path.join(ROOT, rel);
  let buf;
  try {
    buf = await fs.readFile(src);
  } catch {
    missing.push(`${id} → ${rel}`);
    continue;
  }
  const hash = crypto.createHash("sha1").update(buf).digest("hex");
  const outputs = Object.keys(SIZES).map((s) => path.join(OUT, `${id}-${s}.webp`));
  const exists = (await Promise.all(outputs.map((o) => fs.access(o).then(() => true, () => false)))).every(Boolean);
  if (exists && manifest[id] === hash && dims[id]) {
    dims[id] = [dims[id][0], dims[id][1], hash.slice(0, 8)]; // version used for cache-busting URLs
    kept++;
    continue;
  }
  for (const [suffix, width] of Object.entries(SIZES)) {
    const info = await sharp(buf)
      .rotate() // respect EXIF orientation
      .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
      .webp({ quality: suffix === "sm" ? 68 : 74, effort: 5 })
      .toFile(path.join(OUT, `${id}-${suffix}.webp`)); // EXIF/GPS metadata is stripped
    if (suffix === "lg") dims[id] = [info.width, info.height, hash.slice(0, 8)];
  }
  manifest[id] = hash;
  made++;
}

// drop photos that were removed from photos.json
for (const id of Object.keys(dims)) {
  if (MAP[id]) continue;
  delete dims[id];
  delete manifest[id];
  for (const s of Object.keys(SIZES)) await fs.rm(path.join(OUT, `${id}-${s}.webp`), { force: true });
}

const sorted = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
await fs.writeFile(SIZES_FILE, JSON.stringify(sorted(dims)) + "\n");
await fs.writeFile(MANIFEST, JSON.stringify(sorted(manifest), null, 1) + "\n");
if (missing.length) console.warn(`! ${missing.length} photo(s) listed in photos.json were not found:\n  ${missing.join("\n  ")}`);
console.log(`✓ images: ${made} new/updated, ${kept} unchanged`);
