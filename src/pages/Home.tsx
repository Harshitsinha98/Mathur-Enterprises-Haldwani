import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Award, BadgeCheck, Check, MapPin, MapPinned, ShieldCheck, Sun, Wrench, Zap } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Img } from "../components/Img";
import { LogoMark } from "../components/Logo";
import { Counter, Reveal, SectionHeading, SpotlightCard, rise, stagger } from "../components/motion";
import { Particles } from "../components/Particles";
import { BrandMarquee, CtaBand, ExploreLink, GhostButton, HorizontalScroller, PrimaryButton, TeamCard, VerticalCards, accent } from "../components/sections";
import { awards, branches, brand, home, installations, moments, team, ui, verticals } from "../data/content";
import { useLang } from "../lib/i18n";
import { cn, waLink } from "../lib/utils";

const icons = { badge: BadgeCheck, map: MapPinned, wrench: Wrench, award: Award, shield: ShieldCheck, geo: MapPin } as const;

function Hero() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section ref={ref} className="noise relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pb-10 pt-32">
      {/* sky */}
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(120%_80%_at_50%_110%,#1d47a8_0%,#0a1e52_35%,#06122e_60%,#030a1c_100%)]" />
      <div className="absolute inset-0 -z-20 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <Particles />

      {/* rising sun */}
      <motion.div style={{ y: sunY }} className="pointer-events-none absolute bottom-[-46vmin] left-1/2 -z-10 -translate-x-1/2">
        <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }} className="relative">
          <div className="absolute left-1/2 top-1/2 h-[150vmin] w-[150vmin] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full bg-[repeating-conic-gradient(from_0deg,rgba(255,194,26,0.10)_0deg_4deg,transparent_4deg_15deg)] [mask-image:radial-gradient(circle,black_25%,transparent_68%)]" />
          <div className="h-[92vmin] w-[92vmin] rounded-full bg-[radial-gradient(circle_at_50%_40%,#fff3c4_0%,#ffc21a_28%,#f28c00_55%,rgba(242,140,0,0)_72%)] opacity-80 blur-[2px]" />
          <div className="absolute inset-0 rounded-full bg-sun-400/30 blur-[90px]" />
        </motion.div>
      </motion.div>
      {/* horizon fade */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink-950 to-transparent" />

      {/* floating photo cards */}
      <motion.div
        initial={{ opacity: 0, x: -60, rotate: -14 }}
        animate={{ opacity: 1, x: 0, rotate: -8 }}
        transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[4%] top-[26%] hidden w-52 xl:block"
      >
        <div className="animate-float overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/50">
          <Img id="solar-haldwani-3" alt="" className="aspect-[4/5] w-full object-cover" sizes="220px" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 60, rotate: 14 }}
        animate={{ opacity: 1, x: 0, rotate: 7 }}
        transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[4%] top-[30%] hidden w-56 xl:block"
      >
        <div className="animate-float overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/50 [animation-delay:1.5s]">
          <Img id="ev-expo-rickshaw" alt="" className="aspect-[4/5] w-full object-cover" sizes="220px" />
        </div>
      </motion.div>

      <motion.div style={{ y: textY, opacity: textO }} className="container-x relative flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mb-6 rounded-2xl bg-white px-3 py-2 shadow-[0_0_60px_-10px_rgba(255,194,26,0.8)]">
          <LogoMark animated className="h-12 sm:h-14" />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/75"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf-400" />
          {t(home.eyebrow)}
        </motion.span>

        <h1 key={lang} className="mt-7 font-display text-[13vw] font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-[6.5rem]">
          {home.title.map((line, i) => (
            <span key={line.en} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={cn("block", i === 1 && "text-gradient-sun", i === 2 && "font-medium text-white/55")}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 + i * 0.14, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {t(line)}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          {t(home.sub)}
        </motion.p>

        <motion.div variants={stagger} initial="hidden" animate="show" transition={{ delayChildren: 1.1 }} className="mt-9 flex flex-wrap justify-center gap-3">
          {verticals.map((v) => (
            <motion.div key={v.key} variants={rise}>
              <Link
                to={v.path}
                className="glass group flex items-center gap-2.5 rounded-full py-2 pl-2 pr-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <span className={cn("grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br text-[11px] font-black text-ink-950", accent[v.key].grad)}>
                  {v.key === "solar" ? <Sun className="h-4 w-4" /> : v.key === "rajhans" ? "R" : <Zap className="h-4 w-4" />}
                </span>
                {t(v.name)}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.9 }}
        className="container-x relative mt-14 sm:mt-16"
      >
        <div className="glass mx-auto grid max-w-4xl grid-cols-2 divide-white/10 rounded-3xl sm:grid-cols-4 sm:divide-x">
          {home.stats.map((s) => (
            <div key={s.label.en} className="px-4 py-5 text-center">
              <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} plain={s.plain} />
              </div>
              <div className="mt-1 text-xs text-white/55 sm:text-sm">{t(s.label)}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-8 text-white/40">
        <ArrowDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}

function WhyBento() {
  const { t } = useLang();
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow={t(home.whyEyebrow)} title={t(home.whyTitle)} />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {home.why.map((w, i) => {
          const Icon = icons[w.icon as keyof typeof icons];
          return (
            <Reveal key={w.title.en} delay={i * 0.06} className={cn(i === 0 && "md:col-span-2", i === 5 && "md:col-span-3")}>
              <SpotlightCard className="h-full p-7" tilt={false}>
                <div className="flex h-full flex-col">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sun-400/20 to-leaf-400/10 ring-1 ring-white/10">
                    <Icon className="h-6 w-6 text-sun-300" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold">{t(w.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{t(w.body)}</p>
                  {i === 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {["PM Surya Ghar", "Net-Metering", "DISCOM", "Subsidy"].map((x) => (
                        <span key={x} className="rounded-full bg-sun-400/10 px-3 py-1 text-xs font-medium text-sun-300 ring-1 ring-sun-400/20">{x}</span>
                      ))}
                    </div>
                  )}
                  {i === 5 && (
                    <div className="mt-6 flex -space-x-3">
                      {installations.slice(0, 6).map((x) => (
                        <div key={x.id} className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-ink-950">
                          <Img id={x.id} alt="" sizes="48px" className="h-full w-full object-cover" />
                        </div>
                      ))}
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-sun-400 text-xs font-bold text-ink-950 ring-2 ring-ink-950">+{installations.length}</span>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function SolarSpotlight() {
  const { lang } = useLang();
  const pics = ["solar-haldwani-3", "solar-kashipur-3", "solar-bazpur", "solar-lalkuan-1"];
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute right-0 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-sun-500/10 blur-3xl" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow={lang === "hi" ? "सोलर पोर्टफ़ोलियो" : "Solar portfolio"}
            title={lang === "hi" ? "हर हफ़्ते, एक और छत सूरज से जुड़ती है।" : "Every week, another rooftop plugs into the sun."}
            body={
              lang === "hi"
                ? "हल्द्वानी से बरेली तक: हर इंस्टॉलेशन की GPS-टैग फ़ोटो, असली ग्राहक के साथ।"
                : "From Haldwani to Bareilly: every installation is documented with a GPS-tagged photo, next to a real customer."
            }
          />
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton to="/solar">{lang === "hi" ? "सोलर पोर्टफ़ोलियो देखें" : "See the solar portfolio"} <ArrowRight className="h-4 w-4" /></PrimaryButton>
            <GhostButton href={waLink("Hello, I want to know about PM Surya Ghar subsidy.")}>{lang === "hi" ? "सब्सिडी के बारे में पूछें" : "Ask about subsidy"}</GhostButton>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {pics.map((id, i) => (
            <Reveal key={id} delay={i * 0.1} className={cn(i % 2 === 1 && "translate-y-10")}>
              <div className="group overflow-hidden rounded-3xl border border-white/10">
                <Img id={id} alt="Solar installation" sizes="(max-width: 1024px) 50vw, 25vw" className="aspect-[3/4] w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Awards() {
  const { t } = useLang();
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow={t(home.awardsEyebrow)} title={t(home.awardsTitle)} />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {awards.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.08}>
            <SpotlightCard className="h-full">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Img id={a.id} alt={a.title.en} sizes="(max-width: 640px) 100vw, 25vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-sun-400 px-2.5 py-0.5 text-xs font-bold text-ink-950">{a.year}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold">{t(a.title)}</h3>
                <p className="mt-1.5 text-sm text-white/55">{t(a.body)}</p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TeamPreview() {
  const { t } = useLang();
  const ceo = team[0].members[0];
  const heads = team[1].members;
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading align="left" eyebrow={t(home.teamEyebrow)} title={t(home.teamTitle)} body={t(home.teamBody)} />
          <Reveal>
            <ExploreLink to="/team">{t(ui.cta.viewAll)}</ExploreLink>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-1">
            <TeamCard m={ceo} featured />
          </Reveal>
          {heads.map((m, i) => (
            <Reveal key={m.name} delay={0.08 * (i + 1)}>
              <TeamCard m={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Identity() {
  const { t, lang } = useLang();
  return (
    <section className="container-x py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-sun-500/10">
            <Img id="brand-poster" alt="Mathur Enterprises: Solar Solutions, Rajhans Auto, Okaya Distributor" className="w-full transition-transform duration-1000 group-hover:scale-[1.03]" />
          </div>
        </Reveal>
        <div>
          <SectionHeading
            align="left"
            eyebrow={lang === "hi" ? `${brand.since} से` : `Since ${brand.since}`}
            title={t(brand.promise)}
            body={
              lang === "hi"
                ? "एक छोटी सी दुकान से शुरू होकर आज माथुर एंटरप्राइजेज़ हल्द्वानी, काशीपुर, लालकुआँ, पंतनगर, हल्दूचौड़, जय नगर और किच्छा में फैला है।"
                : "What began as a single counter in Haldwani is today a network across Haldwani, Kashipur, Lalkuan, Pantnagar, Halduchaur, Jay Nagar and Kichha."
            }
          />
          <Reveal delay={0.2} className="mt-8 grid grid-cols-2 gap-3">
            {brand.pillars.map((p) => (
              <div key={p.en} className="glass rounded-2xl px-4 py-3 text-sm font-medium text-white/80">
                <Check className="mr-2 inline h-4 w-4 text-leaf-400" />
                {t(p)}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BranchStrip() {
  const { t, lang } = useLang();
  return (
    <section className="container-x pb-8">
      <Reveal>
        <div className="glass flex flex-col gap-6 rounded-3xl p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400">{lang === "hi" ? "हमारी शाखाएँ" : "Our branches"}</p>
            <p className="mt-2 font-display text-2xl font-bold">{lang === "hi" ? "आपके शहर में, आपके पास" : "In your town, near you"}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {branches.map((b) => (
              <Link
                key={b.name.en}
                to="/contact"
                className={cn("rounded-full border px-4 py-2 text-sm transition hover:bg-white/10", b.hq ? "border-sun-400/50 text-sun-300" : "border-white/10 text-white/75")}
              >
                {t(b.name)}
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();
  return (
    <>
      <Hero />
      <BrandMarquee />
      <section className="container-x py-24 sm:py-32">
        <SectionHeading eyebrow={t(home.verticalsEyebrow)} title={t(home.verticalsTitle)} />
        <div className="mt-14">
          <VerticalCards />
        </div>
      </section>
      <WhyBento />
      <SolarSpotlight />
      <section className="pt-16">
        <div className="container-x">
          <SectionHeading eyebrow={t(home.journeyEyebrow)} title={t(home.journeyTitle)} />
        </div>
        <HorizontalScroller items={moments.map((m) => ({ id: m.id, caption: t(m.caption) }))} />
      </section>
      <Awards />
      <Identity />
      <TeamPreview />
      <BranchStrip />
      <CtaBand />
    </>
  );
}
