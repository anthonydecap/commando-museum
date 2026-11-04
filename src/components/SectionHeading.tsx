import type { ReactNode } from "react";

import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string | null;
  title?: string | null;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  children,
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  if (!eyebrow && !title && !children) return null;
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${tone === "dark" ? "text-teal-soft" : "text-teal"}`}>{eyebrow}</p>}
      {title && <h2 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>}
      {children && (
        <div className={`mt-6 text-lg ${tone === "dark" ? "text-white/75" : "text-muted"}`}>{children}</div>
      )}
    </Reveal>
  );
}
