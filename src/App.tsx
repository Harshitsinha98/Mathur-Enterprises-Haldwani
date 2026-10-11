import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { Footer, ScrollProgress, WhatsAppFab } from "./components/Chrome";
import { Navbar } from "./components/Navbar";
import { LangProvider, useLang } from "./lib/i18n";
import Home from "./pages/Home";

const Solar = lazy(() => import("./pages/Solar"));
const RajhansEV = lazy(() => import("./pages/RajhansEV"));
const Okaya = lazy(() => import("./pages/Okaya"));
const Team = lazy(() => import("./pages/Team"));
const Contact = lazy(() => import("./pages/Contact"));

const titles: Record<string, string> = {
  "/": "Mathur Enterprises, Haldwani | Solar · Rajhans EV · Okaya",
  "/solar": "Rooftop Solar & PM Surya Ghar | Mathur Enterprises",
  "/rajhans-ev": "Rajhans E-Rickshaw Haldwani & Kichha | Mathur Enterprises",
  "/okaya": "Okaya Inverter & Battery Distributor | Mathur Enterprises",
  "/team": "Our Team | Mathur Enterprises",
  "/contact": "Contact | Mathur Enterprises, Haldwani",
};

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
    document.title = titles[location.pathname] ?? titles["/"];
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
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
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
          <ScrollProgress />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <WhatsAppFab />
        </BrowserRouter>
      </MotionConfig>
    </LangProvider>
  );
}
