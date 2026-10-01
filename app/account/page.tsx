import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { AccountView } from "@/components/AccountView";

export const metadata: Metadata = { title: "Account", description: "Your Veloce account.", robots: { index: false } };

export default function AccountPage() {
  return (
    <>
      <PageHeader eyebrow="Your account" title="Account" />
      <div className="gutter pb-28"><AccountView /></div>
    </>
  );
}
