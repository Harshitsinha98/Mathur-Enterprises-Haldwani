import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Img, imgSrc } from "./Img";

export type GalleryItem = { id: string; caption: string };

/** Masonry gallery with an animated lightbox (keyboard + swipe friendly). */
export function Gallery({ items, className, columns = "columns-2 md:columns-3 lg:columns-4" }: { items: GalleryItem[]; className?: string; columns?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const current = index === null ? null : items[index];

  return (
    <>
      <div className={cn(columns, "gap-4 [column-fill:_balance]", className)}>
        {items.map((it, i) => (
          <motion.button
            key={it.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
            onClick={() => setIndex(i)}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
          >
            <Img id={it.id} alt={it.caption} sizes="(max-width: 768px) 50vw, 25vw" className="w-full transition-transform duration-700 group-hover:scale-[1.06]" />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-x-3 bottom-3 flex translate-y-1 items-center gap-1.5 text-sm font-medium text-white transition-transform group-hover:translate-y-0">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-sun-400" />
              <span className="truncate">{it.caption}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) step(1);
                  else if (info.offset.x > 80) step(-1);
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[86vh] max-w-5xl"
              >
                <img src={imgSrc(current.id, "lg")} alt={current.caption} className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl" draggable={false} />
                <figcaption className="mt-4 flex items-center justify-center gap-2 text-center text-white/80">
                  <MapPin className="h-4 w-4 text-sun-400" />
                  {current.caption}
                  <span className="text-white/40">· {index! + 1}/{items.length}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button onClick={close} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid"
              aria-label="Previous"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(1); }}
              className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid"
              aria-label="Next"
            >
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
