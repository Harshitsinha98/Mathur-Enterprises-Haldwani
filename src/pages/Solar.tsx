import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Gallery } from "../components/Gallery";
import { Img } from "../components/Img";
import { InstallMap } from "../components/InstallMap";
import { Reveal, SectionHeading, SpotlightCard } from "../components/motion";
import { CtaBand, GhostButton, PageHero, PrimaryButton } from "../components/sections";
import { SubsidyCalculator } from "../components/SubsidyCalculator";
import { WhatsAppIcon } from "../components/Chrome";
import { solar, solarGallery, ui } from "../data/content";
import { useLang } from "../lib/i18n";
import { telLink, waLink } from "../lib/utils";

function Process() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow={t(solar.processEyebrow)} title={t(solar.processTitle)} />
      <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute left-6 top-0 h-full w-px bg-white/10 sm:left-1/2" />
        <motion.div style={{ height: h }} className="absolute left-6 top-0 w-px bg-gradient-to-b from-sun-400 to-leaf-400 sm:left-1/2" />
        <ol className="space-y-10">
          {solar.process.map((s, i) => (
            <Reveal key={s.title.en} delay={0.05} className={`relative grid gap-4 pl-16 sm:grid-cols-2 sm:pl-0 ${i % 2 ? "sm:[&>div]:col-start-2" : ""}`}>
              <span className="absolute left-6 top-2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-ink-950 font-display text-sm font-bold text-sun-300 ring-2 ring-sun-400/60 sm:left-1/2">
                {i + 1}
              </span>
              <div className={i % 2 ? "sm:pl-12" : "sm:pr-12 sm:text-right"}>
                <h3 className="font-display text-xl font-bold">{t(s.title)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{t(s.body)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function Solar() {
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={t(solar.eyebrow)} title={t(solar.title)} sub={t(solar.sub)} image="solar-haldwani-3" tone="solar">
        <PrimaryButton href={waLink("Hello, I want a free solar site survey.")}>
          <WhatsAppIcon className="h-4 w-4" /> {t(ui.cta.freeVisit)}
        </PrimaryButton>
        <GhostButton href={telLink}>{t(ui.cta.call)}</GhostButton>
      </PageHero>

      <section className="container-x py-24 sm:py-32">
        <SectionHeading eyebrow={t(solar.productsEyebrow)} title={t(solar.productsTitle)} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solar.products.map((p, i) => (
            <Reveal key={p.title.en} delay={i * 0.06}>
              <SpotlightCard className="h-full p-7">
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-bold text-white/10">0{i + 1}</span>
                  {p.tag && <span className="rounded-full bg-sun-400 px-3 py-1 text-xs font-bold text-ink-950">{t(p.tag)}</span>}
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{t(p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{t(p.body)}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-8">
        <Reveal>
          <SubsidyCalculator />
        </Reveal>
      </section>

      <Process />

      <section className="container-x py-24 sm:py-32">
        <SectionHeading eyebrow={t(solar.mapEyebrow)} title={t(solar.mapTitle)} body={t(solar.mapBody)} />
        <Reveal className="mt-14">
          <InstallMap />
        </Reveal>
      </section>

      <section className="container-x py-12">
        <div className="grid items-center gap-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400">PM Surya Ghar</span>
            <h2 className="mt-3 font-display text-3xl font-bold">{t(solar.campsTitle)}</h2>
            <p className="mt-4 text-white/60">{t(solar.campsBody)}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["camp-halduchaur-1", "camp-halduchaur-2", "camp-lalkuan"].map((id, i) => (
              <Reveal key={id} delay={i * 0.1}>
                <div className="overflow-hidden rounded-2xl">
                  <Img id={id} alt="PM Surya Ghar camp" sizes="33vw" className="aspect-[3/4] w-full object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24 sm:py-32">
        <SectionHeading eyebrow={t(solar.galleryEyebrow)} title={t(solar.galleryTitle)} />
        <div className="mt-14">
          <Gallery items={solarGallery.map((g) => ({ id: g.id, caption: t(g.town) }))} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
