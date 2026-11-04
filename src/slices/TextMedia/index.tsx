import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { ButtonLink } from "@/components/ButtonLink";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";

export type TextMediaProps = SliceComponentProps<Content.TextMediaSlice>;

const tones = {
  light: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  dark: "bg-slate text-white",
} as const;

const TextMedia = ({ slice }: TextMediaProps) => {
  const p = slice.primary;
  const tone = (p.tone ?? "light") as keyof typeof tones;
  const dark = tone === "dark";
  const imageLeft = p.image_side === "left";
  const hasImage = isFilled.image(p.image);
  // Small archive scans are shown as a framed print rather than stretched to fill the column.
  const printWidth = isFilled.image(p.image) && p.image.dimensions.width < 800 ? p.image.dimensions.width : 0;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`relative overflow-hidden py-24 lg:py-32 ${tones[tone]}`}
    >
      {dark && <div className="knife-lines text-teal opacity-[0.08]" />}
      <div className="container-x relative">
        <div className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${hasImage ? "" : "max-w-4xl"}`}>
          {hasImage && (
            <Reveal className={`lg:col-span-6 ${imageLeft ? "" : "lg:order-2 lg:col-start-7"}`}>
              {printWidth ? (
                <figure
                  className="mx-auto w-full -rotate-[1.5deg] bg-[#f7f5ef] p-3 pb-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)] sm:p-4"
                  style={{ maxWidth: Math.round(printWidth * 1.25) }}
                >
                  <Img
                    field={p.image}
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="h-auto w-full grayscale"
                  />
                  {p.caption && (
                    <figcaption className="mt-3 font-mono text-[0.68rem] tracking-[0.12em] text-ink/60 uppercase">
                      {p.caption}
                    </figcaption>
                  )}
                </figure>
              ) : (
                <figure>
                  <div className="group relative overflow-hidden bg-ink/5">
                    <Img
                      field={p.image}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="h-auto w-full grayscale-[20%] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                    />
                  </div>
                  {p.caption && (
                    <figcaption
                      className={`mt-3 font-mono text-[0.7rem] tracking-[0.14em] uppercase ${dark ? "text-white/50" : "text-muted"}`}
                    >
                      {p.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </Reveal>
          )}
          <Reveal
            delay={120}
            className={
              hasImage ? (imageLeft ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5 lg:order-1") : ""
            }
          >
            {p.eyebrow && <p className={`eyebrow ${dark ? "text-teal-soft" : "text-teal"}`}>{p.eyebrow}</p>}
            {p.title && <h2 className="display mt-5 text-4xl sm:text-5xl lg:text-[3.6rem]">{p.title}</h2>}
            <RichText
              field={p.body}
              className={`prose-museum mt-8 ${dark ? "text-white/75" : "text-ink/80"}`}
            />
            {isFilled.link(p.link) && (
              <div
                className="mt-10"
                style={
                  {
                    "--btn-ghost-hover": dark ? "var(--color-slate)" : "var(--color-paper)",
                  } as React.CSSProperties
                }
              >
                <ButtonLink field={p.link} variant="arrow" />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TextMedia;
