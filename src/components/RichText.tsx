import type { RichTextField } from "@prismicio/client";
import { asLink, isFilled } from "@prismicio/client";
import { PrismicRichText, type JSXMapSerializer } from "@prismicio/react";

import { linkResolver } from "@/lib/routes";

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    const url = asLink(node.data, { linkResolver }) ?? "#";
    const external = /^https?:/.test(url);
    return (
      <a href={url} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  },
};

type RichTextProps = {
  field: RichTextField | null | undefined;
  className?: string;
};

export function RichText({ field, className = "prose-museum" }: RichTextProps) {
  if (!isFilled.richText(field)) return null;
  return (
    <div className={className}>
      <PrismicRichText field={field} components={components} />
    </div>
  );
}

/** Rich text without wrapper styling, e.g. for leads and statements. */
export function InlineRichText({ field }: { field: RichTextField | null | undefined }) {
  if (!isFilled.richText(field)) return null;
  return (
    <PrismicRichText
      field={field}
      components={{ ...components, paragraph: ({ children }) => <p>{children}</p> }}
    />
  );
}
