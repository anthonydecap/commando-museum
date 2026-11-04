import type { LinkResolverFunction } from "@prismicio/client";

import { localeConfig } from "@/i18n";

/** The public URL of a document: /nl, /nl/bezoek, /nl/nieuws/slug, … */
export function docPath(type: string, uid: string | null | undefined, lang: string) {
  const locale = localeConfig(lang);
  const prefix = `/${locale.prefix}`;
  if (type === "news") return `${prefix}/${locale.news}/${uid}`;
  if (uid === "home" || !uid) return prefix;
  return `${prefix}/${uid}`;
}

/** Used for every Prismic link so URLs get the short language prefix. */
export const linkResolver: LinkResolverFunction = (doc) =>
  docPath(doc.type, (doc as { uid?: string | null }).uid, doc.lang);
