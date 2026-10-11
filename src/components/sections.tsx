import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { home, partnerBrands, ui, verticals, type Member, type VerticalKey } from "../data/content";
import { useLang } from "../lib/i18n";
import { cn, telLink, waLink } from "../lib/utils";
import { WhatsAppIcon } from "./Chrome";
import { Img } from "./Img";
import { Marquee, Reveal, SpotlightCard, WordReveal } from "./motion";
import { Particles } from "./Particles";

export const accent: Record<VerticalKey, { text: string; bg: string; ring: string; glow: string; grad: string }> = {
  solar: { text: "text-sun-400", bg: "bg-sun-400", ring: "ring-sun-400/40", glow: "rgba(255,194,26,0.22)", grad: "from-sun-300 to-sun-600" },
  rajhans: { text: "text-raj-400", bg: "bg-raj-500", ring: "ring-raj-400/40", glow: "rgba(255,90,95,0.22)", grad: "from-raj-400 to-ink-600" },
  okaya: { text: "text-leaf-400", bg: "bg-leaf-500", ring: "ring-leaf-400/40", glow: "rgba(79,217,122,0.22)", grad: "from-leaf-300 to-leaf-600" },
};

/* -------------------------------- Page hero -------------------------------- */
export function PageHero({
  eyebrow,
  title,
  sub,
  image,
  tone = "solar",
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  image: string;
  tone?: VerticalKey;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const a = accent[tone];

  return (
    <section ref={ref} className="noise relative isolate flex min-h-[88svh] items-end overflow-hidden pb-16 pt-36 sm:pb-24">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-20">
        <Img id={image} alt="" eager sizes="100vw" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/80 to-transparent" />
      <Particles density={0.00005} />
      <div className="container-x relative">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ring-1 backdrop-blur", a.ring, a.text)}
        >
          <span className={cn("h-1.5 w-1.5 animate-pulse rounded-full", a.bg)} />
          {eyebrow}
        </motion.span>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <WordReveal text={title} className="!justify-start" delay={0.1} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          {sub}
        </motion.p>
        {children && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 flex flex-wrap gap-3">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------ Buttons ------------------------------ */
export function PrimaryButton({ href, to, children, className }: { href?: string; to?: string; children: ReactNode; className?: string }) {
  const cls = cn(
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sun-400 to-sun-500 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_10px_40px_-10px_rgba(255,194,26,0.8)] transition-transform hover:scale-[1.03]",
    className,
  );
  const inner = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2">{children}</span>
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>{inner}</a>;
}

export function GhostButton({ href, to, children, className }: { href?: string; to?: string; children: ReactNode; className?: string }) {
  const cls = cn("inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10", className);
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>{children}</a>;
}

/* --------------------------- Vertical cards --------------------------- */
export function VerticalCards() {
  const { t } = useLang();
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {verticals.map((v, i) => {
        const a = accent[v.key];
        return (
          <Reveal key={v.key} delay={i * 0.1}>
            <Link to={v.path} className="block h-full">
              <SpotlightCard glow={a.glow} className="h-full">
                <div className="relative h-64 overflow-hidden">
                  <Img id={v.image} alt={t(v.name)} sizes="(max-width: 1024px) 100vw, 33vw" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                  <span className={cn("absolute left-5 top-5 rounded-full bg-ink-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur", a.text)}>
                    0{i + 1}
                  </span>
                  <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur transition group-hover:rotate-45 group-hover:bg-white group-hover:text-ink-950">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <div className="p-6 pt-2 sm:p-7 sm:pt-2">
                  <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", a.text)}>{t(v.tagline)}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{t(v.name)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{t(v.body)}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {v.points.map((p) => (
                      <li key={p.en} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        {t(p)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cn("absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-700 group-hover:scale-x-100", a.grad)} />
              </SpotlightCard>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ---------------------------- Brand marquee ---------------------------- */
export function BrandMarquee() {
  return (
    <div className="border-y border-white/5 bg-white/[0.02] py-6">
      <Marquee duration={35}>
        {partnerBrands.map((b) => (
          <span key={b} className="mx-8 flex items-center gap-8 font-logo text-xl font-black tracking-[0.15em] text-white/25 transition hover:text-white/70 sm:text-2xl">
            {b}
            <span className="h-1.5 w-1.5 rounded-full bg-sun-400/60" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ---------------------- Horizontal scroll gallery ---------------------- */
export function HorizontalScroller({ items }: { items: { id: string; caption: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-5 pl-5 sm:gap-8 sm:pl-8">
          {items.map((it, i) => (
            <figure
              key={it.id}
              className={cn(
                "group relative shrink-0 overflow-hidden rounded-3xl border border-white/10",
                i % 3 === 1 ? "h-[52vh] w-[78vw] sm:w-[44vw]" : "h-[64vh] w-[70vw] sm:w-[34vw]",
              )}
            >
              <Img id={it.id} alt={it.caption} sizes="(max-width: 640px) 80vw, 45vw" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                <span className="font-display text-lg font-semibold sm:text-xl">{it.caption}</span>
                <span className="font-display text-sm text-white/40">{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------ Team card ------------------------------ */
const avatarGrads = ["from-sun-400 to-sun-600", "from-leaf-400 to-leaf-600", "from-ink-600 to-ink-800", "from-raj-400 to-sun-500", "from-leaf-300 to-ink-600"];

export function Avatar({ m, className }: { m: Member; className?: string }) {
  const { lang } = useLang();
  if (m.photo) return <Img id={m.photo} alt={m.name} sizes="300px" className={cn("h-full w-full object-cover", className)} />;
  const initials = m.name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("");
  const g = avatarGrads[m.name.length % avatarGrads.length];
  return (
    <div className={cn("relative grid h-full w-full place-items-center overflow-hidden bg-gradient-to-br", g, className)}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <span className="relative font-display text-5xl font-bold text-white/95 drop-shadow">{lang === "hi" ? m.nameHi.slice(0, 1) : initials}</span>
    </div>
  );
}

export function TeamCard({ m, featured = false }: { m: Member; featured?: boolean }) {
  const { t, lang } = useLang();
  return (
    <SpotlightCard className={cn("h-full", featured && "ring-1 ring-sun-400/40")}>
      <div className={cn("relative overflow-hidden", featured ? "aspect-[4/5]" : "aspect-square")}>
        <Avatar m={m} className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
      </div>
      <div className="relative -mt-16 p-5">
        <h3 className={cn("font-display font-bold", featured ? "text-2xl" : "text-lg")}>{lang === "hi" ? m.nameHi : m.name}</h3>
        <p className="mt-1 text-sm text-sun-300/90">{t(m.role)}</p>
      </div>
    </SpotlightCard>
  );
}

/* ------------------------------ CTA band ------------------------------ */
export function CtaBand() {
  const { t } = useLang();
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] p-[1px]">
          {/* animated beam border */}
          <div aria-hidden className="absolute inset-[-200%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_300deg,#FFC21A_330deg,#4FD97A_360deg)] [animation-duration:8s]" />
          <div className="noise relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 px-6 py-16 text-center sm:px-16">
            <div aria-hidden className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-400/25 blur-3xl" />
            <Particles density={0.00006} />
            <h2 className="relative mx-auto max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">{t(home.ctaTitle)}</h2>
            <p className="relative mx-auto mt-5 max-w-xl text-white/65">{t(home.ctaBody)}</p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <PrimaryButton href={waLink("Hello Mathur Enterprises, I want a free solar site survey.")}>
                <WhatsAppIcon className="h-4 w-4" /> {t(ui.cta.whatsapp)}
              </PrimaryButton>
              <GhostButton href={telLink}>
                <Phone className="h-4 w-4" /> {t(ui.cta.call)}
              </GhostButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ExploreLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 text-sm font-semibold text-sun-300 hover:text-white">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
