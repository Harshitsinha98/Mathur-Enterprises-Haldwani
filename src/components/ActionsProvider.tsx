import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import type { VerticalKey } from "../data/content";

type Ctx = {
  chatOpen: boolean;
  openChat: (prefill?: string) => void;
  closeChat: () => void;
  chatPrefill: string | null;
  consumePrefill: () => void;
  enquiry: { open: boolean; business: VerticalKey | null };
  openEnquiry: (business?: VerticalKey | null) => void;
  closeEnquiry: () => void;
  /** Business inferred from the current route. */
  routeBusiness: VerticalKey | null;
};

const ActionsContext = createContext<Ctx | null>(null);

export function businessFromPath(path: string): VerticalKey | null {
  if (path.startsWith("/solar")) return "solar";
  if (path.startsWith("/rajhans")) return "rajhans";
  if (path.startsWith("/okaya")) return "okaya";
  return null;
}

export function ActionsProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const routeBusiness = businessFromPath(pathname);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPrefill, setChatPrefill] = useState<string | null>(null);
  const [enquiry, setEnquiry] = useState<{ open: boolean; business: VerticalKey | null }>({ open: false, business: null });

  const openChat = useCallback((prefill?: string) => {
    setEnquiry((e) => ({ ...e, open: false }));
    if (prefill) setChatPrefill(prefill);
    setChatOpen(true);
  }, []);
  const closeChat = useCallback(() => setChatOpen(false), []);
  const consumePrefill = useCallback(() => setChatPrefill(null), []);
  const openEnquiry = useCallback(
    (business?: VerticalKey | null) => {
      setChatOpen(false);
      setEnquiry({ open: true, business: business ?? routeBusiness });
    },
    [routeBusiness],
  );
  const closeEnquiry = useCallback(() => setEnquiry((e) => ({ ...e, open: false })), []);

  const value = useMemo(
    () => ({ chatOpen, openChat, closeChat, chatPrefill, consumePrefill, enquiry, openEnquiry, closeEnquiry, routeBusiness }),
    [chatOpen, openChat, closeChat, chatPrefill, consumePrefill, enquiry, openEnquiry, closeEnquiry, routeBusiness],
  );
  return <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>;
}

export function useActions() {
  const ctx = useContext(ActionsContext);
  if (!ctx) throw new Error("useActions must be used inside ActionsProvider");
  return ctx;
}
