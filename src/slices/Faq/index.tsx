import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { Plus } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { InlineRichText, RichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq = ({ slice }: FaqProps) => {
  const p = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-sand py-24 lg:py-32"
    >
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={p.eyebrow} title={p.title}>
            {isFilled.richText(p.intro) && <InlineRichText field={p.intro} />}
          </SectionHeading>
        </div>
        <Reveal className="lg:col-span-8">
          <div className="border-t-2 border-ink">
            {p.items.map((item, i) => (
              <details key={i} className="group border-b border-ink/20" name={`faq-${slice.id}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="display text-xl sm:text-2xl">{item.question}</span>
                  <span className="grid size-10 shrink-0 place-items-center border border-ink/30 transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <Plus />
                  </span>
                </summary>
                <RichText field={item.answer} className="prose-museum pb-8 text-ink/80" />
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Faq;
