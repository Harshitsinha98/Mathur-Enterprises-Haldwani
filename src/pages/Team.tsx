import { motion } from "framer-motion";
import { Img } from "../components/Img";
import { Reveal, rise, stagger } from "../components/motion";
import { Particles } from "../components/Particles";
import { CtaBand, TeamCard } from "../components/sections";
import { team, teamPage } from "../data/content";
import { useLang } from "../lib/i18n";
import { WordReveal } from "../components/motion";

export default function Team() {
  const { t } = useLang();
  return (
    <>
      <section className="noise relative overflow-hidden pb-16 pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,#12307a_0%,#030a1c_70%)]" />
        <Particles density={0.00005} />
        <div className="container-x relative text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sun-400">{t(teamPage.eyebrow)}</span>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            <WordReveal text={t(teamPage.title)} />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/65">{t(teamPage.sub)}</p>
        </div>
        <Reveal className="container-x relative mt-14">
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <Img id="moment-team" alt="Mathur Enterprises team" eager sizes="100vw" className="max-h-[70vh] w-full object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="container-x space-y-20 py-16">
        {team.map((tier, ti) => (
          <div key={tier.title.en}>
            <Reveal className="mb-8 flex items-center gap-4">
              <span className="font-display text-sm font-bold text-sun-400">0{ti + 1}</span>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">{t(tier.title)}</h2>
              <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </Reveal>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className={
                ti === 0
                  ? "mx-auto grid max-w-sm"
                  : "grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
              }
            >
              {tier.members.map((m) => (
                <motion.div key={m.name} variants={rise}>
                  <TeamCard m={m} featured={ti === 0} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </section>

      <CtaBand />
    </>
  );
}
