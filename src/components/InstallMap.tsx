import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { installations } from "../data/content";
import { useLang } from "../lib/i18n";
import { cn } from "../lib/utils";
import { Img } from "./Img";

// Bounding box of the area we serve (Kumaon foothills + western UP).
const BOX = { minLat: 28.3, maxLat: 29.36, minLng: 78.85, maxLng: 80.0 };
const W = 800;
const H = 560;
const HQ = { lat: 29.1943, lng: 79.5106 };

const project = (lat: number, lng: number) => ({
  x: ((lng - BOX.minLng) / (BOX.maxLng - BOX.minLng)) * W,
  y: ((BOX.maxLat - lat) / (BOX.maxLat - BOX.minLat)) * H,
});

/** Dotted map with animated arcs from Haldwani HQ to every installation (21st.dev "world map" style). */
export function InstallMap() {
  const { t, lang } = useLang();

  // group installations by town
  const towns = useMemo(() => {
    const m = new Map<string, { key: string; label: string; lat: number; lng: number; count: number; photo: string; state: string }>();
    for (const i of installations) {
      const key = i.town.en;
      const ex = m.get(key);
      if (ex) ex.count++;
      else m.set(key, { key, label: t(i.town), lat: i.lat, lng: i.lng, count: 1, photo: i.id, state: i.state });
    }
    return [...m.values()];
  }, [t]);

  const [active, setActive] = useState<string>(towns[0]?.key ?? "");
  const activeTown = towns.find((x) => x.key === active);
  const hq = project(HQ.lat, HQ.lng);

  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let x = 10; x < W; x += 16) for (let y = 10; y < H; y += 16) out.push({ x, y });
    return out;
  }, []);

  // rough UK / UP boundary line for context
  const border = "M0 272 C140 280 260 266 380 276 S600 286 700 272 S780 266 800 270";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-900 to-ink-950">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Map of solar installations">
          <defs>
            <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#FFC21A" stopOpacity="0.35" />
              <stop offset="1" stopColor="#FFC21A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="arc" x1="0" x2="1">
              <stop offset="0" stopColor="#FFC21A" stopOpacity="0" />
              <stop offset="0.5" stopColor="#FFC21A" />
              <stop offset="1" stopColor="#4FD97A" />
            </linearGradient>
          </defs>
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={1.1} fill="white" opacity={d.y < 274 ? 0.14 : 0.07} />
          ))}
          <path d={border} fill="none" stroke="white" strokeOpacity="0.18" strokeDasharray="4 6" />
          <text x="16" y="258" fill="white" fillOpacity="0.35" fontSize="13" letterSpacing="3">{lang === "hi" ? "उत्तराखंड" : "UTTARAKHAND"}</text>
          <text x="16" y="300" fill="white" fillOpacity="0.25" fontSize="13" letterSpacing="3">{lang === "hi" ? "उत्तर प्रदेश" : "UTTAR PRADESH"}</text>
          <text x="600" y="30" fill="white" fillOpacity="0.2" fontSize="12" letterSpacing="3">{lang === "hi" ? "कुमाऊँ की पहाड़ियाँ ↑" : "KUMAON HILLS ↑"}</text>

          {towns.map((tw, i) => {
            const p = project(tw.lat, tw.lng);
            const mx = (hq.x + p.x) / 2;
            const my = Math.min(hq.y, p.y) - 60 - Math.abs(hq.x - p.x) * 0.15;
            return (
              <motion.path
                key={`arc-${tw.key}`}
                d={`M${hq.x} ${hq.y} Q${mx} ${my} ${p.x} ${p.y}`}
                fill="none"
                stroke="url(#arc)"
                strokeWidth={active === tw.key ? 2.2 : 1.1}
                strokeOpacity={active === tw.key ? 1 : 0.45}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.08, ease: "easeInOut" }}
              />
            );
          })}

          <circle cx={hq.x} cy={hq.y} r="60" fill="url(#map-glow)" />
          <motion.circle cx={hq.x} cy={hq.y} r="9" fill="#FFC21A" animate={{ r: [9, 13, 9] }} transition={{ duration: 2.4, repeat: Infinity }} />
          <text x={hq.x - 16} y={hq.y - 14} textAnchor="end" fill="#FFE08A" fontSize="14" fontWeight="700">HQ · {lang === "hi" ? "हल्द्वानी" : "Haldwani"}</text>

          {towns.map((tw, i) => {
            const p = project(tw.lat, tw.lng);
            const isActive = active === tw.key;
            return (
              <g
                key={tw.key}
                onMouseEnter={() => setActive(tw.key)}
                onClick={() => setActive(tw.key)}
                className="cursor-pointer"
              >
                <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 7 : 5}
                  fill={tw.state === "UP" ? "#4FD97A" : "#FFC21A"}
                  stroke="#030a1c"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.08, type: "spring" }}
                />
                {isActive && (
                  <motion.circle cx={p.x} cy={p.y} r="7" fill="none" stroke="#FFC21A" initial={{ r: 7, opacity: 1 }} animate={{ r: 22, opacity: 0 }} transition={{ duration: 1.4, repeat: Infinity }} />
                )}
                {isActive && (
                  <g className="pointer-events-none select-none">
                    <rect x={p.x + 12} y={p.y - 13} width={tw.label.length * 8.2 + 16} height={26} rx={13} fill="#030a1c" fillOpacity="0.85" stroke="#FFC21A" strokeOpacity="0.5" />
                    <text x={p.x + 20} y={p.y + 5} fontSize="14" fontWeight="700" fill="white">
                      {tw.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
        <div className="absolute bottom-4 left-4 flex gap-4 rounded-full bg-ink-950/70 px-4 py-2 text-xs text-white/70 backdrop-blur">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-sun-400" /> Uttarakhand</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-leaf-400" /> Uttar Pradesh</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <AnimatePresence mode="wait">
            {activeTown && (
              <motion.div key={activeTown.key} className="absolute inset-0" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <Img id={activeTown.photo} alt={activeTown.label} className="h-full w-full object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-display text-2xl font-bold">{activeTown.label}</p>
                  <p className="text-sm text-white/60">
                    {activeTown.count} {lang === "hi" ? "इंस्टॉलेशन (फ़ोटो सहित)" : activeTown.count > 1 ? "geo-tagged installations" : "geo-tagged installation"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap gap-2">
          {towns.map((tw) => (
            <button
              key={tw.key}
              onClick={() => setActive(tw.key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                active === tw.key ? "border-sun-400 bg-sun-400 text-ink-950" : "border-white/10 bg-white/5 text-white/70 hover:border-white/30",
              )}
            >
              {tw.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
