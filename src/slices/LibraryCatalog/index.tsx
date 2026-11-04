import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { LibrarySearch, type Book } from "@/components/LibrarySearch";
import { InlineRichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";
import library from "@/data/library.json";
import { getDictionary } from "@/i18n";
import type { SliceContext } from "@/lib/slice-context";

export type LibraryCatalogProps = SliceComponentProps<Content.LibraryCatalogSlice, SliceContext>;

/** The library catalogue lives in src/data/library.json (exported from the museum's spreadsheet). */
const LibraryCatalog = ({ slice, context }: LibraryCatalogProps) => {
  const p = slice.primary;
  const dict = getDictionary(context?.lang ?? "en-us");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-paper py-20 lg:py-28"
    >
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title}>
          {isFilled.richText(p.intro) && <InlineRichText field={p.intro} />}
        </SectionHeading>
        <LibrarySearch books={library as Book[]} labels={dict.library} />
      </div>
    </section>
  );
};

export default LibraryCatalog;
