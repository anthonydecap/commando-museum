import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicLink as PrismicNextLink } from "@/components/PrismicLink";
import type { SliceComponentProps } from "@prismicio/react";

import { ArrowUpRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";

export type DocumentListProps = SliceComponentProps<Content.DocumentListSlice>;

const DocumentList = ({ slice }: DocumentListProps) => {
  const p = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-paper py-20 lg:py-28"
    >
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title}>
          {isFilled.richText(p.intro) && <InlineRichText field={p.intro} />}
        </SectionHeading>
        <Reveal>
          <ul className="mt-12 border-t-2 border-ink lg:mt-16">
            {p.documents.map((doc, i) => {
              const links = [doc.link_1, doc.link_2, doc.link_3].filter((l) => isFilled.link(l));
              return (
                <li
                  key={i}
                  className="flex flex-col gap-4 border-b border-ink/15 py-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="display text-2xl">{doc.title}</h3>
                    {doc.meta && (
                      <p className="mt-1 font-mono text-xs tracking-[0.12em] text-muted uppercase">
                        {doc.meta}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {links.map((link, j) => (
                      <PrismicNextLink
                        key={j}
                        field={link}
                        className="inline-flex min-h-10 items-center gap-2 border border-ink/30 px-4 font-display text-sm tracking-[0.08em] uppercase transition-colors hover:border-beret hover:bg-beret hover:text-white"
                      >
                        {link.text || "Open"} <ArrowUpRight className="size-3.5" />
                      </PrismicNextLink>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default DocumentList;
