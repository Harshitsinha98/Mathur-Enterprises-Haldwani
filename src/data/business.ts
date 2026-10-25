import type { L } from "../lib/i18n";
/**
 * Legal / registration details shown in the footer, legal pages and structured data.
 * Empty values are hidden automatically. Fill these from the GST and Udyam certificates.
 */
export const business = {
  legalName: "Mathur Enterprises",
  owner: "Aakash Mathur",
  /** 15-character GSTIN, e.g. "05ABCDE1234F1Z5" */
  gstin: "05BUFPA9021B1ZD",
  /** Udyam Registration Number, e.g. "UDYAM-UK-05-0000000" */
  udyam: "UDYAM-UK-07-0004996",
  /** Udyam category: "Micro" | "Small" | "Medium" */
  udyamCategory: "Micro",
  address: "42, Rudrapur–Haldwani Road, Dahariya, Haldwani, Distt. Nainital, Uttarakhand 263139",
  /** Shown as "last updated" on the legal pages. */
  legalUpdated: "11 October 2026",
  /** Verified registration certificates (PDFs in public/certificates). */
  certificates: [
    { key: "gst", label: { en: "GST Registration", hi: "जीएसटी रजिस्ट्रेशन" }, value: "05BUFPA9021B1ZD", file: "/certificates/mathur-enterprises-gst-certificate.pdf" },
    { key: "udyam", label: { en: "Udyam (MSME)", hi: "उद्यम (MSME)" }, value: "UDYAM-UK-07-0004996", file: "/certificates/mathur-enterprises-udyam-certificate.pdf" },
  ] as { key: string; label: L; value: string; file: string }[],
  /** Public listings, used as `sameAs` in structured data. */
  profiles: [
    "https://www.indiamart.com/mathur-enterprises-haldwani/",
    "https://www.justdial.com/Haldwani/Mathur-Enterprises-E-Rickshaw-Solar-Opposite-Shri-Balaji-Honda-Showroom-Dahariya/9999P5946-5946-230128181540-Y4W5_BZDET",
  ],
};
