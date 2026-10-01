import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Veloce studio: orders, sizing, press and collaborations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title={<>Say<br />hello</>} copy="Questions about an order, a fit, or something else. We read everything." />
      <div className="gutter grid gap-16 pb-28 lg:grid-cols-12">
        <Reveal as="aside" className="space-y-10 lg:col-span-4">
          <div>
            <p className="eyebrow text-stone">Studio</p>
            <address className="mt-3 not-italic leading-relaxed">Veloce Studio<br />New Delhi, India</address>
          </div>
          <div>
            <p className="eyebrow text-stone">Client care</p>
            <p className="mt-3 leading-relaxed">hello@veloce.example<br />Mon – Sat, 10:00 – 18:00 IST</p>
          </div>
          <div>
            <p className="eyebrow text-stone">Response time</p>
            <p className="mt-3 leading-relaxed">Within two working days.</p>
          </div>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
