"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { PRICE_RANGES, SORTS, products as all, type Product, type SortId } from "@/data/products";
import { cn } from "@/lib/utils";
import { CollectionPicker } from "./CollectionPicker";
import { Drawer } from "./Drawer";
import { FilterPanel, emptyFilters, type Filters } from "./FilterPanel";
import { ProductGrid } from "./ProductGrid";

interface Initial {
  department?: Filters["department"];
  collection?: string;
  q?: string;
  isNew?: boolean;
}

interface Props {
  initial?: Initial;
  /** `sidebar` shows filters inline on desktop; `drawer` always uses the drawer. */
  filterMode?: "sidebar" | "drawer";
  pageSize?: number;
  /** Rendered full width between the first and second page of products. */
  banner?: React.ReactNode;
  /** Show the collection hero + picker above the toolbar. */
  showCollections?: boolean;
}

export function applyFilters(list: Product[], f: Filters, collection: string, q: string, isNew: boolean, sort: SortId) {
  const needle = q.trim().toLowerCase();
  const out = list.filter((p) => {
    if (f.department !== "All" && p.department !== f.department) return false;
    if (collection && p.collection !== collection) return false;
    if (isNew && !p.isNew) return false;
    if (f.categories.length && !f.categories.includes(p.category)) return false;
    if (f.sizes.length && !p.sizes.some((s) => f.sizes.includes(s))) return false;
    if (f.colors.length && !p.colors.some((c) => f.colors.includes(c.family))) return false;
    if (f.prices.length && !PRICE_RANGES.some((r) => f.prices.includes(r.id) && p.price >= r.min && p.price <= r.max)) return false;
    if (needle && ![p.name, p.category, p.department, p.collection, p.description].join(" ").toLowerCase().includes(needle)) return false;
    return true;
  });
  const idx = (p: Product) => all.indexOf(p);
  switch (sort) {
    case "newest":
      return out.sort((a, b) => Number(b.isNew) - Number(a.isNew) || idx(a) - idx(b));
    case "price-asc":
      return out.sort((a, b) => a.price - b.price);
    case "price-desc":
      return out.sort((a, b) => b.price - a.price);
    default:
      return out.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || idx(a) - idx(b));
  }
}

export function ProductBrowser({ initial = {}, filterMode = "sidebar", pageSize = 9, banner, showCollections }: Props) {
  const [filters, setFilters] = useState<Filters>(emptyFilters(initial.department ?? "All"));
  const [collection, setCollection] = useState(initial.collection ?? "");
  const [sort, setSort] = useState<SortId>("featured");
  const [q, setQ] = useState(initial.q ?? "");
  const [isNew, setIsNew] = useState(!!initial.isNew);
  const [visible, setVisible] = useState(pageSize);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const results = useMemo(() => applyFilters(all, filters, collection, q, isNew, sort), [filters, collection, q, isNew, sort]);

  const activeCount = filters.categories.length + filters.sizes.length + filters.colors.length + filters.prices.length + (filters.department !== "All" ? 1 : 0) + (isNew ? 1 : 0) + (q ? 1 : 0);
  const shown = results.slice(0, visible);
  const resetKey = JSON.stringify([filters, collection, sort, q, isNew]);
  const sidebar = filterMode === "sidebar";

  const update = (f: Filters) => {
    setFilters(f);
    setVisible(pageSize);
  };
  const clear = () => {
    setFilters(emptyFilters());
    setQ("");
    setIsNew(false);
    setVisible(pageSize);
  };
  const chips: { label: string; remove: () => void }[] = [
    ...(filters.department !== "All" ? [{ label: filters.department, remove: () => update({ ...filters, department: "All" }) }] : []),
    ...(isNew ? [{ label: "New arrivals", remove: () => setIsNew(false) }] : []),
    ...(q ? [{ label: `“${q}”`, remove: () => setQ("") }] : []),
    ...filters.categories.map((c) => ({ label: c, remove: () => update({ ...filters, categories: filters.categories.filter((x) => x !== c) }) })),
    ...filters.sizes.map((c) => ({ label: `Size ${c}`, remove: () => update({ ...filters, sizes: filters.sizes.filter((x) => x !== c) }) })),
    ...filters.colors.map((c) => ({ label: c, remove: () => update({ ...filters, colors: filters.colors.filter((x) => x !== c) }) })),
    ...filters.prices.map((id) => ({ label: PRICE_RANGES.find((r) => r.id === id)?.label ?? id, remove: () => update({ ...filters, prices: filters.prices.filter((x) => x !== id) }) })),
  ];

  const first = banner ? shown.slice(0, 6) : shown;
  const second = banner ? shown.slice(6) : [];

  return (
    <div>
      {showCollections && (
        <CollectionPicker
          active={collection}
          onChange={(c) => {
            setCollection(c);
            setVisible(pageSize);
          }}
        />
      )}

      {/* toolbar */}
      <div className="sticky top-[var(--nav-h)] z-30 -mx-[var(--gutter)] border-y hairline bg-ivory/95 px-[var(--gutter)] backdrop-blur-sm lg:top-[68px]">
        <div className="flex min-h-14 items-center justify-between gap-4">
          <p className="eyebrow text-stone" aria-live="polite">
            <span className="num">{results.length}</span> {results.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="flex items-center gap-2 sm:gap-6">
            <button type="button" onClick={() => setFilterOpen(true)} className={cn("eyebrow flex h-11 items-center gap-2.5 px-2", sidebar && "lg:hidden")}>
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
              Filter{activeCount > 0 && <span className="num">({activeCount})</span>}
            </button>
            <button type="button" onClick={() => setSortOpen(true)} className="eyebrow flex h-11 items-center gap-2 px-2 sm:hidden">
              Sort
            </button>
            <div className="hidden items-center gap-3 sm:flex">
              <label htmlFor="sort" className="eyebrow text-stone">Sort</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortId);
                  setVisible(pageSize);
                }}
                className="eyebrow h-11 cursor-pointer border-0 bg-transparent pr-2 focus:outline-none focus-visible:outline-1"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pb-3">
            {chips.map((c) => (
              <button key={c.label} type="button" onClick={c.remove} className="eyebrow group flex h-8 items-center gap-2 border border-ink/20 px-3 transition-colors hover:border-ink">
                {c.label}
                <X className="h-3 w-3" strokeWidth={1.6} aria-label="Remove filter" />
              </button>
            ))}
            <button type="button" onClick={clear} className="eyebrow ml-2 text-stone"><span className="u-link">Clear all</span></button>
          </div>
        )}
      </div>

      <div className={cn("mt-10 gap-12", sidebar && "lg:grid lg:grid-cols-[15rem_1fr]")}>
        {sidebar && (
          <aside aria-label="Filters" className="hidden lg:block">
            <div className="sticky top-[140px] max-h-[calc(100svh-170px)] overflow-y-auto pr-4 no-scrollbar" data-lenis-prevent>
              <FilterPanel filters={filters} onChange={update} idPrefix="side" />
            </div>
          </aside>
        )}

        <div>
          {results.length === 0 ? (
            <div className="flex flex-col items-start gap-6 py-24">
              <p className="font-serif text-5xl leading-none md:text-6xl">Nothing here, yet.</p>
              <p className="max-w-sm text-stone">No pieces match these filters. Loosen a filter or begin again.</p>
              <button type="button" onClick={clear} className="btn">Clear all filters</button>
            </div>
          ) : (
            <>
              <ProductGrid products={first} resetKey={resetKey} className={sidebar ? "lg:grid-cols-3" : undefined} />
              {banner && <div className="my-16 md:my-24">{banner}</div>}
              {second.length > 0 && <ProductGrid products={second} offset={6} resetKey={resetKey} />}
              {results.length > pageSize && (
                <div className="mt-20 flex flex-col items-center gap-5">
                  <p className="eyebrow text-stone num">Showing {shown.length} of {results.length}</p>
                  <div className="h-px w-48 bg-ink/15">
                    <div className="h-px bg-ink transition-[width] duration-700 ease-[var(--ease-expo)]" style={{ width: `${(shown.length / results.length) * 100}%` }} />
                  </div>
                  {shown.length < results.length && (
                    <button type="button" onClick={() => setVisible((v) => v + pageSize)} className="btn">Load more</button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Drawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="Filter"
        footer={
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={clear} className="btn">Clear</button>
            <button type="button" onClick={() => setFilterOpen(false)} className="btn btn-solid">Show {results.length}</button>
          </div>
        }
      >
        <FilterPanel filters={filters} onChange={update} idPrefix="drawer" />
      </Drawer>

      <Drawer open={sortOpen} onClose={() => setSortOpen(false)} title="Sort">
        <ul>
          {SORTS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={sort === s.id}
                onClick={() => {
                  setSort(s.id);
                  setVisible(pageSize);
                  setSortOpen(false);
                }}
                className={cn("flex w-full items-center justify-between border-b hairline py-4 text-left text-sm", sort === s.id && "font-medium")}
              >
                {s.label}
                {sort === s.id && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
              </button>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
}
