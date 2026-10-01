import { photo } from "@/lib/utils";

export interface Collection {
  slug: string;
  title: string;
  season: string;
  description: string;
  image: string;
}

export const collections: Collection[] = [
  {
    slug: "The New Standard",
    title: "The New Standard",
    season: "Permanent",
    description: "The pieces we return to: the blazer, the shirt, the trouser. Re-cut each season until they disappear into a life.",
    image: photo("1483985988355-763728e1935b"),
  },
  {
    slug: "SS26",
    title: "SS26",
    season: "Spring / Summer 2026",
    description: "A study in light, line and movement. Dry cottons, cool silks and knits that breathe.",
    image: photo("1496747611176-843222e1e57c"),
  },
  {
    slug: "After Dark",
    title: "After Dark",
    season: "Evening edit",
    description: "Tailoring with a little less ceremony. Deep tones, long lines, and a quieter kind of occasion.",
    image: photo("1515886657613-9f3515b0c78f"),
  },
];

export const edits = [
  {
    title: "Women",
    href: "/shop?department=Women",
    note: "Tailoring, silk and fine knits",
    image: photo("1485230895905-ec40ba36b9bc", 1600),
    position: "50% 20%",
  },
  {
    title: "Men",
    href: "/shop?department=Men",
    note: "Soft tailoring, considered layers",
    image: photo("1516826957135-700dedea698c", 1400),
    position: "50% 25%",
  },
  {
    title: "Accessories",
    href: "/shop?department=Accessories",
    note: "Leather, eyewear, objects",
    image: photo("1548036328-c9fa89d128fa", 1200),
    position: "50% 50%",
  },
];
