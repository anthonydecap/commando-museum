import type { LinkField } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicLink as PrismicNextLink } from "./PrismicLink";

import { ArrowRight, ArrowUpRight } from "./Icons";

type ButtonLinkProps = {
  field: LinkField;
  variant?: "primary" | "ghost" | "arrow";
  className?: string;
};

/** A Prismic link rendered as a button. External links get an outbound arrow. */
export function ButtonLink({ field, variant = "primary", className = "" }: ButtonLinkProps) {
  if (!isFilled.link(field)) return null;

  const external = field.link_type === "Web" && /^https?:/.test(field.url ?? "");
  const label = field.text || "Read more";
  const icon = external ? <ArrowUpRight /> : <ArrowRight />;

  return (
    <PrismicNextLink
      field={field}
      className={`${variant === "arrow" ? "link-arrow" : `btn btn-${variant}`} ${className}`}
    >
      <span>{label}</span>
      {icon}
    </PrismicNextLink>
  );
}
