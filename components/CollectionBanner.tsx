import { photo } from "@/lib/utils";
import { ParallaxImage } from "./ParallaxImage";
import { ButtonLink } from "./Button";
import { Heading } from "./Heading";

/** Full-width editorial interlude between product rows. */
export function CollectionBanner() {
  return (
    <aside aria-label="Campaign feature" className="relative isolate grid min-h-[28rem] overflow-hidden bg-ink text-paper md:min-h-[34rem]">
      <ParallaxImage src={photo("1507679799987-c73779587ccf", 2000)} alt="" sizes="100vw" position="50% 35%" amount={8} className="absolute inset-0 -z-10 !bg-ink" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" aria-hidden="true" />
      <div className="flex flex-col justify-end gap-6 p-6 md:p-12">
        <p className="eyebrow">Campaign 01 / 2026</p>
        <Heading as="h2" className="display display-md">Made for<br />movement.</Heading>
        <div>
          <ButtonLink href="/campaign" variant="light">Explore campaign</ButtonLink>
        </div>
      </div>
    </aside>
  );
}
