import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeIndianRupee, BatteryCharging, FileCheck2, Wrench } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "../components/Chrome";
import { Gallery } from "../components/Gallery";
import { Img } from "../components/Img";
import { Reveal, SectionHeading, SpotlightCard } from "../components/motion";
import { CtaBand, GhostButton, PageHero, PrimaryButton } from "../components/sections";
import { rajhans, ui } from "../data/content";
import { useLang } from "../lib/i18n";
import { cn, telLink, waLink } from "../lib/utils";

const benefitIcons = [BadgeIndianRupee, FileCheck2, BatteryCharging, Wrench];

function RickshawGlyph({ cargo }: { cargo: boolean }) {
  return (
    <svg viewBox="0 0 120 70" className="h-20 w-auto" aria-hidden>
      <defs>
        <linearGradient id={`rk-${cargo}`} x1="0" x2="1">
          <stop offset="0" stopColor="#FF5A5F" />
          <stop offset="1" stopColor="#2457C5" />
        </linearGradient>
      </defs>
      {cargo ? (
        <>
          <rect x="44" y="18" width="62" height="30" rx="3" fill={`url(#rk-${cargo})`} opacity="0.9" />
          <path d="M14 48V28c0-6 4-10 10-10h18v30z" fill="#fff" opacity="0.9" />
        </>
      ) : (
        <>
          <path d="M10 46c0-20 10-34 34-34h44c10 0 16 6 18 16l4 18z" fill={`url(#rk-${cargo})`} opacity="0.9" />
          <rect x="40" y="18" width="22" height="16" rx="3" fill="#06122e" opacity="0.6" />
          <rect x="66" y="18" width="22" height="16" rx="3" fill="#06122e" opacity="0.6" />
        </>
      )}
      <circle cx="28" cy="54" r="9" fill="#030a1c" stroke="#fff" strokeWidth="3" />
      <circle cx="92" cy="54" r="9" fill="#030a1c" stroke="#fff" strokeWidth="3" />
    </svg>
  );
}

export default function RajhansEV() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<"all" | "passenger" | "cargo">("all");
  const models = rajhans.models.filter((m) => filter === "all" || m.kind === filter);

  const deliveries = [
    { id: "ev-delivery-1", caption: lang === "hi" ? "हल्द्वानी सोलर हाउस पर डिलीवरी" : "Delivery at Haldwani Solar House" },
    { id: "ev-delivery-2", caption: lang === "hi" ? "नई सवारी, नई कमाई" : "New ride, new income" },
    { id: "ev-delivery-3", caption: lang === "hi" ? "शोरूम से सीधे सड़क पर" : "Straight from our showroom" },
    { id: "ev-handover-1", caption: lang === "hi" ? "चाबी सौंपते हुए" : "Handing over the keys" },
    { id: "ev-battery-handover", caption: lang === "hi" ? "ओकाया बैटरी के साथ" : "Fitted with Okaya battery" },
    { id: "store-ev", caption: lang === "hi" ? "ई-स्कूटी रिक्शा शोरूम" : "E-scooty & rickshaw showroom" },
    { id: "ev-expo-rickshaw", caption: lang === "hi" ? "EV एक्सपो में" : "At the EV expo" },
    { id: "ev-expo-team", caption: lang === "hi" ? "राष्ट्रीय EV एक्सपो, टीम" : "National EV expo, team" },
  ];

  return (
    <>
      <PageHero eyebrow={t(rajhans.eyebrow)} title={t(rajhans.title)} sub={t(rajhans.sub)} image="ev-delivery-2" tone="rajhans">
        <PrimaryButton href={waLink("Hello, I want details of Rajhans e-rickshaw models.")}>
          <WhatsAppIcon className="h-4 w-4" /> {t(ui.cta.enquire)}
        </PrimaryButton>
        <GhostButton href={telLink}>{t(ui.cta.call)}</GhostButton>
      </PageHero>

      <section className="container-x py-24 sm:py-32">
        <SectionHeading eyebrow={t(rajhans.modelsEyebrow)} title={t(rajhans.modelsTitle)} accent="raj" />
        <div className="mt-10 flex justify-center">
          <div className="glass flex gap-1 rounded-full p-1">
            {(["all", "passenger", "cargo"] as const).map((k) => (
              <button key={k} onClick={() => setFilter(k)} className="relative rounded-full px-5 py-2 text-sm font-semibold">
                {filter === k && <motion.span layoutId="ev-filter" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className={cn("relative", filter === k ? "text-ink-950" : "text-white/70")}>{t(rajhans.kinds[k])}</span>
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {models.map((m) => (
              <motion.div key={m.name} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35 }}>
                <SpotlightCard glow="rgba(255,90,95,0.2)" className="h-full p-5">
                  <div className="flex h-24 items-center justify-center transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
                    <RickshawGlyph cargo={m.kind === "cargo"} />
                  </div>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-raj-400">RAJHANSev</p>
                  <h3 className="font-display text-lg font-bold">{m.name}</h3>
                  <p className="text-xs text-white/50">{t(rajhans.kinds[m.kind])}</p>
                  <a
                    href={waLink(`Hello, please share details of RAJHANSev ${m.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center text-xs font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
                  >
                    {lang === "hi" ? "जानकारी लें" : "Get details"} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="container-x py-12">
        <SectionHeading eyebrow="Rajhans Auto" title={t(rajhans.benefitsTitle)} accent="raj" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rajhans.benefits.map((b, i) => {
            const Icon = benefitIcons[i];
            return (
              <Reveal key={b.title.en} delay={i * 0.07}>
                <SpotlightCard glow="rgba(255,90,95,0.18)" className="h-full p-6">
                  <Icon className="h-8 w-8 text-raj-400" />
                  <h3 className="mt-5 font-display text-lg font-bold">{t(b.title)}</h3>
                  <p className="mt-2 text-sm text-white/60">{t(b.body)}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-x py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-3xl">
                <Img id="ev-scooters" alt="E-scooty range" sizes="(max-width: 1024px) 50vw, 25vw" className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="mt-10 overflow-hidden rounded-3xl">
                <Img id="ev-scooty-1" alt="E-scooty delivery" sizes="(max-width: 1024px) 50vw, 25vw" className="aspect-[4/5] w-full object-cover" />
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading align="left" eyebrow="E-Scooty" title={t(rajhans.scootyTitle)} body={t(rajhans.scootyBody)} accent="raj" />
            <Reveal delay={0.2} className="mt-8">
              <PrimaryButton href={waLink("Hello, I want to book an e-scooty test ride.")}>
                {lang === "hi" ? "टेस्ट राइड बुक करें" : "Book a test ride"} <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <SectionHeading eyebrow={lang === "hi" ? "गैलरी" : "Gallery"} title={t(rajhans.deliveriesTitle)} accent="raj" />
        <div className="mt-12">
          <Gallery items={deliveries} columns="columns-2 md:columns-3 lg:columns-4" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
