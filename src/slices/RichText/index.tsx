import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { Reveal } from "@/components/Reveal";
import { RichText as RichTextField } from "@/components/RichText";

export type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

const RichText = ({ slice }: RichTextProps) => {
  const p = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-paper py-16 lg:py-20"
    >
      <div className="container-x">
        <div className="mx-auto max-w-[42rem]">
          {(p.eyebrow || p.title) && (
            <Reveal className="mb-10">
              {p.eyebrow && <p className="eyebrow text-teal">{p.eyebrow}</p>}
              {p.title && <h2 className="display mt-5 text-4xl sm:text-5xl">{p.title}</h2>}
            </Reveal>
          )}
          <Reveal>
            <RichTextField
              field={p.body}
              className="prose-museum text-lg text-ink/85 [&>p:first-child]:text-xl [&>p:first-child]:text-ink sm:[&>p:first-child]:text-2xl sm:[&>p:first-child]:leading-snug"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default RichText;
