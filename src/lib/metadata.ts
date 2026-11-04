import type { Content, ImageField } from "@prismicio/client";
import { asImageSrc, isFilled } from "@prismicio/client";
import type { Metadata } from "next";

import { localeConfig } from "@/i18n";

import { getSettings } from "./content";
import { docPath } from "./routes";

type Doc = Content.PageDocument | Content.NewsDocument;

function imageUrl(field: ImageField | undefined) {
  if (!isFilled.image(field)) return undefined;
  return field.url.startsWith("/")
    ? field.url
    : (asImageSrc(field, { width: 1200, height: 630, fit: "crop" }) ?? undefined);
}

export async function buildMetadata(doc: Doc, lang: string): Promise<Metadata> {
  const settings = await getSettings(lang);
  const siteName = settings.data.site_name ?? "Commando Museum";
  const isHome = doc.type === "page" && doc.uid === "home";

  const title = doc.data.meta_title || doc.data.title || siteName;
  const description =
    doc.data.meta_description ||
    (doc.type === "news" ? doc.data.excerpt : null) ||
    settings.data.meta_description ||
    undefined;
  const image =
    imageUrl(doc.data.meta_image) ??
    (doc.type === "news" ? imageUrl(doc.data.cover) : undefined) ??
    imageUrl(settings.data.meta_image);

  const fullTitle = isHome
    ? `${siteName} · ${settings.data.tagline ?? ""}`.replace(/ · $/, "")
    : `${title} · ${siteName}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: docPath(doc.type, doc.uid, doc.lang),
      languages: Object.fromEntries(
        [doc, ...doc.alternate_languages].map((alt) => [
          localeConfig(alt.lang).html,
          docPath(alt.type, alt.uid ?? null, alt.lang),
        ]),
      ),
    },
    openGraph: {
      title: fullTitle,
      description,
      siteName,
      type: doc.type === "news" ? "article" : "website",
      locale: localeConfig(lang).code.replace("-", "_"),
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}
