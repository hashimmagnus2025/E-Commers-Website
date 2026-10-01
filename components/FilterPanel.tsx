"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, COLOR_FAMILIES, PRICE_RANGES, SIZES, type Department } from "@/data/products";

export interface Filters {
  department: Department | "All";
  categories: string[];
  sizes: string[];
  colors: string[];
  prices: string[];
}

export const emptyFilters = (department: Filters["department"] = "All"): Filters => ({
  department,
  categories: [],
  sizes: [],
  colors: [],
  prices: [],
});

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={title} className="border-b hairline pb-7 pt-6 first:pt-0">
      <p className="eyebrow mb-4" aria-hidden="true">{title}</p>
      {children}
    </div>
  );
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  showDepartment?: boolean;
  idPrefix?: string;
}

export function FilterPanel({ filters, onChange, showDepartment = true, idPrefix = "f" }: Props) {
  return (
    <div>
      {showDepartment && (
        <Group title="Department">
          <div className="flex flex-wrap gap-2">
            {(["All", "Women", "Men", "Accessories"] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={filters.department === d}
                onClick={() => onChange({ ...filters, department: d })}
                className={cn(
                  "eyebrow h-9 border px-3.5 transition-colors duration-300",
                  filters.department === d ? "border-ink bg-ink text-ivory" : "border-ink/20 hover:border-ink",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </Group>
      )}

      <Group title="Category">
        <ul className="space-y-3">
          {CATEGORIES.map((c) => {
            const on = filters.categories.includes(c);
            const id = `${idPrefix}-cat-${c}`;
            return (
              <li key={c}>
                <label htmlFor={id} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input id={id} type="checkbox" checked={on} onChange={() => onChange({ ...filters, categories: toggle(filters.categories, c) })} className="peer sr-only" />
                  <span className={cn("flex h-4 w-4 items-center justify-center border transition-colors peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4", on ? "border-ink bg-ink text-ivory" : "border-ink/30")}>
                    {on && <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />}
                  </span>
                  {c}
                </label>
              </li>
            );
          })}
        </ul>
      </Group>

      <Group title="Size">
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={filters.sizes.includes(s)}
              onClick={() => onChange({ ...filters, sizes: toggle(filters.sizes, s) })}
              className={cn(
                "eyebrow h-9 min-w-10 border px-2.5 transition-colors duration-300",
                filters.sizes.includes(s) ? "border-ink bg-ink text-ivory" : "border-ink/20 hover:border-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Colour">
        <div className="flex flex-wrap gap-3">
          {COLOR_FAMILIES.map((c) => {
            const on = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={on}
                aria-label={c.name}
                title={c.name}
                onClick={() => onChange({ ...filters, colors: toggle(filters.colors, c.name) })}
                className={cn("flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300", on ? "border-ink p-[3px]" : "border-ink/15 p-[3px] hover:border-ink/60")}
              >
                <span className="block h-full w-full rounded-full border border-black/10" style={{ background: c.hex }} />
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Price">
        <ul className="space-y-3">
          {PRICE_RANGES.map((r) => {
            const on = filters.prices.includes(r.id);
            const id = `${idPrefix}-price-${r.id}`;
            return (
              <li key={r.id}>
                <label htmlFor={id} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input id={id} type="checkbox" checked={on} onChange={() => onChange({ ...filters, prices: toggle(filters.prices, r.id) })} className="peer sr-only" />
                  <span className={cn("flex h-4 w-4 items-center justify-center border transition-colors peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4", on ? "border-ink bg-ink text-ivory" : "border-ink/30")}>
                    {on && <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />}
                  </span>
                  {r.label}
                </label>
              </li>
            );
          })}
        </ul>
      </Group>
    </div>
  );
}
