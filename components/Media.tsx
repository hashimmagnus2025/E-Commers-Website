"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  preload?: boolean;
  zoom?: number;
}

/** next/image that fills its parent and degrades to a tonal block if the source fails. */
export function Media({ src, alt, sizes, className, position, preload, zoom }: MediaProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={alt} className="absolute inset-0 bg-beige/60" />;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
      style={{ objectPosition: position, scale: zoom }}
    />
  );
}
