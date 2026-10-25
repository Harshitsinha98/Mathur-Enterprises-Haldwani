import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Bike, Briefcase, CloudLightning, Heart, Quote, Store, Sun, TrendingUp, Tv, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Img } from "../components/Img";
import { Counter, Reveal, SectionHeading, WordReveal } from "../components/motion";
import { Particles } from "../components/Particles";
import { CtaBand, ExploreLink } from "../components/sections";
import { branches, team } from "../data/content";
import { story, type StoryIcon } from "../data/story";
import { useLang } from "../lib/i18n";
import { cn } from "../lib/utils";

const icons: Record<StoryIcon, typeof Bike> = {
  bike: Bike,
  briefcase: Briefcase,
  zap: Zap,
  store: Store,
  tv: Tv,
  storm: CloudLightning,
  trend: TrendingUp,
  sun: Sun,
};

/** The traveller on the timeline changes as the story moves on: cycle → e-rickshaw → sun. */
function travellerFor(year: string) {
  const y = parseInt(year, 10);
  if (y < 2016) return { Icon: Bike, grad: "from-white to-sun-300 text-ink-950", key: "bike" };
  if (y < 2024) return { Icon: Zap, grad: "from-raj-400 to-sun-500 text-white", key: "ev" };
  return { Icon: Sun, grad: "from-sun-300 to-leaf-400 text-ink-950", key: "sun" };
}

const NOW = new Date().getFullYear();

/* --------------------------------- hero --------------------------------- */
function StoryHero() {
  const { t } = useLang();
  const [year, setYear] = useState(2005);
  useEffect(() => {
    let y = 2005;
    const id = window.setInterval(() => {
      y += 1;
      setYear(y);
      if (y >= NOW) window.clearInterval(id);
    }, 110);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="noise relative isolate overflow-hidden pb-20 pt-36 sm:pb-28">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(90%_70%_at_50%_0%,#12307a_0%,#06122e_55%,#030a1c_100%)]" />
      <Particles density={0.00006} />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-sun-300"
          >
            <Heart className="h-3.5 w-3.5 fill-raj-400 text-raj-400" /> {t(story.eyebrow)}
          </motion.span>

          {/* odometer: 2005 → today */}
          <div className="mt-6 flex items-baseline gap-3 font-display font-bold tracking-tighter">
            <span className="text-outline text-6xl sm:text-8xl">2005</span>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 1.2 }} className="h-1 w-10 origin-left rounded-full bg-gradient-to-r from-sun-400 to-leaf-400 sm:w-20" />
            <span className="text-gradient-sun text-6xl tabular-nums sm:text-8xl">{year}</span>
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-3xl font-bold leading-[1.15] sm:text-5xl">
            <WordReveal text={t(story.title)} className="!justify-start" delay={0.2} />
          </h1>

          <motion.blockquote
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex gap-3 border-l-2 border-sun-400 pl-5"
          >
            <Quote className="h-6 w-6 shrink-0 text-sun-400" />
            <p className="font-display text-xl italic text-white/90 sm:text-2xl">{t(story.quote)}</p>
          </motion.blockquote>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-6 max-w-2xl leading-relaxed text-white/65">
            {t(story.intro)}
          </motion.p>
        </div>

        {/* the two brothers, with a turning ring of sun rays */}
        <motion.figure initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1 }} className="relative mx-auto w-72 pb-10 sm:w-96">
          <div aria-hidden className="absolute inset-x-6 -top-8 bottom-2 animate-spin-slow rounded-full bg-[repeating-conic-gradient(from_0deg,rgba(255,194,26,0.35)_0deg_3deg,transparent_3deg_14deg)] [mask-image:radial-gradient(circle,transparent_52%,black_56%,transparent_72%)]" />
          <div aria-hidden className="absolute -inset-2 rounded-full bg-sun-400/20 blur-3xl" />
          <div className="relative flex items-end justify-center">
            {story.authors.map((a, i) => (
              <motion.div
                key={a.photo}
                initial={{ opacity: 0, x: i === 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
                className={cn(
                  "relative aspect-square w-40 overflow-hidden rounded-full border-4 shadow-2xl sm:w-52",
                  i === 0 ? "z-10 border-sun-400/70" : "-ml-10 mb-4 border-white/15 sm:-ml-14",
                )}
              >
                <Img id={a.photo} alt={t(a.name)} eager sizes="220px" className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>
          <figcaption className="glass absolute bottom-0 left-1/2 w-max max-w-[95%] -translate-x-1/2 rounded-2xl px-5 py-2 text-center">
            {story.authors.map((a) => (
                <span key={a.photo} className="inline-flex flex-col px-2 align-top">
                <span className="font-display text-sm font-bold">{t(a.name)}</span>
                <span className="text-[10px] text-white/55">{t(a.role)}</span>
              </span>
            ))}
            <span className="mt-1 block text-[11px] font-semibold text-sun-300">{t(story.signByRole)}</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

/* ------------------------------- timeline ------------------------------- */
function Chapter({ c, i, onActive }: { c: (typeof story.chapters)[number]; i: number; onActive: (i: number) => void }) {
  const { t } = useLang();
  const Icon = icons[c.icon];
  const right = i % 2 === 1;
  return (
    <motion.li
      onViewportEnter={() => onActive(i)}
      viewport={{ margin: "-45% 0px -45% 0px" }}
      className="relative grid gap-6 pl-16 md:grid-cols-2 md:gap-16 md:pl-0"
    >
      {/* node on the line */}
      <span className="absolute left-6 top-6 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-ink-950 ring-2 ring-sun-400/70 md:left-1/2" />

      <Reveal y={40} className={cn(right ? "md:col-start-2" : "md:text-right")}>
        <div className="relative">
          {/* giant outlined year behind the card */}
          <span aria-hidden className={cn("text-outline pointer-events-none absolute -top-10 select-none font-display text-7xl font-bold opacity-40 sm:text-8xl", right ? "left-0" : "left-0 md:left-auto md:right-0")}>
            {c.year}
          </span>
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl border p-6 pt-8 sm:p-8",
              c.storm ? "border-white/10 bg-gradient-to-br from-slate-800 via-ink-900 to-black" : "border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02]",
            )}
          >
            {c.storm && <Rain />}
            <div className={cn("relative flex items-center gap-3", !right && "md:flex-row-reverse")}>
              <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl ring-1", c.storm ? "bg-white/10 text-sky-200 ring-white/20" : "bg-sun-400/15 text-sun-300 ring-sun-400/30")}>
                <Icon className="h-5 w-5" />
              </span>
              <span className={cn("font-display text-sm font-bold tracking-widest", c.storm ? "text-sky-200" : "text-sun-400")}>{c.year}</span>
            </div>
            <h3 className="relative mt-4 font-display text-2xl font-bold">{t(c.title)}</h3>
            <p className="relative mt-3 leading-relaxed text-white/65">{t(c.body)}</p>
            {c.highlight && (
              <motion.p
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative mt-5 rounded-2xl border border-sun-400/30 bg-sun-400/10 p-4 font-display text-lg font-semibold text-sun-300"
              >
                {t(c.highlight)}
              </motion.p>
            )}
          </div>
        </div>
      </Reveal>

      {c.image && (
        <Reveal y={60} delay={0.1} className={cn(right ? "md:col-start-1 md:row-start-1" : "")}>
          <div className="group overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
            <Img id={c.image} alt={t(c.title)} sizes="(max-width: 768px) 90vw, 40vw" className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
          </div>
        </Reveal>
      )}
    </motion.li>
  );
}

/** Light rain for the 2020 chapter. */
function Rain() {
  const drops = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((d) => (
        <motion.span
          key={d}
          className="absolute top-0 h-6 w-px bg-gradient-to-b from-transparent to-sky-200/50"
          style={{ left: `${(d * 37) % 100}%` }}
          animate={{ y: ["-20%", "520%"] }}
          transition={{ duration: 1.1 + (d % 5) * 0.2, repeat: Infinity, ease: "linear", delay: (d % 7) * 0.15 }}
        />
      ))}
    </div>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const top = useTransform(progress, (p) => `${Math.min(100, Math.max(0, p * 100))}%`);
  const traveller = travellerFor(story.chapters[active].year);

  return (
    <section className="container-x py-16 sm:py-24">
      <div ref={ref} className="relative mx-auto max-w-5xl">
        {/* the road */}
        <div className="absolute bottom-0 left-6 top-0 w-[3px] -translate-x-1/2 rounded-full bg-white/10 md:left-1/2" />
        <motion.div style={{ scaleY: progress }} className="absolute bottom-0 left-6 top-0 w-[3px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-sun-400 to-leaf-400 md:left-1/2" />
        {/* the traveller */}
        <motion.div style={{ top }} className="absolute left-6 z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
          <div className={cn("grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br shadow-[0_0_30px_rgba(255,194,26,0.6)] ring-4 ring-ink-950", traveller.grad)}>
            <AnimatePresence mode="wait">
              <motion.span key={traveller.key} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                <traveller.Icon className="h-5 w-5" />
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <ol className="space-y-24 py-10 sm:space-y-32">
          {story.chapters.map((c, i) => (
            <Chapter key={c.year + i} c={c} i={i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------- stats --------------------------------- */
function JourneyStats() {
  const { lang } = useLang();
  const members = team.reduce((n, tier) => n + tier.members.length, 0);
  const stats = [
    { to: NOW - 2005, suffix: "+", label: lang === "hi" ? "साल का सफर" : "years of the journey" },
    { to: 3, suffix: "", label: lang === "hi" ? "व्यवसाय: सोलर, ई-रिक्शा, ओकाया" : "businesses: solar, e-rickshaw, Okaya" },
    { to: members, suffix: "+", label: lang === "hi" ? "टीम सदस्य" : "team members" },
    { to: branches.length, suffix: "+", label: lang === "hi" ? "शाखाएँ और शोरूम" : "branches & showrooms" },
  ];
  return (
    <section className="container-x pb-8">
      <Reveal>
        <div className="glass grid grid-cols-2 overflow-hidden rounded-3xl lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={cn("p-6 text-center", i % 2 === 1 && "border-l border-white/10", i > 1 && "border-t border-white/10 lg:border-t-0", i === 2 && "lg:border-l")}>
              <div className="font-display text-4xl font-bold text-gradient-brand sm:text-5xl">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-white/55 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------- letter --------------------------------- */
function Letter() {
  const { t } = useLang();
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow={t(story.eyebrow)} title={t(story.letterTitle)} />
      <Reveal className="mx-auto mt-14 max-w-3xl">
        <motion.article
          initial={{ rotate: -1.5 }}
          whileInView={{ rotate: -0.5 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] bg-[#f7f2e8] p-7 text-[#1b2238] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:p-12"
        >
          <div aria-hidden className="absolute inset-x-0 top-0 h-2 rounded-t-[2rem] bg-gradient-to-r from-sun-400 via-sun-500 to-leaf-500" />
          <Quote aria-hidden className="absolute right-8 top-8 h-12 w-12 text-sun-500/25" />
          <div className="space-y-5 text-[16px] leading-[1.8] sm:text-[17px]">
            {story.letter.map((p) => (
              <p key={p.en}>{t(p)}</p>
            ))}
          </div>

          <div className="my-8 flex flex-wrap gap-2">
            {story.values.map((v, i) => (
              <motion.span
                key={v.en}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="rounded-full bg-[#1b2238] px-4 py-1.5 text-sm font-semibold text-sun-300"
              >
                {t(v)}
              </motion.span>
            ))}
          </div>

          <blockquote className="border-l-4 border-sun-500 pl-5 font-display text-xl font-semibold italic leading-snug sm:text-2xl">{t(story.belief)}</blockquote>
          <p className="mt-6 leading-[1.8]">{t(story.ahead)}</p>

          <div className="mt-10 flex items-center gap-4 border-t border-[#1b2238]/10 pt-6">
            <div className="flex shrink-0 -space-x-4">
              {story.authors.map((a) => (
                <div key={a.photo} className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-sun-500/50">
                  <Img id={a.photo} alt={t(a.name)} sizes="56px" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="flex items-center gap-1.5 font-semibold">
                <Heart className="h-4 w-4 fill-raj-500 text-raj-500" /> {t(story.signoff)}
              </p>
              <p className="mt-0.5 font-display text-lg italic">{t(story.signByline)}</p>
              <p className="text-xs text-[#1b2238]/60">{t(story.signByRole)}</p>
            </div>
          </div>
        </motion.article>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 text-center">
        <p className="shine-text mx-auto max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">{t(story.motto)}</p>
        <div className="mt-8 flex justify-center gap-6">
          <ExploreLink to="/team">{t({ en: "Meet the team", hi: "टीम से मिलें" })}</ExploreLink>
          <ExploreLink to="/contact">{t({ en: "Visit us", hi: "हमसे मिलें" })}</ExploreLink>
        </div>
      </Reveal>
    </section>
  );
}

export default function Story() {
  return (
    <>
      <StoryHero />
      <Timeline />
      <JourneyStats />
      <Letter />
      <CtaBand />
    </>
  );
}
