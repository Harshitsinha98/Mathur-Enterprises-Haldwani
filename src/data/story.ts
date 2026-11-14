import type { L } from "../lib/i18n";

/**
 * The founders' story (two brothers), shown on /story and teased on the home page.
 * Hindi is the founders' own words; English is a translation for the language toggle.
 */
export type StoryIcon = "bike" | "briefcase" | "zap" | "store" | "tv" | "storm" | "trend" | "sun";

export const story = {
  /** Two brothers who built Mathur Enterprises together. */
  authors: [
    { name: { en: "Kapil Mathur", hi: "कपिल माथुर" }, role: { en: "CEO, Mathur Enterprises", hi: "CEO, माथुर एंटरप्राइजेज़" }, photo: "team-kapil-mathur" },
    { name: { en: "Aakash Mathur", hi: "आकाश माथुर" }, role: { en: "Director, Mathur Enterprises", hi: "डायरेक्टर, माथुर एंटरप्राइजेज़" }, photo: "team-aakash-mathur" },
  ],
  signByline: { en: "Kapil Mathur & Aakash Mathur", hi: "कपिल माथुर और आकाश माथुर" },
  signByRole: { en: "The Mathur brothers", hi: "माथुर बंधु" },

  eyebrow: { en: "Our story", hi: "हमारी कहानी" },
  title: {
    en: "Two brothers, one dream: from a small cycle shop to a name Uttarakhand trusts",
    hi: "दो भाई, एक सपना: एक छोटी-सी साइकिल की दुकान से उत्तराखंड में पहचान बनाने तक का सफर",
  },
  quote: {
    en: "The work may be small, but dreams should never be.",
    hi: "मेहनत छोटी हो सकती है, लेकिन सपने कभी छोटे नहीं होने चाहिए।",
  },
  intro: {
    en: "Our journey began in 2005 at a small cycle shop in Lalkuan. Two brothers, with no big resources but a shared dream of doing something big. That little shop taught us hard work, honesty, discipline and how to earn people's trust — and we have walked every step of this road together ever since.",
    hi: "हमारा सफर वर्ष 2005 में लालकुआँ की एक छोटी-सी साइकिल की दुकान से शुरू हुआ था। दो भाई, जिनके पास बड़े साधन नहीं थे, पर एक साझा सपना जरूर था — कुछ बड़ा करने का। उस छोटी-सी दुकान ने हमें मेहनत, ईमानदारी, अनुशासन और लोगों का विश्वास जीतना सिखाया — और तब से इस सफर का हर कदम हमने साथ मिलकर तय किया है।",
  },

  chapters: [
    {
      year: "2005",
      icon: "bike",
      title: { en: "It began with a small shop", hi: "शुरुआत एक छोटी-सी दुकान से" },
      body: {
        en: "A cycle shop in Lalkuan was the first step of my life. I had no idea then that this small beginning would one day lead to several businesses.",
        hi: "लालकुआँ में साइकिल की दुकान से शुरू हुआ यह सफर मेरे जीवन की पहली सीढ़ी था। शायद उस समय मुझे भी अंदाजा नहीं था कि एक दिन यही छोटी-सी शुरुआत मुझे कई व्यवसायों तक ले जाएगी।",
      },
    },
    {
      year: "2014",
      icon: "briefcase",
      title: { en: "A job, and new experience", hi: "नौकरी से मिला नया अनुभव" },
      body: {
        en: "In 2014 I joined UNO MINDA in Rudrapur. It gave me a new way of working and a chance to understand business more deeply.",
        hi: "वर्ष 2014 में मैंने रुद्रपुर की UNO MINDA कंपनी में नौकरी शुरू की। यहाँ से मुझे काम करने का नया अनुभव मिला और व्यवसाय को समझने की दिशा में आगे बढ़ने का अवसर मिला।",
      },
    },
    {
      year: "2016",
      icon: "zap",
      title: { en: "Into e-rickshaws", hi: "ई-रिक्शा व्यवसाय की शुरुआत" },
      body: {
        en: "In 2016 I started working in e-rickshaws with Choudhary Enterprises. It was a turning point. I worked hard and slowly built my experience and contacts.",
        hi: "वर्ष 2016 में चौधरी एंटरप्राइजेज के साथ ई-रिक्शा के क्षेत्र में काम शुरू किया। यह मेरे जीवन का एक नया मोड़ था। मैंने इस क्षेत्र में मेहनत की और धीरे-धीरे अपने अनुभव तथा संपर्कों को मजबूत बनाया।",
      },
    },
    {
      year: "2018",
      icon: "store",
      image: "ev-delivery-1",
      title: { en: "Mathur Enterprises is born", hi: "Mathur Enterprises की स्थापना" },
      body: {
        en: "Mathur Enterprises started in 2018 with an e-rickshaw showroom, sales and service. Our aim was never just to sell vehicles, but to give customers better service and trust.",
        hi: "वर्ष 2018 में Mathur Enterprises की शुरुआत हुई। ई-रिक्शा के शोरूम, बिक्री और सर्विस के माध्यम से हमने अपने व्यवसाय को आगे बढ़ाना शुरू किया। हमारा उद्देश्य केवल वाहन बेचना नहीं, बल्कि ग्राहकों को बेहतर सेवा और भरोसा देना था।",
      },
    },
    {
      year: "2019",
      icon: "tv",
      image: "store-electronics",
      title: { en: "Electronics in Haldwani", hi: "हल्द्वानी में इलेक्ट्रॉनिक्स व्यवसाय" },
      body: {
        en: "In 2019 we opened an electronics showroom in Haldwani under Electronics Bazar. Every new step taught me something and gave me the courage to keep going.",
        hi: "वर्ष 2019 में हल्द्वानी में इलेक्ट्रॉनिक्स बाजार के अंतर्गत इलेक्ट्रॉनिक्स शोरूम की शुरुआत की। हर नया कदम मुझे कुछ नया सिखा रहा था और आगे बढ़ने का हौसला दे रहा था।",
      },
    },
    {
      year: "2020",
      icon: "storm",
      storm: true,
      title: { en: "The Covid challenge", hi: "कोरोना महामारी की चुनौती" },
      body: {
        en: "Then came 2020, when the pandemic shook the whole world. Business and life both faced hard times.",
        hi: "फिर आया वर्ष 2020, जब कोरोना महामारी ने पूरी दुनिया को हिला दिया। व्यापार और जिंदगी दोनों के सामने कठिन चुनौतियाँ थीं।",
      },
      highlight: {
        en: "But I didn't give up. Whatever the situation, the will to move forward stayed.",
        hi: "लेकिन मैंने हिम्मत नहीं हारी। परिस्थितियाँ चाहे जैसी भी रही हों, आगे बढ़ने की सोच हमेशा कायम रही।",
      },
    },
    {
      year: "2020+",
      icon: "trend",
      image: "ev-delivery-2",
      title: { en: "New speed for e-rickshaws", hi: "ई-रिक्शा व्यवसाय में नई गति" },
      body: {
        en: "After the hard times we kept our focus on growing the e-rickshaw business. Customer trust, better service and hard work became our strength. The chance to stay No. 1 in e-rickshaws is thanks to your love and trust.",
        hi: "महामारी के कठिन दौर के बाद ई-रिक्शा व्यवसाय को आगे बढ़ाने पर लगातार ध्यान दिया। ग्राहकों का विश्वास, बेहतर सर्विस और मेहनत हमारी ताकत बने। ई-रिक्शा के क्षेत्र में लगातार नंबर 1 बने रहने का जो अवसर मिला, उसके पीछे आप सभी का प्यार और विश्वास है।",
      },
    },
    {
      year: "2024",
      icon: "sun",
      image: "solar-haldwani-3",
      title: { en: "A new chapter in solar", hi: "सोलर ऊर्जा के क्षेत्र में नया अध्याय" },
      body: {
        en: "In 2024 we stepped into solar, resolving to bring solar power to people through the PM Surya Ghar: Muft Bijli Yojana. Becoming known as No. 1 in this field in Uttarakhand makes us proud. It belongs to our whole team, partners, customers and everyone who trusted us.",
        hi: "वर्ष 2024 में हमने सोलर के क्षेत्र में कदम रखा। प्रधानमंत्री सूर्य घर: मुफ्त बिजली योजना के माध्यम से लोगों तक सोलर ऊर्जा का लाभ पहुँचाने का संकल्प लिया। आज इस क्षेत्र में उत्तराखंड में नंबर 1 की पहचान बनाने तक का जो सफर तय हुआ है, वह हमारे लिए गर्व की बात है। यह उपलब्धि केवल मेरी नहीं, बल्कि हमारी पूरी टीम, हमारे सहयोगियों, ग्राहकों और उन सभी लोगों की है जिन्होंने हम पर भरोसा किया।",
      },
    },
  ] as { year: string; icon: StoryIcon; image?: string; storm?: boolean; title: L; body: L; highlight?: L }[],

  letterTitle: { en: "Our biggest asset: your trust", hi: "हमारी सबसे बड़ी पूँजी — आप सभी का विश्वास" },
  letter: [
    {
      en: "When we look back today, the whole road from that little cycle shop in Lalkuan to Mathur Enterprises comes before our eyes.",
      hi: "आज जब हम पीछे मुड़कर देखते हैं, तो लालकुआँ की उस छोटी-सी साइकिल की दुकान से लेकर Mathur Enterprises तक का सफर हमारी आँखों के सामने आ जाता है।",
    },
    {
      en: "It wasn't easy. Every phase taught us something, every challenge made us stronger, and every customer inspired us to move ahead.",
      hi: "यह सफर आसान नहीं था। हर दौर ने हमें कुछ सिखाया, हर चुनौती ने हमें मजबूत बनाया और हर ग्राहक ने हमें आगे बढ़ने की प्रेरणा दी।",
    },
    {
      en: "We thank, from our hearts, every customer, friend, partner and well-wisher who stood with us at every step and believed in us. Your trust is what let us stay No. 1 in e-rickshaws and build our name in solar across Uttarakhand.",
      hi: "हम दिल से धन्यवाद करते हैं उन सभी ग्राहकों, मित्रों, सहयोगियों और शुभचिंतकों का, जिन्होंने हर कदम पर हमारा साथ दिया और हम पर विश्वास किया। आप सभी के विश्वास ने ही हमें ई-रिक्शा के क्षेत्र में लगातार नंबर 1 बने रहने और सोलर के क्षेत्र में उत्तराखंड में अपनी पहचान बनाने का मौका दिया।",
    },
    {
      en: "Our thinking is still what it was in 2005: work honestly, keep working hard, and keep people's trust.",
      hi: "हमारी सोच आज भी वही है जो 2005 में थी—ईमानदारी से काम करना, मेहनत करते रहना और लोगों का विश्वास बनाए रखना।",
    },
  ] as L[],
  values: [
    { en: "Honesty", hi: "ईमानदारी" },
    { en: "Hard work", hi: "मेहनत" },
    { en: "Trust", hi: "विश्वास" },
  ] as L[],
  belief: {
    en: "Business isn't just a way to earn money. It is about winning people's trust and bringing positive change to their lives.",
    hi: "व्यवसाय केवल पैसा कमाने का माध्यम नहीं है, बल्कि लोगों का भरोसा जीतने और उनके जीवन में सकारात्मक बदलाव लाने का नाम है।",
  },
  ahead: {
    en: "This journey isn't over. There is further to go, new milestones to reach, and your trust to make even stronger. What began in 2005 with a small cycle shop is now heading towards new dreams and new heights.",
    hi: "यह सफर अभी खत्म नहीं हुआ है। अभी और आगे बढ़ना है, नए मुकाम हासिल करने हैं और आप सभी के विश्वास को और मजबूत बनाना है। 2005 में एक छोटी-सी साइकिल की दुकान से शुरू हुआ सफर… आज नए सपनों और नई ऊँचाइयों की ओर बढ़ रहा है।",
  },
  signoff: { en: "Your trust is our strength.", hi: "आपका विश्वास ही हमारी ताकत है।" },
  motto: { en: "Mathur Enterprises: your trust, our identity.", hi: "Mathur Enterprises — आपका विश्वास, हमारी पहचान।" },

  teaserTitle: { en: "It started with one cycle shop in Lalkuan.", hi: "यह सफर लालकुआँ की एक साइकिल की दुकान से शुरू हुआ।" },
  teaserBody: {
    en: "From a cycle shop in 2005 to e-rickshaws, electronics and solar: read how hard work and your trust built Mathur Enterprises.",
    hi: "2005 की साइकिल की दुकान से ई-रिक्शा, इलेक्ट्रॉनिक्स और सोलर तक: पढ़िए कैसे मेहनत और आपके विश्वास ने Mathur Enterprises बनाया।",
  },
  readFull: { en: "Read the full story", hi: "पूरी कहानी पढ़ें" },
};
