// Converts the original photos in /images into small WebP files in /public/img.
// Originals are never modified. Run with: npm run images
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "images");
const OUT = path.join(ROOT, "public", "img");
const SIZES_FILE = path.join(ROOT, "src", "data", "image-sizes.json");

// id -> original file name inside /images
const MAP = {
  // brand
  "brand-poster": "WhatsApp Image 2026-10-11 at 04.11.07.jpeg",

  // team (files named by the client)
  "team-aakash-mathur": "Aakash mathur  Mathur enterprises  Ceo.jpg",
  "team-anuj-sharma": "Anuj.sharma lalkuam solar house  Brach manager.jpg",
  "team-bagwati-chouhan": "Bagwati chouhan  Haldwani manager.jpg",
  "team-dharmveer-mourya": "Dharmveer singh mourya  E rikshsa e scooty head sale manger.jpg",
  "team-jay-nagar": "Jay nagar sale manger Jay nagar solar house.jpg",
  "team-darwara-singh": "Kahsipur brach menger  Darwara singh.jpeg",
  "team-amit-diwakar": "Pantnagar branch maneger  Amit diwakr.jpg",
  "team-rohit-sharma": "Service head  Rohit Sharma.jpg",
  "team-sunil-diwakar": "Sunil kumar diwakar  Uttrakhand uttrapardesh  Sale manager.jpg",
  "team-ankit-diwakar": "Team Solar plant installation head  Ankit diwakar.jpeg",

  // storefronts
  "store-haldwani": "20261006_114753amByGPSMapCamera.jpg",
  "store-haldwani-2": "20260821_21858pmByGPSMapCamera.jpg",
  "store-lalkuan": "IMG-20261006-WA0012.jpg",
  "store-branch": "IMG-20260911-WA0068.jpg",
  "store-ev": "20260525_165241.jpg",
  "store-electronics": "FB_IMG_1755677615007.jpg",

  // solar installations
  "solar-kashipur-1": "IMG-20260326-WA0020.jpg",
  "solar-kashipur-2": "IMG-20260326-WA0093.jpg",
  "solar-rudrapur": "IMG-20260327-WA0114.jpg",
  "solar-haldwani-1": "IMG-20260711-WA0021.jpg",
  "solar-tanda": "IMG-20260715-WA0142.jpg",
  "solar-haldwani-2": "IMG-20260729-WA0075.jpg",
  "solar-haripur": "IMG-20260730-WA0086.jpg",
  "solar-usnagar": "IMG-20260816-WA0074.jpg",
  "solar-bazpur": "IMG-20260819-WA0101.jpg",
  "solar-bhoor-gauri": "IMG-20260821-WA0023.jpg",
  "solar-bera-pokhra": "IMG-20260830-WA0029.jpg",
  "solar-kashipur-3": "IMG-20260901-WA0036.jpg",
  "solar-kashipur-4": "IMG-20260901-WA0056.jpg",
  "solar-neoria": "IMG-20260902-WA0015.jpg",
  "solar-jangi-1": "IMG-20260916-WA0108.jpg",
  "solar-jangi-2": "IMG-20260924-WA0139.jpg",
  "solar-jagatpura": "IMG-20261002-WA0042.jpg",
  "solar-bareilly": "IMG-20261005-WA0050.jpg",
  "solar-haldwani-3": "IMG-20261005-WA0054.jpg",
  "solar-damkhoda": "IMG-20261005-WA0068.jpg",
  "solar-kashipur-5": "IMG-20261005-WA0070.jpg",
  "solar-lalkuan-1": "IMG-20261005-WA0157.jpg",
  "solar-kashipur-6": "IMG-20261008-WA0066.jpg",
  "solar-lalkuan-2": "IMG-20261008-WA0089.jpg",
  "solar-kashipur-7": "IMG-20261009-WA0092.jpg",
  "solar-structure": "20260528_162154.jpg",

  // PM Surya Ghar camps
  "camp-halduchaur-1": "IMG-20260914-WA0055.jpg",
  "camp-halduchaur-2": "IMG-20260914-WA0056.jpg",
  "camp-lalkuan": "IMG-20260914-WA0059.jpg",

  // EV
  "ev-scooters": "20251122_141014.jpg",
  "ev-expo-rickshaw": "20251221_103355.jpg",
  "ev-expo-team": "20251221_130057.jpg",
  "ev-expo-venue": "20251221_145030.jpg",
  "ev-battery-handover": "20260106_151957.jpg",
  "ev-handover-1": "20260311_124659.jpg",
  "ev-delivery-1": "20260416_161200.jpg",
  "ev-delivery-2": "20260422_174928.jpg",
  "ev-delivery-3": "IMG-20260929-WA0003.jpg",
  "ev-scooty-1": "20251019_144115.jpg",
  "ev-scooty-2": "20251019_144143.jpg",
  "ev-showroom": "20250708_103612.jpg",

  // moments, events, awards
  "moment-inauguration": "20250622_145146.jpg",
  "moment-welcome-1": "20250708_105231.jpg",
  "moment-welcome-2": "20250708_105301.jpg",
  "moment-office-1": "20250708_105615.jpg",
  "moment-office-2": "20250708_105651.jpg",
  "moment-team": "20250708_142142.jpg",
  "moment-opening": "20250824_122427.jpg",
  "moment-opening-2": "20250824_133615.jpg",
  "moment-luno-meet": "20250830_153150.jpg",
  "moment-luno-event": "20250831_003754(0).jpg",
  "moment-solarpreneur": "20250831_005254.jpg",
  "moment-handover": "20260415_123902.jpg",
  "moment-solastice": "20260508_124439.jpg",
  "moment-office-3": "20260527_203333.jpg",
  "moment-office-4": "20260527_203359.jpg",
  "moment-office-team": "20260527_203514.jpg",
  "moment-expo": "20260917_105437.jpg",
  "moment-kashipur-opening": "20260917_195255.jpg",
  "moment-cheque": "20260918_184117.jpg",
  "moment-office-5": "20260926_161346.jpg",
  "moment-expo-team": "20261004_140235.jpg",
  "moment-team-trip": "IMG-20260809-WA0066.jpg",
  "moment-community": "IMG-20260920-WA0050.jpg",
  "moment-agrawal": "IMG-20260928-WA0133.jpg",
  "moment-gift": "IMG-20260918-WA0025.jpg",
  "award-reda": "20261004_152116.jpg",
  "award-uk2047": "IMG-20261007-WA0041.jpg",
  "award-havells": "20250905_230426.jpg",
  "award-cert-1": "20250905_230336.jpg",
  "award-cert-2": "20250905_230337.jpg",
};

const SIZES = { sm: 640, lg: 1600 };

await fs.mkdir(OUT, { recursive: true });
const dims = {};
let total = 0;

for (const [id, file] of Object.entries(MAP)) {
  const src = path.join(SRC, file);
  try {
    await fs.access(src);
  } catch {
    console.warn(`! missing: ${file}`);
    continue;
  }
  for (const [suffix, width] of Object.entries(SIZES)) {
    const dest = path.join(OUT, `${id}-${suffix}.webp`);
    const info = await sharp(src)
      .rotate() // respect EXIF orientation
      .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
      .webp({ quality: suffix === "sm" ? 68 : 74, effort: 5 })
      .toFile(dest); // EXIF/GPS metadata is stripped by default
    total += info.size;
    if (suffix === "lg") dims[id] = [info.width, info.height];
  }
}

await fs.writeFile(SIZES_FILE, JSON.stringify(dims, null, 0) + "\n");
console.log(`✓ ${Object.keys(dims).length} images, ${(total / 1024 / 1024).toFixed(1)} MB total`);
