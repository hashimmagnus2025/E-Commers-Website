export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

/** Builds a sized Unsplash source URL. The Next image optimiser serves AVIF/WebP from it. */
export function photo(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;
}

export function pad(n: number, length = 2) {
  return String(n).padStart(length, "0");
}

export const SITE_URL = "https://veloce.example";
