import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = { title: "Your Bag", description: "Review the pieces in your Veloce bag.", robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <PageHeader eyebrow="Your selection" title="The bag" />
      <div className="gutter pb-28"><CartView /></div>
    </>
  );
}
