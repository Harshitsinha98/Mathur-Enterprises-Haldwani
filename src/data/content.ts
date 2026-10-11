import type { L } from "../lib/i18n";

/* ------------------------------------------------------------------ */
/*  Shared UI strings                                                  */
/* ------------------------------------------------------------------ */
export const ui = {
  nav: {
    home: { en: "Home", hi: "होम" },
    solar: { en: "Solar", hi: "सोलर" },
    rajhans: { en: "Rajhans EV", hi: "राजहंस EV" },
    okaya: { en: "Okaya", hi: "ओकाया" },
    team: { en: "Team", hi: "टीम" },
    contact: { en: "Contact", hi: "संपर्क" },
  },
  cta: {
    talk: { en: "Talk to us", hi: "बात करें" },
    whatsapp: { en: "Chat on WhatsApp", hi: "WhatsApp पर बात करें" },
    call: { en: "Call now", hi: "अभी कॉल करें" },
    explore: { en: "Explore", hi: "देखें" },
    enquire: { en: "Enquire on WhatsApp", hi: "WhatsApp पर पूछताछ" },
    viewAll: { en: "View all", hi: "सभी देखें" },
    directions: { en: "Get directions", hi: "रास्ता देखें" },
    freeVisit: { en: "Book a free site visit", hi: "मुफ़्त साइट विज़िट बुक करें" },
  },
  footer: {
    tagline: {
      en: "Your trusted partner for a brighter tomorrow: solar power, electric mobility and dependable backup, under one roof.",
      hi: "उज्ज्वल कल के लिए आपका भरोसेमंद साथी: सोलर, इलेक्ट्रिक वाहन और भरोसेमंद बैकअप, एक ही छत के नीचे।",
    },
    rights: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
    businesses: { en: "Businesses", hi: "व्यवसाय" },
    company: { en: "Company", hi: "कंपनी" },
    reach: { en: "Reach us", hi: "हमसे जुड़ें" },
  },
  langLabel: { en: "हिंदी", hi: "English" },
};

/* ------------------------------------------------------------------ */
/*  Brand                                                              */
/* ------------------------------------------------------------------ */
export const brand = {
  name: "Mathur Enterprises",
  since: 2015,
  tagline: { en: "Powering Your Tomorrow", hi: "आपके कल को ऊर्जा" },
  promise: { en: "Your trusted partner for a brighter tomorrow", hi: "उज्ज्वल कल के लिए आपका भरोसेमंद साथी" },
  address: {
    en: "42, Rudrapur–Haldwani Road, Dahariya, Haldwani, Uttarakhand 263139 (opp. Shri Balaji Honda Showroom)",
    hi: "42, रुद्रपुर–हल्द्वानी रोड, दहरिया, हल्द्वानी, उत्तराखंड 263139 (श्री बालाजी होंडा शोरूम के सामने)",
  },
  pillars: [
    { en: "Genuine Products", hi: "असली उत्पाद" },
    { en: "Trusted Brands", hi: "भरोसेमंद ब्रांड" },
    { en: "Best Service", hi: "बेहतरीन सर्विस" },
    { en: "Sustainable Future", hi: "टिकाऊ भविष्य" },
  ] as L[],
};

/* ------------------------------------------------------------------ */
/*  Home                                                               */
/* ------------------------------------------------------------------ */
export const home = {
  eyebrow: { en: "Haldwani · Since 2015", hi: "हल्द्वानी · 2015 से" },
  title: [
    { en: "Powering", hi: "ऊर्जा दे रहे हैं" },
    { en: "Uttarakhand's", hi: "उत्तराखंड के" },
    { en: "Tomorrow.", hi: "कल को।" },
  ] as L[],
  sub: {
    en: "Rooftop solar, Rajhans electric rickshaws and Okaya power backup: three trusted businesses, one family name, serving Kumaon and western UP.",
    hi: "रूफटॉप सोलर, राजहंस इलेक्ट्रिक रिक्शा और ओकाया पावर बैकअप: तीन भरोसेमंद व्यवसाय, एक नाम, कुमाऊँ और पश्चिमी यूपी की सेवा में।",
  },
  stats: [
    { value: 2015, label: { en: "Serving since", hi: "सेवा में, वर्ष से" }, plain: true },
    { value: 7, suffix: "+", label: { en: "Branches & showrooms", hi: "शाखाएँ और शोरूम" } },
    { value: 15, suffix: "+", label: { en: "Towns with our solar", hi: "शहरों में हमारा सोलर" } },
    { value: 20, suffix: "+", label: { en: "Team members", hi: "टीम सदस्य" } },
  ],
  verticalsEyebrow: { en: "Three businesses", hi: "तीन व्यवसाय" },
  verticalsTitle: { en: "One name you can trust for clean energy and electric mobility", hi: "स्वच्छ ऊर्जा और इलेक्ट्रिक सफ़र के लिए एक भरोसेमंद नाम" },
  whyEyebrow: { en: "Why Mathur Enterprises", hi: "माथुर एंटरप्राइजेज़ क्यों" },
  whyTitle: { en: "Built on trust, run on service", hi: "भरोसे पर बना, सेवा से चलता" },
  why: [
    {
      icon: "badge",
      title: { en: "Govt. scheme experts", hi: "सरकारी योजना विशेषज्ञ" },
      body: {
        en: "We handle PM Surya Ghar registration, DISCOM approval, net-metering and subsidy paperwork end-to-end.",
        hi: "पीएम सूर्य घर रजिस्ट्रेशन, बिजली विभाग की मंज़ूरी, नेट-मीटरिंग और सब्सिडी की पूरी कागज़ी कार्यवाही हम करते हैं।",
      },
    },
    {
      icon: "map",
      title: { en: "Local branches, fast service", hi: "नज़दीकी शाखाएँ, तेज़ सर्विस" },
      body: {
        en: "Haldwani, Kashipur, Lalkuan, Pantnagar, Halduchaur, Jay Nagar and Kichha, so help is never far away.",
        hi: "हल्द्वानी, काशीपुर, लालकुआँ, पंतनगर, हल्दूचौड़, जय नगर और किच्छा: मदद हमेशा पास में।",
      },
    },
    {
      icon: "wrench",
      title: { en: "In-house installation team", hi: "अपनी इंस्टॉलेशन टीम" },
      body: {
        en: "Dedicated installation head, service head and engineers. No outsourcing, no excuses.",
        hi: "समर्पित इंस्टॉलेशन हेड, सर्विस हेड और इंजीनियर। कोई आउटसोर्सिंग नहीं, कोई बहाना नहीं।",
      },
    },
    {
      icon: "award",
      title: { en: "Award-winning", hi: "पुरस्कार विजेता" },
      body: {
        en: "Recognised at REDA RenewX 2026, the Uttarakhand 2047 conference and by Havells.",
        hi: "REDA रिन्यूएक्स 2026, उत्तराखंड 2047 सम्मेलन और हैवेल्स द्वारा सम्मानित।",
      },
    },
    {
      icon: "shield",
      title: { en: "Genuine, branded products", hi: "असली, ब्रांडेड उत्पाद" },
      body: {
        en: "Authorised partner for Rajhans EV and Okaya, working with leading solar brands like Luno, Waaree and Solastice.",
        hi: "राजहंस EV और ओकाया के अधिकृत पार्टनर, साथ ही लूनो, वारी और सोलास्टिस जैसे प्रमुख सोलर ब्रांड।",
      },
    },
    {
      icon: "geo",
      title: { en: "Geo-tagged proof of work", hi: "जियो-टैग वाला काम का सबूत" },
      body: {
        en: "Every installation is photographed with GPS location and date. See them on our solar map.",
        hi: "हर इंस्टॉलेशन की फ़ोटो GPS लोकेशन और तारीख के साथ। हमारे सोलर मैप पर देखें।",
      },
    },
  ],
  journeyEyebrow: { en: "Moments", hi: "यादगार पल" },
  journeyTitle: { en: "Openings, deliveries, celebrations", hi: "उद्घाटन, डिलीवरी, जश्न" },
  awardsEyebrow: { en: "Recognition", hi: "सम्मान" },
  awardsTitle: { en: "Honoured by the industry", hi: "उद्योग द्वारा सम्मानित" },
  teamEyebrow: { en: "The people", hi: "हमारे लोग" },
  teamTitle: { en: "A team that shows up", hi: "हर वक़्त साथ खड़ी टीम" },
  teamBody: {
    en: "20+ people across sales, installation, service and accounts, led by CEO Aakash Mathur.",
    hi: "सेल्स, इंस्टॉलेशन, सर्विस और अकाउंट्स में 20+ लोग, CEO आकाश माथुर के नेतृत्व में।",
  },
  ctaTitle: { en: "Ready to cut your electricity bill?", hi: "बिजली का बिल घटाने के लिए तैयार हैं?" },
  ctaBody: {
    en: "Free site survey, subsidy guidance and an honest recommendation. Just send us a message.",
    hi: "मुफ़्त साइट सर्वे, सब्सिडी की जानकारी और सही सलाह। बस हमें मैसेज करें।",
  },
};

/* ------------------------------------------------------------------ */
/*  Business verticals                                                 */
/* ------------------------------------------------------------------ */
export type VerticalKey = "solar" | "rajhans" | "okaya";

export const verticals: {
  key: VerticalKey;
  path: string;
  name: L;
  tagline: L;
  body: L;
  points: L[];
  image: string;
}[] = [
  {
    key: "solar",
    path: "/solar",
    name: { en: "Solar Solutions", hi: "सोलर सॉल्यूशंस" },
    tagline: { en: "Clean Energy | Bright Future", hi: "स्वच्छ ऊर्जा | उज्ज्वल भविष्य" },
    body: {
      en: "Rooftop solar for homes, shops and institutions, with full PM Surya Ghar subsidy support, from survey to net-meter.",
      hi: "घर, दुकान और संस्थानों के लिए रूफटॉप सोलर, पीएम सूर्य घर सब्सिडी की पूरी मदद के साथ, सर्वे से नेट-मीटर तक।",
    },
    points: [
      { en: "PM Surya Ghar subsidy", hi: "पीएम सूर्य घर सब्सिडी" },
      { en: "On-grid & hybrid", hi: "ऑन-ग्रिड और हाइब्रिड" },
      { en: "Net-metering", hi: "नेट-मीटरिंग" },
    ],
    image: "solar-haldwani-3",
  },
  {
    key: "rajhans",
    path: "/rajhans-ev",
    name: { en: "Rajhans Auto", hi: "राजहंस ऑटो" },
    tagline: { en: "E-Rickshaw | Electric Mobility", hi: "ई-रिक्शा | इलेक्ट्रिक मोबिलिटी" },
    body: {
      en: "Authorised RAJHANSev dealership in Haldwani & Kichha: e-rickshaws, cargo loaders and e-scooties with finance and service.",
      hi: "हल्द्वानी और किच्छा में अधिकृत RAJHANSev डीलरशिप: ई-रिक्शा, कार्गो लोडर और ई-स्कूटी, फ़ाइनेंस और सर्विस के साथ।",
    },
    points: [
      { en: "Haldwani & Kichha", hi: "हल्द्वानी और किच्छा" },
      { en: "Easy finance", hi: "आसान फ़ाइनेंस" },
      { en: "E-scooty range", hi: "ई-स्कूटी रेंज" },
    ],
    image: "ev-delivery-1",
  },
  {
    key: "okaya",
    path: "/okaya",
    name: { en: "Okaya Distributor", hi: "ओकाया डिस्ट्रीब्यूटर" },
    tagline: { en: "Powering a Better Tomorrow", hi: "बेहतर कल की ऊर्जा" },
    body: {
      en: "Authorised distributor for Okaya inverters, inverter batteries, solar batteries and e-rickshaw batteries, for homes and dealers alike.",
      hi: "ओकाया इन्वर्टर, इन्वर्टर बैटरी, सोलर बैटरी और ई-रिक्शा बैटरी के अधिकृत डिस्ट्रीब्यूटर: घरों और डीलरों दोनों के लिए।",
    },
    points: [
      { en: "Inverters & batteries", hi: "इन्वर्टर और बैटरी" },
      { en: "Solar storage", hi: "सोलर स्टोरेज" },
      { en: "Dealer supply", hi: "डीलर सप्लाई" },
    ],
    image: "ev-battery-handover",
  },
];

export const partnerBrands = ["RAJHANSev", "OKAYA", "LUNO", "WAAREE", "SOLASTICE", "HAVELLS", "USHA", "PM SURYA GHAR"];

/* ------------------------------------------------------------------ */
/*  Solar page                                                         */
/* ------------------------------------------------------------------ */
export const solar = {
  eyebrow: { en: "Solar Portfolio", hi: "सोलर पोर्टफ़ोलियो" },
  title: { en: "Rooftops across Kumaon, now running on sunshine.", hi: "कुमाऊँ की छतें, अब धूप से चल रही हैं।" },
  sub: {
    en: "Haldwani Solar House, Kashipur Solar House, Lalkuan Solar House and Jay Nagar Solar House: our solar network covers Uttarakhand and western UP.",
    hi: "हल्द्वानी सोलर हाउस, काशीपुर सोलर हाउस, लालकुआँ सोलर हाउस और जय नगर सोलर हाउस: हमारा सोलर नेटवर्क उत्तराखंड और पश्चिमी यूपी तक।",
  },
  processEyebrow: { en: "How it works", hi: "कैसे होता है" },
  processTitle: { en: "From enquiry to zero bill in 5 steps", hi: "पूछताछ से ज़ीरो बिल तक, 5 कदम" },
  process: [
    { title: { en: "Free site survey", hi: "मुफ़्त साइट सर्वे" }, body: { en: "Our advisor checks your roof, load and shadow-free area.", hi: "हमारे सलाहकार छत, लोड और छाया-रहित जगह की जाँच करते हैं।" } },
    { title: { en: "Registration", hi: "रजिस्ट्रेशन" }, body: { en: "We register you on the PM Surya Ghar national portal.", hi: "हम आपको पीएम सूर्य घर राष्ट्रीय पोर्टल पर रजिस्टर करते हैं।" } },
    { title: { en: "Installation", hi: "इंस्टॉलेशन" }, body: { en: "Our own team installs panels, structure, inverter and earthing.", hi: "हमारी अपनी टीम पैनल, स्ट्रक्चर, इन्वर्टर और अर्थिंग लगाती है।" } },
    { title: { en: "Net-metering", hi: "नेट-मीटरिंग" }, body: { en: "DISCOM inspection and bi-directional meter, handled by us.", hi: "बिजली विभाग निरीक्षण और नेट-मीटर: सब हम संभालते हैं।" } },
    { title: { en: "Subsidy credited", hi: "सब्सिडी खाते में" }, body: { en: "Subsidy goes directly to your bank account. Bills drop.", hi: "सब्सिडी सीधे आपके बैंक खाते में। बिल घटता है।" } },
  ] as { title: L; body: L }[],
  productsEyebrow: { en: "Solutions", hi: "समाधान" },
  productsTitle: { en: "The right system for every roof", hi: "हर छत के लिए सही सिस्टम" },
  products: [
    { title: { en: "On-Grid Rooftop", hi: "ऑन-ग्रिड रूफटॉप" }, body: { en: "Best for homes with regular grid supply. Eligible for PM Surya Ghar subsidy.", hi: "नियमित बिजली वाले घरों के लिए सबसे अच्छा। पीएम सूर्य घर सब्सिडी के योग्य।" }, tag: { en: "Most popular", hi: "सबसे लोकप्रिय" } },
    { title: { en: "Hybrid System", hi: "हाइब्रिड सिस्टम" }, body: { en: "Solar + battery backup. Saves on bills and keeps lights on during power cuts.", hi: "सोलर + बैटरी बैकअप। बिल भी बचे और बिजली कटौती में भी रोशनी रहे।" } },
    { title: { en: "Off-Grid System", hi: "ऑफ़-ग्रिड सिस्टम" }, body: { en: "For farms, hilltops and locations with weak or no grid supply.", hi: "खेतों, पहाड़ों और कमज़ोर बिजली वाली जगहों के लिए।" } },
    { title: { en: "Commercial & Institutional", hi: "कमर्शियल और संस्थागत" }, body: { en: "Shops, schools, hospitals and hotels: bigger roofs, bigger savings.", hi: "दुकानें, स्कूल, अस्पताल और होटल: बड़ी छत, बड़ी बचत।" } },
    { title: { en: "Elevated Structures", hi: "ऊँचे स्ट्रक्चर" }, body: { en: "Raised GI structures so your roof stays usable underneath.", hi: "ऊँचे GI स्ट्रक्चर, ताकि नीचे की छत भी काम आती रहे।" } },
    { title: { en: "Service & AMC", hi: "सर्विस और AMC" }, body: { en: "Cleaning, health checks and quick repairs by our service team.", hi: "हमारी सर्विस टीम द्वारा सफ़ाई, जाँच और तुरंत मरम्मत।" } },
  ] as { title: L; body: L; tag?: L }[],
  mapEyebrow: { en: "Installation map", hi: "इंस्टॉलेशन मैप" },
  mapTitle: { en: "Every pin is a real rooftop", hi: "हर पिन एक असली छत है" },
  mapBody: {
    en: "Locations taken from our geo-tagged installation photos. Hover or tap a town to see it.",
    hi: "लोकेशन हमारी जियो-टैग इंस्टॉलेशन फ़ोटो से ली गई हैं। किसी शहर पर टैप करें।",
  },
  galleryEyebrow: { en: "Verified installations", hi: "सत्यापित इंस्टॉलेशन" },
  galleryTitle: { en: "Real customers. Real rooftops.", hi: "असली ग्राहक। असली छतें।" },
  campsTitle: { en: "PM Surya Ghar awareness camps", hi: "पीएम सूर्य घर जागरूकता शिविर" },
  campsBody: {
    en: "Our teams set up camps in Halduchaur, Lalkuan and nearby villages to help families register for the scheme.",
    hi: "हमारी टीमें हल्दूचौड़, लालकुआँ और आसपास के गाँवों में शिविर लगाकर परिवारों का योजना में रजिस्ट्रेशन कराती हैं।",
  },
  calc: {
    eyebrow: { en: "Subsidy & savings calculator", hi: "सब्सिडी और बचत कैलकुलेटर" },
    title: { en: "See what the sun can save you", hi: "देखें सूरज आपके कितने पैसे बचा सकता है" },
    bill: { en: "Monthly electricity units", hi: "महीने की बिजली यूनिट" },
    rate: { en: "Rate per unit (₹)", hi: "प्रति यूनिट दर (₹)" },
    size: { en: "Recommended system", hi: "सुझाया गया सिस्टम" },
    subsidy: { en: "Central subsidy (PM Surya Ghar)", hi: "केंद्रीय सब्सिडी (पीएम सूर्य घर)" },
    yearly: { en: "Estimated yearly savings", hi: "अनुमानित सालाना बचत" },
    note: {
      en: "Estimate only. Central subsidy: ₹30,000/kW up to 2 kW, ₹18,000 for the 3rd kW, max ₹78,000. Additional state benefits may apply. Ask our advisor for the exact figure.",
      hi: "यह केवल अनुमान है। केंद्रीय सब्सिडी: 2 kW तक ₹30,000/kW, तीसरे kW पर ₹18,000, अधिकतम ₹78,000। राज्य से अतिरिक्त लाभ मिल सकता है। सटीक जानकारी के लिए हमारे सलाहकार से पूछें।",
    },
  },
};

/* Installations, read from GPS-camera overlays on the photos (approximate). */
export const installations: { id: string; town: L; lat: number; lng: number; state: "UK" | "UP"; date: string }[] = [
  { id: "solar-haldwani-3", town: { en: "Haldwani", hi: "हल्द्वानी" }, lat: 29.2447, lng: 79.52, state: "UK", date: "Oct 2026" },
  { id: "solar-kashipur-1", town: { en: "Kashipur", hi: "काशीपुर" }, lat: 29.2359, lng: 78.9732, state: "UK", date: "Mar 2026" },
  { id: "solar-rudrapur", town: { en: "Rudrapur", hi: "रुद्रपुर" }, lat: 28.9598, lng: 79.399, state: "UK", date: "Mar 2026" },
  { id: "solar-tanda", town: { en: "Tanda Range", hi: "टांडा रेंज" }, lat: 29.101, lng: 79.4992, state: "UK", date: "Jul 2026" },
  { id: "solar-haldwani-2", town: { en: "Haldwani", hi: "हल्द्वानी" }, lat: 29.2474, lng: 79.5266, state: "UK", date: "Jul 2026" },
  { id: "solar-haripur", town: { en: "Haripur Shivdatt", hi: "हरिपुर शिवदत्त" }, lat: 29.03, lng: 79.49, state: "UK", date: "Jul 2026" },
  { id: "solar-usnagar", town: { en: "Dabariya, Rudrapur", hi: "दबरिया, रुद्रपुर" }, lat: 29.0404, lng: 79.359, state: "UK", date: "Aug 2026" },
  { id: "solar-bazpur", town: { en: "Bazpur", hi: "बाज़पुर" }, lat: 29.1574, lng: 79.1434, state: "UK", date: "Aug 2026" },
  { id: "solar-bhoor-gauri", town: { en: "Bhoor Gauri", hi: "भूर गौरी" }, lat: 28.9373, lng: 79.5087, state: "UK", date: "Jul 2026" },
  { id: "solar-bera-pokhra", town: { en: "Bera Pokhra", hi: "बेरा पोखरा" }, lat: 29.1704, lng: 79.502, state: "UK", date: "Aug 2026" },
  { id: "solar-kashipur-3", town: { en: "Kashipur", hi: "काशीपुर" }, lat: 29.228, lng: 78.961, state: "UK", date: "Aug 2026" },
  { id: "solar-neoria", town: { en: "Neoria Husainpur", hi: "नेवरिया हुसैनपुर" }, lat: 28.7385, lng: 79.8941, state: "UP", date: "Aug 2026" },
  { id: "solar-jangi-1", town: { en: "Jangi Bangar", hi: "जंगी बंगर" }, lat: 29.1756, lng: 79.5083, state: "UK", date: "Sep 2026" },
  { id: "solar-jagatpura", town: { en: "Jagatpura", hi: "जगतपुरा" }, lat: 28.9643, lng: 79.4067, state: "UK", date: "Oct 2026" },
  { id: "solar-bareilly", town: { en: "Bareilly", hi: "बरेली" }, lat: 28.378, lng: 79.4488, state: "UP", date: "Oct 2026" },
  { id: "solar-damkhoda", town: { en: "Damkhoda", hi: "दमखोदा" }, lat: 28.6842, lng: 79.5515, state: "UP", date: "Oct 2026" },
  { id: "solar-lalkuan-1", town: { en: "Lalkuan", hi: "लालकुआँ" }, lat: 29.0626, lng: 79.5257, state: "UK", date: "Oct 2026" },
  { id: "solar-kashipur-7", town: { en: "Kashipur", hi: "काशीपुर" }, lat: 29.2017, lng: 78.981, state: "UK", date: "Oct 2026" },
];

/** Full solar gallery (some photos are not on the map). */
export const solarGallery: { id: string; town: L }[] = [
  ...installations.map(({ id, town }) => ({ id, town })),
  { id: "solar-kashipur-2", town: { en: "Kashipur", hi: "काशीपुर" } },
  { id: "solar-haldwani-1", town: { en: "Haldwani", hi: "हल्द्वानी" } },
  { id: "solar-kashipur-4", town: { en: "Kashipur", hi: "काशीपुर" } },
  { id: "solar-jangi-2", town: { en: "Jangi Bangar", hi: "जंगी बंगर" } },
  { id: "solar-kashipur-5", town: { en: "Kashipur", hi: "काशीपुर" } },
  { id: "solar-kashipur-6", town: { en: "Kashipur", hi: "काशीपुर" } },
  { id: "solar-lalkuan-2", town: { en: "Lalkuan", hi: "लालकुआँ" } },
  { id: "solar-structure", town: { en: "Structure work", hi: "स्ट्रक्चर का काम" } },
];

/* ------------------------------------------------------------------ */
/*  Rajhans EV page                                                    */
/* ------------------------------------------------------------------ */
export const rajhans = {
  eyebrow: { en: "Rajhans Auto Agency · Haldwani & Kichha", hi: "राजहंस ऑटो एजेंसी · हल्द्वानी और किच्छा" },
  title: { en: "Earn more. Spend nothing on fuel.", hi: "कमाई ज़्यादा, ईंधन का ख़र्च ज़ीरो।" },
  sub: {
    en: "Authorised dealer for RAJHANSev, one of India's fast-growing e-rickshaw brands. Passenger, cargo and delivery models, plus e-scooties for daily rides.",
    hi: "RAJHANSev के अधिकृत डीलर, जो भारत के तेज़ी से बढ़ते ई-रिक्शा ब्रांड्स में से एक है। पैसेंजर, कार्गो और डिलीवरी मॉडल, साथ में रोज़ की सवारी के लिए ई-स्कूटी।",
  },
  modelsEyebrow: { en: "The RAJHANSev range", hi: "RAJHANSev रेंज" },
  modelsTitle: { en: "A model for every route", hi: "हर रूट के लिए एक मॉडल" },
  models: [
    { name: "Prime", kind: "passenger" },
    { name: "Plus", kind: "passenger" },
    { name: "Pro Max", kind: "passenger" },
    { name: "Samrat", kind: "passenger" },
    { name: "Shaktiman", kind: "passenger" },
    { name: "Dhurandar", kind: "passenger" },
    { name: "Bheem", kind: "passenger" },
    { name: "Super Flexi", kind: "passenger" },
    { name: "Cargo", kind: "cargo" },
    { name: "Delivery Van", kind: "cargo" },
  ] as { name: string; kind: "passenger" | "cargo" }[],
  kinds: {
    all: { en: "All", hi: "सभी" },
    passenger: { en: "E-Rickshaw", hi: "ई-रिक्शा" },
    cargo: { en: "Cargo / Loader", hi: "कार्गो / लोडर" },
  },
  benefitsTitle: { en: "Why buy from us", hi: "हमसे क्यों खरीदें" },
  benefits: [
    { title: { en: "Easy finance", hi: "आसान फ़ाइनेंस" }, body: { en: "Low down-payment options with finance partners. We help with the paperwork.", hi: "फ़ाइनेंस पार्टनर्स के साथ कम डाउन-पेमेंट। कागज़ी काम में हम मदद करते हैं।" } },
    { title: { en: "Registration & RTO", hi: "रजिस्ट्रेशन और RTO" }, body: { en: "Number plate, registration and insurance, done before delivery.", hi: "नंबर प्लेट, रजिस्ट्रेशन और बीमा: डिलीवरी से पहले पूरा।" } },
    { title: { en: "Genuine Okaya batteries", hi: "असली ओकाया बैटरी" }, body: { en: "As Okaya distributors, we keep e-rickshaw batteries in stock.", hi: "ओकाया डिस्ट्रीब्यूटर होने के नाते, ई-रिक्शा बैटरी हमेशा स्टॉक में।" } },
    { title: { en: "Service that stays", hi: "भरोसेमंद सर्विस" }, body: { en: "Dedicated service head and engineers for after-sales support.", hi: "बिक्री के बाद सहायता के लिए समर्पित सर्विस हेड और इंजीनियर।" } },
  ] as { title: L; body: L }[],
  scootyTitle: { en: "E-Scooty showroom", hi: "ई-स्कूटी शोरूम" },
  scootyBody: {
    en: "Stylish, low-cost electric scooters for students, office-goers and families. Visit the showroom at Dahariya for a test ride.",
    hi: "छात्रों, नौकरीपेशा और परिवारों के लिए स्टाइलिश, किफ़ायती इलेक्ट्रिक स्कूटर। टेस्ट राइड के लिए दहरिया शोरूम आएँ।",
  },
  deliveriesTitle: { en: "Happy deliveries", hi: "ख़ुशियों की डिलीवरी" },
};

/* ------------------------------------------------------------------ */
/*  Okaya page                                                         */
/* ------------------------------------------------------------------ */
export const okaya = {
  eyebrow: { en: "Authorised Okaya Distributor", hi: "अधिकृत ओकाया डिस्ट्रीब्यूटर" },
  title: { en: "Power that never lets you down.", hi: "ऐसी बिजली जो कभी धोखा न दे।" },
  sub: {
    en: "Okaya has powered Indian homes for over two decades. We supply the full range of inverters and batteries to homes, shops and dealers across the region.",
    hi: "ओकाया दो दशकों से भारतीय घरों को ऊर्जा दे रहा है। हम पूरे क्षेत्र में घरों, दुकानों और डीलरों को इन्वर्टर और बैटरी की पूरी रेंज सप्लाई करते हैं।",
  },
  productsTitle: { en: "Product range", hi: "उत्पाद रेंज" },
  products: [
    { icon: "battery", title: { en: "Tubular Inverter Batteries", hi: "ट्यूबलर इन्वर्टर बैटरी" }, body: { en: "Long-life tall tubular batteries for long power cuts.", hi: "लंबी बिजली कटौती के लिए लंबी उम्र वाली टॉल ट्यूबलर बैटरी।" } },
    { icon: "zap", title: { en: "Inverters & Home UPS", hi: "इन्वर्टर और होम UPS" }, body: { en: "Pure sine-wave inverters that run fans, lights, TV and fridge.", hi: "प्योर साइन-वेव इन्वर्टर: पंखे, लाइट, टीवी और फ़्रिज चलाएँ।" } },
    { icon: "sun", title: { en: "Solar Inverters & PCU", hi: "सोलर इन्वर्टर और PCU" }, body: { en: "Smart solar inverters that charge from the sun first.", hi: "स्मार्ट सोलर इन्वर्टर जो पहले सूरज से चार्ज होते हैं।" } },
    { icon: "panel", title: { en: "Solar Batteries", hi: "सोलर बैटरी" }, body: { en: "Deep-cycle batteries built for daily solar charging.", hi: "रोज़ की सोलर चार्जिंग के लिए बनी डीप-साइकिल बैटरी।" } },
    { icon: "truck", title: { en: "E-Rickshaw Batteries", hi: "ई-रिक्शा बैटरी" }, body: { en: "High-cycle traction batteries for longer daily range.", hi: "ज़्यादा रोज़ाना रेंज के लिए हाई-साइकिल ट्रैक्शन बैटरी।" } },
    { icon: "home", title: { en: "Solar Rooftop Kits", hi: "सोलर रूफटॉप किट" }, body: { en: "Complete Okaya solar packages installed by our team.", hi: "पूरा ओकाया सोलर पैकेज, हमारी टीम द्वारा इंस्टॉल।" } },
  ] as { icon: string; title: L; body: L }[],
  dealerTitle: { en: "Become an Okaya dealer with us", hi: "हमारे साथ ओकाया डीलर बनें" },
  dealerBody: {
    en: "Shop owner in Kumaon or Terai? Get genuine Okaya stock, quick replenishment and warranty support from your local distributor.",
    hi: "कुमाऊँ या तराई में दुकान है? अपने लोकल डिस्ट्रीब्यूटर से असली ओकाया स्टॉक, जल्दी सप्लाई और वारंटी सपोर्ट पाएँ।",
  },
  dealerPoints: [
    { en: "Genuine stock with warranty", hi: "वारंटी के साथ असली स्टॉक" },
    { en: "Fast local replenishment", hi: "तेज़ लोकल सप्लाई" },
    { en: "Claim & service support", hi: "क्लेम और सर्विस सपोर्ट" },
    { en: "Marketing material", hi: "मार्केटिंग सामग्री" },
  ] as L[],
};

/* ------------------------------------------------------------------ */
/*  Team                                                               */
/*  To add a photo later: put the file in /images, map it in           */
/*  scripts/optimize-images.mjs, run `npm run images`, then set the     */
/*  `photo` id below.                                                  */
/* ------------------------------------------------------------------ */
export type Member = { name: string; nameHi: string; role: L; photo?: string };
export type Tier = { title: L; members: Member[] };

export const teamPage = {
  eyebrow: { en: "Our team", hi: "हमारी टीम" },
  title: { en: "The people powering Mathur Enterprises", hi: "माथुर एंटरप्राइजेज़ को चलाने वाले लोग" },
  sub: {
    en: "From the CEO's desk to the rooftop, meet the team behind every installation and every delivery.",
    hi: "CEO की मेज़ से छत तक, हर इंस्टॉलेशन और हर डिलीवरी के पीछे की टीम से मिलें।",
  },
};

export const team: Tier[] = [
  {
    title: { en: "Leadership", hi: "नेतृत्व" },
    members: [
      { name: "Aakash Mathur", nameHi: "आकाश माथुर", role: { en: "CEO, Mathur Enterprises", hi: "CEO, माथुर एंटरप्राइजेज़" }, photo: "team-aakash-mathur" },
    ],
  },
  {
    title: { en: "Department Heads", hi: "विभाग प्रमुख" },
    members: [
      { name: "Sunil Kumar Diwakar", nameHi: "सुनील कुमार दिवाकर", role: { en: "Sales Manager, Uttarakhand & UP", hi: "सेल्स मैनेजर, उत्तराखंड और यूपी" }, photo: "team-sunil-diwakar" },
      { name: "Dharmveer Singh Mourya", nameHi: "धर्मवीर सिंह मौर्य", role: { en: "Head of Sales, E-Rickshaw & E-Scooty", hi: "सेल्स हेड, ई-रिक्शा और ई-स्कूटी" }, photo: "team-dharmveer-mourya" },
      { name: "Rohit Sharma", nameHi: "रोहित शर्मा", role: { en: "Service Head", hi: "सर्विस हेड" }, photo: "team-rohit-sharma" },
      { name: "Ankit Diwakar", nameHi: "अंकित दिवाकर", role: { en: "Solar Plant Installation Head", hi: "सोलर प्लांट इंस्टॉलेशन हेड" }, photo: "team-ankit-diwakar" },
    ],
  },
  {
    title: { en: "Branch Managers", hi: "ब्रांच मैनेजर" },
    members: [
      { name: "Bagwati Chouhan", nameHi: "भगवती चौहान", role: { en: "Manager, Haldwani", hi: "मैनेजर, हल्द्वानी" }, photo: "team-bagwati-chouhan" },
      { name: "Ravi Sharma", nameHi: "रवि शर्मा", role: { en: "Manager, Kashipur Solar House", hi: "मैनेजर, काशीपुर सोलर हाउस" } },
      { name: "Darwara Singh", nameHi: "दरवारा सिंह", role: { en: "Branch Manager, Kashipur", hi: "ब्रांच मैनेजर, काशीपुर" }, photo: "team-darwara-singh" },
      { name: "Anuj Sharma", nameHi: "अनुज शर्मा", role: { en: "Branch Manager, Lalkuan Solar House", hi: "ब्रांच मैनेजर, लालकुआँ सोलर हाउस" }, photo: "team-anuj-sharma" },
      { name: "Amit Diwakar", nameHi: "अमित दिवाकर", role: { en: "Branch Manager, Pantnagar", hi: "ब्रांच मैनेजर, पंतनगर" }, photo: "team-amit-diwakar" },
      { name: "Sanjay Choudhary", nameHi: "संजय चौधरी", role: { en: "Branch Manager, Halduchaur", hi: "ब्रांच मैनेजर, हल्दूचौड़" } },
      { name: "Jay Nagar Solar House", nameHi: "जय नगर सोलर हाउस", role: { en: "Sales Manager, Jay Nagar", hi: "सेल्स मैनेजर, जय नगर" }, photo: "team-jay-nagar" },
    ],
  },
  {
    title: { en: "Sales & Solar Advisors", hi: "सेल्स और सोलर सलाहकार" },
    members: [
      { name: "Lakhan Singh Bisht", nameHi: "लखन सिंह बिष्ट", role: { en: "Sales Manager, Dist. Nainital", hi: "सेल्स मैनेजर, ज़िला नैनीताल" } },
      { name: "Rahul Goswami", nameHi: "राहुल गोस्वामी", role: { en: "Solar Advisor, Haldwani", hi: "सोलर सलाहकार, हल्द्वानी" } },
      { name: "Shashi Kohli", nameHi: "शशि कोहली", role: { en: "Solar Advisor, Dist. Nainital", hi: "सोलर सलाहकार, ज़िला नैनीताल" } },
      { name: "Vivek Kumar", nameHi: "विवेक कुमार", role: { en: "Solar Advisor, Kashipur", hi: "सोलर सलाहकार, काशीपुर" } },
      { name: "Rishab Bhatnagar", nameHi: "ऋषभ भटनागर", role: { en: "Solar Advisor, Bareilly", hi: "सोलर सलाहकार, बरेली" } },
    ],
  },
  {
    title: { en: "Service & Accounts", hi: "सर्विस और अकाउंट्स" },
    members: [
      { name: "Parmod Kumar", nameHi: "प्रमोद कुमार", role: { en: "Service Engineer", hi: "सर्विस इंजीनियर" } },
      { name: "Anirudh Tripathi", nameHi: "अनिरुद्ध त्रिपाठी", role: { en: "Service Engineer, Uttarakhand", hi: "सर्विस इंजीनियर, उत्तराखंड" } },
      { name: "Prakash Melkani", nameHi: "प्रकाश मेलकानी", role: { en: "Accounts Department", hi: "अकाउंट्स विभाग" } },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Branches                                                           */
/* ------------------------------------------------------------------ */
export const branches: { name: L; area: L; tags: VerticalKey[]; hq?: boolean; image?: string }[] = [
  { name: { en: "Haldwani HQ", hi: "हल्द्वानी मुख्यालय" }, area: { en: "Haldwani Solar House & E-Scooty Showroom, Dahariya", hi: "हल्द्वानी सोलर हाउस और ई-स्कूटी शोरूम, दहरिया" }, tags: ["solar", "rajhans", "okaya"], hq: true, image: "store-haldwani" },
  { name: { en: "Kashipur Solar House", hi: "काशीपुर सोलर हाउस" }, area: { en: "Kashipur, Udham Singh Nagar", hi: "काशीपुर, ऊधम सिंह नगर" }, tags: ["solar"], image: "moment-kashipur-opening" },
  { name: { en: "Lalkuan Solar House", hi: "लालकुआँ सोलर हाउस" }, area: { en: "Sanjay Nagar, Lalkuan", hi: "संजय नगर, लालकुआँ" }, tags: ["solar"], image: "store-lalkuan" },
  { name: { en: "Kichha", hi: "किच्छा" }, area: { en: "Rajhans Auto Agency", hi: "राजहंस ऑटो एजेंसी" }, tags: ["rajhans"] },
  { name: { en: "Pantnagar", hi: "पंतनगर" }, area: { en: "Branch office", hi: "ब्रांच ऑफ़िस" }, tags: ["solar"] },
  { name: { en: "Halduchaur", hi: "हल्दूचौड़" }, area: { en: "Branch office", hi: "ब्रांच ऑफ़िस" }, tags: ["solar"] },
  { name: { en: "Jay Nagar Solar House", hi: "जय नगर सोलर हाउस" }, area: { en: "Branch office", hi: "ब्रांच ऑफ़िस" }, tags: ["solar"] },
];

/* ------------------------------------------------------------------ */
/*  Awards & moments                                                   */
/* ------------------------------------------------------------------ */
export const awards: { id: string; title: L; body: L; year: string }[] = [
  { id: "award-reda", year: "2026", title: { en: "REDA RenewX 2026", hi: "REDA रिन्यूएक्स 2026" }, body: { en: "Honoured by the Renewable Energy Development Association, Uttarakhand.", hi: "रिन्यूएबल एनर्जी डेवलपमेंट एसोसिएशन, उत्तराखंड द्वारा सम्मानित।" } },
  { id: "award-uk2047", year: "2026", title: { en: "Uttarakhand 2047 Conference", hi: "उत्तराखंड 2047 सम्मेलन" }, body: { en: "Recognised for contribution to clean energy in the state.", hi: "राज्य में स्वच्छ ऊर्जा में योगदान के लिए सम्मान।" } },
  { id: "award-havells", year: "2025", title: { en: "Havells Appreciation", hi: "हैवेल्स सम्मान" }, body: { en: "Certificate of Appreciation for outstanding partnership.", hi: "उत्कृष्ट साझेदारी के लिए प्रशंसा प्रमाणपत्र।" } },
  { id: "moment-solarpreneur", year: "2025", title: { en: "LUNO Solarpreneur", hi: "लूनो सोलरप्रेन्योर" }, body: { en: "Celebrated among top solar entrepreneurs at the LUNO meet.", hi: "लूनो मीट में शीर्ष सोलर उद्यमियों में शामिल।" } },
];

export const moments: { id: string; caption: L }[] = [
  { id: "moment-team", caption: { en: "The Mathur family at our Haldwani showroom", hi: "हल्द्वानी शोरूम में माथुर परिवार" } },
  { id: "moment-opening", caption: { en: "A new branch opening", hi: "नई शाखा का उद्घाटन" } },
  { id: "ev-delivery-2", caption: { en: "E-rickshaw delivery day", hi: "ई-रिक्शा डिलीवरी का दिन" } },
  { id: "moment-kashipur-opening", caption: { en: "Kashipur Solar House", hi: "काशीपुर सोलर हाउस" } },
  { id: "moment-luno-event", caption: { en: "LUNO partner meet", hi: "लूनो पार्टनर मीट" } },
  { id: "moment-solastice", caption: { en: "Solastice launch", hi: "सोलास्टिस लॉन्च" } },
  { id: "ev-expo-team", caption: { en: "At the national EV expo", hi: "राष्ट्रीय EV एक्सपो में" } },
  { id: "moment-office-team", caption: { en: "PM Surya Ghar office, Haldwani", hi: "पीएम सूर्य घर ऑफ़िस, हल्द्वानी" } },
  { id: "moment-team-trip", caption: { en: "Team on the road", hi: "सफ़र पर टीम" } },
  { id: "moment-inauguration", caption: { en: "Where it began", hi: "जहाँ से शुरुआत हुई" } },
];
