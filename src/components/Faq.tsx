import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "../data/faq";
import { useLang } from "../lib/i18n";
import { cn } from "../lib/utils";
import { Reveal, SectionHeading } from "./motion";

export function Faq() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow="FAQ" title={lang === "hi" ? "अक्सर पूछे जाने वाले सवाल" : "Questions people ask us"} />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q.en} delay={i * 0.04}>
              <div className={cn("glass overflow-hidden rounded-2xl transition-colors", isOpen && "border-sun-400/30")}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6">
                  <h3 className="font-display text-base font-semibold sm:text-lg">{t(f.q)}</h3>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/5 text-sun-300">
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-white/65 sm:px-6">{t(f.a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
