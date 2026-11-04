/**
 * Lists every translatable English string in the seed that is missing from a
 * dictionary, for translation into src/seed/i18n/<locale>/<part>.json.
 *
 *   npx tsx scripts/i18n-extract.ts <locale> [part]
 *
 * Writes src/seed/i18n/source.json ({ where, text }[]). With a part (core,
 * history, units, collection), only documents from that seed file are listed.
 */
import fs from "node:fs";

import { seedParts } from "../src/seed";
import { collectStrings } from "../src/seed/localize";
import { dictionaries } from "../src/seed/translations";

const locale = process.argv[2] ?? "fr-be";
const part = process.argv[3];
const existing = dictionaries[locale] ?? {};

const entries = new Map<string, string>();
for (const [name, docs] of Object.entries(seedParts)) {
  if (part && name !== part) continue;
  for (const doc of docs) {
    collectStrings(doc.data, (text, key) => {
      if (!/[a-z]{2}/i.test(text) || /^https?:/.test(text)) return;
      if (existing[text] !== undefined || entries.has(text)) return;
      entries.set(text, `${doc.type}:${doc.uid ?? doc.type}:${key}`);
    });
  }
}

const out = [...entries].map(([text, where]) => ({ where, text }));
fs.writeFileSync(`src/seed/i18n/source${part ? `-${part}` : ""}.json`, JSON.stringify(out, null, 1) + "\n");
console.log(out.length, "strings", JSON.stringify(out).length, "chars");
