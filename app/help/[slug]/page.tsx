import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Accordion } from "@/components/Accordion";
import { ButtonLink } from "@/components/Button";
import { FAQS, SIZE_CHARTS } from "@/data/site";
import { RETURNS_NOTE, SHIPPING_NOTE } from "@/data/products";

type Params = { slug: string };

const PAGES: Record<string, { title: string; eyebrow: string; description: string }> = {
  shipping: { title: "Shipping", eyebrow: "Help", description: "Delivery times, costs and tracking for Veloce orders." },
  returns: { title: "Returns", eyebrow: "Help", description: "Returns and exchanges within 14 days." },
  "size-guide": { title: "Size guide", eyebrow: "Help", description: "Measurements and fit for Veloce garments." },
  faqs: { title: "FAQs", eyebrow: "Help", description: "Answers to common questions about Veloce." },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PAGES[slug];
  return p ? { title: p.title, description: p.description, alternates: { canonical: `/help/${slug}` } } : { title: "Not found" };
}

function Chart({ name, chart }: { name: string; chart: (typeof SIZE_CHARTS)[keyof typeof SIZE_CHARTS] }) {
  return (
    <div>
      <h2 className="eyebrow">{name}</h2>
      <table className="mt-4 w-full text-left text-sm">
        <caption className="sr-only">{name} size chart in centimetres</caption>
        <thead>
          <tr className="border-b hairline">{chart.cols.map((c) => <th key={c} scope="col" className="eyebrow py-3 font-medium text-stone">{c}</th>)}</tr>
        </thead>
        <tbody>
          {chart.rows.map((r) => (
            <tr key={r[0]} className="border-b hairline">
              <th scope="row" className="num py-3.5 font-medium">{r[0]}</th>
              {r.slice(1).map((v, i) => <td key={i} className="num py-3.5">{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function HelpPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} copy={page.description} />
      <div className="gutter pb-28">
        <div className="max-w-3xl">
          {slug === "shipping" && (
            <Accordion
              items={[
                { title: "Delivery", content: <p>{SHIPPING_NOTE} Delivery within India takes 3–6 working days.</p> },
                { title: "Costs", content: <p>Complimentary shipping on orders over ₹5,000. Orders below this ship for ₹250.</p> },
                { title: "Tracking", content: <p>You will receive a tracking link by email as soon as your order is dispatched.</p> },
              ]}
            />
          )}
          {slug === "returns" && (
            <Accordion
              items={[
                { title: "Returns", content: <p>{RETURNS_NOTE}</p> },
                { title: "Exchanges", content: <p>Exchanges for another size are complimentary, subject to availability.</p> },
                { title: "How to begin", content: <p>Contact the studio with your order reference and we will arrange collection.</p> },
              ]}
            />
          )}
          {slug === "faqs" && <Accordion items={FAQS.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />}
          {slug === "size-guide" && (
            <div className="space-y-14">
              <Chart name="Womenswear" chart={SIZE_CHARTS.Women} />
              <Chart name="Menswear" chart={SIZE_CHARTS.Men} />
              <p className="text-sm leading-relaxed text-stone">Measurements are body measurements in centimetres. Between sizes? Choose the larger for a relaxed fit, the smaller for a closer line.</p>
            </div>
          )}
          <div className="mt-14"><ButtonLink href="/contact">Still need help?</ButtonLink></div>
        </div>
      </div>
    </>
  );
}
