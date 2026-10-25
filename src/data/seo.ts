/** Per-route SEO metadata. Used at runtime (App) and at build time (scripts/seo.mts). No imports on purpose. */
export const routeMeta: Record<string, { title: string; description: string; priority: number }> = {
  "/": {
    title: "Mathur Enterprises Haldwani | Rooftop Solar, Rajhans E-Rickshaw & Okaya Batteries",
    description:
      "Mathur Enterprises, Haldwani (since 2018): rooftop solar with PM Surya Ghar subsidy up to ₹85,800, authorised Rajhans e-rickshaw dealer (Haldwani & Kichha) and Okaya inverter & battery distributor across Uttarakhand & UP.",
    priority: 1.0,
  },
  "/solar": {
    title: "Rooftop Solar in Haldwani & Kumaon | PM Surya Ghar Subsidy ₹85,800 | Mathur Enterprises",
    description:
      "On-grid, hybrid and off-grid rooftop solar in Haldwani, Kashipur, Lalkuan, Rudrapur and Bareilly. Free site survey, PM Surya Ghar registration, net-metering and subsidy up to ₹85,800.",
    priority: 0.9,
  },
  "/rajhans-ev": {
    title: "Rajhans E-Rickshaw Dealer Haldwani & Kichha | Finance Available | Mathur Enterprises",
    description:
      "Authorised RAJHANSev e-rickshaw dealer in Haldwani and Kichha: Prime, Plus, Pro Max, Samrat, Shaktiman, Cargo and Delivery Van. Easy finance, RTO help, test rides and e-scooties.",
    priority: 0.9,
  },
  "/okaya": {
    title: "Okaya Inverter & Battery Distributor Haldwani | Mathur Enterprises",
    description:
      "Authorised Okaya distributor in Haldwani: tubular inverter batteries, inverters & home UPS, solar inverters, solar batteries and e-rickshaw batteries. Dealer enquiries welcome.",
    priority: 0.8,
  },
  "/story": {
    title: "Our Story: From a Cycle Shop in Lalkuan (2005) to Mathur Enterprises | Haldwani",
    description:
      "The journey of Mathur Enterprises: a cycle shop in Lalkuan in 2005, e-rickshaws from 2016, Mathur Enterprises in 2018, electronics in Haldwani in 2019 and rooftop solar under PM Surya Ghar from 2024.",
    priority: 0.7,
  },
  "/team": {
    title: "Our Team | Mathur Enterprises, Haldwani",
    description: "Meet Director Aakash Mathur, CEO Kapil Mathur and the sales, solar installation, service and accounts team of Mathur Enterprises across Uttarakhand and UP.",
    priority: 0.5,
  },
  "/contact": {
    title: "Contact Mathur Enterprises Haldwani | +91 93687 80920",
    description:
      "Visit Mathur Enterprises at 42, Rudrapur–Haldwani Road, Dahariya, Haldwani (opp. Shri Balaji Honda Showroom). Call +91 93687 80920 or +91 90847 35451, WhatsApp or email Aakashmathur3@gmail.com.",
    priority: 0.8,
  },
  "/privacy": {
    title: "Privacy Policy | Mathur Enterprises",
    description: "How Mathur Enterprises, Haldwani handles information shared through this website, WhatsApp enquiries and the AI assistant.",
    priority: 0.2,
  },
  "/terms": {
    title: "Terms of Service | Mathur Enterprises",
    description: "Terms of use for the Mathur Enterprises website, including subsidy estimates, quotations, warranties and the AI assistant.",
    priority: 0.2,
  },
};
