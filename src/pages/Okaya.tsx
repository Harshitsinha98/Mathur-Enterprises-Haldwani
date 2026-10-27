import { ArrowRight, Battery, CheckCircle2, Home as HomeIcon, PanelTop, Sun, Truck, Zap } from "lucide-react";
import { WhatsAppIcon } from "../components/Chrome";
import { Img } from "../components/Img";
import { Reveal, SectionHeading, SpotlightCard } from "../components/motion";
import { CtaBand, GhostButton, PageHero, PrimaryButton } from "../components/sections";
import { okaya, ui } from "../data/content";
import { useLang } from "../lib/i18n";
import { telLink, waLink } from "../lib/utils";

const icons = { battery: Battery, zap: Zap, sun: Sun, panel: PanelTop, truck: Truck, home: HomeIcon } as const;

export default function Okaya() {
  const { t, lang } = useLang();
  return (
    <>
      <PageHero eyebrow={t(okaya.eyebrow)} title={t(okaya.title)} sub={t(okaya.sub)} image="okaya-store-2" tone="okaya">
        <PrimaryButton href={waLink("Hello, I want details of Okaya inverters and batteries.")}>
          <WhatsAppIcon className="h-4 w-4" /> {t(ui.cta.enquire)}
        </PrimaryButton>
        <GhostButton href={telLink}>{t(ui.cta.call)}</GhostButton>
      </PageHero>

      <section className="container-x py-24 sm:py-32">
        <SectionHeading eyebrow="OKAYA" title={t(okaya.productsTitle)} accent="leaf" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {okaya.products.map((p, i) => {
            const Icon = icons[p.icon as keyof typeof icons];
            return (
              <Reveal key={p.title.en} delay={i * 0.06}>
                <SpotlightCard glow="rgba(79,217,122,0.2)" className="h-full p-7">
                  <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-leaf-400/25 to-leaf-600/10 ring-1 ring-leaf-400/30">
                    <Icon className="h-8 w-8 text-leaf-300" />
                    <span className="absolute inset-0 rounded-2xl bg-leaf-400/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold">{t(p.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{t(p.body)}</p>
                  <a
                    href={waLink(`Hello, please share details of Okaya ${p.title.en}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center text-sm font-semibold text-leaf-300 hover:text-white"
                  >
                    {lang === "hi" ? "जानकारी लें" : "Get details"} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-x py-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-leaf-400/20 bg-gradient-to-br from-leaf-600/20 via-ink-900 to-ink-950">
          <div className="grid items-center gap-10 p-6 sm:p-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400">{lang === "hi" ? "डीलरशिप" : "Dealership"}</span>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t(okaya.dealerTitle)}</h2>
              <p className="mt-4 text-white/65">{t(okaya.dealerBody)}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {okaya.dealerPoints.map((p) => (
                  <li key={p.en} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-leaf-400" /> {t(p)}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PrimaryButton href={waLink("Hello, I am interested in becoming an Okaya dealer.")}>
                  {lang === "hi" ? "डीलर पूछताछ" : "Dealer enquiry"} <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </div>
            <Reveal className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-3xl">
                <Img id="okaya-handover" alt="Okaya e-scooty and battery handover at our Okaya store" sizes="25vw" className="aspect-[3/4] w-full object-cover" />
              </div>
              <div className="mt-10 overflow-hidden rounded-3xl">
                <Img id="okaya-store-2" alt="Okaya showroom front, Haldwani" sizes="25vw" className="aspect-[3/4] w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
