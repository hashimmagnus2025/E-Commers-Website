import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductBrowser } from "@/components/ProductBrowser";
import { CollectionBanner } from "@/components/CollectionBanner";
import { Newsletter } from "@/components/Newsletter";
import { collections } from "@/data/collections";

export const metadata: Metadata = {
  title: "Collections",
  description: "Veloce collections: The New Standard, SS26 and After Dark. Edited wardrobes for a life in motion.",
  alternates: { canonical: "/collections" },
};

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.edit) ? sp.edit[0] : sp.edit;
  const initial = collections.find((c) => c.title === raw)?.title ?? "";

  return (
    <>
      <PageHeader
        eyebrow="Spring / Summer 2026"
        title={<>The<br />collections</>}
        copy="Three edits, one idea: clothes that make room for the day. Move between them, or see everything at once."
      />
      <div className="gutter pb-24">
        <ProductBrowser
          key={initial}
          initial={{ collection: initial }}
          filterMode="drawer"
          pageSize={9}
          banner={<CollectionBanner />}
          showCollections
        />
      </div>
      <Newsletter />
    </>
  );
}
