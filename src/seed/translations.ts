import { docPath } from "@/lib/routes";

import frCollection from "./i18n/fr-be/collection.json";
import frCore from "./i18n/fr-be/core.json";
import frHistory from "./i18n/fr-be/history.json";
import frUnits from "./i18n/fr-be/units.json";
import nlCollection from "./i18n/nl-be/collection.json";
import nlCore from "./i18n/nl-be/core.json";
import nlHistory from "./i18n/nl-be/history.json";
import nlUnits from "./i18n/nl-be/units.json";
import uidsCollection from "./i18n/uids/collection.json";
import uidsCore from "./i18n/uids/core.json";
import uidsHistory from "./i18n/uids/history.json";
import uidsUnits from "./i18n/uids/units.json";
import { localizeDocument, type Dictionary } from "./localize";

/** English → translation, per locale. The parts follow the seed files (core, history, units, collection). */
export const dictionaries: Record<string, Dictionary> = {
  "fr-be": { ...frCore, ...frHistory, ...frUnits, ...frCollection },
  "nl-be": { ...nlCore, ...nlHistory, ...nlUnits, ...nlCollection },
};

/** Translated UIDs ("history" → "histoire") and language versions of files ("file:<name>"). */
export const uidMaps: Record<string, Record<string, string>> = Object.fromEntries(
  ["fr-be", "nl-be"].map((lang) => [
    lang,
    Object.assign(
      {},
      ...[uidsCore, uidsHistory, uidsUnits, uidsCollection].map((m) => (m as Record<string, object>)[lang]),
    ),
  ]),
);

// Dutch is ready in ./i18n/nl-be; add "nl-be" here when the locale is enabled in src/i18n.ts.
const enabled = ["fr-be"];
const translations: [lang: string, dict: Dictionary][] = enabled.map((lang) => [lang, dictionaries[lang]]);

type Seed = Parameters<typeof localizeDocument>[0];

/** Adds the translated versions of every seed document and links them as alternates. */
export function withTranslations<T extends Seed>(english: T[]) {
  const all = english.flatMap((doc) => [
    doc,
    ...translations.map(([lang, dict]) => localizeDocument(doc, lang, dict, uidMaps[lang])),
  ]);

  // Group the language versions of each document so the language switcher works.
  const groups = new Map<string, T[]>();
  const size = translations.length + 1;
  english.forEach((doc, i) => groups.set(doc.id, all.slice(i * size, i * size + size)));
  for (const group of groups.values()) {
    for (const doc of group) {
      (doc as Record<string, unknown>).alternate_languages = group
        .filter((d) => d !== doc)
        .map((d) => ({
          id: d.id,
          uid: d.uid,
          type: d.type,
          lang: d.lang,
          url: docPath(d.type, d.uid, d.lang),
        }));
    }
  }
  return all;
}
