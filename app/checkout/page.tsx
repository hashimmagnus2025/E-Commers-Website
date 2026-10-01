import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CheckoutView } from "@/components/CheckoutView";

export const metadata: Metadata = { title: "Checkout", description: "Complete your Veloce order.", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <>
      <PageHeader eyebrow="Secure checkout" title="Checkout" />
      <div className="gutter pb-28"><CheckoutView /></div>
    </>
  );
}
