import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Phone, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { chat, dock } from "../data/assist";
import { useLang } from "../lib/i18n";
import { cn, telLink, waLink } from "../lib/utils";
import { useActions } from "./ActionsProvider";
import { MitraAvatar } from "./ChatPanel";
import { WhatsAppIcon } from "./Chrome";

const primaryGrad = {
  default: "from-sun-400 to-sun-500 text-ink-950",
  solar: "from-sun-400 to-sun-500 text-ink-950",
  rajhans: "from-raj-500 to-raj-400 text-white",
  okaya: "from-leaf-500 to-leaf-400 text-ink-950",
} as const;

/** Mobile bottom dock: Call · WhatsApp · AI + a page-aware primary CTA. */
export function ActionDock() {
  const { t } = useLang();
  const { openChat, openEnquiry, routeBusiness, chatOpen, enquiry } = useActions();
  const key = routeBusiness ?? "default";
  const hidden = chatOpen || enquiry.open;

  const iconBtn = "relative grid h-12 w-12 shrink-0 place-items-center rounded-full text-white/85 transition active:scale-90 active:bg-white/10";

  return (
    <motion.nav
      aria-label="Quick actions"
      initial={{ y: 120 }}
      animate={{ y: hidden ? 140 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: hidden ? 0 : 0.6 }}
      className="fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-40 md:hidden"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-ink-900/85 p-1.5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <a href={telLink} className={iconBtn} aria-label={t(dock.call)}>
          <Phone className="h-5 w-5" />
        </a>
        <a href={waLink("Hello Mathur Enterprises, I would like to know more.")} target="_blank" rel="noreferrer" className={iconBtn} aria-label={t(dock.whatsapp)}>
          <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
        </a>
        <button onClick={() => openChat()} className={iconBtn} aria-label={t(dock.ai)}>
          <span className="absolute inset-1.5 animate-ping rounded-full bg-sun-400/20 [animation-duration:2.5s]" />
          <MitraAvatar className="h-8 w-8" />
        </button>
        <button
          onClick={() => openEnquiry()}
          className={cn("group relative ml-1 flex h-12 min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r px-4 text-[15px] font-semibold", primaryGrad[key])}
        >
          <span className="absolute inset-0 -translate-x-full animate-[dockshine_3.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={key} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ duration: 0.25 }} className="relative truncate">
              {t(dock.primary[key])}
            </motion.span>
          </AnimatePresence>
          <ArrowUpRight className="relative h-4 w-4 shrink-0" />
        </button>
      </div>
    </motion.nav>
  );
}

/** Desktop: stacked AI + WhatsApp bubbles in the bottom-right corner. */
export function FloatingActions() {
  const { t } = useLang();
  const { openChat, closeChat, chatOpen } = useActions();
  const [nudge, setNudge] = useState(false);

  // show a one-time "Ask me" nudge after a few seconds
  useEffect(() => {
    if (sessionStorage.getItem("me-nudged")) return;
    const id = setTimeout(() => {
      setNudge(true);
      sessionStorage.setItem("me-nudged", "1");
    }, 6000);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => {
    if (!nudge) return;
    const id = setTimeout(() => setNudge(false), 7000);
    return () => clearTimeout(id);
  }, [nudge]);

  return (
    <div className="fixed bottom-7 right-7 z-50 hidden flex-col items-end gap-3 md:flex">
      <AnimatePresence>
        {nudge && !chatOpen && (
          <motion.button
            onClick={() => {
              setNudge(false);
              openChat();
            }}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="absolute bottom-[136px] right-0 w-64 rounded-2xl rounded-br-md border border-white/10 bg-ink-900/95 p-4 text-left text-sm text-white/80 shadow-2xl backdrop-blur-xl"
          >
            <span className="mb-1 block font-semibold text-white">{t(chat.name)} <Sparkles className="inline h-3.5 w-3.5 text-sun-400" /></span>
            {t(chat.quick[0])}
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI bubble */}
      <motion.button
        onClick={() => (chatOpen ? closeChat() : openChat())}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={t(dock.ai)}
        aria-expanded={chatOpen}
        className="group relative flex items-center gap-2 rounded-full bg-gradient-to-br from-sun-300 via-sun-500 to-leaf-500 p-1 shadow-[0_10px_40px_-6px_rgba(255,194,26,0.7)]"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-sun-400/30 [animation-duration:2.5s]" />
        <span className="grid h-14 w-14 place-items-center rounded-full bg-ink-950/10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={chatOpen ? "x" : "ai"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="grid place-items-center font-display text-lg font-black text-ink-950">
              {chatOpen ? <X className="h-6 w-6" strokeWidth={2.5} /> : "AI"}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap pr-0 text-sm font-semibold text-ink-950 transition-all duration-500 group-hover:max-w-40 group-hover:pr-4">
          {t(dock.ai)}
        </span>
      </motion.button>

      {/* WhatsApp bubble */}
      <motion.a
        href={waLink("Hello Mathur Enterprises, I would like to know more.")}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={t(dock.whatsapp)}
        className="group flex items-center gap-2 rounded-full bg-[#25D366] p-4 text-white shadow-[0_10px_40px_-6px_rgba(37,211,102,0.7)]"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 group-hover:max-w-40 group-hover:pr-1">WhatsApp</span>
      </motion.a>
    </div>
  );
}
