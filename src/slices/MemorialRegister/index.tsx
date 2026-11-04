import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { Plus } from "@/components/Icons";
import { getDictionary } from "@/i18n";
import type { SliceContext } from "@/lib/slice-context";

export type MemorialRegisterProps = SliceComponentProps<Content.MemorialRegisterSlice, SliceContext>;

/**
 * One year of the In Memoriam register. Consecutive register slices form one
 * list; the two most recent years are expanded.
 */
const MemorialRegister = ({ slice, slices, context }: MemorialRegisterProps) => {
  const p = slice.primary;
  const dict = getDictionary(context.lang);
  const registers = slices.filter((s) => s.slice_type === "memorial_register");
  const position = registers.indexOf(slice);
  const isFirst = position === 0;
  const isLast = position === registers.length - 1;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`bg-paper ${isFirst ? "pt-20 lg:pt-28" : ""} ${isLast ? "pb-20 lg:pb-28" : ""}`}
    >
      <div className="container-x">
        <div className="mx-auto max-w-4xl">
          <details className="group border-b border-ink/15" open={position < 2}>
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden ${
                isFirst ? "border-t-2 border-ink" : ""
              }`}
            >
              <span className="flex items-baseline gap-4">
                <span className="display text-3xl">{p.year}</span>
                <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                  {p.entries.length} {p.entries.length === 1 ? dict.name : dict.names}
                </span>
              </span>
              <span className="grid size-9 shrink-0 place-items-center border border-ink/30 transition-transform duration-300 group-open:rotate-45">
                <Plus />
              </span>
            </summary>
            <div className="overflow-x-auto pb-6">
              <table className="w-full text-left text-sm">
                <thead className="font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">
                  <tr>
                    <th scope="col" className="py-2 pr-4 font-normal">
                      {dict.registerNo}
                    </th>
                    <th scope="col" className="py-2 pr-4 font-normal">
                      {dict.registerName}
                    </th>
                    <th scope="col" className="py-2 pr-4 font-normal">
                      {dict.registerBorn}
                    </th>
                    <th scope="col" className="py-2 font-normal">
                      {dict.registerDied}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p.entries.map((entry, i) => (
                    <tr key={i} className="border-t border-ink/10">
                      <td className="py-2.5 pr-4 font-mono text-xs text-muted">{entry.member_number}</td>
                      <td className="py-2.5 pr-4 font-medium text-ink">{entry.name}</td>
                      <td className="py-2.5 pr-4 whitespace-nowrap text-ink/70">{entry.born}</td>
                      <td className="py-2.5 whitespace-nowrap text-ink/70">{entry.died}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default MemorialRegister;
