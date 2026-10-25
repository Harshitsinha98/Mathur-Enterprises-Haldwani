import { animate, motion } from "framer-motion";
import { ArrowRight, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { solar, ui } from "../data/content";
import { useLang } from "../lib/i18n";
import { recommendKw, totalSubsidy, UNITS_PER_KW_MONTH } from "../lib/solar";
import { waLink } from "../lib/utils";

function AnimatedRupee({ value }: { value: number }) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const c = animate(v, value, { duration: 0.6, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>₹{v.toLocaleString("en-IN")}</>;
}

function Slider({ label, value, min, max, step, onChange, suffix }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; suffix?: string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm text-white/70">
        {label}
        <span className="font-display text-xl font-bold text-white">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-sun-400"
        style={{ background: `linear-gradient(to right, #FFC21A ${pct}%, rgba(255,255,255,0.1) ${pct}%)` }}
      />
    </label>
  );
}

export function SubsidyCalculator() {
  const { t, lang } = useLang();
  const [units, setUnits] = useState(300);
  const [rate, setRate] = useState(6);

  const kw = recommendKw(units);
  const subsidy = totalSubsidy(kw);
  const yearly = Math.round(Math.min(units, kw * UNITS_PER_KW_MONTH) * rate * 12);

  const msg =
    lang === "hi"
      ? `नमस्ते, मेरा मासिक उपयोग ${units} यूनिट है। मुझे ${kw} kW सोलर सिस्टम के बारे में जानकारी चाहिए।`
      : `Hello, my monthly usage is ${units} units. I'd like details on a ${kw} kW solar system.`;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800/60 via-ink-900 to-ink-950 p-6 sm:p-10">
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sun-400/20 blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sun-400">{t(solar.calc.eyebrow)}</span>
          <h3 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t(solar.calc.title)}</h3>
          <div className="mt-8 space-y-8">
            <Slider label={t(solar.calc.bill)} value={units} min={50} max={1200} step={10} onChange={setUnits} />
            <Slider label={t(solar.calc.rate)} value={rate} min={3} max={10} step={0.5} onChange={setRate} />
          </div>
          <p className="mt-8 text-xs leading-relaxed text-white/40">{t(solar.calc.note)}</p>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <motion.div key={kw} initial={{ rotate: -90, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-sun-300 to-sun-600 text-ink-950">
              <Sun className="h-8 w-8" />
            </motion.div>
            <div>
              <p className="text-sm text-white/60">{t(solar.calc.size)}</p>
              <p className="font-display text-4xl font-bold">{kw} kW</p>
            </div>
          </div>
          <div className="rounded-2xl border border-leaf-400/30 bg-leaf-500/10 p-5">
            <p className="text-sm text-leaf-300">{t(solar.calc.subsidy)}</p>
            <p className="font-display text-4xl font-bold text-leaf-300">
              <AnimatedRupee value={subsidy} />
            </p>
          </div>
          <div className="rounded-2xl border border-sun-400/30 bg-sun-400/10 p-5">
            <p className="text-sm text-sun-300">{t(solar.calc.yearly)}</p>
            <p className="font-display text-4xl font-bold text-sun-300">
              <AnimatedRupee value={yearly} />
            </p>
          </div>
          <a
            href={waLink(msg)}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-white py-3.5 font-semibold text-ink-950 transition hover:bg-sun-300"
          >
            {t(ui.cta.freeVisit)} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
