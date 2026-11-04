import type { MetadataRoute } from "next";

import { localeConfig } from "@/i18n";
import { getAllDocuments } from "@/lib/content";
import { docPath } from "@/lib/routes";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.museedescommandos.be";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getAllDocuments();
  return docs.map((doc) => ({
    url: `${site}${docPath(doc.type, doc.uid, doc.lang)}`,
    lastModified: new Date(doc.last_publication_date),
    alternates: {
      languages: Object.fromEntries(
        [doc, ...doc.alternate_languages].map((alt) => [
          localeConfig(alt.lang).html,
          `${site}${docPath(alt.type, alt.uid ?? null, alt.lang)}`,
        ]),
      ),
    },
  }));
}
