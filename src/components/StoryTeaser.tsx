import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { story } from "../data/story";
import { useLang } from "../lib/i18n";
import { cn } from "../lib/utils";
import { Img } from "./Img";
import { Reveal } from "./motion";
import { PrimaryButton } from "./sections";

/** Home-page teaser for /story: founder photo, quote and an animated year trail. */
export function StoryTeaser() {
  const { t } = useLang();
  const years = story.chapters.map((c) => c.year);
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="noise relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-800/70 via-ink-900 to-ink-950 p-6 sm:p-12">
        <div aria-hidden className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sun-500/15 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <Reveal className="mx-auto">
            <div className="flex items-center">
              {story.authors.map((a, i) => (
                <div key={a.photo} className={cn("relative h-36 w-36 sm:h-44 sm:w-44", i === 1 && "-ml-8 sm:-ml-10")}>
                  <div aria-hidden className={cn("absolute -inset-2 rounded-full blur-[2px] opacity-70", i === 0 ? "animate-spin-slow bg-[conic-gradient(from_0deg,#FFC21A,#4FD97A,#FF5A5F,#FFC21A)] [animation-duration:12s]" : "bg-white/10")} />
                  <div className={cn("relative h-full w-full overflow-hidden rounded-full border-4 border-ink-950", i === 1 && "z-10")}>
                    <Img id={a.photo} alt={t(a.name)} sizes="176px" className="h-full w-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sun-400">{t(story.eyebrow)}</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">{t(story.teaserTitle)}</h2>
              <p className="mt-5 flex gap-3 font-display text-lg italic text-white/85">
                <Quote className="h-5 w-5 shrink-0 text-sun-400" /> {t(story.quote)}
              </p>
              <p className="mt-4 max-w-2xl text-white/60">{t(story.teaserBody)}</p>
            </Reveal>

            {/* year trail */}
            <div className="relative mt-8">
              <div className="absolute left-0 right-0 top-[11px] h-px bg-white/10" />
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeInOut" }} className="absolute left-0 right-0 top-[11px] h-px origin-left bg-gradient-to-r from-white via-sun-400 to-leaf-400" />
              <ol className="relative flex justify-between gap-2 overflow-x-auto pb-1">
                {years.map((y, i) => (
                  <motion.li key={y + i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.12 }} className="flex shrink-0 flex-col items-center gap-2">
                    <span className="h-[22px] w-[22px] rounded-full border-2 border-sun-400 bg-ink-950" />
                    <span className="font-display text-xs font-bold text-white/70 sm:text-sm">{y}</span>
                  </motion.li>
                ))}
              </ol>
            </div>

            <Reveal delay={0.2} className="mt-8">
              <PrimaryButton to="/story">{t(story.readFull)} →</PrimaryButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
