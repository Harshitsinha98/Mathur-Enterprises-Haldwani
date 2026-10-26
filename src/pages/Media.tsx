import { Play, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { Gallery } from "../components/Gallery";
import { Reveal, SectionHeading } from "../components/motion";
import { CtaBand, PageHero } from "../components/sections";
import { moments } from "../data/content";
import { useLang } from "../lib/i18n";

const clips = [
  { id: "new-video-01", src: "/new/06cafa2d-3974-4f38-b0f0-8499bd37a570.mov", title: "Mathur Enterprises · Video 1" },
  { id: "new-video-02", src: "/new/4723a30e-de13-4a21-ab1b-a8c4b1655d3e.mov", title: "Mathur Enterprises · Video 2" },
  { id: "new-video-03", src: "/new/537869f2-d46a-455c-aad0-f44ecac5a6a2.mov", title: "Mathur Enterprises · Video 3" },
  { id: "new-video-04", src: "/new/74295156-90ac-42f6-829a-c1dacd420bc4.mov", title: "Mathur Enterprises · Video 4" },
  { id: "new-video-05", src: "/new/89316859-7a0a-46e3-b6b7-7618409cbe69.mov", title: "Mathur Enterprises · Video 5" },
];

export default function Media() {
  const { t, lang } = useLang();
  return (
    <>
      <PageHero eyebrow={lang === "hi" ? "हमारी झलकियाँ" : "Behind the moments"} title={lang === "hi" ? "Mathur Enterprises की असली कहानियाँ" : "Real moments from Mathur Enterprises"} sub={lang === "hi" ? "हमारे शोरूम, टीम, सोलर और EV सफ़र की तस्वीरें और वीडियो।" : "Photos and videos from our showroom, team, solar and EV journey."} image="new-001" tone="solar" />
      <section className="container-x py-20 sm:py-28">
        <SectionHeading eyebrow={lang === "hi" ? "नई तस्वीरें" : "New photographs"} title={lang === "hi" ? "हर फ़ोटो में एक कहानी" : "A story in every photo"} body={lang === "hi" ? "हमारी नई फ़ोटो कलेक्शन को खोलें और बड़ी तस्वीर देखने के लिए किसी भी फ़ोटो पर टैप करें।" : "Browse the new photo collection. Tap any image to open the full-size view."} />
        <div className="mt-12"><Gallery items={moments.filter((m) => m.id.startsWith("new-") && !m.id.startsWith("new-video-")).map((m) => ({ id: m.id, caption: t(m.caption) }))} /></div>
      </section>
      <section className="container-x py-10 sm:py-16">
        <SectionHeading eyebrow={lang === "hi" ? "वीडियो गैलरी" : "Video gallery"} title={lang === "hi" ? "Mathur Enterprises की झलकियाँ" : "A closer look at Mathur Enterprises"} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clips.map((clip, i) => (
            <Reveal key={clip.id} delay={i * 0.05}>
              <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-video overflow-hidden bg-black">
                  <video controls preload="metadata" playsInline className="h-full w-full object-contain" aria-label={clip.title}>
                    <source src={clip.src} type="video/quicktime" />
                    {lang === "hi" ? "आपका ब्राउज़र वीडियो नहीं चला सकता।" : "Your browser does not support this video."}
                  </video>
                  <span className="pointer-events-none absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white"><Play className="h-4 w-4" /></span>
                </div>
                <div className="p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun-300">0{i + 1} / {String(clips.length).padStart(2, "0")}</p><h3 className="mt-2 font-display text-lg font-bold">{clip.title}</h3></div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center"><Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-sun-300 hover:text-white">{lang === "hi" ? "होम पर वापस जाएँ" : "Back to home"} <Play className="h-4 w-4" /></Link></div>
      </section>
      <CtaBand />
    </>
  );
}
