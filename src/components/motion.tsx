import { animate, motion, useInView, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "../lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container + item pair. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
export const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/** Splits text into words that slide up one after another. */
export function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-flex flex-wrap justify-center gap-x-[0.25em]", className)} aria-label={text}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="overflow-hidden pb-[0.12em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Animated number that counts up when visible. */
export function Counter({ to, suffix = "", plain = false, className }: { to: number; suffix?: string; plain?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(plain ? to - 11 : 0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(plain ? to - 11 : 0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, plain]);
  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}

/** Card with a mouse-following spotlight and a subtle 3D tilt (21st.dev style). */
export function SpotlightCard({
  children,
  className,
  glow = "rgba(255,194,26,0.18)",
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const bg = useTransform([mx, my], ([x, y]) => `radial-gradient(420px circle at ${x}px ${y}px, ${glow}, transparent 70%)`);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x);
    my.set(y);
    if (tilt) {
      ry.set(((x / r.width) - 0.5) * 8);
      rx.set(-((y / r.height) - 0.5) * 8);
    }
  }
  function onLeave() {
    mx.set(-400);
    my.set(-400);
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02]",
        className,
      )}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-0 transition-opacity" style={{ background: bg }} />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

/** Infinite horizontal marquee. */
export function Marquee({ children, duration = 40, className, reverse = false }: { children: ReactNode; duration?: number; className?: string; reverse?: boolean }) {
  return (
    <div className={cn("group relative flex overflow-hidden mask-fade-x", className)}>
      <div
        className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

/** Small section heading block. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  accent = "sun",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  accent?: "sun" | "leaf" | "raj";
}) {
  const dot = { sun: "bg-sun-400", leaf: "bg-leaf-400", raj: "bg-raj-400" }[accent];
  return (
    <Reveal className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "")}>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
        <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">{title}</h2>
      {body && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{body}</p>}
    </Reveal>
  );
}
