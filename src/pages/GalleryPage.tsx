import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Gallery } from "../components/Gallery";
import { CtaBand } from "../components/sections";
import { WordReveal } from "../components/motion";
import { Particles } from "../components/Particles";
import { galleryPage, moments, solarGallery } from "../data/content";
import { useLang } from "../lib/i18n";
import { cn } from "../lib/utils";

type Filter = "all" | "moments" | "solar";

export default function GalleryPage() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>("all");

  const momentItems = useMemo(() => moments.map((m) => ({ id: m.id, caption: t(m.caption), kind: "moments" as const })), [t]);
  const solarItems = useMemo(() => solarGallery.map((g) => ({ id: g.id, caption: t(g.town), kind: "solar" as const })), [t]);

  const items = useMemo(() => {
    const all = [...momentItems, ...solarItems];
    if (filter === "all") return all;
    return all.filter((i) => i.kind === filter);
  }, [filter, momentItems, solarItems]);

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: t(galleryPage.filters.all), count: momentItems.length + solarItems.length },
    { key: "moments", label: t(galleryPage.filters.moments), count: momentItems.length },
    { key: "solar", label: t(galleryPage.filters.solar), count: solarItems.length },
  ];

  return (
    <>
      <section className="noise relative overflow-hidden pb-10 pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,#12307a_0%,#030a1c_70%)]" />
        <Particles density={0.00005} />
        <div className="container-x relative text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sun-400">{t(galleryPage.eyebrow)}</span>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            <WordReveal text={t(galleryPage.title)} />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/65">{t(galleryPage.sub)}</p>

          {/* filter tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="relative rounded-full px-5 py-2.5 text-sm font-semibold transition"
              >
                {filter === tab.key && <motion.span layoutId="gallery-tab" className="absolute inset-0 rounded-full bg-gradient-to-r from-sun-400 to-sun-500" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className={cn("relative", filter === tab.key ? "text-ink-950" : "text-white/70 hover:text-white")}>
                  {tab.label} <span className={cn("ml-1 text-xs", filter === tab.key ? "text-ink-950/60" : "text-white/40")}>{tab.count}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-24 pt-4">
        <Gallery key={filter} items={items} />
      </section>

      <CtaBand />
    </>
  );
}
