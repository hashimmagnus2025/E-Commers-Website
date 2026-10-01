import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: "outline" | "solid" | "light";
  className?: string;
  external?: boolean;
}

/** Square-edged CTA. The arrow travels on hover and a fill wipes in. */
export function ButtonLink({ href, children, variant = "outline", className, external }: Props) {
  const cls = cn("btn", variant === "solid" && "btn-solid", variant === "light" && "btn-light", className);
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-cursor="open">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-cursor="open">
      {content}
    </Link>
  );
}

/** Understated text link with an underline that draws in from the left. */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("arrow-link eyebrow group inline-flex items-center gap-3", className)}>
      <span className="u-link">{children}</span>
      <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}
