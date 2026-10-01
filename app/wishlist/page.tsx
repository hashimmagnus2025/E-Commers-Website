import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WishlistView } from "@/components/WishlistView";

export const metadata: Metadata = { title: "Wishlist", description: "Pieces you have saved at Veloce.", robots: { index: false } };

export default function WishlistPage() {
  return (
    <>
      <PageHeader eyebrow="Saved pieces" title="Wishlist" />
      <div className="gutter pb-28"><WishlistView /></div>
    </>
  );
}
