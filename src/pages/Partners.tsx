import { ArrowRight, PanelTop } from "lucide-react";
import { WhatsAppIcon } from "../components/Chrome";
import { Img } from "../components/Img";
import { Reveal, SectionHeading, SpotlightCard, WordReveal } from "../components/motion";
import { Particles } from "../components/Particles";
import { CtaBand, GhostButton, PrimaryButton } from "../components/sections";
import { partnerCertificates, partnersPage, solarPanelPartners, ui } from "../data/content";
import { useLang } from "../lib/i18n";
import { telLink, waLink } from "../lib/utils";

export default function Partners() {
  const { t, lang } = useLang();
  return (
    <>
      <section className="noise relative overflow-hidden pb-16 pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,#12307a_0%,#030a1c_70%)]" />
        <Particles density={0.00005} />
        <div className="container-x relative text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sun-400">{t(partnersPage.eyebrow)}</span>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            <WordReveal text={t(partnersPage.title)} />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/65">{t(partnersPage.sub)}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton href={waLink("Hello, I want a solar quote. Please share panel brand options.")}>
              <WhatsAppIcon className="h-4 w-4" /> {t(ui.cta.enquire)}
            </PrimaryButton>
            <GhostButton href={telLink}>{t(ui.cta.call)}</GhostButton>
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-24">
        <SectionHeading eyebrow={t(partnersPage.panelsEyebrow)} title={t(partnersPage.panelsTitle)} />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {solarPanelPartners.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <SpotlightCard className="flex h-full flex-col p-6">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sun-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sun-300 ring-1 ring-sun-400/30">
                  <PanelTop className="h-3.5 w-3.5" /> {t(partnersPage.panelTag)}
                </span>
                <h3 className="mt-6 font-logo text-2xl font-black uppercase tracking-[0.12em] sm:text-3xl">{p.name}</h3>
                {lang === "hi" && <p className="mt-1 text-sm text-white/50">{p.nameHi}</p>}
                <a
                  href={waLink(`Hello, please share a solar quote with ${p.name} panels.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center pt-6 text-sm font-semibold text-sun-300 hover:text-white"
                >
                  {t(partnersPage.ask)} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-16 sm:py-24">
        <SectionHeading eyebrow={t(partnersPage.certsEyebrow)} title={t(partnersPage.certsTitle)} />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {partnerCertificates.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <SpotlightCard className="h-full">
                <div className="bg-white p-2">
                  <Img id={c.id} alt={t(c.title)} sizes="(max-width: 768px) 100vw, 40vw" className="aspect-[1443/1036] w-full object-contain" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold">{t(c.title)}</h3>
                  <p className="mt-1.5 text-sm text-white/55">{t(c.body)}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
