import { campaign } from "@/data/campaign";
import { ParallaxImage } from "./ParallaxImage";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./Button";
import { photo } from "@/lib/utils";

/** Cinematic homepage campaign block. */
export function CampaignSection() {
  return (
    <section aria-labelledby="campaign-title" className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper">
      <ParallaxImage
        src={photo("1529139574466-a303027c1d8b", 2400)}
        alt="Campaign photography: a model in motion wearing Veloce tailoring"
        sizes="100vw"
        position="50% 35%"
        amount={9}
        className="absolute inset-0 -z-10 !bg-ink"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" aria-hidden="true" />

      <div className="gutter flex min-h-[100svh] flex-col justify-between py-10 md:py-14">
        <div className="flex items-center justify-between">
          <p className="eyebrow"><span className="num">02</span> — {campaign.season}</p>
          <p className="eyebrow">Campaign 01</p>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Heading as="h2" className="display display-lg">
            <span id="campaign-title">The Veloce<br />Campaign</span>
          </Heading>
          <Reveal className="max-w-xs pb-2">
            <p className="font-serif text-3xl leading-[1.05]">
              {campaign.lines[0]}
              <br />
              {campaign.lines[1]}
            </p>
            <div className="mt-8">
              <ButtonLink href="/campaign" variant="light">Explore campaign</ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
