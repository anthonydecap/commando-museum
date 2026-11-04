import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Fragment } from "react";

export type MarqueeProps = SliceComponentProps<Content.MarqueeSlice>;

const Marquee = ({ slice }: MarqueeProps) => {
  const words = (slice.primary.words ?? "")
    .split("/")
    .map((w) => w.trim())
    .filter(Boolean);
  if (!words.length) return null;

  const run = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="display px-6 text-3xl text-white sm:text-4xl">{word}</span>
          <span className="font-display text-2xl text-accent sm:text-3xl">/</span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden border-y border-white/10 bg-ink py-6"
    >
      <p className="sr-only">{words.join(", ")}</p>
      <div className="marquee-track flex w-max">
        {run(true)}
        {run(true)}
      </div>
    </section>
  );
};

export default Marquee;
