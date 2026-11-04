import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";

export type QuoteProps = SliceComponentProps<Content.QuoteSlice>;

const tones = {
  light: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  dark: "bg-slate text-white",
} as const;

const Quote = ({ slice }: QuoteProps) => {
  const p = slice.primary;
  const tone = (p.tone ?? "light") as keyof typeof tones;
  const dark = tone === "dark";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`relative overflow-hidden py-24 lg:py-32 ${tones[tone]}`}
    >
      {dark && <div className="knife-lines text-teal opacity-[0.08]" />}
      <div className="container-x relative">
        <Reveal as="figure" className="mx-auto max-w-5xl">
          <span className="display block text-[7rem] leading-[0.6] text-accent" aria-hidden>
            “
          </span>
          <blockquote className="mt-4 text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.2] font-light tracking-[-0.01em]">
            <InlineRichText field={p.quote} />
          </blockquote>
          {p.attribution && (
            <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs tracking-[0.14em] uppercase">
              <span className="h-0.5 w-8 bg-beret" aria-hidden />
              <span>{p.attribution}</span>
              {p.role && <span className={dark ? "text-white/50" : "text-muted"}>{p.role}</span>}
            </figcaption>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default Quote;
