import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

import { Reveal } from "@/components/Reveal";
import { InlineRichText } from "@/components/RichText";

export type IntroStatementProps = SliceComponentProps<Content.IntroStatementSlice>;

const IntroStatement = ({ slice }: IntroStatementProps) => {
  const p = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-paper py-24 lg:py-36"
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            {p.eyebrow && <p className="eyebrow text-teal">{p.eyebrow}</p>}
            {p.title && <h2 className="display mt-4 text-2xl">{p.title}</h2>}
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal className="text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.15] font-light tracking-[-0.01em] text-ink">
              <PrismicRichText
                field={p.statement}
                components={{
                  paragraph: ({ children }) => <p>{children}</p>,
                  strong: ({ children }) => <strong className="font-normal text-teal">{children}</strong>,
                }}
              />
            </Reveal>
            {isFilled.richText(p.body) && (
              <Reveal delay={120} className="mt-10 max-w-2xl space-y-4 text-lg text-muted lg:ml-[25%]">
                <InlineRichText field={p.body} />
              </Reveal>
            )}
          </div>
        </div>

        {p.facts.length > 0 && (
          <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-28 lg:grid-cols-4">
            {p.facts.map((fact, i) => (
              <Reveal key={i} delay={i * 90} className="border-t-2 border-ink pt-5">
                <dt className="sr-only">{fact.label}</dt>
                <dd className="display text-6xl text-ink sm:text-7xl">{fact.value}</dd>
                <dd className="mt-3 max-w-[14rem] font-mono text-xs tracking-[0.12em] text-muted uppercase">
                  {fact.label}
                </dd>
              </Reveal>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
};

export default IntroStatement;
