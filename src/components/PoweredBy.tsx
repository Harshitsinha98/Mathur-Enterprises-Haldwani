import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

const BRAND = "INFISKIES";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=<>/";

/** Hover "decode" effect: letters scramble, then lock in left to right. */
function useScramble(target: string) {
  const [text, setText] = useState(target);
  const timer = useRef<number | null>(null);

  const run = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame++;
      const locked = Math.floor(frame / 2);
      setText(
        target
          .split("")
          .map((c, i) => (i < locked ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (locked >= target.length && timer.current) {
        window.clearInterval(timer.current);
        timer.current = null;
      }
    }, 40);
  }, [target]);

  useEffect(
    () => () => {
      if (timer.current) window.clearInterval(timer.current);
    },
    [],
  );

  return [text, run] as const;
}

/** Infiskies infinity path (figure-eight crossing at the centre). */
const INFINITY =
  "M50 25 C42 14 32 8 22 8 C12 8 6 16 6 25 C6 34 12 42 22 42 C32 42 42 36 50 25 C58 14 68 8 78 8 C88 8 94 16 94 25 C94 34 88 42 78 42 C68 42 58 36 50 25 Z";

/** Animated Infiskies mark: stroke draws in, fill breathes, a comet of light loops the path. */
function InfiskiesMark() {
  return (
    <svg viewBox="0 0 100 50" aria-hidden className="ifx-mark h-[1.5em] w-[3em] shrink-0 overflow-visible">
      <defs>
        <linearGradient id="ifx-fill" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffd54a" />
          <stop offset="50%" stopColor="#4fd97a" />
          <stop offset="100%" stopColor="#ffd54a" />
        </linearGradient>
      </defs>
      <path className="ifx-mark-fill" d={INFINITY} fill="url(#ifx-fill)" />
      <motion.path
        d={INFINITY}
        fill="none"
        stroke="#030a1c"
        strokeWidth={7}
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
      <path className="ifx-mark-comet" d={INFINITY} pathLength={100} fill="none" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}

/**
 * "Powered by Infiskies" credit for the footer: animated infinity mark,
 * per-letter colour wave and a hover "decode" scramble. Links to infiskies.com.
 */
export function PoweredBy({ className }: { className?: string }) {
  const [text, scramble] = useScramble(BRAND);
  return (
    <a
      href="https://infiskies.com"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={scramble}
      onFocus={scramble}
      className={cn(
        "ifx group inline-flex w-fit items-center gap-1.5 whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.26em]",
        className,
      )}
      aria-label="Powered by Infiskies"
    >
      <span aria-hidden className="text-white/40 transition-colors duration-300 group-hover:text-white/70">
        Powered by
      </span>
      <InfiskiesMark />
      <span aria-hidden className="ifx-word relative inline-flex font-bold">
        {text.split("").map((c, i) => (
          <span key={i} className="ifx-letter" style={{ animationDelay: `${i * 0.11}s` }}>
            {c}
          </span>
        ))}
        <span className="ifx-underline" />
      </span>
    </a>
  );
}
