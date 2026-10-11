import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../lib/utils";

export function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [breakpoint]);
  return mobile;
}

/**
 * Mobile: draggable bottom sheet. Desktop: either a centered dialog or a panel
 * docked to the bottom-right corner (used by the chat).
 */
export function Sheet({
  open,
  onClose,
  children,
  label,
  desktop = "center",
  className,
  header,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  desktop?: "center" | "corner";
  className?: string;
  header?: ReactNode;
}) {
  const mobile = useIsMobile();
  const drag = useDragControls();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    if (mobile || desktop === "center") document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, mobile, desktop]);

  const corner = !mobile && desktop === "corner";

  return (
    <AnimatePresence>
      {open && (
        <>
          {!corner && (
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[80] bg-ink-950/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal={!corner}
            aria-label={label}
            className={cn(
              "fixed z-[90] flex flex-col overflow-hidden border border-white/10 bg-ink-900/95 shadow-2xl shadow-black/60 backdrop-blur-2xl",
              mobile
                ? "inset-x-0 bottom-0 max-h-[92svh] rounded-t-[28px] pb-[env(safe-area-inset-bottom)]"
                : corner
                  ? "bottom-[11.5rem] right-7 h-[min(600px,calc(100svh-15rem))] w-[400px] rounded-[28px]"
                  : "left-1/2 top-1/2 max-h-[86svh] w-[min(560px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-[28px]",
              className,
            )}
            initial={mobile ? { y: "100%" } : corner ? { opacity: 0, y: 24, scale: 0.94 } : { opacity: 0, scale: 0.94 }}
            animate={mobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={mobile ? { y: "100%" } : corner ? { opacity: 0, y: 24, scale: 0.94 } : { opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            style={corner ? { transformOrigin: "bottom right" } : undefined}
            drag={mobile ? "y" : false}
            dragControls={drag}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
          >
            {/* drag handle + header */}
            <div className="shrink-0 touch-none" onPointerDown={(e) => mobile && drag.start(e)}>
              {mobile && <div className="mx-auto mt-2.5 h-1.5 w-11 rounded-full bg-white/20" />}
              <div className="flex items-center gap-3 px-5 pb-3 pt-4">
                <div className="min-w-0 flex-1">{header}</div>
                <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
