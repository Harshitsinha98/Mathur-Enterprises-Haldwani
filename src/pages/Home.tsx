import { ArrowRight, Award, BadgeCheck, Check, MapPin, MapPinned, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Img } from "../components/Img";
import { Hero } from "../components/Hero";
import { Counter, Reveal, SectionHeading, SpotlightCard } from "../components/motion";
import { BrandMarquee, CtaBand, ExploreLink, GhostButton, HorizontalScroller, PrimaryButton, TeamCard, VerticalCards } from "../components/sections";
import { awards, branches, brand, home, installations, moments, team, ui } from "../data/content";
import { useLang } from "../lib/i18n";
import { cn, waLink } from "../lib/utils";

const icons = { badge: BadgeCheck, map: MapPinned, wrench: Wrench, award: Award, shield: ShieldCheck, geo: MapPin } as const;

function StatsStrip() {
  const { t } = useLang();
  return (
    <section className="container-x pt-16 sm:pt-20">
      <Reveal>
        <div className="glass mx-auto grid max-w-5xl grid-cols-2 overflow-hidden rounded-3xl sm:grid-cols-4">
          {home.stats.map((s, i) => (
            <div key={s.label.en} className={cn("relative px-4 py-6 text-center", i % 2 === 1 && "border-l border-white/10", i > 1 && "border-t border-white/10 sm:border-t-0", i === 2 && "sm:border-l")}>
              <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} plain={s.plain} />
              </div>
              <div className="mt-1 text-xs text-white/55 sm:text-sm">{t(s.label)}</div>
            </div>
          ))}
        </div>
      </Reveal>
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
      <StatsStrip />
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
