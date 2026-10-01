import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  children?: React.ReactNode;
}

/** Standard top-of-page header for light pages (sits below the fixed nav). */
export function PageHeader({ eyebrow, title, copy, children }: Props) {
  return (
    <header className="gutter pb-12 pt-[calc(var(--nav-h)+4rem)] md:pb-16 md:pt-[calc(var(--nav-h)+6rem)]">
      <Reveal as="p" className="eyebrow text-stone" y={14}>{eyebrow}</Reveal>
      <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Heading as="h1" className="display display-lg">{title}</Heading>
        {copy && <Reveal as="p" className="max-w-sm pb-2 text-[0.9375rem] leading-relaxed text-stone" delay={0.3}>{copy}</Reveal>}
      </div>
      {children}
    </header>
  );
}
