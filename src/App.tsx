import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { ActionDock, FloatingActions } from "./components/ActionDock";
import { ActionsProvider } from "./components/ActionsProvider";
import { ChatPanel } from "./components/ChatPanel";
import { Footer, ScrollProgress } from "./components/Chrome";
import { EnquirySheet } from "./components/EnquirySheet";
import { Navbar } from "./components/Navbar";
import { LangProvider, useLang } from "./lib/i18n";
import Home from "./pages/Home";
import { routeMeta } from "./data/seo";

const Solar = lazy(() => import("./pages/Solar"));
const RajhansEV = lazy(() => import("./pages/RajhansEV"));
const Okaya = lazy(() => import("./pages/Okaya"));
const Team = lazy(() => import("./pages/Team"));
const Story = lazy(() => import("./pages/Story"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Terms })));

/** Keep <title>, description, canonical and OG tags in sync with the route. */
function applyMeta(path: string) {
  const m = routeMeta[path];
  document.title = m?.title ?? routeMeta["/"].title;
  const set = (sel: string, attr: string, val: string, create: () => HTMLElement) => {
    let el = document.head.querySelector(sel);
    if (!el) {
      el = create();
      document.head.appendChild(el);
    }
    el.setAttribute(attr, val);
  };
  const meta = (key: string, prop = false) => () => {
    const e = document.createElement("meta");
    e.setAttribute(prop ? "property" : "name", key);
    return e;
  };
  const url = window.location.origin + (path === "/" ? "/" : path);
  if (m) {
    set('meta[name="description"]', "content", m.description, meta("description"));
    set('meta[property="og:title"]', "content", m.title, meta("og:title", true));
    set('meta[property="og:description"]', "content", m.description, meta("og:description", true));
  }
  set('meta[property="og:url"]', "content", url, meta("og:url", true));
  set('link[rel="canonical"]', "href", url, () => Object.assign(document.createElement("link"), { rel: "canonical" }));
  set('meta[name="robots"]', "content", m ? "index, follow" : "noindex", meta("robots"));
}

function NotFound() {
  const { lang } = useLang();
  return (
    <section className="container-x grid min-h-[70vh] place-items-center pt-32 text-center">
      <div>
        <p className="font-display text-8xl font-bold text-gradient-sun">404</p>
        <p className="mt-4 text-white/60">{lang === "hi" ? "यह पेज नहीं मिला।" : "This page could not be found."}</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-sun-400 px-6 py-3 font-semibold text-ink-950">
          {lang === "hi" ? "होम पर जाएँ" : "Back home"}
        </Link>
      </div>
    </section>
  );
}

function Loader() {
  return (
    <div className="grid min-h-svh place-items-center">
      <motion.div className="h-12 w-12 rounded-full border-2 border-sun-400 border-t-transparent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }} />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    applyMeta(location.pathname);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<Loader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/solar" element={<Solar />} />
            <Route path="/rajhans-ev" element={<RajhansEV />} />
            <Route path="/okaya" element={<Okaya />} />
            <Route path="/story" element={<Story />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ActionsProvider>
            <ScrollProgress />
            <Navbar />
            <AnimatedRoutes />
            <Footer />
            {/* room for the mobile dock */}
            <div aria-hidden className="h-[calc(88px+env(safe-area-inset-bottom))] bg-ink-950 md:hidden" />
            <FloatingActions />
            <ActionDock />
            <ChatPanel />
            <EnquirySheet />
          </ActionsProvider>
        </BrowserRouter>
      </MotionConfig>
    </LangProvider>
  );
}
