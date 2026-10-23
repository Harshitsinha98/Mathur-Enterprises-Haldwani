import { motion } from "framer-motion";
import { Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Certifications } from "../components/Certifications";
import { WhatsAppIcon } from "../components/Chrome";
import { Img } from "../components/Img";
import { Reveal, SectionHeading, SpotlightCard } from "../components/motion";
import { Particles } from "../components/Particles";
import { accent } from "../components/sections";
import { WordReveal } from "../components/motion";
import { branches, brand, ui, verticals, type VerticalKey } from "../data/content";
import { useLang } from "../lib/i18n";
import { EMAIL, MAPS_LINK, PHONE, PHONE2, cn, mailLink, tel2Link, telLink, waLink } from "../lib/utils";

export default function Contact() {
  const { t, lang } = useLang();
  const [name, setName] = useState("");
  const [town, setTown] = useState("");
  const [interest, setInterest] = useState<VerticalKey>("solar");
  const [msg, setMsg] = useState("");

  const L = (en: string, hi: string) => (lang === "hi" ? hi : en);

  function submit(e: FormEvent) {
    e.preventDefault();
    const v = verticals.find((x) => x.key === interest)!;
    const text = `Hello Mathur Enterprises,\nName: ${name}\nTown: ${town}\nInterested in: ${v.name.en}\n${msg}`;
    window.open(waLink(text), "_blank", "noopener");
  }

  const input = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-sun-400/60 focus:bg-white/[0.07]";

  return (
    <>
      <section className="noise relative overflow-hidden pb-10 pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,#12307a_0%,#030a1c_70%)]" />
        <Particles density={0.00005} />
        <div className="container-x relative text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sun-400">{t(ui.nav.contact)}</span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
            <WordReveal text={L("Let's power your tomorrow.", "आइए, आपके कल को ऊर्जा दें।")} />
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-white/65">
            {L("Call, WhatsApp or drop by any of our branches. We usually reply within minutes.", "कॉल करें, WhatsApp करें या किसी भी शाखा पर आएँ। हम आमतौर पर कुछ ही मिनटों में जवाब देते हैं।")}
          </p>
        </div>
      </section>

      <section className="container-x grid gap-6 py-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-4">
          <Reveal>
            <SpotlightCard className="p-6">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sun-400 text-ink-950"><Phone /></span>
                <div className="min-w-0">
                  <p className="text-sm text-white/55">{t(ui.cta.call)}</p>
                  <a href={telLink} className="block font-display text-2xl font-bold hover:text-sun-300">{PHONE}</a>
                  <a href={tel2Link} className="block font-display text-lg font-semibold text-white/75 hover:text-sun-300">{PHONE2}</a>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.08}>
            <a href={waLink()} target="_blank" rel="noreferrer" className="block">
              <SpotlightCard glow="rgba(37,211,102,0.2)" className="p-6">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#25D366] text-white"><WhatsAppIcon className="h-7 w-7" /></span>
                  <div>
                    <p className="text-sm text-white/55">WhatsApp</p>
                    <p className="font-display text-2xl font-bold">{PHONE}</p>
                  </div>
                </div>
              </SpotlightCard>
            </a>
          </Reveal>
          <Reveal delay={0.12}>
            <a href={mailLink} className="block">
              <SpotlightCard className="p-6">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-sun-300"><Mail /></span>
                  <div className="min-w-0">
                    <p className="text-sm text-white/55">Email</p>
                    <p className="break-all font-display text-lg font-bold sm:text-xl">{EMAIL}</p>
                  </div>
                </div>
              </SpotlightCard>
            </a>
          </Reveal>
          <Reveal delay={0.16}>
            <SpotlightCard className="overflow-hidden">
              <div className="relative h-48">
                <Img id="store-haldwani" alt="Haldwani Solar House storefront" sizes="(max-width: 1024px) 100vw, 40vw" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
              </div>
              <div className="p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-sun-300"><MapPin className="h-4 w-4" /> {L("Head office", "मुख्य कार्यालय")}</p>
                <p className="mt-2 text-white/80">{t(brand.address)}</p>
                <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-sun-300">
                  <Navigation className="h-4 w-4" /> {t(ui.cta.directions)}
                </a>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="glass h-full rounded-[2rem] p-6 sm:p-10">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{L("Send an enquiry", "पूछताछ भेजें")}</h2>
            <p className="mt-2 text-sm text-white/55">{L("This opens WhatsApp with your message ready to send.", "इससे WhatsApp आपके मैसेज के साथ खुल जाएगा।")}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={L("Your name", "आपका नाम")} className={input} />
              <input required value={town} onChange={(e) => setTown(e.target.value)} placeholder={L("Town / City", "शहर / कस्बा")} className={input} />
            </div>
            <p className="mt-6 text-sm text-white/60">{L("I'm interested in", "मेरी रुचि है")}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {verticals.map((v) => (
                <button
                  type="button"
                  key={v.key}
                  onClick={() => setInterest(v.key)}
                  className={cn(
                    "relative rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
                    interest === v.key ? "border-transparent text-ink-950" : "border-white/10 bg-white/[0.03] text-white/75 hover:border-white/25",
                  )}
                >
                  {interest === v.key && <motion.span layoutId="interest" className={cn("absolute inset-0 rounded-xl bg-gradient-to-r", accent[v.key].grad)} />}
                  <span className="relative">{t(v.name)}</span>
                </button>
              ))}
            </div>
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} placeholder={L("Message (optional)", "संदेश (वैकल्पिक)")} className={cn(input, "mt-6 resize-none")} />
            <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sun-400 to-sun-500 py-4 font-semibold text-ink-950 transition hover:scale-[1.01]">
              <Send className="h-4 w-4" /> {L("Send on WhatsApp", "WhatsApp पर भेजें")}
            </button>
          </form>
        </Reveal>
      </section>

      <Certifications />

      <section className="container-x py-24">
        <SectionHeading eyebrow={L("Branches", "शाखाएँ")} title={L("Find us across Kumaon & Terai", "कुमाऊँ और तराई में हमें खोजें")} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((b, i) => (
            <Reveal key={b.name.en} delay={i * 0.05}>
              <SpotlightCard className={cn("h-full", b.hq && "ring-1 ring-sun-400/40")}>
                {b.image && (
                  <div className="h-40 overflow-hidden">
                    <Img id={b.image} alt={b.name.en} sizes="(max-width: 640px) 100vw, 33vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-6">
                  {b.hq && <span className="mb-2 inline-block rounded-full bg-sun-400 px-2.5 py-0.5 text-[11px] font-bold text-ink-950">HQ</span>}
                  <h3 className="font-display text-xl font-bold">{t(b.name)}</h3>
                  <p className="mt-1 text-sm text-white/60">{t(b.area)}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {b.tags.map((tag) => {
                      const v = verticals.find((x) => x.key === tag)!;
                      return (
                        <span key={tag} className={cn("rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-semibold ring-1 ring-white/10", accent[tag].text)}>
                          {t(v.name)}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <iframe
              title="Mathur Enterprises, Haldwani"
              src="https://www.google.com/maps?q=29.194305,79.510599&z=15&output=embed"
              className="h-[420px] w-full grayscale-[60%] invert-[90%] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
