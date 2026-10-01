import { photo } from "@/lib/utils";

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Campaign", href: "/campaign" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Women", href: "/shop?department=Women" },
      { label: "Men", href: "/shop?department=Men" },
      { label: "Accessories", href: "/shop?department=Accessories" },
      { label: "New Arrivals", href: "/shop?new=1" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Campaign", href: "/campaign" },
      { label: "Journal", href: "/journal" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping", href: "/help/shipping" },
      { label: "Returns", href: "/help/returns" },
      { label: "Size Guide", href: "/help/size-guide" },
      { label: "FAQs", href: "/help/faqs" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/", external: true },
      { label: "Pinterest", href: "https://www.pinterest.com/", external: true },
      { label: "Facebook", href: "https://www.facebook.com/", external: true },
    ],
  },
];

export const MARQUEE = ["Veloce", "New Collection", "Made in India", "Quiet Luxury", "Designed to Move"];

export const TRUST = [
  { title: "Complimentary shipping", sub: "On orders over ₹5,000" },
  { title: "14-day returns", sub: "Easy exchanges" },
  { title: "Secure checkout", sub: "Safe payments" },
  { title: "Considered materials", sub: "Thoughtful sourcing" },
];

export const TESTIMONIALS = [
  { quote: "The fit is unlike anything else I own. Every piece feels considered.", name: "Ananya R.", city: "Mumbai" },
  { quote: "The blazer is a quiet work of art. I reach for it before anything else.", name: "Kabir S.", city: "Bengaluru" },
  { quote: "I keep coming back. Veloce understands how to dress for an ordinary day.", name: "Meera T.", city: "Delhi" },
];

export const MATERIALS = [
  {
    label: "Fabric",
    title: "Dry, breathable wool",
    copy: "Light-weight blends chosen to hold a line in Indian summers.",
    image: photo("1507679799987-c73779587ccf", 1000),
    position: "30% 55%",
    zoom: 2.3,
  },
  {
    label: "Texture",
    title: "Brushed and washed",
    copy: "Cottons finished by hand until they feel familiar from the first wear.",
    image: photo("1485968579580-b6d095142e6e", 1000),
    position: "45% 50%",
    zoom: 2.1,
  },
  {
    label: "Construction",
    title: "Half-canvas and bias",
    copy: "Invisible structure inside; ease and drape outside.",
    image: photo("1515886657613-9f3515b0c78f", 1000),
    position: "60% 45%",
    zoom: 2.4,
  },
  {
    label: "Fit",
    title: "Tested across bodies",
    copy: "Every pattern is fitted on a range of frames before it is approved.",
    image: photo("1529139574466-a303027c1d8b", 1000),
    position: "50% 45%",
    zoom: 1.5,
  },
  {
    label: "Finish",
    title: "Edges, seams, hardware",
    copy: "Brushed metals, flat seams and hand-finished edges.",
    image: photo("1548036328-c9fa89d128fa", 1000),
    position: "50% 50%",
    zoom: 1.6,
  },
];

export const SUSTAINABILITY = [
  {
    title: "Responsibly sourced",
    copy: "Our aim is to favour natural, recycled and certified fibres where they make sense, and to know where each one comes from.",
    image: photo("1525507119028-ed4c629a60a3", 900),
    position: "50% 40%",
  },
  {
    title: "Considered production",
    copy: "Small runs, close partnerships and fewer, better styles: so we make less of what we do not need.",
    image: photo("1485968579580-b6d095142e6e", 900),
    position: "50% 50%",
  },
  {
    title: "Longer-wearing design",
    copy: "Quiet colour, strong construction and silhouettes that outlast a season. The most responsible garment is the one worn longest.",
    image: photo("1483985988355-763728e1935b", 900),
    position: "50% 35%",
  },
];

/** Demo community imagery. Handles are placeholders for sample content. */
export const COMMUNITY = [
  { image: photo("1483985988355-763728e1935b", 800), handle: "@sample.look_01", ratio: "aspect-[3/4]" },
  { image: photo("1515886657613-9f3515b0c78f", 800), handle: "@sample.look_02", ratio: "aspect-square" },
  { image: photo("1594938298603-c8148c4dae35", 800), handle: "@sample.look_03", ratio: "aspect-[4/5]" },
  { image: photo("1529139574466-a303027c1d8b", 800), handle: "@sample.look_04", ratio: "aspect-[3/5]" },
  { image: photo("1517841905240-472988babdf9", 800), handle: "@sample.look_05", ratio: "aspect-[4/5]" },
  { image: photo("1551488831-00ddcb6c6bd3", 800), handle: "@sample.look_06", ratio: "aspect-square" },
  { image: photo("1509631179647-0177331693ae", 800), handle: "@sample.look_07", ratio: "aspect-[3/4]" },
];

export const SIZE_CHARTS = {
  Women: {
    unit: "cm",
    cols: ["Size", "Bust", "Waist", "Hip"],
    rows: [
      ["XS", "80–84", "62–66", "86–90"],
      ["S", "85–89", "67–71", "91–95"],
      ["M", "90–94", "72–76", "96–100"],
      ["L", "95–99", "77–81", "101–105"],
      ["XL", "100–104", "82–86", "106–110"],
    ],
  },
  Men: {
    unit: "cm",
    cols: ["Size", "Chest", "Waist", "Hip"],
    rows: [
      ["S", "92–96", "78–82", "94–98"],
      ["M", "97–101", "83–87", "99–103"],
      ["L", "102–106", "88–92", "104–108"],
      ["XL", "107–111", "93–97", "109–113"],
      ["XXL", "112–116", "98–102", "114–118"],
    ],
  },
} as const;

export const FAQS = [
  { q: "Where is Veloce made?", a: "Our pieces are designed in New Delhi and made by partner ateliers across India." },
  { q: "How long does delivery take?", a: "Orders are dispatched within 2 working days. Delivery within India takes 3–6 working days." },
  { q: "Can I exchange a size?", a: "Yes. Exchanges are complimentary within 14 days of delivery, subject to availability." },
  { q: "How do I care for wool and silk pieces?", a: "Each product page lists care instructions. In general, we recommend dry cleaning tailoring and silk." },
  { q: "Is this a live store?", a: "This is a design preview. Bag and checkout interactions are demonstrations and no payments are taken." },
];
