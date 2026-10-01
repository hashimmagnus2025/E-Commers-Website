import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SustainabilitySection } from "@/components/SustainabilitySection";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Newsletter } from "@/components/Newsletter";
import { photo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Veloce's approach to considered materials, production and longer-wearing design.",
  alternates: { canonical: "/sustainability" },
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our approach"
        title={<>Made to<br />stay with you.</>}
        copy="Responsible design is not a finish line. It is a series of practical choices, made more thoughtfully, from fibre to final fold."
      />
      <div className="gutter pb-20">
        <ParallaxImage src={photo("1525507119028-ed4c629a60a3", 2200)} alt="Fabric and tailoring detail" sizes="100vw" position="50% 40%" amount={8} className="aspect-[4/3] md:aspect-[16/8]" />
      </div>
      <SustainabilitySection link={false} />
      <Newsletter />
    </>
  );
}
