import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, BatteryCharging, Sun, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { heroSlides, heroText } from "../data/assist";
import { verticals, type VerticalKey } from "../data/content";
import { useLang } from "../lib/i18n";
import { cn } from "../lib/utils";
import { useActions } from "./ActionsProvider";
import { Img } from "./Img";
import { Particles } from "./Particles";

const ORDER: VerticalKey[] = ["solar", "rajhans", "okaya"];
const DURATION = 6500;
const ease = [0.22, 1, 0.36, 1] as const;

const theme: Record<VerticalKey, { sun: string; word: string; btn: string; bar: string; icon: typeof Sun; glow: string }> = {
  solar: {
    sun: "radial-gradient(circle at 50% 40%, #fff3c4 0%, #ffc21a 28%, #f28c00 55%, rgba(242,140,0,0) 72%)",
    word: "bg-gradient-to-r from-sun-300 via-sun-400 to-sun-600",
    btn: "from-sun-400 to-sun-500 text-ink-950 shadow-[0_12px_40px_-10px_rgba(255,194,26,0.85)]",
    bar: "bg-sun-400",
    icon: Sun,
    glow: "rgba(255,194,26,0.35)",
  },
  rajhans: {
    sun: "radial-gradient(circle at 50% 40%, #ffe1e2 0%, #ff5a5f 30%, #b3122a 58%, rgba(179,18,42,0) 74%)",
    word: "bg-gradient-to-r from-[#ffb3b5] via-raj-400 to-raj-500",
    btn: "from-raj-500 to-raj-400 text-white shadow-[0_12px_40px_-10px_rgba(255,90,95,0.85)]",
    bar: "bg-raj-400",
    icon: Zap,
    glow: "rgba(255,90,95,0.35)",
  },
  okaya: {
    sun: "radial-gradient(circle at 50% 40%, #e2ffea 0%, #4fd97a 30%, #17803a 58%, rgba(23,128,58,0) 74%)",
    word: "bg-gradient-to-r from-leaf-300 via-leaf-400 to-leaf-600",
    btn: "from-leaf-500 to-leaf-400 text-ink-950 shadow-[0_12px_40px_-10px_rgba(79,217,122,0.85)]",
    bar: "bg-leaf-400",
    icon: BatteryCharging,
    glow: "rgba(79,217,122,0.35)",
  },
};

/** Deck position for card i when `active` is in front. */
function deckPos(i: number, active: number) {
  const p = (i - active + ORDER.length) % ORDER.length;
  if (p === 0) return { x: "0%", y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 3, filter: "brightness(1)" };
  if (p === 1) return { x: "14%", y: 14, rotate: 6, scale: 0.9, opacity: 0.75, zIndex: 2, filter: "brightness(0.55)" };
  return { x: "-14%", y: 14, rotate: -6, scale: 0.9, opacity: 0.75, zIndex: 1, filter: "brightness(0.55)" };
}

export function Hero() {
  const { t, lang } = useLang();
  const { openEnquiry } = useActions();
  const [idx, setIdx] = useState(0);
  const [cycle, setCycle] = useState(0); // restarts progress when tab becomes visible again
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  const key = ORDER[idx];
  const th = theme[key];
  const slide = heroSlides[key];
  const v = verticals.find((x) => x.key === key)!;

  useEffect(() => {
    const on = () => {
      setVisible(!document.hidden);
      if (!document.hidden) setCycle((c) => c + 1);
    };
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setIdx((i) => (i + 1) % ORDER.length), DURATION);
    return () => clearTimeout(id);
  }, [idx, visible, cycle]);

  const go = (i: number) => {
    setIdx((i + ORDER.length) % ORDER.length);
    setCycle((c) => c + 1);
  };

  const word = (
    <span className="relative inline-grid overflow-hidden pb-[0.1em] align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${key}-${lang}`}
          initial={{ y: "105%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-105%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease }}
          className={cn("col-start-1 row-start-1 whitespace-nowrap bg-clip-text text-transparent", th.word)}
        >
          {t(slide.word)}
        </motion.span>
      </AnimatePresence>
    </span>
  );

  const lines =
    lang === "hi"
      ? [word, <span key="b">{t(heroText.powering)}</span>, <span key="c" className="block pt-1 text-[0.5em] font-medium tracking-tight text-white/55">{t(heroText.across)}</span>]
      : [<span key="a">{t(heroText.powering)}</span>, word, <span key="c" className="block pt-1 text-[0.5em] font-medium tracking-tight text-white/55">{t(heroText.across)}</span>];

  return (
    <section ref={ref} className="noise relative isolate overflow-hidden pb-10 pt-32 sm:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-16">
      {/* sky */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(120%_80%_at_70%_110%,#1d47a8_0%,#0a1e52_35%,#06122e_60%,#030a1c_100%)]" />
      <div className="absolute inset-0 -z-20 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <Particles />

      {/* colour-shifting sun */}
      <motion.div style={{ y: sunY }} className="pointer-events-none absolute bottom-[-55vmin] left-1/2 -z-10 -translate-x-1/2 lg:bottom-[-40vmin] lg:left-[72%]">
        <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 2, ease }} className="relative h-[95vmin] w-[95vmin]">
          <div className="absolute left-1/2 top-1/2 h-[150vmin] w-[150vmin] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full bg-[repeating-conic-gradient(from_0deg,rgba(255,255,255,0.07)_0deg_4deg,transparent_4deg_15deg)] [mask-image:radial-gradient(circle,black_25%,transparent_68%)]" />
          <AnimatePresence>
            <motion.div
              key={key}
              className="absolute inset-0 rounded-full opacity-80 blur-[2px]"
              style={{ background: th.sun }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
          </AnimatePresence>
          <motion.div className="absolute inset-0 rounded-full blur-[90px]" animate={{ backgroundColor: th.glow }} transition={{ duration: 1.2 }} />
        </motion.div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <motion.div style={{ y: contentY }} className="container-x relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        {/* ---------- text ---------- */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf-400" />
            {t(heroText.eyebrow)}
          </motion.span>

          <h1 className="mt-6 font-display text-[12.5vw] font-bold leading-[0.98] tracking-tighter sm:text-7xl lg:text-[5.6rem] xl:text-[6.2rem]">
            {lines.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease }}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="mt-6 min-h-[4.5rem] max-w-xl sm:min-h-[3.5rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${key}-${lang}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-[15px] leading-relaxed text-white/70 sm:text-lg"
              >
                {t(slide.line)}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-7 flex gap-3">
            <button
              onClick={() => openEnquiry(key)}
              className={cn("group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r px-6 py-3.5 text-sm font-semibold transition-[transform,background-color] duration-500 hover:scale-[1.03] sm:flex-none", th.btn)}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={`${key}-${lang}`} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.25 }} className="relative">
                  {t(slide.cta)}
                </motion.span>
              </AnimatePresence>
              <ArrowRight className="relative h-4 w-4" />
            </button>
            <Link
              to={v.path}
              className="glass flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-6"
              aria-label={`${t(heroText.explore)} ${t(v.name)}`}
            >
              <span className="hidden sm:inline">
                {t(heroText.explore)} {t(v.name)}
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-7 hidden flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/55 sm:flex">
            {heroText.facts.map((f, i) => (
              <li key={f.en} className="flex items-center gap-5">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-white/25" />}
                {t(f)}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---------- photo deck ---------- */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }} className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-[26rem]">
          <div className="relative aspect-[16/11] sm:aspect-[4/5]">
            {ORDER.map((k, i) => {
              const s = heroSlides[k];
              const vv = verticals.find((x) => x.key === k)!;
              const Icon = theme[k].icon;
              const front = i === idx;
              return (
                <motion.div
                  key={k}
                  className="absolute inset-0 cursor-grab overflow-hidden rounded-[28px] border border-white/15 shadow-2xl shadow-black/60 active:cursor-grabbing"
                  animate={deckPos(i, idx)}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  drag={front ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(idx + 1);
                    else if (info.offset.x > 60) go(idx - 1);
                  }}
                  onClick={() => !front && go(i)}
                >
                  <Img id={s.image} alt={t(vv.name)} eager sizes="(max-width: 1024px) 90vw, 30vw" className="pointer-events-none h-full w-full object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/20 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                    <div className="min-w-0">
                      <span className={cn("mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-ink-950", theme[k].bar)}>
                        <Icon className="h-3.5 w-3.5" /> {t(s.stat)}
                      </span>
                      <p className="truncate font-display text-xl font-bold sm:text-2xl">{t(vv.name)}</p>
                    </div>
                    <Link to={vv.path} onClick={(e) => e.stopPropagation()} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink-950 transition hover:rotate-45" aria-label={t(vv.name)}>
                      <ArrowUpRight className="h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* story-style tabs */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8">
            {ORDER.map((k, i) => {
              const vv = verticals.find((x) => x.key === k)!;
              const active = i === idx;
              return (
                <button key={k} onClick={() => go(i)} className="group text-left" aria-pressed={active}>
                  <span className="block h-1 overflow-hidden rounded-full bg-white/15">
                    {active ? (
                      <motion.span
                        key={`${idx}-${cycle}`}
                        className={cn("block h-full rounded-full", theme[k].bar)}
                        initial={{ width: "0%" }}
                        animate={{ width: visible ? "100%" : "0%" }}
                        transition={{ duration: DURATION / 1000, ease: "linear" }}
                      />
                    ) : (
                      <span className={cn("block h-full rounded-full", i < idx ? "w-full bg-white/40" : "w-0")} />
                    )}
                  </span>
                  <span className={cn("mt-2 block truncate text-xs font-semibold transition-colors sm:text-sm", active ? "text-white" : "text-white/45 group-hover:text-white/70")}>
                    <span className="mr-1 text-white/30">0{i + 1}</span> {t(vv.name)}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
