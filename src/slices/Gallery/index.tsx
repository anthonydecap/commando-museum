import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";

export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

/** Every three images form one large and two small tiles, alternating sides, so rows always close. */
const pattern = ["lg:col-span-2 lg:row-span-2", "", "", "", "lg:col-span-2 lg:row-span-2", ""];

const Gallery = ({ slice }: GalleryProps) => {
  const p = slice.primary;
  const images = p.images.filter((item) => isFilled.image(item.image));

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
        <ul
          className={`grid auto-rows-[16rem] grid-flow-dense gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[17rem] ${
            p.eyebrow || p.title ? "mt-14" : ""
          }`}
        >
          {images.map((item, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 70} className={`h-full ${pattern[i % pattern.length]}`}>
              <figure className="group relative h-full overflow-hidden bg-ink">
                <Img
                  field={item.image}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover grayscale-[25%] transition-[transform,filter] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
                />
                {item.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pt-10 pb-3 font-mono text-[0.68rem] tracking-[0.14em] text-white uppercase">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Gallery;
