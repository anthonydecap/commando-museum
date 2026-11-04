/**
 * Locales the site serves. `code` is the Prismic locale, `prefix` the first URL
 * segment (/nl, /fr, /en) and `news` the translated segment for news posts.
 * Every locale must also exist in the Prismic repository settings.
 */
export const locales = [
  { code: "fr-be", prefix: "fr", label: "FR", html: "fr", news: "actualites" },
  { code: "en-us", prefix: "en", label: "EN", html: "en", news: "news" },
  // Dutch is translated (src/seed/i18n/nl-be.json) but the current Prismic plan allows two
  // locales. To enable it: add nl-be in Prismic, uncomment this line and the one in
  // src/seed/translations.ts, then run `npm run seed:prismic`.
  // { code: "nl-be", prefix: "nl", label: "NL", html: "nl", news: "nieuws" },
] as const;

export type Locale = (typeof locales)[number]["code"];

/** The Prismic master locale. */
export const defaultLocale: Locale = "en-us";

/** Served when the visitor's browser language is not one of ours. */
export const fallbackLocale: Locale = "fr-be";

export function isLocale(value: string): value is Locale {
  return locales.some((l) => l.code === value);
}

export function localeByPrefix(prefix: string) {
  return locales.find((l) => l.prefix === prefix);
}

export function localeConfig(code: string) {
  return locales.find((l) => l.code === code) ?? locales.find((l) => l.code === fallbackLocale)!;
}

const dictionary = {
  en: {
    library: {
      search: "Search the library",
      placeholder: "Title, author, subject, year…",
      title: "Title",
      author: "Author",
      publisher: "Publisher",
      year: "Year",
      shelf: "Shelf",
      results: "books",
      showMore: "Show more",
      noResults: "No books match your search.",
    },
    legalForm: "asbl",
    videoNote: "Videos are hosted on YouTube and only load when you press play.",
    playVideo: "Play video",
    registerNo: "No.",
    registerName: "Name",
    registerBorn: "Born",
    registerDied: "Died",
    name: "name",
    names: "names",
    categories: { News: "News", Event: "Event", Museum: "Museum", Community: "Community" } as Record<
      string,
      string
    >,
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    language: "Language",
    readMore: "Read more",
    allNews: "All news",
    moreNews: "More news",
    backToNews: "Back to news",
    noNews: "No news yet. Check back soon.",
    visit: "Visit",
    explore: "Explore",
    contact: "Contact",
    follow: "Follow",
    credits: "Image credits",
    notFoundTitle: "Off the map",
    notFoundBody: "The page you are looking for does not exist or has moved.",
    notFoundCta: "Back to the homepage",
    rights: "All rights reserved.",
    nonProfit: "Non-profit association",
    supportedBy: "With the support of",
    websiteBy: "Website by",
    scroll: "Scroll",
  },
  nl: {
    library: {
      search: "Zoek in de bibliotheek",
      placeholder: "Titel, auteur, onderwerp, jaar…",
      title: "Titel",
      author: "Auteur",
      publisher: "Uitgever",
      year: "Jaar",
      shelf: "Plaats",
      results: "boeken",
      showMore: "Toon meer",
      noResults: "Geen boeken gevonden.",
    },
    legalForm: "vzw",
    videoNote: "De video's staan op YouTube en laden pas wanneer je op afspelen drukt.",
    playVideo: "Video afspelen",
    registerNo: "Nr.",
    registerName: "Naam",
    registerBorn: "Geboren",
    registerDied: "Overleden",
    name: "naam",
    names: "namen",
    categories: { News: "Nieuws", Event: "Evenement", Museum: "Museum", Community: "Gemeenschap" } as Record<
      string,
      string
    >,
    skip: "Naar de inhoud",
    menu: "Menu",
    close: "Sluiten",
    language: "Taal",
    readMore: "Lees meer",
    allNews: "Alle nieuws",
    moreNews: "Meer nieuws",
    backToNews: "Terug naar nieuws",
    noNews: "Nog geen nieuws. Kom binnenkort terug.",
    visit: "Bezoek",
    explore: "Ontdek",
    contact: "Contact",
    follow: "Volg ons",
    credits: "Beeldrechten",
    notFoundTitle: "Buiten de kaart",
    notFoundBody: "De pagina die je zoekt bestaat niet of is verplaatst.",
    notFoundCta: "Terug naar de homepagina",
    rights: "Alle rechten voorbehouden.",
    nonProfit: "Vereniging zonder winstoogmerk",
    supportedBy: "Met de steun van",
    websiteBy: "Website door",
    scroll: "Scroll",
  },
  fr: {
    library: {
      search: "Rechercher dans la bibliothèque",
      placeholder: "Titre, auteur, sujet, année…",
      title: "Titre",
      author: "Auteur",
      publisher: "Éditeur",
      year: "Année",
      shelf: "Localisation",
      results: "ouvrages",
      showMore: "Afficher plus",
      noResults: "Aucun ouvrage ne correspond à votre recherche.",
    },
    legalForm: "asbl",
    videoNote:
      "Les vidéos sont hébergées sur YouTube et ne se chargent que lorsque vous appuyez sur lecture.",
    playVideo: "Lire la vidéo",
    registerNo: "N°",
    registerName: "Nom",
    registerBorn: "Né le",
    registerDied: "Décédé le",
    name: "nom",
    names: "noms",
    categories: { News: "Actualité", Event: "Événement", Museum: "Musée", Community: "Communauté" } as Record<
      string,
      string
    >,
    skip: "Aller au contenu",
    menu: "Menu",
    close: "Fermer",
    language: "Langue",
    readMore: "Lire la suite",
    allNews: "Toutes les actualités",
    moreNews: "Autres actualités",
    backToNews: "Retour aux actualités",
    noNews: "Pas encore d'actualités. Revenez bientôt.",
    visit: "Visite",
    explore: "Découvrir",
    contact: "Contact",
    follow: "Suivez-nous",
    credits: "Crédits photo",
    notFoundTitle: "Hors de la carte",
    notFoundBody: "La page que vous cherchez n'existe pas ou a été déplacée.",
    notFoundCta: "Retour à l'accueil",
    rights: "Tous droits réservés.",
    nonProfit: "Association sans but lucratif",
    supportedBy: "Avec le soutien de",
    websiteBy: "Site web par",
    scroll: "Défiler",
  },
};

export type Dictionary = (typeof dictionary)["en"];

export function getDictionary(lang: string): Dictionary {
  const short = lang.slice(0, 2) as keyof typeof dictionary;
  return dictionary[short] ?? dictionary.en;
}

export function htmlLang(lang: string) {
  return locales.find((l) => l.code === lang)?.html ?? "en";
}
