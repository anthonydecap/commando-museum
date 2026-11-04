import { isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "@/components/Icons";
import { Img } from "@/components/Img";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";
import { Shell } from "@/components/Shell";
import { getDictionary } from "@/i18n";
import { getAllRoutes, getNews, getNewsPost } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";
import { docPath } from "@/lib/routes";
import { components } from "@/slices";

export async function generateStaticParams() {
  const routes = await getAllRoutes();
  return routes.filter((r) => r.type === "news" && r.uid).map((r) => ({ lang: r.lang, uid: r.uid! }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/news/[uid]">): Promise<Metadata> {
  const { lang, uid } = await params;
  const post = await getNewsPost(uid, lang);
  return post ? buildMetadata(post, lang) : {};
}

export default async function NewsPost({ params }: PageProps<"/[lang]/news/[uid]">) {
  const { lang, uid } = await params;
  const post = await getNewsPost(uid, lang);
  if (!post) notFound();

  const dict = getDictionary(lang);
  const d = post.data;
  const date = formatDate(d.date, lang);
  const more = (await getNews(lang)).filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <Shell lang={lang} doc={post} overlay>
      <article>
        <header className="relative isolate overflow-hidden bg-slate text-white">
          <div className="knife-lines -z-10 text-teal opacity-[0.12]" />
          <div className="container-x pt-36 pb-16 lg:pt-44 lg:pb-20">
            <Link
              href={docPath("page", "news", lang)}
              className="rise inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-teal-soft uppercase hover:text-white"
            >
              <ArrowLeft className="size-3.5" /> {dict.backToNews}
            </Link>
            <p
              className="rise mt-10 flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.14em] uppercase"
              style={{ "--rise-delay": "100ms" } as React.CSSProperties}
            >
              {d.category && (
                <span className="bg-beret px-2.5 py-1 text-white">
                  {dict.categories[d.category] ?? d.category}
                </span>
              )}
              {date && (
                <time dateTime={d.date ?? undefined} className="text-white/60">
                  {date}
                </time>
              )}
            </p>
            <h1
              className="display rise mt-6 max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)]"
              style={{ "--rise-delay": "200ms" } as React.CSSProperties}
            >
              {d.title}
            </h1>
            {d.excerpt && (
              <p
                className="rise mt-8 max-w-2xl text-lg text-white/75 sm:text-xl"
                style={{ "--rise-delay": "300ms" } as React.CSSProperties}
              >
                {d.excerpt}
              </p>
            )}
          </div>
        </header>

        {isFilled.image(d.cover) && (
          <div className="bg-paper">
            <figure className="container-x pt-12 lg:pt-16">
              <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden bg-ink">
                <Img
                  field={d.cover}
                  fill
                  priority
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="object-cover"
                />
              </div>
              {d.cover_credit && (
                <figcaption className="mx-auto mt-3 max-w-5xl font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                  {d.cover_credit}
                </figcaption>
              )}
            </figure>
          </div>
        )}

        <SliceZone slices={d.slices} components={components} context={{ lang }} />
      </article>

      {more.length > 0 && (
        <section className="border-t border-ink/10 bg-paper py-24 lg:py-28">
          <div className="container-x">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 className="display text-4xl sm:text-5xl">{dict.moreNews}</h2>
              <Link href={docPath("page", "news", lang)} className="link-arrow">
                {dict.allNews}
              </Link>
            </div>
            <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p, i) => (
                <Reveal as="li" key={p.id} delay={i * 90}>
                  <NewsCard post={p} readMore={dict.readMore} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </Shell>
  );
}
