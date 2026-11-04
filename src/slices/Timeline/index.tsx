import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";

export type TimelineProps = SliceComponentProps<Content.TimelineSlice>;

const Timeline = ({ slice }: TimelineProps) => {
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

        <ol className="relative mt-16 lg:mt-24">
          <span
            className="absolute top-2 bottom-2 left-[0.4rem] w-px bg-ink/15 lg:left-[calc(25%-0.5px)]"
            aria-hidden
          />
          {p.events.map((event, i) => {
            const hasImage = isFilled.image(event.image);
            return (
              <li
                key={i}
                className="relative grid gap-4 pb-16 pl-10 last:pb-0 lg:grid-cols-12 lg:gap-10 lg:pl-0 lg:pb-24"
              >
                <span
                  className="absolute top-3 left-0 size-[0.85rem] rounded-full border-2 border-paper bg-beret ring-1 ring-beret lg:left-[calc(25%-0.425rem)]"
                  aria-hidden
                />
                <Reveal className="lg:col-span-3 lg:pr-12 lg:text-right">
                  <p className="display text-5xl text-ink lg:text-6xl">{event.year}</p>
                </Reveal>
                <Reveal
                  delay={80}
                  className={`lg:col-span-9 lg:pl-12 ${hasImage ? "lg:grid lg:grid-cols-9 lg:gap-10" : ""}`}
                >
                  <div className={hasImage ? "lg:col-span-5" : "max-w-2xl"}>
                    <h3 className="display text-2xl sm:text-3xl">{event.title}</h3>
                    <div className="mt-4 space-y-3 text-ink/75 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_li+li]:mt-1">
                      <InlineRichText field={event.body} />
                    </div>
                  </div>
                  {hasImage && (
                    <figure className="mt-6 lg:col-span-4 lg:mt-1">
                      <div className="overflow-hidden bg-ink/5">
                        <Img
                          field={event.image}
                          sizes="(min-width: 1024px) 28vw, 100vw"
                          className="h-auto w-full grayscale"
                        />
                      </div>
                      {event.caption && (
                        <figcaption className="mt-2 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                          {event.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;
