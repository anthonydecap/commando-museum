import { img } from "./helpers";

/**
 * Shared constants for the seed files.
 *
 * Page UIDs (English, the Prismic master language). Link with doc("page", uid) or [text](page:uid).
 *   core (index.ts):        home, the-museum, team, documentation-centre, latest-acquisitions,
 *                           virtual-tour, tour-<room> (18 rooms), visit, shop, membership,
 *                           commando-dagger-magazine, photos-and-videos, album-kigali-2017,
 *                           album-handover-2015, links
 *   history (history.ts):   history, origin-of-the-word-commando, creation-of-the-belgian-commandos,
 *                           second-world-war, post-war-period, para-commando-regiment,
 *                           african-period, from-1962-to-today, in-memoriam
 *   units (units.ts):       units, 2nd-commando-battalion, commando-training-centre,
 *                           4th-commando-battalion, 6th-commando-battalion, anti-tank-company,
 *                           field-artillery-battery, 14th-engineer-company,
 *                           35th-anti-aircraft-battery, 210th-logistics-company, bibliography
 *   collection (collection.ts): collection, evolution-of-outfits, commando-knife
 */

export const credit = {
  museum: "Musée des Commandos",
};

export const contact = {
  phone: "+32 474 18 56 18",
  email: "cdomuseum@skynet.be",
  maps: "https://www.google.com/maps/search/?api=1&query=Caserne+Sous-Lieutenant+Thibaut+Flawinne",
};

/** Shorthand for a museum photograph. */
export const photo = (file: string, alt: string) => img(file, alt, credit.museum);
