import type { Content } from "@prismicio/client";
import { filter } from "@prismicio/client";

import { defaultLocale } from "@/i18n";
import { createClient } from "@/prismicio";
import { seedDocuments } from "@/seed";

/**
 * Content access. Prismic is the source of truth. Until the repository has
 * any published document, the bundled seed content is served instead so the
 * site is never empty (e.g. before the first migration release is published).
 * PRISMIC_USE_SEED=true forces the seed content, for local previews only.
 */

type Client = ReturnType<typeof createClient>;

async function isRepositoryEmpty(client: Client) {
  // Local preview of unpublished seed changes: PRISMIC_USE_SEED=true npm run dev
  if (process.env.PRISMIC_USE_SEED === "true") return true;
  // Errors are not treated as "empty": an outage must never put the seed copy online.
  const res = await client.get({ pageSize: 1, lang: "*" });
  return res.total_results_size === 0;
}

function seedOf<T extends Content.AllDocumentTypes["type"]>(type: T) {
  return seedDocuments.filter((d) => d.type === type) as unknown as Extract<Content.AllDocumentTypes, { type: T }>[];
}

export async function getSettings(lang: string): Promise<Content.SettingsDocument> {
  const client = createClient();
  if (await isRepositoryEmpty(client)) {
    const all = seedOf("settings");
    return all.find((d) => d.lang === lang) ?? all.find((d) => d.lang === defaultLocale)!;
  }
  return client
    .getSingle("settings", { lang })
    .catch(() => client.getSingle("settings", { lang: defaultLocale }));
}

export async function getPage(uid: string, lang: string) {
  const client = createClient();
  if (await isRepositoryEmpty(client)) {
    return seedOf("page").find((d) => d.uid === uid && d.lang === lang);
  }
  return client.getByUID("page", uid, { lang }).catch(() => undefined);
}

export async function getNewsPost(uid: string, lang: string) {
  const client = createClient();
  if (await isRepositoryEmpty(client)) {
    return seedOf("news").find((d) => d.uid === uid && d.lang === lang);
  }
  return client.getByUID("news", uid, { lang }).catch(() => undefined);
}

function sortNews(posts: Content.NewsDocument[]) {
  const time = (p: Content.NewsDocument) => new Date(p.data.date ?? p.first_publication_date).getTime();
  return [...posts].sort((a, b) => time(b) - time(a));
}

export async function getNews(lang: string, limit?: number) {
  const client = createClient();
  const posts = (await isRepositoryEmpty(client))
    ? seedOf("news").filter((d) => d.lang === lang)
    : await client.getAllByType("news", { lang });
  const sorted = sortNews(posts);
  return limit ? sorted.slice(0, limit) : sorted;
}

export async function getAllRoutes() {
  const client = createClient();
  if (await isRepositoryEmpty(client)) {
    return [...seedOf("page"), ...seedOf("news")].map((d) => ({
      type: d.type,
      uid: d.uid,
      lang: d.lang,
    }));
  }
  const docs = await client.dangerouslyGetAll({
    filters: [filter.any("document.type", ["page", "news"])],
    lang: "*",
  });
  return docs.map((d) => ({ type: d.type, uid: d.uid, lang: d.lang }));
}

/** Every page and news post with its language versions, for the sitemap. */
export async function getAllDocuments() {
  const client = createClient();
  const docs = (await isRepositoryEmpty(client))
    ? [...seedOf("page"), ...seedOf("news")]
    : await client.dangerouslyGetAll({
        filters: [filter.any("document.type", ["page", "news"])],
        lang: "*",
      });
  return docs as (Content.PageDocument | Content.NewsDocument)[];
}
