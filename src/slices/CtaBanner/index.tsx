import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { ButtonLink } from "@/components/ButtonLink";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";

export type CtaBannerProps = SliceComponentProps<Content.CtaBannerSlice>;

const CtaBanner = ({ slice }: CtaBannerProps) => {
  const p = slice.primary;
  const hasImage = isFilled.image(p.image);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative isolate overflow-hidden bg-teal text-white"
    >
      {hasImage ? (
        <div className="absolute inset-0 -z-10">
          <Img field={p.image} fill sizes="100vw" className="object-cover grayscale" />
          <div className="absolute inset-0 bg-ink/80" />
        </div>
      ) : (
        <div className="knife-lines -z-10 text-white opacity-[0.12]" />
      )}
      <div className="container-x py-24 text-center lg:py-36">
        <Reveal className="mx-auto max-w-4xl">
          {p.eyebrow && (
            <p className={`eyebrow justify-center ${hasImage ? "text-teal-soft" : "text-white/80"}`}>
              {p.eyebrow}
            </p>
          )}
          <h2 className="display mt-6 text-[clamp(2.5rem,6.5vw,5.5rem)]">{p.title}</h2>
          {isFilled.richText(p.body) && (
            <div className={`mx-auto mt-8 max-w-2xl text-lg ${hasImage ? "text-white/75" : "text-white/85"}`}>
              <InlineRichText field={p.body} />
            </div>
          )}
          <div
            className="mt-12 flex flex-wrap justify-center gap-3"
            style={
              {
                "--btn-ghost-hover": hasImage ? "var(--color-ink)" : "var(--color-teal)",
              } as React.CSSProperties
            }
          >
            <ButtonLink field={p.primary_link} />
            <ButtonLink field={p.secondary_link} variant="ghost" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaBanner;
