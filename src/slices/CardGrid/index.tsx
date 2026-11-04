import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicLink as PrismicNextLink } from "@/components/PrismicLink";
import type { SliceComponentProps } from "@prismicio/react";

import { ArrowRight, ArrowUpRight } from "@/components/Icons";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";

export type CardGridProps = SliceComponentProps<Content.CardGridSlice>;

const tones = {
  light: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  dark: "bg-slate text-white",
} as const;

const CardGrid = ({ slice }: CardGridProps) => {
  const p = slice.primary;
  const tone = (p.tone ?? "light") as keyof typeof tones;
  const dark = tone === "dark";
  const cols =
    p.cards.length === 4 ? "lg:grid-cols-4" : p.cards.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`py-24 lg:py-32 ${tones[tone]}`}
    >
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} tone={dark ? "dark" : "light"}>
          {isFilled.richText(p.intro) && <InlineRichText field={p.intro} />}
        </SectionHeading>

        <ul className={`mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 ${cols}`}>
          {p.cards.map((card, i) => {
            const hasImage = isFilled.image(card.image);
            const hasLink = isFilled.link(card.link);
            const external = hasLink && card.link.link_type === "Web" && /^https?:/.test(card.link.url ?? "");

            const inner = (
              <>
                {hasImage && (
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-ink/10">
                    <Img
                      field={card.image}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale-[30%] transition-[transform,filter] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                )}
                <div
                  className={
                    hasImage
                      ? ""
                      : `flex h-full flex-col border-t-2 pt-6 ${dark ? "border-white" : "border-ink"}`
                  }
                >
                  {card.kicker && (
                    <p
                      className={
                        hasImage
                          ? "font-mono text-xs tracking-[0.14em] text-teal uppercase"
                          : "display text-5xl text-accent"
                      }
                    >
                      {card.kicker}
                    </p>
                  )}
                  <h3 className={`display ${hasImage ? "mt-3 text-3xl" : "mt-6 text-2xl"}`}>{card.title}</h3>
                  {card.body && (
                    <p className={`mt-3 ${dark ? "text-white/70" : "text-ink/70"}`}>{card.body}</p>
                  )}
                  {hasLink && (
                    <span className="mt-6 inline-flex items-center gap-2 font-display text-sm tracking-[0.1em] uppercase transition-colors group-hover:text-accent">
                      {card.link.text || "Read more"}
                      {external ? (
                        <ArrowUpRight />
                      ) : (
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <Reveal as="li" key={i} delay={i * 90} className="h-full">
                {hasLink ? (
                  <PrismicNextLink field={card.link} className="group flex h-full flex-col">
                    {inner}
                  </PrismicNextLink>
                ) : (
                  <div className="group flex h-full flex-col">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default CardGrid;
