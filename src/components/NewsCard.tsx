import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import Link from "next/link";

import { getDictionary } from "@/i18n";
import { formatDate } from "@/lib/format";
import { docPath } from "@/lib/routes";

import { ArrowRight } from "./Icons";
import { Logo } from "./Logo";
import { Img } from "./Img";

type NewsCardProps = {
  post: Content.NewsDocument;
  readMore: string;
  featured?: boolean;
};

export function NewsCard({ post, readMore, featured = false }: NewsCardProps) {
  const d = post.data;
  const date = formatDate(d.date, post.lang);

  return (
    <Link
      href={docPath("news", post.uid, post.lang)}
      className={`group flex h-full flex-col ${featured ? "lg:grid lg:grid-cols-12 lg:gap-12" : ""}`}
    >
      <div
        className={`relative aspect-[3/2] overflow-hidden bg-slate ${featured ? "lg:col-span-7 lg:aspect-[16/10]" : ""}`}
      >
        {isFilled.image(d.cover) ? (
          <Img
            field={d.cover}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 55vw, 100vw"
                : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover grayscale-[40%] transition-[transform,filter] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div className="grid h-full place-items-center text-teal">
            <Logo className="h-20 w-auto opacity-25" />
          </div>
        )}
        {d.category && (
          <span className="absolute top-4 left-4 bg-paper px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.14em] text-ink uppercase">
            {getDictionary(post.lang).categories[d.category] ?? d.category}
          </span>
        )}
      </div>
      <div
        className={`flex flex-1 flex-col pt-6 ${featured ? "lg:col-span-5 lg:justify-center lg:pt-0" : ""}`}
      >
        {date && <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">{date}</p>}
        <h3
          className={`display mt-3 transition-colors group-hover:text-accent ${featured ? "text-4xl sm:text-5xl" : "text-2xl sm:text-[1.7rem]"}`}
        >
          {d.title}
        </h3>
        {d.excerpt && <p className={`mt-4 text-ink/70 ${featured ? "text-lg" : ""}`}>{d.excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-display text-sm tracking-[0.1em] uppercase">
          {readMore}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
