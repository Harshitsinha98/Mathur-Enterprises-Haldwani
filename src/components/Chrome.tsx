import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { brand, ui, verticals } from "../data/content";
import { useLang } from "../lib/i18n";
import { MAPS_LINK, PHONE, telLink, waLink } from "../lib/utils";
import { Logo } from "./Logo";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.23-4.25 9.47-9.47 9.47zm8.06-17.53A11.33 11.33 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2.01.52 3.97 1.52 5.7L.55 23.63l6.04-1.58a11.37 11.37 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05z" />
    </svg>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-sun-400 via-sun-500 to-leaf-400"
    />
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-sun-500/10 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">{t(ui.footer.tagline)}</p>
          <p className="mt-4 font-display text-lg italic text-sun-300">“{t(brand.tagline)}”</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{t(ui.footer.businesses)}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {verticals.map((v) => (
              <li key={v.key}>
                <Link to={v.path} className="text-white/70 transition hover:text-white">
                  {t(v.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{t(ui.footer.company)}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/team" className="text-white/70 hover:text-white">{t(ui.nav.team)}</Link></li>
            <li><Link to="/contact" className="text-white/70 hover:text-white">{t(ui.nav.contact)}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{t(ui.footer.reach)}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={telLink} className="flex items-center gap-2 text-white/80 hover:text-white">
                <Phone className="h-4 w-4 text-sun-400" /> {PHONE}
              </a>
            </li>
            <li>
              <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/80 hover:text-white">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-white/60 hover:text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" /> {t(brand.address)}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Mathur Enterprises, Haldwani. {t(ui.footer.rights)}</span>
          <span className="flex gap-3">{brand.pillars.map((p) => <span key={p.en}>{t(p)}</span>)}</span>
        </div>
      </div>
    </footer>
  );
}
