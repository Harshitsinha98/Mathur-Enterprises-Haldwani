import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PHONE = "+91 93687 80920";
export const PHONE_RAW = "919368780920";

export function waLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${PHONE_RAW}${text}`;
}

export const telLink = `tel:+${PHONE_RAW}`;

export const PHONE2 = "+91 90847 35451";
export const tel2Link = "tel:+919084735451";
export const EMAIL = "Aakashmathur3@gmail.com";
export const mailLink = `mailto:${EMAIL}`;

export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Mathur+Enterprises+Dahariya+Haldwani";
