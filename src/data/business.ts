/**
 * Legal / registration details shown in the footer, legal pages and structured data.
 * Empty values are hidden automatically. Fill these from the GST and Udyam certificates.
 */
export const business = {
  legalName: "Mathur Enterprises",
  owner: "Aakash Mathur",
  /** 15-character GSTIN, e.g. "05ABCDE1234F1Z5" */
  gstin: "",
  /** Udyam Registration Number, e.g. "UDYAM-UK-05-0000000" */
  udyam: "",
  /** Udyam category: "Micro" | "Small" | "Medium" */
  udyamCategory: "",
  address: "42, Rudrapur–Haldwani Road, Dahariya, Haldwani, Distt. Nainital, Uttarakhand 263139",
  /** Shown as "last updated" on the legal pages. */
  legalUpdated: "11 October 2026",
  /** Public listings, used as `sameAs` in structured data. */
  profiles: [
    "https://www.indiamart.com/mathur-enterprises-haldwani/",
    "https://www.justdial.com/Haldwani/Mathur-Enterprises-E-Rickshaw-Solar-Opposite-Shri-Balaji-Honda-Showroom-Dahariya/9999P5946-5946-230128181540-Y4W5_BZDET",
  ],
};
