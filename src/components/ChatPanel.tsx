import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, SendHorizontal, Sparkles } from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { chat as C } from "../data/assist";
import { askAssistant, type ChatMsg } from "../lib/assistant";
import { useLang } from "../lib/i18n";
import { cn, waLink } from "../lib/utils";
import { useActions } from "./ActionsProvider";
import { WhatsAppIcon } from "./Chrome";
import { Sheet } from "./Sheet";

const STORE = "me-chat";

/** Minimal formatter: **bold**, line breaks and "- " bullets. */
function Rich({ text }: { text: string }) {
  const lines = text.split("\n");
  const inline = (s: string): ReactNode[] =>
    s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
  return (
    <>
      {lines.map((l, i) =>
        /^\s*[-•*]\s+/.test(l) ? (
          <span key={i} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sun-400" />
            <span>{inline(l.replace(/^\s*[-•*]\s+/, ""))}</span>
          </span>
        ) : (
          <span key={i} className="block min-h-[0.5em]">
            {inline(l)}
          </span>
        ),
      )}
    </>
  );
}

export function MitraAvatar({ className }: { className?: string }) {
  return (
    <span className={cn("relative grid place-items-center rounded-full bg-gradient-to-br from-sun-300 via-sun-500 to-leaf-500 text-ink-950", className)}>
      <Sparkles className="h-1/2 w-1/2" />
    </span>
  );
}

export function ChatPanel() {
  const { t, lang } = useLang();
  const { chatOpen, closeChat, chatPrefill, consumePrefill } = useActions();
  const [messages, setMessages] = useState<ChatMsg[]>(() => {
    try {
      return JSON.parse(sessionStorage.getItem(STORE) || "[]");
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sessionStorage.setItem(STORE, JSON.stringify(messages.slice(-30)));
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = useCallback(
    async (text: string) => {
      const q = text.trim().slice(0, 600);
      if (!q || busy) return;
      const next: ChatMsg[] = [...messages, { role: "user", content: q }];
      setMessages(next);
      setInput("");
      setBusy(true);
      const { reply } = await askAssistant(next, lang);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      setBusy(false);
    },
    [messages, busy, lang],
  );

  // a prefilled question (e.g. from a page button)
  useEffect(() => {
    if (chatOpen && chatPrefill) {
      consumePrefill();
      void send(chatPrefill);
    }
  }, [chatOpen, chatPrefill, consumePrefill, send]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const userQs = messages.filter((m) => m.role === "user").slice(-3).map((m) => `- ${m.content}`);
  const handoff = waLink(
    userQs.length
      ? `Hello Mathur Enterprises, I was chatting with Mathur Mitra on your website.\nMy questions:\n${userQs.join("\n")}`
      : "Hello Mathur Enterprises, I have a question.",
  );

  return (
    <Sheet
      open={chatOpen}
      onClose={closeChat}
      desktop="corner"
      label={t(C.name)}
      header={
        <div className="flex items-center gap-3">
          <MitraAvatar className="h-10 w-10" />
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-display font-bold">
              {t(C.name)} <span className="rounded-full bg-sun-400/15 px-1.5 py-0.5 text-[10px] font-bold text-sun-300">AI</span>
            </p>
            <p className="flex items-center gap-1.5 text-xs text-white/50">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf-400" />
              {t(C.role)}
            </p>
          </div>
          {messages.length > 0 && (
            <button onClick={() => setMessages([])} className="ml-auto flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-white/50 hover:bg-white/5 hover:text-white" aria-label={t(C.reset)}>
              <RotateCcw className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{t(C.reset)}</span>
            </button>
          )}
        </div>
      }
    >
      <div ref={listRef} className="h-[60svh] min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4 md:h-auto">
        {/* greeting */}
        <Bubble role="assistant">
          <Rich text={t(C.greeting)} />
        </Bubble>

        {messages.length === 0 && (
          <motion.div initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }} className="flex flex-wrap gap-2 pl-10">
            {C.quick.map((q) => (
              <motion.button
                key={q.en}
                variants={{ h: { opacity: 0, y: 8 }, s: { opacity: 1, y: 0 } }}
                onClick={() => send(t(q))}
                className="rounded-full border border-sun-400/30 bg-sun-400/[0.07] px-3 py-1.5 text-left text-xs font-medium text-sun-300 transition hover:bg-sun-400/15"
              >
                {t(q)}
              </motion.button>
            ))}
          </motion.div>
        )}

        {messages.map((m, i) => (
          <Bubble key={i} role={m.role}>
            {m.role === "assistant" ? <Rich text={m.content} /> : m.content}
          </Bubble>
        ))}

        <AnimatePresence>
          {busy && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-end gap-2">
              <MitraAvatar className="h-8 w-8 shrink-0" />
              <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3.5">
                {[0, 1, 2].map((d) => (
                  <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-white/60" animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 0.9, delay: d * 0.15 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="shrink-0 border-t border-white/5 px-4 pb-4 pt-3">
        <a href={handoff} target="_blank" rel="noreferrer" className="mb-3 flex items-center justify-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 py-2 text-xs font-semibold text-[#5be38f] transition hover:bg-[#25D366]/20">
          <WhatsAppIcon className="h-3.5 w-3.5" /> {t(C.handoff)}
        </a>
        <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] p-1.5 pl-4 focus-within:border-sun-400/50">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t(C.placeholder)}
            maxLength={600}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/35"
            aria-label={t(C.placeholder)}
          />
          <button type="submit" disabled={!input.trim() || busy} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sun-400 to-sun-500 text-ink-950 transition disabled:opacity-40" aria-label="Send">
            <SendHorizontal className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-2 text-center text-[10px] text-white/30">{t(C.disclaimer)}</p>
      </div>
    </Sheet>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: ReactNode }) {
  const mine = role === "user";
  return (
    <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25 }} className={cn("flex items-end gap-2", mine && "justify-end")}>
      {!mine && <MitraAvatar className="h-8 w-8 shrink-0" />}
      <div
        className={cn(
          "max-w-[82%] space-y-0.5 px-4 py-2.5 text-[14px] leading-relaxed",
          mine ? "rounded-2xl rounded-br-md bg-gradient-to-br from-sun-400 to-sun-500 font-medium text-ink-950" : "rounded-2xl rounded-bl-md bg-white/[0.06] text-white/85",
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
