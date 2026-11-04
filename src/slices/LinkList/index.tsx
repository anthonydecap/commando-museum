import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicLink as PrismicNextLink } from "@/components/PrismicLink";
import type { SliceComponentProps } from "@prismicio/react";

import { ArrowUpRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";

export type LinkListProps = SliceComponentProps<Content.LinkListSlice>;

const LinkList = ({ slice }: LinkListProps) => {
  const p = slice.primary;
  const groups = new Map<string, typeof p.items>();
  for (const item of p.items) {
    const key = item.category ?? "";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-paper py-24 lg:py-32"
    >
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title}>
          {isFilled.richText(p.intro) && <InlineRichText field={p.intro} />}
        </SectionHeading>

        <div className="mt-14 grid gap-12 md:grid-cols-3 lg:mt-20">
          {[...groups].map(([category, items], g) => (
            <Reveal key={category} delay={g * 100}>
              {category && (
                <h3 className="font-mono text-xs tracking-[0.14em] text-teal uppercase">{category}</h3>
              )}
              <ul className="mt-5 border-t-2 border-ink">
                {items.map((item, i) => {
                  const content = (
                    <>
                      <span>
                        <span className="display block text-xl">{item.name}</span>
                        {item.description && <span className="text-sm text-muted">{item.description}</span>}
                      </span>
                      {isFilled.link(item.link) && (
                        <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                      )}
                    </>
                  );
                  return (
                    <li key={i} className="border-b border-ink/15">
                      {isFilled.link(item.link) ? (
                        <PrismicNextLink
                          field={item.link}
                          className="group flex items-center justify-between gap-4 py-4 hover:text-accent"
                        >
                          {content}
                        </PrismicNextLink>
                      ) : (
                        <div className="flex items-center justify-between gap-4 py-4">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinkList;
