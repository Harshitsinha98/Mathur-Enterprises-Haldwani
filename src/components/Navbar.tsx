import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ticker } from "../data/assist";
import { ui } from "../data/content";
import { useLang } from "../lib/i18n";
import { cn, telLink } from "../lib/utils";
import { Logo } from "./Logo";
import { PoweredBy } from "./PoweredBy";
import { Marquee } from "./motion";

const links = [
  { to: "/", label: ui.nav.home },
  { to: "/solar", label: ui.nav.solar },
  { to: "/rajhans-ev", label: ui.nav.rajhans },
  { to: "/okaya", label: ui.nav.okaya },
  { to: "/team", label: ui.nav.team },
  { to: "/contact", label: ui.nav.contact },
];

export function LangToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={lang === "en" ? "हिंदी में देखें" : "View in English"}
      className={cn("relative flex h-9 w-[92px] items-center rounded-full border border-white/15 bg-white/5 p-1 text-xs font-semibold", className)}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
        className={cn("absolute top-1 h-7 w-[42px] rounded-full bg-gradient-to-r from-sun-400 to-sun-500", lang === "en" ? "left-1" : "left-[46px]")}
      />
      <span className={cn("relative z-10 w-1/2 text-center transition-colors", lang === "en" ? "text-ink-950" : "text-white/70")}>EN</span>
      <span className={cn("relative z-10 w-1/2 text-center font-hindi transition-colors", lang === "hi" ? "text-ink-950" : "text-white/70")}>हिं</span>
    </button>
  );
}

export function Navbar() {
  const { t, lang } = useLang();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{ height: scrolled || open ? 0 : "auto", opacity: scrolled || open ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-b border-white/5 bg-ink-950/80 backdrop-blur"
      >
        <div className="flex items-center">
          <span className="z-10 flex shrink-0 items-center gap-1.5 bg-ink-950 py-1.5 pl-3 pr-2 text-[10px] font-bold uppercase tracking-[0.18em] text-leaf-400 sm:pl-5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf-400" />
            {lang === "hi" ? "अपडेट" : "Live"}
          </span>
          <Marquee duration={38} className="flex-1 py-1.5">
            {ticker.map((x) => (
              <span key={x.en} className="mx-6 flex items-center gap-6 whitespace-nowrap text-[11px] font-medium tracking-wide text-white/65 sm:text-xs">
                {t(x)}
                <span className="h-1 w-1 rounded-full bg-sun-400/70" />
              </span>
            ))}
          </Marquee>
        </div>
      </motion.div>
      <div className="flex justify-center px-3 pt-3 sm:pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full items-center justify-between gap-4 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4",
          scrolled ? "max-w-6xl border border-white/10 bg-ink-900/70 shadow-2xl shadow-black/40 backdrop-blur-xl" : "max-w-7xl border border-transparent",
        )}
      >
        <div className="flex flex-col">
          <NavLink to="/" aria-label="Mathur Enterprises home">
            <Logo />
          </NavLink>
          <PoweredBy className="mt-1 hidden pl-[3.1rem] !text-[0.5rem] !tracking-[0.2em] sm:inline-flex" />
        </div>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === "/"} className="relative block px-3.5 py-2 text-sm font-medium">
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={cn("relative transition-colors", isActive ? "text-white" : "text-white/60 hover:text-white")}>{t(l.label)}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangToggle className="hidden sm:flex" />
          <a
            href={telLink}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-sun-400 to-sun-500 px-4 py-2 text-sm font-semibold text-ink-950 shadow-[0_8px_30px_-8px_rgba(255,194,26,0.7)] transition-transform hover:scale-[1.03] md:flex"
          >
            <Phone className="h-4 w-4" />
            {t(ui.cta.call)}
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 4%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 4%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 4%)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 -z-10 flex flex-col bg-ink-950/95 px-6 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li key={l.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05 }}>
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) => cn("block border-b border-white/5 py-4 font-display text-3xl font-semibold", isActive ? "text-sun-400" : "text-white/80")}
                  >
                    {t(l.label)}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <LangToggle />
              <a href={telLink} className="flex-1 rounded-full bg-sun-400 py-3 text-center font-semibold text-ink-950">
                {t(ui.cta.call)}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
