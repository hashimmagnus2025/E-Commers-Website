import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { BrandStatement } from "@/components/BrandStatement";
import { CampaignSection } from "@/components/CampaignSection";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { ExploreEdits } from "@/components/ExploreEdits";
import { BrandStory } from "@/components/BrandStory";
import { HorizontalWorld } from "@/components/HorizontalWorld";
import { Materials } from "@/components/Materials";
import { MadeInIndia } from "@/components/MadeInIndia";
import { SustainabilitySection } from "@/components/SustainabilitySection";
import { Community } from "@/components/Community";
import { Testimonials } from "@/components/Testimonials";
import { JournalPreview } from "@/components/JournalPreview";
import { TrustStrip } from "@/components/TrustStrip";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: { absolute: "Veloce — Contemporary Essentials Designed for Movement" },
  description:
    "Veloce is a contemporary Indian fashion label. Spring / Summer 2026: quietly considered tailoring, knitwear and accessories, designed for movement.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <BrandStatement />
      <CampaignSection />
      <FeaturedCollection />
      <ExploreEdits />
      <BrandStory />
      <HorizontalWorld />
      <Materials />
      <MadeInIndia />
      <SustainabilitySection />
      <Community />
      <Testimonials />
      <JournalPreview />
      <TrustStrip />
      <Newsletter />
    </>
  );
}
