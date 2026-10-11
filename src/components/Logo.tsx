import { motion } from "framer-motion";
import { cn } from "../lib/utils";

/**
 * Vector recreation of the Mathur Enterprises "ME" mark from the brand poster:
 * a rising sun with rays above a bold M + E, cut by a green swoosh.
 */
export function LogoMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  const rays = Array.from({ length: 9 }, (_, i) => -80 + i * 20);
  return (
    <svg viewBox="0 0 120 92" className={cn("h-10 w-auto", className)} aria-hidden="true">
      <defs>
        <linearGradient id="me-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD54A" />
          <stop offset="1" stopColor="#F28C00" />
        </linearGradient>
        <linearGradient id="me-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2457C5" />
          <stop offset="1" stopColor="#0A2A7A" />
        </linearGradient>
        <linearGradient id="me-leaf" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#17803A" />
          <stop offset="1" stopColor="#4FD97A" />
        </linearGradient>
      </defs>

      {/* sun + rays */}
      <motion.g
        style={{ originX: "70px", originY: "30px" }}
        animate={animated ? { rotate: [0, 6, 0, -6, 0] } : undefined}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        {rays.map((deg, i) => (
          <motion.rect
            key={deg}
            x="68.5"
            y="2"
            width="3"
            height="9"
            rx="1.5"
            fill="url(#me-sun)"
            transform={`rotate(${deg} 70 30)`}
            initial={animated ? { opacity: 0, scaleY: 0 } : false}
            animate={animated ? { opacity: 1, scaleY: 1 } : undefined}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
            style={{ originX: "70px", originY: "11px" }}
          />
        ))}
      </motion.g>
      <path d="M54 32a16 16 0 0 1 32 0z" fill="url(#me-sun)" />

      {/* M */}
      <path d="M4 86V34h14l15 24 15-24h14v52H48V58L33 80 18 58v28z" fill="url(#me-blue)" />
      {/* E */}
      <path d="M68 34h44v12H82v8h26v12H82v8h30v12H68z" fill="url(#me-blue)" />
      {/* swoosh */}
      <motion.path
        d="M14 80C46 76 82 60 116 30 100 56 66 80 22 88z"
        fill="url(#me-leaf)"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="grid place-items-center rounded-xl bg-white px-1.5 py-1 shadow-[0_0_24px_-6px_rgba(255,194,26,0.6)]">
        <LogoMark className="h-7" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-logo text-[15px] font-black tracking-wide text-white">MATHUR</span>
          <span className="block font-logo text-[9.5px] font-extrabold tracking-[0.32em] text-leaf-400">ENTERPRISES</span>
        </span>
      )}
    </span>
  );
}
