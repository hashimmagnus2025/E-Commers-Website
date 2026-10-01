import { photo } from "@/lib/utils";

export const campaign = {
  title: "The Veloce Campaign",
  season: "Spring / Summer 2026",
  lines: ["Made for movement.", "Built for everyday."],
  hero: photo("1496747611176-843222e1e57c", 2400),
  chapters: [
    {
      number: "01",
      title: "Form",
      copy: "Every Veloce piece begins as a silhouette. We draw the line first, then spend months asking the cloth to hold it: a shoulder that is felt but never seen, a trouser that finds its own drape.",
      image: photo("1515886657613-9f3515b0c78f", 1600),
      position: "50% 30%",
    },
    {
      number: "02",
      title: "Movement",
      copy: "Clothes are only finished when they are worn, walked in, sat in, folded over an arm. The campaign was shot between plans: on the way somewhere, never quite arrived.",
      image: photo("1529139574466-a303027c1d8b", 2400),
      position: "50% 40%",
    },
    {
      number: "03",
      title: "Texture",
      copy: "Dry wool, washed cotton, silk with a low, matte sheen. We look at fabric the way a photographer looks at light: closely, and for a long time.",
      images: [
        { src: photo("1525507119028-ed4c629a60a3", 1200), position: "50% 30%", zoom: 1 },
        { src: photo("1485968579580-b6d095142e6e", 1200), position: "40% 55%", zoom: 1.9 },
        { src: photo("1507679799987-c73779587ccf", 1200), position: "60% 60%", zoom: 2.2 },
        { src: photo("1483985988355-763728e1935b", 1200), position: "50% 50%", zoom: 1 },
      ],
    },
    {
      number: "04",
      title: "Everyday",
      copy: "The test of a good piece is the ordinary day. Morning, meeting, evening, a long way home. Veloce is made for that, and for the spaces in between.",
      image: photo("1485230895905-ec40ba36b9bc", 1600),
      position: "50% 25%",
    },
  ],
  shopSlugs: ["aurelia-tailored-blazer", "milano-relaxed-blazer", "mira-wide-leg-trousers", "siena-silk-dress"],
};

export const world = [
  { label: "Form", number: "01", image: photo("1515886657613-9f3515b0c78f", 1400), position: "50% 25%" },
  { label: "Texture", number: "02", image: photo("1525507119028-ed4c629a60a3", 1400), position: "50% 50%" },
  { label: "Movement", number: "03", image: photo("1529139574466-a303027c1d8b", 1400), position: "50% 30%" },
  { label: "Detail", number: "04", image: photo("1483985988355-763728e1935b", 1400), position: "50% 40%" },
  { label: "Everyday", number: "05", image: photo("1485230895905-ec40ba36b9bc", 1400), position: "50% 25%" },
];
