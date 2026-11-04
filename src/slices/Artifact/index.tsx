import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { ButtonLink } from "@/components/ButtonLink";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";

export type ArtifactProps = SliceComponentProps<Content.ArtifactSlice>;

/** A collection object presented like a museum label: photo plate, story and specifications. */
const Artifact = ({ slice }: ArtifactProps) => {
  const p = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-fog py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <figure className="relative bg-white p-6 sm:p-10">
              <span
                className="absolute top-4 left-4 size-4 border-t-2 border-l-2 border-ink/30"
                aria-hidden
              />
              <span
                className="absolute top-4 right-4 size-4 border-t-2 border-r-2 border-ink/30"
                aria-hidden
              />
              <span
                className="absolute bottom-4 left-4 size-4 border-b-2 border-l-2 border-ink/30"
                aria-hidden
              />
              <span
                className="absolute right-4 bottom-4 size-4 border-r-2 border-b-2 border-ink/30"
                aria-hidden
              />
              <Img
                field={p.image}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="mx-auto h-auto max-h-[34rem] w-auto"
              />
              {p.caption && (
                <figcaption className="mt-6 border-t border-ink/10 pt-3 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                  {p.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:pt-6">
            {p.eyebrow && <p className="eyebrow text-teal">{p.eyebrow}</p>}
            <h2 className="display mt-5 text-4xl sm:text-5xl lg:text-[3.4rem]">{p.title}</h2>
            <RichText field={p.body} className="prose-museum mt-8 text-ink/80" />

            {p.specs.length > 0 && (
              <dl className="mt-10 border-t-2 border-ink">
                {p.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[8rem_1fr] gap-4 border-b border-ink/15 py-3.5 sm:grid-cols-[10rem_1fr]"
                  >
                    <dt className="font-mono text-xs tracking-[0.12em] text-muted uppercase">{spec.label}</dt>
                    <dd className="text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {isFilled.link(p.link) && (
              <div className="mt-10">
                <ButtonLink field={p.link} variant="arrow" />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Artifact;
