import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BatteryCharging, Check, MapPin, Sun, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { enquiry as E } from "../data/assist";
import { verticals, type VerticalKey } from "../data/content";
import { useLang } from "../lib/i18n";
import { cn, waLink } from "../lib/utils";
import { useActions } from "./ActionsProvider";
import { WhatsAppIcon } from "./Chrome";
import { Sheet } from "./Sheet";
import { accent } from "./sections";

const vIcon = { solar: Sun, rajhans: Zap, okaya: BatteryCharging } as const;

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition active:scale-95",
        active ? "border-sun-400 bg-sun-400 text-ink-950" : "border-white/10 bg-white/[0.04] text-white/80 hover:border-white/25",
      )}
    >
      {active && <Check className="h-3.5 w-3.5" />}
      {children}
    </button>
  );
}

export function EnquirySheet() {
  const { t, lang } = useLang();
  const { enquiry, closeEnquiry } = useActions();
  const [step, setStep] = useState(0);
  const [biz, setBiz] = useState<VerticalKey | null>(null);
  const [need, setNeed] = useState<number | null>(null);
  const [when, setWhen] = useState<number | null>(null);
  const [town, setTown] = useState("");
  const [name, setName] = useState("");

  // reset when opened; jump to step 2 if the business is known from the page
  useEffect(() => {
    if (!enquiry.open) return;
    setBiz(enquiry.business);
    setStep(enquiry.business ? 1 : 0);
    setNeed(null);
    setWhen(null);
  }, [enquiry.open, enquiry.business]);

  const v = verticals.find((x) => x.key === biz);
  const message = useMemo(() => {
    if (!v) return "";
    const lines = [
      "Hello Mathur Enterprises,",
      `Business: ${v.name.en}`,
      need !== null ? `Need: ${E.needs[v.key][need].en}` : null,
      when !== null ? `When: ${E.whenOptions[when].en}` : null,
      town ? `Town: ${town}` : null,
      name ? `Name: ${name}` : null,
      "(sent from website)",
    ];
    return lines.filter(Boolean).join("\n");
  }, [v, need, when, town, name]);

  const canNext = step === 0 ? !!biz : step === 1 ? need !== null : town.trim().length > 1;
  const progress = ((step + 1) / 3) * 100;

  return (
    <Sheet
      open={enquiry.open}
      onClose={closeEnquiry}
      label={t(E.title)}
      header={
        <div>
          <p className="font-display text-lg font-bold">{t(E.title)}</p>
          <p className="text-xs text-white/50">{t(E.sub)}</p>
        </div>
      }
    >
      <div className="mx-5 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-sun-400 to-leaf-400" animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 200, damping: 30 }} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <>
                <p className="mb-4 font-display text-xl font-bold">{t(E.step1)}</p>
                <div className="grid gap-3">
                  {verticals.map((x) => {
                    const Icon = vIcon[x.key];
                    const active = biz === x.key;
                    return (
                      <button
                        key={x.key}
                        onClick={() => {
                          setBiz(x.key);
                          setNeed(null);
                          setTimeout(() => setStep(1), 180);
                        }}
                        className={cn(
                          "flex items-center gap-4 rounded-2xl border p-4 text-left transition active:scale-[0.98]",
                          active ? "border-sun-400/60 bg-white/10" : "border-white/10 bg-white/[0.03] hover:border-white/25",
                        )}
                      >
                        <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-ink-950", accent[x.key].grad)}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">{t(x.name)}</span>
                          <span className="block truncate text-xs text-white/50">{t(x.tagline)}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 text-white/40" />
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 1 && v && (
              <>
                <button onClick={() => setStep(0)} className={cn("mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold", accent[v.key].text)}>
                  {t(v.name)} <span className="text-white/40">· {lang === "hi" ? "बदलें" : "change"}</span>
                </button>
                <p className="mb-4 font-display text-xl font-bold">{t(E.step2)}</p>
                <div className="flex flex-wrap gap-2">
                  {E.needs[v.key].map((n, i) => (
                    <Chip key={n.en} active={need === i} onClick={() => setNeed(i)}>
                      {t(n)}
                    </Chip>
                  ))}
                </div>
                <p className="mb-3 mt-7 text-sm font-semibold text-white/70">{t(E.when)}</p>
                <div className="flex flex-wrap gap-2">
                  {E.whenOptions.map((w, i) => (
                    <Chip key={w.en} active={when === i} onClick={() => setWhen(i)}>
                      {t(w)}
                    </Chip>
                  ))}
                </div>
              </>
            )}

            {step === 2 && v && (
              <>
                <p className="mb-4 font-display text-xl font-bold">{t(E.step3)}</p>
                <label className="relative block">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sun-400" />
                  <input
                    autoFocus
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    placeholder={t(E.town)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3.5 pl-11 pr-4 text-white outline-none placeholder:text-white/35 focus:border-sun-400/60"
                  />
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {E.towns.map((x) => (
                    <button key={x} onClick={() => setTown(x)} className={cn("rounded-full px-3 py-1.5 text-xs transition", town === x ? "bg-white text-ink-950" : "bg-white/5 text-white/70 hover:bg-white/10")}>
                      {x}
                    </button>
                  ))}
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t(E.name)}
                  className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-white outline-none placeholder:text-white/35 focus:border-sun-400/60"
                />
                <div className="mt-6 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/[0.07] p-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#5be38f]">
                    <WhatsAppIcon className="h-3.5 w-3.5" /> {t(E.preview)}
                  </p>
                  <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-white/75">{message}</pre>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex shrink-0 gap-3 border-t border-white/5 px-5 py-4">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5" aria-label={t(E.back)}>
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        {step < 2 ? (
          <button
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sun-400 to-sun-500 font-semibold text-ink-950 transition disabled:opacity-40"
          >
            {t(E.next)} <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <a
            href={canNext ? waLink(message) : undefined}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (!canNext) e.preventDefault();
              else setTimeout(closeEnquiry, 300);
            }}
            aria-disabled={!canNext}
            className={cn("flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white transition", !canNext && "pointer-events-none opacity-40")}
          >
            <WhatsAppIcon className="h-5 w-5" /> {t(E.send)}
          </a>
        )}
      </div>
    </Sheet>
  );
}
