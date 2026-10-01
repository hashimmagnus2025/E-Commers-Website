import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, copy, className, titleClassName, as = "h2" }: Props) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {eyebrow && <p className="eyebrow text-stone">{eyebrow}</p>}
      <Heading as={as} className={cn("display display-lg", titleClassName)}>
        {title}
      </Heading>
      {copy && (
        <Reveal as="p" className="max-w-md text-[0.9375rem] leading-relaxed text-stone">
          {copy}
        </Reveal>
      )}
    </div>
  );
}
