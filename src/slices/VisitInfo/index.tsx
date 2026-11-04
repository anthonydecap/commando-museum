import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicLink as PrismicNextLink } from "@/components/PrismicLink";
import type { SliceComponentProps } from "@prismicio/react";

import { ButtonLink } from "@/components/ButtonLink";
import { ArrowUpRight, MapPin } from "@/components/Icons";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";

export type VisitInfoProps = SliceComponentProps<Content.VisitInfoSlice>;

const VisitInfo = ({ slice }: VisitInfoProps) => {
  const p = slice.primary;

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

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <dl className="border-t-2 border-ink">
              {p.hours.map((row, i) => (
                <div
                  key={i}
                  className="grid gap-2 border-b border-ink/15 py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <dt>
                    <span className="display block text-2xl">{row.label}</span>
                    {row.note && <span className="mt-1 block text-muted">{row.note}</span>}
                  </dt>
                  <dd className="display text-4xl text-teal sm:text-right sm:text-5xl">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative overflow-hidden bg-slate text-white">
              {isFilled.image(p.image) && (
                <div className="relative aspect-[16/9]">
                  <Img
                    field={p.image}
                    fill
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover grayscale-[30%]"
                  />
                </div>
              )}
              <div className="p-8 sm:p-10">
                <p className="eyebrow text-teal-soft">
                  <MapPin className="size-4" />
                </p>
                <address className="mt-5 space-y-1 text-lg not-italic [&_strong]:display [&_strong]:text-2xl [&_strong]:font-semibold">
                  <InlineRichText field={p.address} />
                </address>
                {isFilled.link(p.map_link) && (
                  <PrismicNextLink
                    field={p.map_link}
                    className="mt-6 inline-flex items-center gap-2 font-display text-sm tracking-[0.1em] text-teal-soft uppercase hover:text-white"
                  >
                    {p.map_link.text || "Map"} <ArrowUpRight />
                  </PrismicNextLink>
                )}
                {isFilled.link(p.primary_link) && (
                  <div className="mt-8 border-t border-white/10 pt-8">
                    <ButtonLink field={p.primary_link} className="w-full justify-between" />
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default VisitInfo;
