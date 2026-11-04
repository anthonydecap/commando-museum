import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { ButtonLink } from "@/components/ButtonLink";
import { ArrowDown } from "@/components/Icons";
import { Img } from "@/components/Img";
import { InlineRichText } from "@/components/RichText";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
  if (slice.variation === "page") return <PageHero slice={slice} />;
  const p = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
    >
      <div className="absolute inset-0 -z-10">
        <div className="slow-zoom absolute inset-0">
          <Img
            field={p.image}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%] grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent" />
      </div>

      <div className="container-x relative mt-auto pt-40 pb-14 lg:pb-20">
        {p.eyebrow && (
          <p
            className="eyebrow rise text-teal-soft"
            style={{ "--rise-delay": "150ms" } as React.CSSProperties}
          >
            {p.eyebrow}
          </p>
        )}
        <h1 className="display mt-6">
          <span
            className="rise block text-[clamp(3.6rem,13.5vw,12.5rem)] leading-[0.86]"
            style={{ "--rise-delay": "250ms" } as React.CSSProperties}
          >
            {p.title}
          </span>
          {p.subtitle && (
            <span
              className="rise mt-3 block text-[clamp(1.6rem,4.6vw,4.25rem)] font-normal tracking-[0.02em] text-teal-soft"
              style={{ "--rise-delay": "380ms" } as React.CSSProperties}
            >
              {p.subtitle}
            </span>
          )}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div
            className="rise max-w-xl text-lg text-white/80 sm:text-xl lg:col-span-6"
            style={{ "--rise-delay": "500ms" } as React.CSSProperties}
          >
            <InlineRichText field={p.lead} />
          </div>
          <div
            className="rise flex flex-wrap gap-3 lg:col-span-6 lg:justify-end"
            style={
              { "--rise-delay": "620ms", "--btn-ghost-hover": "var(--color-ink)" } as React.CSSProperties
            }
          >
            <ButtonLink field={p.primary_link} />
            <ButtonLink field={p.secondary_link} variant="ghost" />
          </div>
        </div>

        <div className="mt-14 flex items-end justify-between border-t border-white/15 pt-5 font-mono text-[0.68rem] tracking-[0.18em] text-white/55 uppercase">
          <span className="flex items-center gap-3">
            <span className="scroll-line relative block h-8 w-px overflow-hidden bg-white/20" aria-hidden />
            <ArrowDown className="size-3" />
          </span>
          <span className="hidden sm:block">50°59′N · 5°03′E</span>
          {p.image_credit && <span>{p.image_credit}</span>}
        </div>
      </div>
    </section>
  );
};

function PageHero({ slice }: { slice: Content.HeroSlice }) {
  if (slice.variation !== "page") return null;
  const p = slice.primary;
  const hasImage = isFilled.image(p.image);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative isolate overflow-hidden bg-slate text-white"
    >
      <div className="knife-lines -z-10 text-teal opacity-[0.12]" />
      <div className="container-x pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className={`grid gap-12 ${hasImage ? "lg:grid-cols-12 lg:items-end" : ""}`}>
          <div className={hasImage ? "lg:col-span-7" : "max-w-5xl"}>
            {p.eyebrow && (
              <p
                className="eyebrow rise text-teal-soft"
                style={{ "--rise-delay": "100ms" } as React.CSSProperties}
              >
                {p.eyebrow}
              </p>
            )}
            <h1
              className="display rise mt-6 text-[clamp(3rem,9vw,8rem)]"
              style={{ "--rise-delay": "200ms" } as React.CSSProperties}
            >
              {p.title}
            </h1>
            <div
              className="rise mt-8 max-w-2xl text-lg text-white/75 sm:text-xl"
              style={{ "--rise-delay": "320ms" } as React.CSSProperties}
            >
              <InlineRichText field={p.lead} />
            </div>
          </div>
          {hasImage && (
            <div className="rise lg:col-span-5" style={{ "--rise-delay": "400ms" } as React.CSSProperties}>
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
                <Img
                  field={p.image}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover grayscale-[35%]"
                />
                <div className="absolute inset-0 ring-1 ring-white/10 ring-inset" />
              </div>
              {p.image_credit && (
                <p className="mt-3 font-mono text-[0.68rem] tracking-[0.14em] text-white/50 uppercase">
                  {p.image_credit}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
