import { BatteryCharging, Bike, CheckCircle2, FileCheck2, Layers, Trophy, Users, Zap } from "lucide-react";
import { achievements } from "../data/content";
import { useLang } from "../lib/i18n";
import { cn } from "../lib/utils";
import { Counter, Reveal, SectionHeading } from "./motion";
import { Particles } from "./Particles";

const icons = { scooty: Zap, rickshaw: Bike, doc: FileCheck2, offgrid: Layers, hybrid: BatteryCharging, team: Users } as const;

/** Animated "by the numbers" band: big count-up stats + No. 1 / zero-complaint badges. */
export function Achievements() {
  const { t } = useLang();
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="noise relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-800/70 via-ink-900 to-ink-950 px-6 py-14 sm:px-12 sm:py-16">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sun-500/15 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-leaf-500/15 blur-3xl" />
        <Particles density={0.00004} />

        <div className="relative">
          <SectionHeading eyebrow={t(achievements.eyebrow)} title={t(achievements.title)} body={t(achievements.body)} />

          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-3">
            {achievements.stats.map((s, i) => {
              const Icon = icons[s.icon as keyof typeof icons];
              return (
                <Reveal key={s.label.en} delay={i * 0.07} className="bg-ink-950/60">
                  <div className="group flex h-full flex-col items-center gap-2 p-6 text-center transition-colors hover:bg-white/[0.03] sm:p-8">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sun-400/20 to-leaf-400/10 text-sun-300 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="font-display text-4xl font-bold text-gradient-sun sm:text-5xl">
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <p className="text-xs leading-tight text-white/60 sm:text-sm">{t(s.label)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {achievements.badges.map((b, i) => (
              <span
                key={b.en}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold",
                  i === 1 ? "border-sun-400/50 bg-sun-400/10 text-sun-300" : "border-white/10 bg-white/[0.04] text-white/80",
                )}
              >
                {i === 0 ? <CheckCircle2 className="h-4 w-4 text-leaf-400" /> : i === 1 ? <Trophy className="h-4 w-4 text-sun-400" /> : null}
                {t(b)}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
