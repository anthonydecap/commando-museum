import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { Logo } from "@/components/Logo";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";

export type PortraitGridProps = SliceComponentProps<Content.PortraitGridSlice>;

const PortraitGrid = ({ slice }: PortraitGridProps) => {
  const p = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="border-t border-ink/10 bg-paper py-20 lg:py-28"
    >
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title}>
          {isFilled.richText(p.intro) && <InlineRichText field={p.intro} />}
        </SectionHeading>
        <ol className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:mt-16 lg:grid-cols-6">
          {p.people.map((person, i) => (
            <Reveal as="li" key={i} delay={(i % 6) * 50}>
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden bg-slate">
                  {isFilled.image(person.image) ? (
                    <Img
                      field={person.image}
                      fill
                      sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 50vw"
                      className="object-cover object-top grayscale-[20%]"
                    />
                  ) : (
                    <div className="grid h-full place-items-center">
                      <Logo className="h-14 w-auto opacity-30" />
                    </div>
                  )}
                </div>
                <figcaption className="mt-3">
                  {person.rank && (
                    <span className="block font-mono text-[0.68rem] tracking-[0.12em] text-teal uppercase">
                      {person.rank}
                    </span>
                  )}
                  <span className="display mt-1 block text-lg leading-tight">{person.name}</span>
                  {person.period && <span className="mt-1 block text-sm text-muted">{person.period}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default PortraitGrid;
