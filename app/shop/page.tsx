import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductBrowser } from "@/components/ProductBrowser";
import { Newsletter } from "@/components/Newsletter";
import type { Department } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Shop all Veloce: tailoring, dresses, knitwear, trousers and accessories for a life in motion.",
  alternates: { canonical: "/shop" },
};

const DEPARTMENTS: Department[] = ["Women", "Men", "Accessories"];

export default async function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const dept = DEPARTMENTS.find((d) => d.toLowerCase() === one(sp.department)?.toLowerCase());
  const q = one(sp.q);
  const isNew = one(sp.new) === "1";

  return (
    <>
      <PageHeader
        eyebrow={isNew ? "New arrivals" : dept ?? "The full collection"}
        title={q ? <>Results<br />for “{q}”</> : <>Shop<br />all</>}
        copy="Tailoring, silk, knitwear and the objects that complete them. Cut for movement, made to be worn on repeat."
      />
      <div className="gutter pb-24">
        <ProductBrowser key={`${dept}-${q}-${isNew}`} initial={{ department: dept, q, isNew }} filterMode="sidebar" />
      </div>
      <Newsletter />
    </>
  );
}
