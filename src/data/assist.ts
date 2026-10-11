import type { L } from "../lib/i18n";
import type { VerticalKey } from "./content";

/* ------------------------------ Top ticker ------------------------------ */
export const ticker: L[] = [
  { en: "PM Surya Ghar: central subsidy up to ₹78,000 on rooftop solar", hi: "पीएम सूर्य घर: रूफटॉप सोलर पर ₹78,000 तक केंद्रीय सब्सिडी" },
  { en: "Free solar site survey across Kumaon & Terai", hi: "कुमाऊँ और तराई में मुफ़्त सोलर साइट सर्वे" },
  { en: "Rajhans e-rickshaw: easy finance, Haldwani & Kichha", hi: "राजहंस ई-रिक्शा: आसान फ़ाइनेंस, हल्द्वानी और किच्छा" },
  { en: "Okaya dealer enquiries open", hi: "ओकाया डीलरशिप के लिए संपर्क करें" },
];

/* ------------------------------ Hero switcher ------------------------------ */
export const heroSlides: Record<VerticalKey, { word: L; line: L; cta: L; image: string; stat: L }> = {
  solar: {
    word: { en: "homes", hi: "घरों" },
    line: {
      en: "Rooftop solar with full PM Surya Ghar subsidy support, from free survey to net-meter.",
      hi: "पीएम सूर्य घर सब्सिडी की पूरी मदद के साथ रूफटॉप सोलर, मुफ़्त सर्वे से नेट-मीटर तक।",
    },
    cta: { en: "Book free site survey", hi: "मुफ़्त साइट सर्वे बुक करें" },
    image: "solar-haldwani-3",
    stat: { en: "15+ towns on our solar map", hi: "15+ शहरों में हमारा सोलर" },
  },
  rajhans: {
    word: { en: "rides", hi: "सफ़र" },
    line: {
      en: "Authorised RAJHANSev e-rickshaws & e-scooties in Haldwani and Kichha, with finance and service.",
      hi: "हल्द्वानी और किच्छा में अधिकृत RAJHANSev ई-रिक्शा और ई-स्कूटी, फ़ाइनेंस और सर्विस के साथ।",
    },
    cta: { en: "Book a test ride", hi: "टेस्ट राइड बुक करें" },
    image: "ev-delivery-1",
    stat: { en: "10 RAJHANSev models", hi: "10 RAJHANSev मॉडल" },
  },
  okaya: {
    word: { en: "every moment", hi: "हर पल" },
    line: {
      en: "Authorised Okaya distributor: inverters, inverter & solar batteries and e-rickshaw batteries.",
      hi: "अधिकृत ओकाया डिस्ट्रीब्यूटर: इन्वर्टर, इन्वर्टर और सोलर बैटरी, और ई-रिक्शा बैटरी।",
    },
    cta: { en: "Get a quote", hi: "कोटेशन लें" },
    image: "ev-battery-handover",
    stat: { en: "Genuine stock with warranty", hi: "वारंटी के साथ असली स्टॉक" },
  },
};

export const heroText = {
  eyebrow: { en: "Haldwani · Since 2015", hi: "हल्द्वानी · 2015 से" },
  powering: { en: "Powering", hi: "को ऊर्जा," },
  across: { en: "across Uttarakhand.", hi: "पूरे उत्तराखंड में।" },
  explore: { en: "Explore", hi: "देखें" },
  facts: [
    { en: "Since 2015", hi: "2015 से" },
    { en: "7+ branches", hi: "7+ शाखाएँ" },
    { en: "20+ team", hi: "20+ टीम" },
  ] as L[],
};

/* ------------------------------ Dock ------------------------------ */
export const dock = {
  call: { en: "Call", hi: "कॉल" },
  whatsapp: { en: "WhatsApp", hi: "WhatsApp" },
  ai: { en: "Ask AI", hi: "AI से पूछें" },
  primary: {
    default: { en: "Quick enquiry", hi: "झटपट पूछताछ" },
    solar: { en: "Free site survey", hi: "मुफ़्त साइट सर्वे" },
    rajhans: { en: "Book test ride", hi: "टेस्ट राइड बुक करें" },
    okaya: { en: "Get a quote", hi: "कोटेशन लें" },
  },
};

/* ------------------------------ Enquiry builder ------------------------------ */
export const enquiry = {
  title: { en: "Quick enquiry", hi: "झटपट पूछताछ" },
  sub: { en: "3 taps. We'll reply on WhatsApp.", hi: "3 टैप। जवाब WhatsApp पर मिलेगा।" },
  step1: { en: "What are you looking for?", hi: "आपको क्या चाहिए?" },
  step2: { en: "What do you need?", hi: "किस चीज़ की ज़रूरत है?" },
  when: { en: "When?", hi: "कब?" },
  step3: { en: "Where are you?", hi: "आप कहाँ से हैं?" },
  town: { en: "Town / village", hi: "शहर / गाँव" },
  name: { en: "Your name (optional)", hi: "आपका नाम (वैकल्पिक)" },
  next: { en: "Next", hi: "आगे" },
  back: { en: "Back", hi: "पीछे" },
  send: { en: "Send on WhatsApp", hi: "WhatsApp पर भेजें" },
  preview: { en: "Your message", hi: "आपका मैसेज" },
  needs: {
    solar: [
      { en: "Free site survey", hi: "मुफ़्त साइट सर्वे" },
      { en: "Subsidy help", hi: "सब्सिडी में मदद" },
      { en: "Hybrid with battery", hi: "बैटरी के साथ हाइब्रिड" },
      { en: "Commercial solar", hi: "कमर्शियल सोलर" },
      { en: "Service & cleaning", hi: "सर्विस और सफ़ाई" },
    ],
    rajhans: [
      { en: "Test ride", hi: "टेस्ट राइड" },
      { en: "E-rickshaw finance", hi: "ई-रिक्शा फ़ाइनेंस" },
      { en: "Cargo / loader", hi: "कार्गो / लोडर" },
      { en: "E-scooty", hi: "ई-स्कूटी" },
      { en: "Service", hi: "सर्विस" },
    ],
    okaya: [
      { en: "Inverter + battery", hi: "इन्वर्टर + बैटरी" },
      { en: "Solar battery", hi: "सोलर बैटरी" },
      { en: "E-rickshaw battery", hi: "ई-रिक्शा बैटरी" },
      { en: "Become a dealer", hi: "डीलर बनना है" },
      { en: "Warranty claim", hi: "वारंटी क्लेम" },
    ],
  } as Record<VerticalKey, L[]>,
  whenOptions: [
    { en: "Today", hi: "आज" },
    { en: "Tomorrow", hi: "कल" },
    { en: "This week", hi: "इस हफ़्ते" },
    { en: "Just enquiring", hi: "बस जानकारी चाहिए" },
  ] as L[],
  towns: ["Haldwani", "Kashipur", "Lalkuan", "Rudrapur", "Pantnagar", "Halduchaur", "Kichha", "Bareilly"],
};

/* ------------------------------ AI chat ------------------------------ */
export const chat = {
  name: { en: "Mathur Mitra", hi: "माथुर मित्र" },
  role: { en: "AI assistant · replies instantly", hi: "AI सहायक · तुरंत जवाब" },
  greeting: {
    en: "Namaste! I'm **Mathur Mitra**, the AI assistant of Mathur Enterprises. Ask me about rooftop solar & subsidy, Rajhans e-rickshaws, or Okaya inverters & batteries.",
    hi: "नमस्ते! मैं **माथुर मित्र** हूँ, माथुर एंटरप्राइजेज़ का AI सहायक। रूफटॉप सोलर और सब्सिडी, राजहंस ई-रिक्शा या ओकाया इन्वर्टर-बैटरी के बारे में कुछ भी पूछें।",
  },
  placeholder: { en: "Type your question…", hi: "अपना सवाल लिखें…" },
  handoff: { en: "Continue with our team on WhatsApp", hi: "WhatsApp पर टीम से बात करें" },
  disclaimer: { en: "AI can make mistakes. Please confirm details with our team.", hi: "AI से गलती हो सकती है। कृपया जानकारी टीम से कन्फ़र्म करें।" },
  reset: { en: "New chat", hi: "नई चैट" },
  quick: [
    { en: "How much subsidy will I get?", hi: "मुझे कितनी सब्सिडी मिलेगी?" },
    { en: "Which system for 300 units a month?", hi: "300 यूनिट/महीने के लिए कौन सा सिस्टम?" },
    { en: "Is e-rickshaw finance available?", hi: "क्या ई-रिक्शा पर फ़ाइनेंस मिलेगा?" },
    { en: "Where is your nearest branch?", hi: "नज़दीकी शाखा कहाँ है?" },
    { en: "How do I become an Okaya dealer?", hi: "ओकाया डीलर कैसे बनें?" },
  ] as L[],
};
