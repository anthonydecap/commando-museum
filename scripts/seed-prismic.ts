/**
 * Pushes the bundled seed content to Prismic via the Migration API.
 *
 *   PRISMIC_WRITE_TOKEN=... npm run seed:prismic
 *     Creates every seed document that does not exist in Prismic yet.
 *
 *   PRISMIC_WRITE_TOKEN=... npm run seed:prismic -- --update=history,visit,settings
 *     Also overwrites the listed existing documents in every language (by UID of
 *     that language; "settings" for the
 *     settings document) with the seed version. --update=all updates every seed document. Documents that were edited in
 *     Prismic after their first publication are skipped unless --force is given.
 *
 * Add --dry-run to print the plan without sending anything.
 * Images already in the Prismic media library are reused by filename.
 * Everything lands in the "Migration release": review and publish it in Prismic.
 * Publish before running the script again: documents that are still in the
 * Migration release are not visible to it and would be created twice.
 */
import fs from "node:fs";
import path from "node:path";

import * as prismic from "@prismicio/client";

import config from "../slicemachine.config.json";
import { defaultLocale } from "../src/i18n";
import { seedDocuments } from "../src/seed";

const writeToken = process.env.PRISMIC_WRITE_TOKEN;
if (!writeToken) {
  console.error("Set PRISMIC_WRITE_TOKEN to a Prismic write API token.");
  process.exit(1);
}

const repositoryName = process.env.PRISMIC_REPOSITORY ?? config.repositoryName;
const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");
const updateList = new Set(
  (args.find((a) => a.startsWith("--update="))?.slice("--update=".length) ?? "").split(",").filter(Boolean),
);

const client = prismic.createClient(repositoryName);
const writeClient = prismic.createWriteClient(repositoryName, { writeToken });
const migration = prismic.createMigration();

type ExistingAsset = { id: string; filename: string; url: string } & Record<string, unknown>;

async function listAssets() {
  const assets = new Map<string, ExistingAsset>();
  let cursor: string | undefined;
  do {
    const url = new URL("https://asset-api.prismic.io/assets");
    url.searchParams.set("limit", "1000");
    if (cursor) url.searchParams.set("cursor", cursor);
    const res = await fetch(url, {
      headers: { repository: repositoryName, Authorization: `Bearer ${writeToken}` },
    });
    if (!res.ok) throw new Error(`Asset API: ${res.status} ${await res.text()}`);
    const body = (await res.json()) as { items: ExistingAsset[]; cursor?: string };
    for (const asset of body.items) assets.set(asset.filename, asset);
    cursor = body.items.length ? body.cursor : undefined;
  } while (cursor);
  return assets;
}

const assetCache = new Map<string, prismic.PrismicMigrationAsset>();
/** Documents registered in this migration, by type:uid:lang, for language-aware link resolution. */
const migrationDocs = new Map<string, prismic.PrismicMigrationDocument>();
let existingAssets = new Map<string, ExistingAsset>();
let uploads = 0;

function mimeType(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  return (
    { ".png": "image/png", ".pdf": "application/pdf", ".mp4": "video/mp4", ".gif": "image/gif" }[ext] ??
    "image/jpeg"
  );
}

function toMigration(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(toMigration);
  if (!value || typeof value !== "object") return value;

  const obj = value as Record<string, unknown>;

  // Seed file (PDF, video) → link to an existing asset or a new upload
  if (obj.link_type === "Media" && typeof obj.url === "string" && obj.url.startsWith("/seed/docs/")) {
    const filename = path.basename(obj.url);
    const text = typeof obj.text === "string" ? { text: obj.text } : {};
    const existing = existingAssets.get(filename);
    if (existing) return { link_type: "Media", id: existing.id, ...text };
    let asset = assetCache.get(filename);
    if (!asset) {
      const file = new File([fs.readFileSync(path.join("public", obj.url))], filename, {
        type: mimeType(filename),
      });
      asset = migration.createAsset(file, filename);
      assetCache.set(filename, asset);
      uploads++;
    }
    return { link_type: "Media", id: asset, ...text };
  }

  // Seed image → existing asset (referenced by id) or a new upload
  if (typeof obj.url === "string" && obj.url.startsWith("/seed/") && obj.dimensions) {
    const filename = path.basename(obj.url);
    const existing = existingAssets.get(filename);
    if (existing) {
      // The Migration API always uploads migration assets, so existing ones are referenced directly.
      return {
        id: existing.id,
        url: existing.url,
        alt: (obj.alt as string) || null,
        copyright: (obj.credits as string) || null,
        dimensions: obj.dimensions,
        edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
      };
    }
    let asset = assetCache.get(filename);
    if (!asset) {
      const file = new File([fs.readFileSync(path.join("public", obj.url))], filename, {
        type: mimeType(filename),
      });
      asset = migration.createAsset(file, filename, {
        alt: (obj.alt as string) || undefined,
        credits: (obj.credits as string) || undefined,
      });
      assetCache.set(filename, asset);
      uploads++;
    }
    return asset;
  }

  // Seed document link → content relationship resolved once all documents exist
  if (obj.link_type === "Document" && typeof obj.uid === "string" && typeof obj.type === "string") {
    const { type, uid, lang } = obj as { type: "page" | "news"; uid: string; lang: string };
    return {
      link_type: "Document",
      id: () =>
        migrationDocs.get(`${type}:${uid}:${lang}`) ??
        client.getByUID(type, uid, { lang }).catch(() => undefined),
      ...(obj.text ? { text: obj.text } : {}),
    };
  }

  // Slices: drop the generated seed ids
  if (typeof obj.slice_type === "string") {
    return {
      slice_type: obj.slice_type,
      variation: obj.variation,
      primary: toMigration(obj.primary),
      items: toMigration(obj.items),
    };
  }

  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, toMigration(v)]));
}

async function main() {
  existingAssets = await listAssets();
  const published = await client.dangerouslyGetAll({ lang: "*" });
  const key = (d: { type: string; uid?: string | null; lang: string }) =>
    `${d.type}:${d.uid ?? d.type}:${d.lang}`;
  const existingDocs = new Map(published.map((d) => [key(d), d]));

  const repository = await client.getRepository();
  const available = new Set(repository.languages.map((l) => l.id));
  const missingLocales = [...new Set(seedDocuments.map((d) => d.lang))].filter((l) => !available.has(l));
  // The Content API only lists locales that already have published documents, so a brand-new
  // locale can look missing. --skip-locale-check lets the Migration API validate it instead.
  if (missingLocales.length && !args.includes("--skip-locale-check")) {
    console.error(
      `Missing locales in Prismic: ${missingLocales.join(", ")}. Add them under Settings → Translations & locales first (or pass --skip-locale-check if they were just added).`,
    );
    process.exit(1);
  }

  const created: string[] = [];
  const updated: string[] = [];
  const skipped: string[] = [];

  for (const doc of seedDocuments) {
    const id = `${doc.uid ?? doc.type} (${doc.lang})`;
    const masterAlt = doc.alternate_languages.find((alt) => alt.lang === defaultLocale);
    const masterKey = masterAlt
      ? key({ type: masterAlt.type, uid: masterAlt.uid, lang: masterAlt.lang })
      : undefined;
    const title =
      doc.type === "settings" ? "Settings" : `${(doc.data as { title?: string }).title ?? doc.uid}`;
    const existing = existingDocs.get(key(doc));

    if (!existing) {
      const created_ = migration.createDocument(
        {
          type: doc.type,
          uid: doc.uid ?? undefined,
          lang: doc.lang,
          tags: [],
          data: toMigration(doc.data),
        } as Parameters<typeof migration.createDocument>[0],
        title,
        doc.lang !== defaultLocale && masterKey
          ? { masterLanguageDocument: () => migrationDocs.get(masterKey) ?? existingDocs.get(masterKey) }
          : undefined,
      );
      migrationDocs.set(key(doc), created_);
      created.push(id);
      continue;
    }

    if (!updateList.has("all") && !updateList.has(doc.uid ?? doc.type)) continue;
    if (existing.first_publication_date !== existing.last_publication_date && !force) {
      skipped.push(`${id} (edited in Prismic; use --force to overwrite)`);
      continue;
    }
    const updated_ = migration.updateDocument(
      { ...existing, data: toMigration(doc.data) } as Parameters<typeof migration.updateDocument>[0],
      title,
    );
    migrationDocs.set(key(doc), updated_);
    updated.push(id);
  }

  console.log(`Creating ${created.length}: ${created.join(", ") || "-"}`);
  console.log(`Updating ${updated.length}: ${updated.join(", ") || "-"}`);
  if (skipped.length) console.log(`Skipped: ${skipped.join(", ")}`);
  console.log(`Uploading ${uploads} new images and files; existing ones are reused.`);

  if (dryRun || (!created.length && !updated.length)) return;

  await writeClient.migrate(migration, {
    reporter: (event) => {
      if (event.type === "end" || event.type.endsWith(":creating") || event.type.endsWith(":updating")) {
        const d = event.data as { current?: number; total?: number };
        if (event.type === "end" || d.current === d.total || (d.current ?? 0) % 25 === 0) {
          console.log(event.type, d.current ?? "", d.total ?? "");
        }
      }
    },
  });

  console.log(`\nDone. Review and publish the Migration release of "${repositoryName}" in Prismic.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
