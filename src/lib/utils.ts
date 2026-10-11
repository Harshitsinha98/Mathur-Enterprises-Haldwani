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

export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Mathur+Enterprises+Dahariya+Haldwani";
