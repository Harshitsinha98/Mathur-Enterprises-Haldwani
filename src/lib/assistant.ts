/**
 * Mathur Mitra: chat client.
 * Tries the AI endpoint (/api/chat on Vercel). If it is unavailable (no API key,
 * network error, local dev) it falls back to a built-in rule-based assistant, so the
 * chat never breaks.
 */
import { inr, recommendKw, totalSubsidy, UNITS_PER_KW_MONTH } from "./solar";
import { PHONE } from "./utils";

export type ChatMsg = { role: "user" | "assistant"; content: string };
type Lang = "en" | "hi";

const HINGLISH = /\b(kya|hai|hain|kitna|kitni|kitne|kaise|kaha|kahan|chahiye|milega|milegi|kab|batao|bataiye|mujhe|hum|ham|aap|ka|ki|ke|nahi|haan)\b/i;
const DEVANAGARI = /[\u0900-\u097F]/;

export function detectLang(text: string, fallback: Lang): Lang {
  if (DEVANAGARI.test(text)) return "hi";
  if (HINGLISH.test(text)) return "hi";
  return /[a-z]/i.test(text) ? "en" : fallback;
}

const has = (t: string, words: string[]) => words.some((w) => t.includes(w));

/** Rule-based answers used when the AI endpoint isn't reachable. */
export function localReply(input: string, uiLang: Lang): string {
  const lang = detectLang(input, uiLang);
  const t = input.toLowerCase();
  const L = (en: string, hi: string) => (lang === "hi" ? hi : en);
  const num = (() => {
    const m = t.match(/(\d+(?:\.\d+)?)/);
    return m ? Number(m[1]) : null;
  })();

  // kW given -> subsidy
  if (num !== null && /\bkw\b|kilowatt|किलोवाट/.test(t)) {
    const s = totalSubsidy(num);
    return L(
      `For a **${num} kW** on-grid rooftop system, the total PM Surya Ghar subsidy (central + state) is about **${inr(s)}**. It is credited directly to your bank account after net-metering. Our advisor can confirm the exact amount.`,
      `**${num} kW** ऑन-ग्रिड रूफटॉप सिस्टम पर पीएम सूर्य घर की कुल सब्सिडी (केंद्र + राज्य) लगभग **${inr(s)}** है। नेट-मीटरिंग के बाद यह सीधे आपके बैंक खाते में आती है। सटीक राशि हमारे सलाहकार बताएँगे।`,
    );
  }
  // units given -> recommendation
  if (num !== null && has(t, ["unit", "यूनिट", "bill", "बिल"])) {
    const units = num;
    const kw = recommendKw(units);
    return L(
      `With **${units} units/month**, a **${kw} kW** system is a good fit (1 kW makes roughly ${UNITS_PER_KW_MONTH} units a month here). The total subsidy would be about **${inr(totalSubsidy(kw))}**. Want a free site survey to confirm roof space?`,
      `**${units} यूनिट/महीने** के लिए लगभग **${kw} kW** सिस्टम सही रहेगा (यहाँ 1 kW से महीने में करीब ${UNITS_PER_KW_MONTH} यूनिट बनती हैं)। कुल सब्सिडी लगभग **${inr(totalSubsidy(kw))}** होगी। छत की जगह देखने के लिए मुफ़्त साइट सर्वे बुक करें?`,
    );
  }
  if (has(t, ["price", "rate", "cost", "kimat", "keemat", "daam", "कीमत", "दाम", "रेट", "kitne ka", "kitne ki", "quotation", "quote"])) {
    return L(
      `Prices depend on the model, size and site, so we share an exact quotation on WhatsApp or call: **${PHONE}**. Tell me what you need and I can prepare the details for our team.`,
      `कीमत मॉडल, साइज़ और साइट पर निर्भर करती है, इसलिए सटीक कोटेशन हम WhatsApp या कॉल पर देते हैं: **${PHONE}**। बताइए क्या चाहिए, मैं टीम के लिए जानकारी तैयार कर दूँगा।`,
    );
  }
  if (has(t, ["subsidy", "सब्सिडी", "surya ghar", "सूर्य घर", "yojana", "योजना"])) {
    return L(
      "Under **PM Surya Ghar Muft Bijli Yojana**, the total subsidy (central + state) goes up to **₹85,800** for a **3 kW or bigger** system. For example, about **₹33,000** for 1 kW and **₹66,000** for 2 kW. We handle registration, DISCOM approval, net-metering and the subsidy paperwork. Tell me your system size or monthly units and I'll estimate it.",
      "**पीएम सूर्य घर मुफ़्त बिजली योजना** में **3 kW या उससे बड़े** सिस्टम पर कुल सब्सिडी (केंद्र + राज्य) **₹85,800** तक है। जैसे 1 kW पर लगभग **₹33,000** और 2 kW पर **₹66,000**। रजिस्ट्रेशन, बिजली विभाग की मंज़ूरी, नेट-मीटरिंग और सब्सिडी की कागज़ी कार्यवाही हम करते हैं। अपना सिस्टम साइज़ या महीने की यूनिट बताइए, मैं अनुमान बता दूँगा।",
    );
  }
  if (has(t, ["finance", "emi", "loan", "फ़ाइनेंस", "फाइनेंस", "किस्त", "kisht", "down payment", "डाउन"])) {
    return L(
      "Yes, finance is available on **Rajhans e-rickshaws** through our finance partners, with low down-payment options. We also help with registration, RTO and insurance. Share your town on WhatsApp and our sales team will explain the plans.",
      "हाँ, **राजहंस ई-रिक्शा** पर हमारे फ़ाइनेंस पार्टनर्स के ज़रिए कम डाउन-पेमेंट के साथ फ़ाइनेंस मिलता है। रजिस्ट्रेशन, RTO और बीमा में भी हम मदद करते हैं। WhatsApp पर अपना शहर बताइए, सेल्स टीम प्लान समझा देगी।",
    );
  }
  if (has(t, ["dealer", "dealership", "डीलर", "distributor", "डिस्ट्रीब्यूटर"])) {
    return L(
      "We are the **authorised Okaya distributor** for the region. As a dealer you get genuine stock with warranty, fast local replenishment, claim support and marketing material. Send us your shop name and town on WhatsApp to start.",
      "हम इस क्षेत्र के **अधिकृत ओकाया डिस्ट्रीब्यूटर** हैं। डीलर बनने पर वारंटी के साथ असली स्टॉक, तेज़ लोकल सप्लाई, क्लेम सपोर्ट और मार्केटिंग सामग्री मिलती है। शुरू करने के लिए WhatsApp पर अपनी दुकान का नाम और शहर भेजें।",
    );
  }
  if (has(t, ["branch", "address", "location", "where", "kahan", "kaha", "kidhar", "शाखा", "पता", "कहाँ", "showroom", "शोरूम", "office"])) {
    return L(
      "Our **head office** is at 42, Rudrapur–Haldwani Road, Dahariya, Haldwani (opp. Shri Balaji Honda Showroom). We also have branches in **Kashipur, Lalkuan, Pantnagar, Halduchaur, Jay Nagar** and **Kichha** (Rajhans Auto). Which town are you in?",
      "हमारा **मुख्य कार्यालय** 42, रुद्रपुर–हल्द्वानी रोड, दहरिया, हल्द्वानी (श्री बालाजी होंडा शोरूम के सामने) में है। **काशीपुर, लालकुआँ, पंतनगर, हल्दूचौड़, जय नगर** और **किच्छा** (राजहंस ऑटो) में भी शाखाएँ हैं। आप किस शहर से हैं?",
    );
  }
  if (has(t, ["scooty", "scooter", "स्कूटी", "स्कूटर"])) {
    return L(
      "We have an **e-scooty showroom** at Dahariya, Haldwani: low running cost, great for students and daily rides. Book a test ride on WhatsApp.",
      "दहरिया, हल्द्वानी में हमारा **ई-स्कूटी शोरूम** है: कम ख़र्च, छात्रों और रोज़ की सवारी के लिए बढ़िया। टेस्ट राइड के लिए WhatsApp करें।",
    );
  }
  if (has(t, ["rickshaw", "रिक्शा", "rajhans", "राजहंस", "tuk", "loader", "लोडर", "cargo", "model", "मॉडल"])) {
    return L(
      "We are the authorised **RAJHANSev** dealer in Haldwani & Kichha. Models include Prime, Plus, Pro Max, Samrat, Shaktiman, Dhurandar, Bheem, Super Flexi, plus Cargo and Delivery Van for goods. Want to book a test ride?",
      "हम हल्द्वानी और किच्छा में **RAJHANSev** के अधिकृत डीलर हैं। मॉडल: प्राइम, प्लस, प्रो मैक्स, सम्राट, शक्तिमान, धुरंधर, भीम, सुपर फ़्लेक्सी, और सामान के लिए कार्गो व डिलीवरी वैन। टेस्ट राइड बुक करें?",
    );
  }
  if (has(t, ["okaya", "ओकाया", "inverter", "इन्वर्टर", "battery", "बैटरी", "ups", "power cut", "light"])) {
    return L(
      "As the authorised **Okaya distributor** we supply tubular inverter batteries, inverters & home UPS, solar inverters/PCU, solar batteries and e-rickshaw batteries. Tell me your load (fans, lights, TV, fridge) and I'll pass it to our team for the right combo.",
      "अधिकृत **ओकाया डिस्ट्रीब्यूटर** के रूप में हम ट्यूबलर इन्वर्टर बैटरी, इन्वर्टर और होम UPS, सोलर इन्वर्टर/PCU, सोलर बैटरी और ई-रिक्शा बैटरी देते हैं। अपना लोड (पंखे, लाइट, टीवी, फ़्रिज) बताइए, मैं टीम को सही कॉम्बो के लिए भेज दूँगा।",
    );
  }
  if (has(t, ["solar", "सोलर", "panel", "पैनल", "rooftop", "छत", "net meter", "नेट"])) {
    return L(
      "We install **on-grid, hybrid and off-grid rooftop solar** for homes, shops and institutions, with our own installation team. Steps: free survey → PM Surya Ghar registration → installation → net-metering → subsidy credited. How many units do you use per month?",
      "हम घर, दुकान और संस्थानों पर **ऑन-ग्रिड, हाइब्रिड और ऑफ़-ग्रिड रूफटॉप सोलर** अपनी इंस्टॉलेशन टीम से लगाते हैं। प्रक्रिया: मुफ़्त सर्वे → पीएम सूर्य घर रजिस्ट्रेशन → इंस्टॉलेशन → नेट-मीटरिंग → सब्सिडी खाते में। आपकी महीने की बिजली खपत कितनी यूनिट है?",
    );
  }
  if (has(t, ["time", "timing", "open", "close", "khula", "samay", "समय", "खुला"])) {
    return L(
      `For today's showroom timings please call **${PHONE}**. We'll be happy to help.`,
      `आज के शोरूम समय के लिए कृपया **${PHONE}** पर कॉल करें। हम मदद के लिए तैयार हैं।`,
    );
  }
  if (has(t, ["thank", "thanks", "shukriya", "dhanyavad", "धन्यवाद", "शुक्रिया"])) {
    return L("You're welcome! Anything else I can help with?", "आपका स्वागत है! और कुछ मदद चाहिए?");
  }
  if (/\b(hi|hii+|hello|hey|namaste)\b/.test(t) || has(t, ["नमस्ते", "हेलो"])) {
    return L(
      "Hello! I can help with **solar & subsidy**, **Rajhans e-rickshaws** or **Okaya batteries**. What are you looking for?",
      "नमस्ते! मैं **सोलर और सब्सिडी**, **राजहंस ई-रिक्शा** या **ओकाया बैटरी** में मदद कर सकता हूँ। आपको क्या चाहिए?",
    );
  }
  return L(
    `I can answer questions about **rooftop solar & PM Surya Ghar subsidy**, **Rajhans e-rickshaws** and **Okaya inverters & batteries**. For anything else, our team is on WhatsApp at **${PHONE}**.`,
    `मैं **रूफटॉप सोलर और पीएम सूर्य घर सब्सिडी**, **राजहंस ई-रिक्शा** और **ओकाया इन्वर्टर-बैटरी** के बारे में बता सकता हूँ। बाकी किसी भी जानकारी के लिए हमारी टीम WhatsApp पर है: **${PHONE}**।`,
  );
}

/** Ask the AI endpoint; fall back to the local assistant on any failure. */
export async function askAssistant(history: ChatMsg[], uiLang: Lang): Promise<{ reply: string; source: "ai" | "local" }> {
  const last = history[history.length - 1]?.content ?? "";
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-12), lang: uiLang }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { reply?: string };
    if (!data.reply) throw new Error("empty");
    return { reply: data.reply, source: "ai" };
  } catch {
    // small delay so the typing indicator feels natural
    await new Promise((r) => setTimeout(r, 450));
    return { reply: localReply(last, uiLang), source: "local" };
  }
}
