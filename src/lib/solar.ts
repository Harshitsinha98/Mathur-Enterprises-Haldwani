/** ~4 units/day per kW in the Terai & Kumaon foothills. */
export const UNITS_PER_KW_MONTH = 120;

/** PM Surya Ghar central subsidy: ₹30,000/kW up to 2 kW, ₹18,000 for the 3rd kW, capped at ₹78,000. */
export function centralSubsidy(kw: number) {
  if (kw <= 0) return 0;
  if (kw <= 2) return Math.round(kw * 30000);
  if (kw < 3) return Math.round(60000 + (kw - 2) * 18000);
  return 78000;
}

/** Recommended system size (0.5 kW steps, 1–10 kW) for a monthly consumption. */
export function recommendKw(unitsPerMonth: number) {
  return Math.max(1, Math.min(10, Math.round((unitsPerMonth / UNITS_PER_KW_MONTH) * 2) / 2));
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
