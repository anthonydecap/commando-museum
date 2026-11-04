import type * as prismic from "@prismicio/client";

import { defaultLocale } from "@/i18n";
import { docPath } from "@/lib/routes";

import imageSizes from "./image-sizes.json";

/**
 * Helpers for authoring seed content in a compact form. The output has the
 * same shape as Prismic API responses, so it can be rendered directly and
 * pushed with `npm run seed:prismic`.
 */

type Span = prismic.RTInlineNode;

function parseInline(input: string): { text: string; spans: Span[] } {
  const spans: Span[] = [];
  let text = "";
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  for (const match of input.matchAll(pattern)) {
    text += input.slice(last, match.index);
    const start = text.length;
    if (match[1] !== undefined) {
      text += match[1];
      spans.push({ type: "strong", start, end: text.length } as Span);
    } else if (match[2] !== undefined) {
      text += match[2];
      spans.push({ type: "em", start, end: text.length } as Span);
    } else {
      text += match[3];
      const url = match[4];
      // [text](page:uid) links to another page document, [text](file:name.pdf) to a seed file
      const data = url.startsWith("page:")
        ? doc("page", url.slice(5))
        : url.startsWith("file:")
          ? file(url.slice(5))
          : { link_type: "Web", url, ...(url.startsWith("http") ? { target: "_blank" } : {}) };
      spans.push({ type: "hyperlink", start, end: text.length, data } as Span);
    }
    last = match.index! + match[0].length;
  }
  text += input.slice(last);
  return { text, spans };
}

/** Rich text from lines. Prefixes: "## ", "### ", "- ", "1. ". Inline: **bold**, *em*, [text](url), [text](page:uid). */
export function rt(...blocks: string[]): prismic.RichTextField {
  return blocks.map((block) => {
    const node = toNode(block);
    // Keep the source line (non-enumerable, so it never reaches Prismic) for translation.
    Object.defineProperty(node, "source", { value: block, enumerable: false });
    return node;
  }) as prismic.RichTextField;
}

/** The authoring source of a rich text node created with rt(). */
export function sourceOf(node: unknown): string | undefined {
  return (node as { source?: string } | null)?.source;
}

function toNode(block: string): prismic.RTNode {
  const rules: [RegExp, string][] = [
    [/^## /, "heading2"],
    [/^### /, "heading3"],
    [/^- /, "list-item"],
    [/^\d+\. /, "o-list-item"],
  ];
  for (const [re, type] of rules) {
    if (re.test(block)) {
      return { type, ...parseInline(block.replace(re, "")), direction: "ltr" } as prismic.RTNode;
    }
  }
  return { type: "paragraph", ...parseInline(block), direction: "ltr" } as prismic.RTNode;
}

export type SeedImage = prismic.FilledImageFieldImage & { credits?: string };

const sizes: Record<string, number[]> = imageSizes;

export function img(file: string, alt: string, credits = ""): SeedImage {
  if (!sizes[file]) throw new Error(`Unknown seed image: ${file}`);
  const [width, height] = sizes[file];
  return {
    id: file,
    url: `/seed/${file}`,
    alt,
    copyright: credits || null,
    credits,
    dimensions: { width, height },
    edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
  };
}

export const noImage = {} as prismic.EmptyImageFieldImage;

type DocType = "page" | "news";

/** Link to another document by UID. */
export function doc(type: DocType, uid: string, text?: string): prismic.LinkField {
  return {
    link_type: "Document",
    id: `seed-${type}-${uid}`,
    uid,
    type,
    lang: defaultLocale,
    tags: [],
    slug: uid,
    isBroken: false,
    url: docPath(type, uid, defaultLocale),
    ...(text ? { text } : {}),
  } as prismic.LinkField;
}

export function web(url: string, text?: string): prismic.LinkField {
  return {
    link_type: "Web",
    url,
    ...(url.startsWith("http") ? { target: "_blank" } : {}),
    ...(text ? { text } : {}),
  } as prismic.LinkField;
}

export const noLink = { link_type: "Any" } as prismic.LinkField;

/**
 * Link to a document (PDF, video) in public/seed/docs. The seed script uploads it to the Prismic
 * media library. Language versions of a file are mapped in src/seed/i18n/uids/*.json as
 * "file:<name>" → "<translated name>".
 */
export function file(name: string, text?: string): prismic.LinkField {
  return {
    link_type: "Media",
    id: `seed-file-${name}`,
    url: `/seed/docs/${name}`,
    name,
    kind: name.endsWith(".mp4") ? "video" : "document",
    size: "0",
    ...(text ? { text } : {}),
  } as prismic.LinkField;
}

let sliceCount = 0;

export function slice<T extends string>(
  slice_type: T,
  primary: Record<string, unknown>,
  variation = "default",
) {
  sliceCount += 1;
  return {
    id: `${slice_type}$seed-${sliceCount}`,
    slice_type,
    slice_label: null,
    variation,
    version: "initial",
    primary,
    items: [],
  };
}

export function document<T extends string>(
  type: T,
  uid: string | null,
  data: Record<string, unknown>,
  date = "2026-11-04T09:00:00+0000",
) {
  return {
    id: `seed-${type}-${uid ?? type}`,
    uid,
    url: null,
    type,
    href: "",
    tags: [],
    first_publication_date: date,
    last_publication_date: date,
    slugs: [],
    linked_documents: [],
    lang: defaultLocale,
    alternate_languages: [] as prismic.AlternateLanguage[],
    data,
  };
}
