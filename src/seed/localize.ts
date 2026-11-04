import type * as prismic from "@prismicio/client";

import { docPath } from "@/lib/routes";

import { rt, sourceOf } from "./helpers";

/**
 * Builds translated seed documents from the English seed. Texts are looked up
 * in a dictionary (English → translation); rich text is rebuilt from its
 * translated source lines so formatting and links survive. Document links are
 * pointed at the translated UIDs.
 */

export type Dictionary = Record<string, string>;
export type UidMap = Record<string, string>;

/** Fields that hold codes, data or proper names, never prose. */
const SKIP_KEYS = new Set([
  "slice_type",
  "variation",
  "version",
  "id",
  "uid",
  "url",
  "link_type",
  "type",
  "lang",
  "tone",
  "image_side",
  "category",
  "youtube_url",
  "member_number",
  "born",
  "died",
  "entries",
  "slug",
  "target",
  "edit",
  "dimensions",
  "credits",
  "copyright",
  "tags",
  "date",
  "name",
  "kind",
  "size",
  "email",
  "phone",
]);

type Seed = {
  id: string;
  uid: string | null;
  type: string;
  lang: string;
  data: Record<string, unknown>;
} & Record<string, unknown>;

export function isRichText(value: unknown): value is prismic.RTNode[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (n) => n && typeof n === "object" && typeof (n as { type?: unknown }).type === "string" && "spans" in n,
    )
  );
}

/** Walks a value and calls `visit` for every translatable string or rich text source. */
export function collectStrings(value: unknown, visit: (text: string, key: string) => void, key = "") {
  if (isRichText(value)) {
    for (const node of value) {
      const source = sourceOf(node);
      if (source) visit(source, key);
    }
    return;
  }
  if (Array.isArray(value)) return value.forEach((v) => collectStrings(v, visit, key));
  if (!value || typeof value !== "object") {
    if (typeof value === "string" && key && !SKIP_KEYS.has(key)) visit(value, key);
    return;
  }
  const obj = value as Record<string, unknown>;
  if (obj.link_type === "Document" || obj.link_type === "Web") {
    if (typeof obj.text === "string") visit(obj.text, "link");
    return;
  }
  for (const [k, v] of Object.entries(obj)) {
    if (SKIP_KEYS.has(k)) continue;
    // Portraits carry military ranks and surnames, which stay as they are.
    if ("rank" in obj && (k === "rank" || k === "name")) continue;
    collectStrings(v, visit, k);
  }
}

function localizeLink(link: Record<string, unknown>, lang: string, uids: UidMap, tr: (s: string) => string) {
  if (link.link_type === "Media" && typeof link.name === "string") {
    const name = uids[`file:${link.name}`] ?? link.name;
    return {
      ...link,
      name,
      id: `seed-file-${name}`,
      url: `/seed/docs/${name}`,
      ...(typeof link.text === "string" ? { text: tr(link.text) } : {}),
    };
  }
  if (link.link_type !== "Document" || typeof link.uid !== "string") {
    return typeof link.text === "string" ? { ...link, text: tr(link.text) } : link;
  }
  const uid = uids[link.uid] ?? link.uid;
  const type = link.type as string;
  return {
    ...link,
    uid,
    slug: uid,
    lang,
    id: `seed-${type}-${uid}-${lang}`,
    url: docPath(type, uid, lang),
    ...(typeof link.text === "string" ? { text: tr(link.text) } : {}),
  };
}

export function localizeDocument<T extends Seed>(
  doc: T,
  lang: string,
  dict: Dictionary,
  uids: UidMap,
  missing?: Set<string>,
): T {
  const tr = (s: string) => {
    if (dict[s] !== undefined) return dict[s];
    if (missing && /[a-z]{3}/i.test(s)) missing.add(s);
    return s;
  };

  const walk = (value: unknown, key = ""): unknown => {
    if (isRichText(value)) {
      // An empty translation removes the block (e.g. a translation that is redundant in that language).
      const rebuilt = rt(...value.map((n) => tr(sourceOf(n) ?? ("text" in n ? n.text : ""))).filter(Boolean));
      for (const node of rebuilt) {
        if ("spans" in node) {
          node.spans = node.spans.map((span) =>
            span.type === "hyperlink"
              ? ({
                  ...span,
                  data: localizeLink(span.data as Record<string, unknown>, lang, uids, tr),
                } as typeof span)
              : span,
          );
        }
      }
      return rebuilt;
    }
    if (Array.isArray(value)) return value.map((v) => walk(v, key));
    if (!value || typeof value !== "object") {
      return typeof value === "string" && key && !SKIP_KEYS.has(key) ? tr(value) : value;
    }
    const obj = value as Record<string, unknown>;
    if (typeof obj.link_type === "string") return localizeLink(obj, lang, uids, tr);
    if (obj.dimensions && typeof obj.url === "string") {
      return { ...obj, alt: typeof obj.alt === "string" ? tr(obj.alt) : obj.alt };
    }
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        k,
        SKIP_KEYS.has(k) || ("rank" in obj && (k === "rank" || k === "name")) ? v : walk(v, k),
      ]),
    );
  };

  const uid = doc.uid ? (uids[doc.uid] ?? doc.uid) : null;
  return {
    ...doc,
    id: `seed-${doc.type}-${uid ?? doc.type}-${lang}`,
    uid,
    lang,
    alternate_languages: [],
    data: walk(doc.data) as T["data"],
  };
}
