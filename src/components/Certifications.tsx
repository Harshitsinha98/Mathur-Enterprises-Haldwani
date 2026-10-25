import { motion } from "framer-motion";
import { FileText, ShieldCheck } from "lucide-react";
import { business } from "../data/business";
import { useLang } from "../lib/i18n";
import { Reveal } from "./motion";

/**
 * "Registered & Certified" trust strip: GST and Udyam, each linking to the
 * official certificate PDF. Builds confidence and reinforces legitimacy for SEO.
 */
export function Certifications() {
  const { t, lang } = useLang();
  return (
    <section className="container-x py-12">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-leaf-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-leaf-500/15 text-leaf-300 ring-1 ring-leaf-400/30">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-400">{lang === "hi" ? "रजिस्टर्ड और प्रमाणित" : "Registered & Certified"}</p>
                <h2 className="mt-1 font-display text-2xl font-bold">{lang === "hi" ? "एक भरोसेमंद, सरकार-पंजीकृत व्यवसाय" : "A trusted, government-registered business"}</h2>
                <p className="mt-1 text-sm text-white/55">
                  {lang === "hi" ? "हमारे आधिकारिक प्रमाणपत्र देखें और डाउनलोड करें।" : "View and download our official certificates."}
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[30rem]">
              {business.certificates.map((c, i) => (
                <motion.a
                  key={c.key}
                  href={c.file}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-sun-400/40 hover:bg-white/[0.06]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sun-400/15 text-sun-300">
                    <FileText className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{t(c.label)}</span>
                    <span className="block truncate font-mono text-xs text-white/50">{c.value}</span>
                  </span>
                  <span className="ml-auto text-xs font-semibold text-sun-300 opacity-0 transition group-hover:opacity-100">
                    {lang === "hi" ? "देखें" : "View"}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
