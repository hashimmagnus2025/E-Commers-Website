import { photo } from "@/lib/utils";

export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  position?: string;
  body: string[];
  pullQuote: string;
}

export const articles: Article[] = [
  {
    slug: "the-art-of-everyday-dressing",
    title: "The Art of Everyday Dressing",
    category: "Field Notes",
    date: "06 February 2026",
    readTime: "5 min",
    excerpt: "A wardrobe is not a performance. It is a collection of small decisions that make the day feel like yours.",
    image: photo("1496747611176-843222e1e57c", 1800),
    position: "50% 25%",
    body: [
      "There is a particular pleasure in getting dressed without needing to think too hard. The right jacket. A shirt that has softened with time. Trousers that make walking feel easy.",
      "We think of this as the art of everyday dressing: not the dramatic outfit, but the accumulation of ordinary choices that, over a week, over a year, begin to look like a point of view.",
      "In the studio we talk about repetition. The best pieces are the ones worn on a Tuesday, then again on Thursday, then again in a different city. They become less like clothing and more like habit, and habit, done well, is a kind of style.",
      "This is where Veloce begins: with the belief that considered design should disappear into your life, leaving only the feeling of being ready for it.",
    ],
    pullQuote: "The best pieces are the ones worn on a Tuesday, then again on Thursday.",
  },
  {
    slug: "why-proportion-matters",
    title: "Why Proportion Matters",
    category: "Perspective",
    date: "28 January 2026",
    readTime: "4 min",
    excerpt: "Soft shoulders, generous lines and a new ease: why proportion does more than colour or print ever could.",
    image: photo("1507679799987-c73779587ccf", 1800),
    position: "50% 30%",
    body: [
      "Proportion is the quietest tool a designer has, and the most powerful. Move a hem by two centimetres, drop a shoulder by a finger's width, and the same cloth says something entirely different.",
      "Our tailoring keeps the language of precision but lets the wearer decide how formal the sentence becomes. A longer jacket over a shorter trouser. A wide leg that begins high and falls straight.",
      "We fit every piece on a range of bodies before it is approved, looking not for the perfect line on a single frame, but for the line that holds across them.",
      "When proportion is right, you stop noticing the garment and start noticing the person wearing it. That is the entire idea.",
    ],
    pullQuote: "Move a hem by two centimetres and the same cloth says something entirely different.",
  },
  {
    slug: "inside-the-veloce-studio",
    title: "Inside the Veloce Studio",
    category: "Studio",
    date: "14 January 2026",
    readTime: "6 min",
    excerpt: "A morning at the studio in New Delhi: pattern tables, fabric swatches, and a lot of quiet decisions.",
    image: photo("1485968579580-b6d095142e6e", 1800),
    position: "50% 40%",
    body: [
      "The studio is quiet in the mornings. Light comes in low across the pattern tables, and the first thing you notice is paper: toiles pinned to the wall, patterns hung from rails, small handwritten notes in the margins.",
      "Every collection begins here with a short list of words rather than a mood board. Last season the words were ease, dry, long. Those three words shaped nearly every decision that followed.",
      "Fittings happen in batches, always in daylight. A piece is approved only when it can be worn for a full day without anyone thinking about it.",
      "We are a small team, and we like it that way. It means the person who draws the line is usually in the room when it is first worn.",
    ],
    pullQuote: "Last season the words were ease, dry, long.",
  },
  {
    slug: "materials-we-return-to",
    title: "Materials We Return To",
    category: "Materials",
    date: "02 January 2026",
    readTime: "4 min",
    excerpt: "A closer look at the cottons, wools and silks behind every Veloce season, and why we keep coming back to them.",
    image: photo("1525507119028-ed4c629a60a3", 1800),
    position: "50% 50%",
    body: [
      "Material is the first thing the body understands. A dry cotton, a cool silk, a wool that holds its line but gives when you walk.",
      "We keep a short list of fabrics we trust and return to them each season, changing weight, weave and finish rather than starting over. It lets us make better decisions, and it lets you learn how a Veloce piece will feel.",
      "Each fabric is tested for how it folds, breathes, settles and softens over time. If it does not become more familiar with wear, it does not make the list.",
    ],
    pullQuote: "If it does not become more familiar with wear, it does not make the list.",
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
