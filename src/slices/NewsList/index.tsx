import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { ButtonLink } from "@/components/ButtonLink";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary } from "@/i18n";
import { getNews } from "@/lib/content";
import type { SliceContext } from "@/lib/slice-context";

export type NewsListProps = SliceComponentProps<Content.NewsListSlice, SliceContext>;

const NewsList = async ({ slice, context }: NewsListProps) => {
  const p = slice.primary;
  const dict = getDictionary(context.lang);
  const limit = p.limit && p.limit > 0 ? p.limit : undefined;
  const posts = await getNews(context.lang, limit);
  const [first, ...rest] = posts;
  const featureFirst = !limit && posts.length > 1;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-paper py-24 lg:py-32"
    >
      <div className="container-x">
        {(p.eyebrow || p.title) && (
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6 lg:mb-20">
            <SectionHeading eyebrow={p.eyebrow} title={p.title} />
            {isFilled.link(p.link) && <ButtonLink field={p.link} variant="arrow" />}
          </div>
        )}

        {posts.length === 0 && <p className="text-lg text-muted">{dict.noNews}</p>}

        {featureFirst && (
          <Reveal className="mb-16 border-b border-ink/15 pb-16 lg:mb-20 lg:pb-20">
            <NewsCard post={first} readMore={dict.readMore} featured />
          </Reveal>
        )}

        <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {(featureFirst ? rest : posts).map((post, i) => (
            <Reveal as="li" key={post.id} delay={(i % 3) * 90}>
              <NewsCard post={post} readMore={dict.readMore} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NewsList;
