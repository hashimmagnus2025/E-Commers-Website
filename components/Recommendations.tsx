import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { ProductCard } from "./ProductCard";
import { TextLink } from "./Button";

/** You may also like: editorial offset grid on desktop, a snap scroller on mobile. */
export function Recommendations({ items }: { items: Product[] }) {
  return (
    <section aria-labelledby="also-title" className="gutter overflow-hidden border-t hairline py-20 md:py-32">
      <div className="flex items-end justify-between gap-6">
        <Heading as="h2" className="display display-md">
          <span id="also-title">You may<br />also like</span>
        </Heading>
        <div className="hidden pb-2 md:block">
          <TextLink href="/shop">Shop all</TextLink>
        </div>
      </div>
      <div className="no-scrollbar [contain:paint] md:[contain:none] -mx-[var(--gutter)] mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 md:mx-0 md:mt-16 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
        {items.map((p, i) => (
          <div key={p.id} className={cn("w-[68vw] shrink-0 snap-start sm:w-[44vw] md:w-auto", i % 2 === 1 && "md:mt-20")}>
            <ProductCard product={p} sizes="(min-width:768px) 22vw, 68vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
