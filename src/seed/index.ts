import { collectionDocuments } from "./collection";
import { doc, document, file, img, noImage, noLink, rt, slice, web } from "./helpers";
import { historyDocuments } from "./history";
import { contact, credit, photo } from "./shared";
import { withTranslations } from "./translations";
import { unitsDocuments } from "./units";

/**
 * Seed content for the Commando Museum website, recovered from the former
 * museedescommandos.be. Served while the Prismic repository is still empty and
 * pushed to Prismic with `npm run seed:prismic`. After the first publish,
 * Prismic is the only source of truth.
 */

const images = {
  goatley: photo(
    "visitcdomuseum-goatley-1.jpg",
    "Mannequins of Second World War commandos paddling a Goatley folding assault boat in the museum",
  ),
  goatleyWide: photo(
    "visitcdomuseum-goatley-bande.jpg",
    "Panoramic view of the Goatley boat and its crew of commando mannequins",
  ),
  barracks: photo(
    "panorama-accueil-commandos2.jpg",
    "Entrance of the Sous-Lieutenant Thibaut barracks in Flawinne, home of the 2nd Commando Battalion and the museum",
  ),
  roman: photo(
    "01-lt-gen-roman.jpg",
    "Portrait of Lieutenant-General Pierre Roman, founder of the museum, in uniform",
  ),
  team: photo("equipe10-mars-2026-web.jpg", "The volunteer team of the Commando Museum in 2026"),
  documentation: photo(
    "cdomuseum-documentation-1.jpg",
    "Shelves of books and archive boxes in the museum's documentation centre",
  ),
  spean: photo(
    "03b-monument-ecosse.jpg",
    "Replica of the Commando Memorial at Spean Bridge, Scotland, in the museum",
  ),
  goatleyBoat: photo("03c-gootley.jpg", "The Goatley folding assault boat with its crew of mannequins"),
  romanDecorations: photo(
    "dg35-decorations-roman-1.jpg",
    "The green beret and decorations of Lieutenant-General Pierre Roman in a display case",
  ),
  shop: photo(
    "les-nouveautes-du-shop-v-fr-01-03-26-web-1.jpg",
    "Leaflet with the latest items in the museum shop: books, badges, berets and souvenirs",
  ),
  shopCounter: photo("19-fin-de-visite.jpg", "The museum shop at the end of the visit, with books and souvenirs"),
  howitzer: photo("08-obusier-105-mm.jpg", "A 105 mm howitzer of the Para-Commando Artillery Battery in the museum"),
  roomOfHonour: photo(
    "01a-coin-comdt.jpg",
    "The command corner of the 2nd Commando Battalion in the room of honour",
  ),
};

/* -------------------------------------------------------------------------- */
/* Settings                                                                   */
/* -------------------------------------------------------------------------- */

const settings = document("settings", null, {
  site_name: "Commando Museum",
  tagline: "The history of the Belgian Commandos since 1942",
  motto: "United We Conquer",
  announcement: "Open on Saturdays from 13:00 to 18:00 · by appointment only: +32 474 18 56 18",
  announcement_link: doc("page", "visit", "Plan your visit"),
  navigation: [
    { link: doc("page", "the-museum", "The Museum") },
    { link: doc("page", "history", "History") },
    { link: doc("page", "units", "Units") },
    { link: doc("page", "collection", "Collection") },
    { link: doc("page", "virtual-tour", "Virtual tour") },
    { link: doc("page", "visit", "Visit") },
    { link: doc("page", "membership", "Support") },
  ],
  header_cta: doc("page", "visit", "Plan your visit"),
  footer_intro: rt(
    "Since 1980 the Commando Museum has told the story of the Belgian Commandos, from the first volunteers in Great Britain in 1942 to the present day. It is located inside the barracks of the 2nd Commando Battalion in Flawinne and is run entirely by volunteers.",
  ),
  address: rt(
    "**« Musée des Commandos – Museum der Commando's » asbl**",
    "Caserne Sous-Lieutenant Thibaut",
    "Rue Joseph Durieux 80",
    "5020 Namur (Flawinne), Belgium",
  ),
  email: contact.email,
  phone: contact.phone,
  social: [],
  footer_links: [
    { link: doc("page", "team", "The team") },
    { link: doc("page", "documentation-centre", "Documentation centre") },
    { link: doc("page", "latest-acquisitions", "Latest acquisitions") },
    { link: doc("page", "commando-dagger-magazine", "The Commando Dagger") },
    { link: doc("page", "shop", "Shop") },
    { link: doc("page", "photos-and-videos", "Photos and videos") },
    { link: doc("page", "links", "Links") },
  ],
  credits: rt("All photographs: Musée des Commandos, Flawinne, unless stated otherwise."),
  meta_description:
    "The Commando Museum in Flawinne (Namur) tells the story of the Belgian Commandos since 1942: the 4th Troop, the Para-Commando Regiment, the 2nd Commando Battalion and every unit that wore the green beret. Free entry, by appointment.",
  meta_image: images.goatley,
});

/* -------------------------------------------------------------------------- */
/* Shared slices                                                              */
/* -------------------------------------------------------------------------- */

const visitBanner = () =>
  slice("cta_banner", {
    eyebrow: "Plan your visit",
    title: "Saturdays, 13:00–18:00. By appointment. Free.",
    body: rt(
      "The museum is inside an active barracks, so every visit is booked in advance. Groups of ten or more are welcome: book one month ahead.",
    ),
    image: images.barracks,
    primary_link: web(`tel:${contact.phone.replace(/\s/g, "")}`, "Call +32 474 18 56 18"),
    secondary_link: doc("page", "visit", "Practical information"),
  });

const supportBanner = () =>
  slice("cta_banner", {
    eyebrow: "Support the museum",
    title: "Keep the story of the green beret alive",
    body: rt(
      "The museum is free and run by volunteers. Membership costs €15 a year and gives free access to the reading room of the documentation centre.",
    ),
    image: noImage,
    primary_link: doc("page", "membership", "Become a member"),
    secondary_link: doc("page", "shop", "Visit the shop"),
  });

/* -------------------------------------------------------------------------- */
/* Home                                                                       */
/* -------------------------------------------------------------------------- */

const home = document("page", "home", {
  title: "Home",
  meta_title: "",
  meta_description: "",
  meta_image: noImage,
  slices: [
    slice("hero", {
      eyebrow: "Commando Museum · Flawinne",
      title: "United We Conquer",
      subtitle: "Belgian Commandos since 1942",
      lead: rt(
        "From the 4th Troop of No. 10 Inter-Allied Commando to the 2nd Commando Battalion: the history of the Belgian Commandos, told inside the barracks where they serve today.",
      ),
      image: images.goatley,
      image_credit: "The Goatley assault boat, room 3C",
      primary_link: doc("page", "visit", "Plan your visit"),
      secondary_link: doc("page", "virtual-tour", "Take the virtual tour"),
    }),
    slice("marquee", {
      words:
        "United We Conquer / 4th Troop / Achnacarry / Green Beret / Béret Vert / Groene Baret / Walcheren / Para-Commando / Kamina / Stanleyville / Kolwezi / Somalia / Kigali / Flawinne",
    }),
    slice("intro_statement", {
      eyebrow: "Since 1980",
      title: "",
      statement: rt(
        "Every unit of the Belgian army that has ever proudly worn **the green beret of the Commandos** is represented here.",
      ),
      body: rt(
        "The museum was created in 1980 on the initiative of Lieutenant-General Pierre Roman, Chief of Staff of the Land Force and one of the very first Belgian commando officers in 1942. Modest at first, it now fills some twenty rooms and keeps growing thanks to the gifts of commandos and their families.",
      ),
      facts: [
        { value: "1942", label: "First Belgian commando unit formed in Britain" },
        { value: "1980", label: "Museum founded" },
        { value: "±20", label: "Rooms, in chronological and thematic order" },
        { value: "€0", label: "Entry. Always free." },
      ],
    }),
    slice("card_grid", {
      eyebrow: "Explore",
      title: "Where do you want to start?",
      intro: [],
      tone: "light",
      cards: [
        {
          image: images.spean,
          kicker: "History",
          title: "From Achnacarry to today",
          body: "How Belgian volunteers in wartime Britain became the commandos of the Para-Commando Regiment and the Special Operations Regiment.",
          link: doc("page", "history", "Read the history"),
        },
        {
          image: images.roomOfHonour,
          kicker: "Units",
          title: "Every unit of the green beret",
          body: "The 2nd Commando Battalion, the training centre and the disbanded units that carried the commando tradition.",
          link: doc("page", "units", "Discover the units"),
        },
        {
          image: images.howitzer,
          kicker: "Virtual tour",
          title: "Eighteen rooms, one story",
          body: "Walk through the museum room by room, from the room of honour to the barrack room.",
          link: doc("page", "virtual-tour", "Start the tour"),
        },
      ],
    }),
    slice("text_media", {
      eyebrow: "27 July 1942 · Wales",
      title: "The 4th Troop",
      body: rt(
        "In 1942, at the suggestion of the British, the Belgian government in London agreed to form a Belgian unit within No. 10 Inter-Allied Commando. The 4th Troop was created on 27 July 1942 under Reserve Captain Georges Danloy and settled in Abersoch, in Wales. With no barracks available, the men were billeted with local families.",
        "In September the troop moved to Achnacarry, in the Scottish Highlands, for the gruelling course that earned them the right to wear the green beret. Its first battle came on 13 December 1943 in Italy, in front of the Gustav Line: the first Belgian ground unit to fight again since the defeat of 1940.",
      ),
      image: images.spean,
      caption: "Replica of the Commando Memorial at Spean Bridge, room 3B",
      link: doc("page", "creation-of-the-belgian-commandos", "Read how it began"),
      image_side: "left",
      tone: "dark",
    }),
    slice("artifact", {
      eyebrow: "In the spotlight",
      title: "The Goatley assault boat",
      body: rt(
        "Commandos specialise in amphibious operations. During the war, and for years afterwards, they crossed rivers and reached beaches in the Goatley, a folding assault boat named after the British engineer who designed it.",
        "In February 1957 a Goatley capsized during a demonstration for General Norstad, NATO's Supreme Commander, and three men drowned. Although the boat itself was not to blame, it was withdrawn from training. The museum's Goatley is the only one in Belgium. It was bought thanks to a subscription supported by more than 660 members of the commando family.",
      ),
      image: images.goatleyBoat,
      caption: "The Goatley and its crew, room 3C",
      link: doc("page", "tour-the-creation", "See room 3"),
      specs: [
        { label: "Type", value: "Folding assault boat (Mk III)" },
        { label: "Named after", value: "Its British designer, Goatley" },
        { label: "In service", value: "Second World War until 1957" },
        { label: "In the museum", value: "The only example in Belgium" },
      ],
    }),
    slice("card_grid", {
      eyebrow: "The museum",
      title: "More than a collection",
      intro: [],
      tone: "sand",
      cards: [
        {
          image: images.romanDecorations,
          kicker: "Latest acquisitions",
          title: "Gifts that keep the museum growing",
          body: "From Lieutenant-General Roman's beret to a carbine from the Korean War.",
          link: doc("page", "latest-acquisitions", "See what's new"),
        },
        {
          image: images.documentation,
          kicker: "Documentation centre",
          title: "2,000 books, 90,000 photographs",
          body: "Search the library catalogue and plan your research visit.",
          link: doc("page", "documentation-centre", "Search the library"),
        },
        {
          image: img("couverture-251127-dagger-49-fr-1.jpg", "Cover of The Commando Dagger no. 49", credit.museum),
          kicker: "Magazine",
          title: "The Commando Dagger",
          body: "The museum's own magazine, in French and Dutch.",
          link: doc("page", "commando-dagger-magazine", "Read the latest issues"),
        },
      ],
    }),
    visitBanner(),
  ],
});

/* -------------------------------------------------------------------------- */
/* The Museum                                                                 */
/* -------------------------------------------------------------------------- */

const museum = document("page", "the-museum", {
  title: "The Museum",
  meta_title: "The Museum",
  meta_description:
    "Founded in 1980 by Lieutenant-General Pierre Roman, the Commando Museum in Flawinne illustrates the history of the Belgian Commandos since 1942 in some twenty rooms.",
  meta_image: images.goatley,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "The Museum",
        title: "Origins and purpose",
        lead: rt(
          "A museum founded by a commando of the first hour, kept alive by the commando family, and growing with every gift.",
        ),
        image: images.goatleyWide,
        image_credit: "",
      },
      "page",
    ),
    slice("text_media", {
      eyebrow: "1980",
      title: "Founded by a commando of the first hour",
      body: rt(
        "The Commando Museum was created in 1980 on the initiative of Lieutenant-General Pierre Roman, Chief of Staff of the Land Force and a commando lieutenant from the very beginning, in 1942.",
        "It traces and illustrates the history of the Belgian Commandos from 1942, the year the first unit was formed in Great Britain, the 4th Troop of No. 10 Inter-Allied Commando, to the present day.",
      ),
      image: images.roman,
      caption: "Lieutenant-General Pierre Roman, Chief of Staff of the Land Force",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    slice("quote", {
      quote: rt(
        "All the units of the Belgian army that have ever proudly worn the green beret of the Commandos are represented here.",
      ),
      attribution: "Commando Museum",
      role: "",
      tone: "sand",
    }),
    slice("rich_text", {
      eyebrow: "The collection",
      title: "Some twenty rooms, still growing",
      body: rt(
        "Modest in its early days, the museum now occupies some twenty rooms and keeps evolving thanks to the gifts of the men and women who served.",
        "The collections are presented chronologically and by theme: documents, equipment, uniforms, weapons, vehicles and personal souvenirs. Together they show the historical milestones of the Belgian Commandos and how they changed over time.",
        "The museum helps to keep the commando traditions alive and to make the history of the Belgian Commandos known.",
      ),
    }),
    slice("card_grid", {
      eyebrow: "Inside the museum",
      title: "Find your way in",
      intro: [],
      tone: "light",
      cards: [
        {
          image: images.howitzer,
          kicker: "Virtual tour",
          title: "Room by room",
          body: "Eighteen rooms, from the room of honour to the barrack room.",
          link: doc("page", "virtual-tour", "Start the tour"),
        },
        {
          image: images.team,
          kicker: "The team",
          title: "Run by volunteers",
          body: "Meet the people who manage the museum, its archives and its shop.",
          link: doc("page", "team", "Meet the team"),
        },
        {
          image: images.documentation,
          kicker: "Documentation centre",
          title: "Library and photo archive",
          body: "More than 2,000 books and 90,000 photographs and videos.",
          link: doc("page", "documentation-centre", "Plan your research"),
        },
        {
          image: images.romanDecorations,
          kicker: "Latest acquisitions",
          title: "New in the collection",
          body: "Recent gifts from veterans, families and the Defence protocol service.",
          link: doc("page", "latest-acquisitions", "See what's new"),
        },
      ],
    }),
    visitBanner(),
  ],
});

/* -------------------------------------------------------------------------- */
/* Team                                                                       */
/* -------------------------------------------------------------------------- */

type Member = [file: string, rank: string, name: string, role: string];

const team: Member[] = [
  ["schepkens-richard.jpg", "Lt-Colonel BEM e.r.", "Richard Schepkens", "Managing director"],
  ["maurer-2.jpg", "Commandant e.r.", "Patrick Maurer", "Deputy managing director · members and collection"],
  ["jean-marie.jpg", "Adjudant-Chef e.r.", "Jean-Marie Goedert", "Treasurer"],
  ["struyken-guy.jpg", "Lieutenant (R)", "Guy Struyken", "Archivist"],
  ["jean-philippe-preaux.jpg", "Adjudant-Major e.r.", "Jean-Philippe Préaux", "Archivist"],
  ["freddy-bouquelloen.jpg", "Adjudant-Chef e.r.", "Freddy Bouquelloen", "Archives, digitisation and multimedia"],
  ["goetals.jpg", "", "Eric Goethals", "Document archives"],
  ["lafontaine-gabriel.jpg", "Adjudant-Major e.r.", "Gabriel Lafontaine", "Library and documentation"],
  ["squoquart-serge.jpg", "Ancien 2 Cdo (1974)", "Serge Squoquart", "Photo library"],
  ["binon-didier.jpg", "1er Caporal-Chef e.r.", "Didier Binon", "Museum shop"],
  ["guldemont-louis.jpg", "Ancien 2 Cdo (1985)", "Louis Guldemont", "Logistics"],
  ["leopold-gilles.jpg", "", "Léopold Gilles", "The veteran of the team"],
];

const formerTeam: Member[] = [
  ["deudon-guy.jpg", "Commandant e.r.", "Guy Deudon", "Managing director until 1 April 2014"],
  ["rollin-yves.jpg", "Commandant (R)", "Yves Rollin", "Vice-chairman · compiled the inventory"],
  ["pauwels-hubert.jpg", "Adjudant-Major e.r.", "Hubert Pauwels", "Editor of The Commando Dagger · secretary and translator"],
  ["dimanche-marcel.jpg", "Adjudant-Chef e.r.", "Marcel Dimanche", "Archivist · created the first website"],
  ["adam-jacques.jpg", "Adjudant-Major e.r.", "Jacques Adam", "Board member"],
  ["braeckman-oscar.jpg", "Adjudant-Chef e.r.", "Oscar Braeckman", "Board member"],
  ["leysen-joseph.jpg", "Adjudant-Chef e.r.", "Joseph Leysen", "Translator"],
  ["duschesnes-manuel.jpg", "Adjudant-Major e.r.", "Manuel Duchesne", "Archivist · photo library"],
  ["raymond-peeters.jpg", "Ancien Para", "Raymond Peeters", "Webmaster and IT · † 21 January 2025"],
  ["laykoff-alexy.jpg", "1er Sergent (R)", "Alexy Laykoff", "Board member, “the man with golden hands” · † 13 January 2020"],
  ["ringlet-jacques.jpg", "Commandant (R)", "Jacques Ringlet", "Editor of The Commando Dagger and archivist · † 13 November 2016"],
  ["scailquin-philippe.jpg", "Adjudant-Chef e.r.", "Philippe Scailquin", "In the team from 1978 · room 6 bears his name · † 6 March 2006"],
];

const members = (list: Member[]) =>
  list.map(([file, rank, name, period]) => ({
    image: img(file, `Portrait of ${name}`, credit.museum),
    rank,
    name,
    period,
  }));

const teamPage = document("page", "team", {
  title: "The team",
  meta_title: "The team behind the museum",
  meta_description:
    "The Commando Museum is run by a team of volunteers, most of them former commandos. Meet the team, read the statutes and the reports of the general assembly.",
  meta_image: images.team,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "The Museum · Management",
        title: "The team",
        lead: rt(
          "The museum is run entirely by volunteers, most of them former commandos, who look after the collection, the archives, the library and the shop.",
        ),
        image: images.team,
        image_credit: "The museum team, March 2026",
      },
      "page",
    ),
    slice("portrait_grid", {
      eyebrow: "2026",
      title: "Management team",
      intro: [],
      people: members(team),
    }),
    slice("document_list", {
      eyebrow: "The association",
      title: "Statutes and reports",
      intro: rt(
        "The museum is run by the non-profit association « Musée des Commandos – Museum der Commando's ». Its statutes and the minutes of the general assembly are public.",
      ),
      documents: [
        {
          title: "Statutes",
          meta: "Revised 14 April 2023",
          link_1: file("20230414-statuts-revision-2023.pdf", "Download (PDF)"),
          link_2: noLink,
          link_3: noLink,
        },
        {
          title: "General assembly 2025",
          meta: "Minutes, 31 March 2025",
          link_1: file("250331-muscdo-ag25-pv-fr.pdf", "Download (PDF)"),
          link_2: noLink,
          link_3: noLink,
        },
        {
          title: "General assembly 2024",
          meta: "Minutes, 22 March 2024",
          link_1: file("240322-muscdo-ag24-pv-fr.pdf", "Download (PDF)"),
          link_2: noLink,
          link_3: noLink,
        },
        {
          title: "Board report",
          meta: "19 January 2026",
          link_1: file("260126-muscdo-rapport-oa-190126-pdf-4-1.pdf", "Download (PDF)"),
          link_2: noLink,
          link_3: noLink,
        },
      ],
    }),
    slice("portrait_grid", {
      eyebrow: "In gratitude",
      title: "Former team members",
      intro: rt("The museum owes a great deal to the volunteers who came before."),
      people: members(formerTeam),
    }),
    supportBanner(),
  ],
});

/* -------------------------------------------------------------------------- */
/* Documentation centre                                                       */
/* -------------------------------------------------------------------------- */

const documentation = document("page", "documentation-centre", {
  title: "Documentation centre",
  meta_title: "Documentation centre and library",
  meta_description:
    "Search more than 2,000 books in the library of the Commando Museum and 90,000 photographs and videos. The reading room in Flawinne is open on Mondays by appointment.",
  meta_image: images.documentation,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "The Museum · Research",
        title: "Documentation centre",
        lead: rt(
          "A library of more than 2,000 books and a photo archive of over 90,000 images and videos about the Belgian Commandos and the Para-Commandos.",
        ),
        image: images.documentation,
        image_credit: "",
      },
      "page",
    ),
    slice("visit_info", {
      eyebrow: "Reading room",
      title: "Plan your research",
      intro: rt(
        "Tell us what you are looking for before you come, so we can prepare your visit. Please announce your visit at least one week in advance, preferably by email to [bibliocdomus@gmail.com](mailto:bibliocdomus@gmail.com) (library) or [imagesmuscdo@gmail.com](mailto:imagesmuscdo@gmail.com) (photos and videos).",
      ),
      hours: [
        { label: "Open", value: "Mondays from 09:00", note: "Except public holidays" },
        { label: "Appointment", value: "+32 496 59 72 62", note: "By appointment only" },
        { label: "Reader's card", value: "€5 per visit", note: "Free for members of the association" },
      ],
      address: rt(
        "Photographs are allowed in the reading room. Some documents are still under copyright: using them requires permission. Copies of photographs and videos require the approval of a museum officer.",
      ),
      map_link: noLink,
      primary_link: web("mailto:bibliocdomus@gmail.com", "Email the library"),
      image: noImage,
    }),
    slice("library_catalog", {
      eyebrow: "Library",
      title: "Search the catalogue",
      intro: rt(
        "More than 2,000 titles are already catalogued, and the list is updated as new gifts and acquisitions arrive. Found what you need? Contact us with your precise request. The shelf code tells us where to find the book.",
      ),
    }),
    slice("document_list", {
      eyebrow: "Photo archive",
      title: "90,000 photographs and videos",
      intro: rt(
        "The photo archive can be consulted or screened in the reading room. The classification chart shows how the collection is organised, so you can prepare your request.",
      ),
      documents: [
        {
          title: "Photo classification chart",
          meta: "February 2025",
          link_1: file("organigramme-de-classement-photos-2025-02-28.pdf", "Download (PDF)"),
          link_2: noLink,
          link_3: noLink,
        },
        {
          title: "Presentation of the library",
          meta: "General assembly, March 2024",
          link_1: file("240316-muscdo-ag24-pp-biblio.pdf", "Download (PDF)"),
          link_2: noLink,
          link_3: noLink,
        },
      ],
    }),
    supportBanner(),
  ],
});

/* -------------------------------------------------------------------------- */
/* Latest acquisitions                                                        */
/* -------------------------------------------------------------------------- */

const acquisitions = document("page", "latest-acquisitions", {
  title: "Latest acquisitions",
  meta_title: "Latest acquisitions",
  meta_description:
    "Recent gifts to the Commando Museum: Lieutenant-General Roman's beret and decorations, an M1A1 carbine, a SAFN 1949 sniper rifle, an officers' mess archelle and more.",
  meta_image: images.romanDecorations,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "The Museum · Collection",
        title: "Latest acquisitions",
        lead: rt(
          "The collection grows thanks to commandos, their families and friends of the museum. These are some of the most recent gifts, and where to find them.",
        ),
        image: photo("02.jpg", "The Colt .45 pistol of Viscount Arthur de Jonghe"),
        image_credit: "The Colt .45 of Viscount Arthur de Jonghe",
      },
      "page",
    ),
    slice("text_media", {
      eyebrow: "Room 2",
      title: "The beret and decorations of Lieutenant-General Roman",
      body: rt(
        "On 2 July 2018 the family of Lieutenant-General Pierre Roman, founder of the museum, presented his beret and his honours to the Commando Museum.",
      ),
      image: images.romanDecorations,
      caption: "Beret and decorations of Lieutenant-General Pierre Roman",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    slice("gallery", {
      eyebrow: "Room 5 · Korea",
      title: "Two rifles from the Korean War era",
      intro: rt(
        "The museum received a Winchester .30 M1A1 carbine with folding stock and wooden pistol grip, and a SAFN 1949 rifle with sniper scope. With them, the museum now holds every weapon used by the Commandos until 2000.",
      ),
      images: [
        { image: photo("dg34-carabine-m1.jpg", "Winchester .30 M1A1 carbine with folding stock"), caption: "Winchester .30 M1A1 carbine" },
        { image: photo("dg34-fusil-lunette.jpg", "SAFN 1949 rifle with sniper scope"), caption: "SAFN 1949 with sniper scope" },
      ],
    }),
    slice("text_media", {
      eyebrow: "Room 19",
      title: "The archelle of the citadel officers' mess",
      body: rt(
        "Two veterans of the 2nd Commando Battalion with a passion for flea markets, 1st Chief Corporals (ret.) Robert Cosse and Jean-Marie Florquin, found a magnificent archelle, a traditional wooden wall rack, in several pieces and gave it to the museum. Another veteran, Warrant Officer (ret.) Christian Fievet, partly restored it, and cabinetmaker Adelin Martin volunteered to finish the work.",
        "Commandant (ret.) Deudon remembers it: “I am almost 84, and my memories take me back to 1957, 1958 and 1959, when I lived in the officers' mess at the citadel. You entered a hall with a staircase to the bedrooms, and then a second door that opened onto the bar. To the left of that door, I can still see this archelle!”",
      ),
      image: photo("dg35-archelle-1-2.jpg", "The restored wooden archelle from the officers' mess of the Citadel of Namur"),
      caption: "The restored archelle",
      link: noLink,
      image_side: "left",
      tone: "sand",
    }),
    slice("text_media", {
      eyebrow: "Room 8 · Para-Commando Artillery Battery",
      title: "A shell case from the King's oath",
      body: rt(
        "With the help of the Defence protocol service, the museum received a shell case from the salute fired by the Artillery Battalion when His Majesty King Philippe took the oath on 23 July 2013.",
      ),
      image: photo("dg34-douille-philippe-i.jpg", "Shell case from the gun salute for the swearing-in of King Philippe"),
      caption: "Shell case from the royal salute, 23 July 2013",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    slice("gallery", {
      eyebrow: "Also new",
      title: "More recent gifts",
      intro: [],
      images: [
        { image: photo("02.jpg", "Colt .45 pistol of Viscount Arthur de Jonghe"), caption: "The Colt .45 of Viscount Arthur de Jonghe" },
        { image: photo("04.jpg", "A Dom 410 radiation survey meter"), caption: "Dom 410 radiation survey meter" },
        { image: photo("05.jpg", "Afghan authorities' coat, a Russian mortar and other equipment from Kunduz"), caption: "“Afghan Authorities” coat, Russian mortar and equipment from the Kunduz mission, 2010" },
        { image: photo("03.jpg", "Mannequin with a British Type X parachute and a drop bag"), caption: "Mannequin with a Type X parachute (UK) and a drop bag" },
        { image: photo("06.jpg", "Mannequin with a seat parachute for air transport and a reserve parachute"), caption: "Mannequin with a seat parachute for air transport and a reserve parachute" },
      ],
    }),
    slice("cta_banner", {
      eyebrow: "Donations",
      title: "Do you have something for the museum?",
      body: rt(
        "Uniforms, documents, photographs, equipment: every object can help tell the story of the Belgian Commandos. Contact us before you bring it.",
      ),
      image: noImage,
      primary_link: web(`mailto:${contact.email}`, "Email the museum"),
      secondary_link: doc("page", "visit", "Contact details"),
    }),
  ],
});

/* -------------------------------------------------------------------------- */
/* Virtual tour                                                               */
/* -------------------------------------------------------------------------- */

type Room = {
  uid: string;
  number: string;
  title: string;
  summary: string;
  body: string[];
  images: [file: string, alt: string, caption: string][];
};

const rooms: Room[] = [
  {
    uid: "tour-room-of-honour",
    number: "1",
    title: "The room of honour",
    summary: "The commanders of the 2nd Commando Battalion, the fallen, Padre Corbisier and the founder, Baron Danloy.",
    body: [
      "Here you find the photographs of the commanding officers, the regimental sergeant majors and the corps corporals of the 2nd Commando Battalion, direct heir of the 4th Troop. There are the badges of all commando units, active or disbanded, the names of the commandos who died in action or on duty, and a corner dedicated to Padre L. Corbisier, the first chaplain of the Commandos.",
      "### The founder",
      "Captain Georges Danloy, later Major General (ret.) Baron Danloy, founder of the Belgian Commandos, died on 19 October 1999. A large part of the room is devoted to him, and one side of the war memorial at the entrance of the barracks bears his name.",
    ],
    images: [
      ["01a-coin-comdt.jpg", "The command corner of the 2nd Commando Battalion", "The command corner of the 2nd Commando Battalion"],
      ["01b-padre-corbisier.jpg", "The corner dedicated to Padre Corbisier", "The corner of Padre Corbisier, first chaplain of the Commandos"],
      ["01b-danloy1.jpg", "The corner dedicated to Major General Baron Danloy", "The corner of Major General Baron Danloy"],
      ["09b-nouveau-monument-1.jpg", "The war memorial at the entrance of the barracks", "The war memorial at the entrance of the barracks"],
      ["09c-plaque-monument-1.jpg", "The commemorative plaque of the war memorial", "The commemorative plaque of the memorial"],
    ],
  },
  {
    uid: "tour-journeys",
    number: "2",
    title: "Journeys",
    summary: "From occupied Belgium to Britain, Korea and Central Africa: the commandos have always travelled.",
    body: [
      "The Belgian Commandos have always travelled, and still do. Answering the call of the Belgian government in London, the founders reached Great Britain from all over the world, many of them after a long and dangerous journey from occupied Belgium through France, Spain or Portugal.",
      "The units fought alongside the Allies from 1943 to 1945 and later carried out humanitarian operations for Belgium, the United Nations and NATO, mainly in Europe and Central Africa. Many commandos also joined the Belgian Volunteer Corps for Korea.",
    ],
    images: [["02-carte-deplacements.jpg", "Map showing the places where the Belgian Commandos served", "The places where the commandos served"]],
  },
  {
    uid: "tour-the-creation",
    number: "3",
    title: "The creation",
    summary: "Rooms 3A, 3B and 3C: the 4th Troop in Wales, Achnacarry and the Goatley boat.",
    body: [
      "**3A.** In 1942, at the suggestion of the British, the Belgian government in London agreed to form a Belgian unit within No. 10 Inter-Allied Commando. The 4th Troop was created on 27 July 1942 under Reserve Captain Georges Danloy and settled in Abersoch, in Wales. With no barracks, the men were billeted with local families, like the other commando troops. On display: the list of the first commandos in training.",
      "**3B.** In September the troop moved to Achnacarry, in Scotland, for the hard training that earned its members the green beret. On display: a replica of the Commando Memorial at Spean Bridge.",
      "**3C.** The Goatley, a folding boat used by the Commandos during the war and until 1957. In February 1957, during a demonstration for General Norstad (SACEUR), a boat capsized and three men drowned. Although the boat was not to blame, it was withdrawn from training. This example, the only one in Belgium, was acquired thanks to a subscription by more than 660 members of the commando family.",
    ],
    images: [
      ["03a-fondateurs.jpg", "Display about the founders of the Belgian Commandos", "The first commandos in training"],
      ["03b-monument-ecosse.jpg", "Replica of the Commando Memorial at Spean Bridge", "Replica of the Spean Bridge memorial"],
      ["03c-gootley.jpg", "The Goatley boat with its crew of mannequins", "The Goatley and its crew"],
    ],
  },
  {
    uid: "tour-campaigns",
    number: "4",
    title: "The campaigns",
    summary: "Italy, Yugoslavia, Walcheren and Germany: the 4th Troop at war, 1943–1945.",
    body: [
      "On 13 December 1943, in Italy, in front of the Gustav Line near Monte Cassino, the 4th Troop became the first Belgian ground unit to fight again after the defeat of 1940.",
      "In March 1944 it was on the island of Vis in Yugoslavia, alongside Tito's partisans. Back in England in June, too late to take part in the landings, it joined the first assault wave from Ostend against the island of Walcheren on 1 November 1944. The island was taken after nine days of hard fighting.",
      "In April 1945 the 4th Troop was on a security mission in northern Germany, searching for Belgians who had worn the Nazi uniform. It arrested Major Hellebaut, chief of the Walloon Legion, who was sent back to Belgium under the guard of Major Danloy.",
      "On display: the submachine-gun magazines that saved Sergeant Annez de Taboada's life by stopping bullets like a flak jacket; a habit of a religious brotherhood from Montenero that let some men camouflage themselves in the snow; the camp bed and chair of Doctor F. Van Peperstraete, the unit's doctor; and the map measurer of the chief of the Walloon Legion.",
      "**Four commandos lost their lives in these campaigns:** Cpl M. Mairesse (Italy), Lt A. Deton (Italy), Lt A. Meny (Walcheren) and Cpl F. Dive (Walcheren).",
    ],
    images: [
      ["04a-mitraillette-sgt-x.jpg", "Submachine-gun magazines that stopped bullets aimed at Sergeant Annez de Taboada", "The magazines that saved Sergeant Annez de Taboada"],
      ["04b-tenue-blanche.jpg", "White habit of a religious brotherhood from Montenero used as snow camouflage", "Snow camouflage from Montenero"],
      ["04c-lit-de-camp.jpg", "Camp bed and chair of the unit's doctor", "The camp bed and chair of Doctor Van Peperstraete"],
      ["04d-curvimetre.jpg", "Map measurer that belonged to the chief of the Walloon Legion", "The map measurer of the chief of the Walloon Legion"],
    ],
  },
  {
    uid: "tour-post-war",
    number: "5",
    title: "The post-war years",
    summary: "Back in Belgium: the Commando Regiment, Korea and the first parachutes.",
    body: [
      "In September 1945 the 4th Troop, renamed Commando Regiment in May, returned to Belgium and settled at Marche-les-Dames and the Citadel of Namur, and later also at Seilles.",
      "- 1946: the Commando Regiment receives its standard.",
      "- 1947: the Commando Training Centre is officially created.",
      "- 1950: many commandos volunteer for Korea. The Commando Regiment trains the officers, and later the reinforcements, of the Belgian Volunteer Corps for Korea.",
      "- 1951: creation of the Para-Commando Regiment, whose first commander is Lieutenant-Colonel Georges Danloy.",
      "On display: a dummy machine gun that imitated the sound of firing and, thanks to a bicycle lamp in the barrel, the muzzle flash. Until the early 1960s the only training cartridges were “Bull Blank” rounds with a wooden tip.",
    ],
    images: [
      ["05a-kayak-toile.jpg", "A canvas kayak", "A canvas kayak"],
      ["05b-kayak-polyester.jpg", "A later polyester kayak", "A more recent polyester kayak"],
      ["05c-materiel-ce-cdo.jpg", "Equipment used at the Commando Training Centre", "Equipment from the Training Centre"],
      ["05d-3-parachutes.jpg", "Two parachutes on display", "Two parachutes recall the commandos' new airborne training"],
      ["05e-mitrailleuse.jpg", "A dummy training machine gun", "The dummy machine gun"],
    ],
  },
  {
    uid: "tour-humanitarian-operations",
    number: "6",
    title: "Humanitarian operations",
    summary: "From Kamina to Kolwezi: the commandos in Africa, 1953–1991.",
    body: [
      "1953 marks the start of the African adventure in the Belgian Congo, at Kamina, and later at Kitona and in Ruanda-Urundi. Independence of the colony marked the beginning of a series of humanitarian operations with the Commandos:",
      "- 1960, in many places in the Congo. Three commandos were killed in ambushes by the Force Publique between Bunia and Mongbwalu: Cdo Delahaut, Cdo Hosselet and Cdo Sosnowski. Cdo Renard was murdered by the Congolese National Army in Kisenyi in January 1961.",
      "- 1964, at Stanleyville, with the 1st Parachute Battalion.",
      "- 1974, in the Sahel.",
      "- 1978, in Shaba (Kolwezi).",
      "- 1990, in Rwanda.",
      "- 1991, in Zaire.",
      "On display: equipment brought back from these operations, and a field kitchen for 300 people.",
    ],
    images: [
      ["06a-coin-ops-humanitaires.jpg", "Display of equipment from humanitarian operations in Africa", "Equipment from the humanitarian operations"],
      ["06b-roulante.jpg", "A field kitchen on wheels", "A field kitchen for 300 people"],
    ],
  },
  {
    uid: "tour-united-nations",
    number: "7",
    title: "The United Nations",
    summary: "Somalia, Rwanda, Kosovo: the blue beret, and the ten commandos of Kigali.",
    body: [
      "In 1993 the 2nd Commando Battalion, the Para-Commando Artillery Battery, the Para-Commando Anti-Tank Company and the 14th Para-Commando Engineer Company took part in UNOSOM I and UNOSOM II in Somalia under the United Nations, wearing the blue beret.",
      "In March 1994 the 2nd Commando Battalion relieved the 1st Parachute Battalion in Rwanda for the UNAMIR mission. On 7 April, ten commandos of the mortar platoon were murdered by soldiers of the Rwandan army: Lt Th. Lotin, 1Sgt Y. Leroy, Cpl B. Bassinne, Cpl A. Debatty, Cpl Ch. Dupont, Cpl S. Lhoir, Cpl B. Meaux, Cpl L. Plescia, Cpl Ch. Renwa and Cpl M. Uyttebroeck. A memorial to them stands in this room.",
      "In 1999 the 2nd Commando Battalion, the Para-Commando Artillery Battery, the 14th Para-Commando Engineer Company and the 210th Para-Commando Logistics Company took part in NATO's operation Allied Harbour in Albania and Kosovo. In March 2003 the battalion brought back from Kosovo a German PAK 38 anti-tank gun from the Second World War, kept by the Yugoslav army. Few examples remain.",
    ],
    images: [
      ["07a-armt-onu-capture.jpg", "Weapons captured during UN missions, including a Soviet 12.7 mm heavy machine gun", "Captured weapons, including a Soviet 12.7 mm heavy machine gun"],
      ["07b-monument-10-cdos.jpg", "Memorial to the ten commandos killed in Kigali in 1994", "The memorial to the ten commandos of Kigali"],
      ["07c-as24.jpg", "An AS24 tricycle vehicle", "AS24 vehicle, used in the battalions from 1964 to 1998"],
      ["07d-canon.jpg", "German PAK 38 anti-tank gun brought back from Kosovo", "The PAK 38 anti-tank gun from Kosovo"],
    ],
  },
  {
    uid: "tour-the-development",
    number: "8",
    title: "The development",
    summary: "New support units with the green beret, the 105 mm howitzers and training abroad.",
    body: [
      "After the African period the Para-Commando Regiment was given a larger role in Europe. The 2nd Commando Battalion grew to three rifle companies. The Para-Commando Anti-Tank Company (green beret) was created in 1963 and the Para-Commando Artillery Battery (green beret) in 1973.",
      "In 1992 the Para-Commando Regiment, by then a brigade, created the 14th Para-Commando Engineer Company, and in 1994 the 210th Para-Commando Logistics Company and the 35th Para-Commando Anti-Aircraft Battery, which also adopted the commando traditions. Successive reorganisations of the army later disbanded all these support units.",
      "The 105 mm (US) howitzers, built in 1942, equipped the Para-Commando Artillery Battery from 1974 to 1998. One of them stands in this room. Many countries now offer training opportunities, including Benin since 2001.",
    ],
    images: [
      ["08-obusier-105-mm.jpg", "A 105 mm howitzer of the Para-Commando Artillery Battery", "A 105 mm howitzer"],
      ["08-benin.jpg", "A dugout canoe brought back from Benin", "A canoe brought back from Benin by the 14th Para-Commando Engineer Company"],
    ],
  },
  {
    uid: "tour-vehicles",
    number: "9",
    title: "Vehicles",
    summary: "The Minerva jeep, the first women commandos, and missions in Afghanistan and Lebanon.",
    body: [
      "In the early 1950s, to save the Minerva company, famous before the war for its cars, the Belgian government ordered jeeps built under Land Rover licence for the whole army. For years, the jeep on display was that of the commander of the 2nd Commando Battalion.",
      "In 1976 the Para-Commandos recruited their first female career volunteers.",
      "Since November 2004 the battalion has regularly served on NATO missions in Afghanistan and UN missions in Lebanon. A corner of the museum covers these missions.",
    ],
    images: [
      ["09d-jeeps.jpg", "Minerva jeeps in the museum", "The jeep of the commander of the 2nd Commando Battalion"],
      ["09-vcf.jpg", "Display about the first female volunteers", "The first female career volunteers, 1976"],
      ["09-afghan1-1.jpg", "Display about the missions in Afghanistan", "The missions in Afghanistan and Lebanon"],
    ],
  },
  {
    uid: "tour-mission-future",
    number: "10",
    title: "Mission “Future”",
    summary: "Kisangani, 2004: the battalion's first return to Central Africa since Kigali.",
    body: [
      "From January to June 2004 the 2nd Commando Battalion trained a Congolese brigade in Kisangani (DR Congo), together with specialist instructors, including soldiers from Luxembourg, France and Germany. With rotations of 120 men every two months, the whole battalion returned to Central Africa for the first time since the murder of ten of its men in Kigali in April 1994.",
    ],
    images: [
      ["10a-pecherie.jpg", "Model of the fisheries built on the river at Kisangani", "A model of the fisheries on the river"],
      ["10b-dsp.jpg", "Mannequin in the uniform of the Special Presidential Security Group", "Uniform of the Special Presidential Security Group"],
    ],
  },
  {
    uid: "tour-c119",
    number: "11",
    title: "AMF(L) and the C-119",
    summary: "NATO's mobile force and the Flying Boxcar, the commandos' jump aircraft until 1972.",
    body: [
      "In 1964 the General Staff gave the Para-Commando Regiment the Belgian contribution to the ACE Mobile Force (Land) in Europe. The commandos took part in many international exercises in Denmark, Italy, Greece and Turkey. AMF(L) was disbanded in 2002.",
      "For almost twenty years, until 1972, the C-119 Flying Boxcar equipped the 15th Transport Wing of the Belgian Air Force and was used for parachute jumps. A first group of 116 commandos earned their parachute wings in July and August 1954.",
    ],
    images: [
      ["10-ravair-3.jpg", "A RavAir supply drop container", "A RavAir drop container"],
      ["11b-c119.jpg", "Mannequins at the door of a C-119 aircraft, ready to jump", "The moment of truth: the stick leader waits in the door with the jump instructor"],
    ],
  },
  {
    uid: "tour-boating",
    number: "12",
    title: "Boating",
    summary: "From the Goatley to the Zodiac: the commandos on the water.",
    body: [
      "Commandos specialise in amphibious operations. They used, among others, the Mk III assault boat (see room 3C), called the Goatley after the British engineer who designed it, as well as ten-man inflatable boats. After an accident with a Goatley in 1957, only inflatable dinghies were used.",
    ],
    images: [
      ["12a-5-places.jpg", "A five-man inflatable dinghy", "A five-man Zodiac-type dinghy"],
      ["12b-8-places.jpg", "An eight-man inflatable dinghy", "An eight-man Zodiac-type dinghy"],
    ],
  },
  {
    uid: "tour-command-post",
    number: "13",
    title: "The command post",
    summary: "A field command post with its radios, including the famous AN/GRC-9.",
    body: [
      "This home-made tent was cut from a larger 40/50 tent to make the command post more mobile: it could be set up against the back of a jeep. Next to it stand a generator for lighting and a range of radios, including the famous AN/GRC-9.",
    ],
    images: [
      ["13d-petromax.jpg", "Reconstruction of a command post with its radios", "A command post with its radios"],
      ["13c-groupe.jpg", "A generator for lighting", "A generator for lighting"],
      ["13b-radios.jpg", "A range of military radios, including the AN/GRC-9", "Radios, including the AN/GRC-9"],
    ],
  },
  {
    uid: "tour-first-aid-post",
    number: "14",
    title: "First-aid post and 4.2-inch mortar",
    summary: "A field first-aid post and a 4.2-inch mortar in firing position.",
    body: [
      "The mortar platoon was first equipped with 3-inch mortars (see room 5) and, in the 1950s, with 81 mm mortars and the 4.2-inch mortar shown here in firing position.",
      "Next to it is a field first-aid post. Besides giving first aid, it served above all as a collecting point before the wounded were evacuated to the rear.",
    ],
    images: [
      ["14a-mortier-4-2.jpg", "A 4.2-inch mortar in firing position", "A 4.2-inch mortar in firing position"],
      ["14d-poste-secours.jpg", "Reconstruction of a field first-aid post", "A field first-aid post"],
    ],
  },
  {
    uid: "tour-walcheren",
    number: "15",
    title: "Walcheren",
    summary: "A German bunker and objects excavated on the battlefield of November 1944.",
    body: [
      "A reconstruction of a German observation post on Walcheren. The fresco around the bunker was painted free of charge by Marie-Sophie Joie, head of the art school of Vresse-sur-Semois and daughter of 1st Chief Corporal Joie of the Commando Training Centre.",
      "Most of the rusted objects come from excavations by Alexis Laykoff in the area where the commandos of the 4th Troop fought in November 1944.",
    ],
    images: [
      ["15a-bunkers.jpg", "Reconstruction of a German bunker on Walcheren", "The Walcheren bunker"],
      ["15b-materiel.jpg", "Rusted objects excavated on the Walcheren battlefield", "Objects excavated on the battlefield"],
    ],
  },
  {
    uid: "tour-illustrations",
    number: "16",
    title: "Illustrations",
    summary: "Paintings and collections made by commandos.",
    body: ["Paintings and collections made by commandos line the corridor."],
    images: [["16-peintures.jpg", "A corridor lined with paintings by commandos", "The corridor and its paintings"]],
  },
  {
    uid: "tour-field-shelter",
    number: "17",
    title: "Field shelter",
    summary: "Individual tents from 1956 to 2000, and the Commando Regiment quay.",
    body: ["Individual field tents, models 1956, 1970 and 2000."],
    images: [
      ["17-m56.jpg", "An M56 individual tent", "An M56 tent"],
      ["17-quai.jpg", "Inauguration of the Commando Regiment quay", "The inauguration of the “Commando Regiment” quay"],
    ],
  },
  {
    uid: "tour-barrack-room",
    number: "18",
    title: "The barrack room",
    summary: "A barrack room from the Citadel of Namur, with its stove and its cells.",
    body: [
      "A reconstruction of part of a barrack room at the Citadel of Namur. The original stove, probably the last one in Belgium, was donated by the 4th CRI in Leopoldsburg. It had to be put out every evening at 22:00, emptied of its still-hot ashes, and could only be lit again at 06:00 the next morning.",
      "The beds, lockers, table and bench are original. The lamp, from the same period, comes from a room at the Citadel. Next door: the cells.",
    ],
    images: [
      ["18-chambree.jpg", "Reconstruction of a barrack room with beds, lockers and a stove", "The barrack room"],
      ["18a-cachot.jpg", "A prison cell", "The cells"],
      ["18b-cachot.jpg", "A prison cell door", "The cells"],
    ],
  },
];

const tourPhoto = (file: string, alt: string) => photo(file, alt);

const virtualTour = document("page", "virtual-tour", {
  title: "Virtual tour",
  meta_title: "Virtual tour of the museum",
  meta_description:
    "Walk through the Commando Museum room by room: the room of honour, the 4th Troop, Walcheren, Africa, the United Nations, vehicles, boats and the barrack room.",
  meta_image: images.goatley,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "The Museum in detail",
        title: "Virtual tour",
        lead: rt(
          "Eighteen rooms, in roughly chronological order: from the room of honour and the creation of the 4th Troop to the missions of recent years and a barrack room from the Citadel of Namur.",
        ),
        image: images.goatleyWide,
        image_credit: "",
      },
      "page",
    ),
    slice("card_grid", {
      eyebrow: "The rooms",
      title: "Choose a room",
      intro: [],
      tone: "light",
      cards: rooms.map((room) => ({
        image: tourPhoto(room.images[0][0], room.images[0][1]),
        kicker: `Room ${room.number}`,
        title: room.title,
        body: room.summary,
        link: doc("page", room.uid, "Enter the room"),
      })),
    }),
    visitBanner(),
  ],
});

const roomPages = rooms.map((room, i) => {
  const next = rooms[i + 1];
  const [first, ...rest] = room.images;
  return document("page", room.uid, {
    title: `Room ${room.number}: ${room.title}`,
    meta_title: `${room.title} · Virtual tour`,
    meta_description: room.summary,
    meta_image: tourPhoto(first[0], first[1]),
    slices: [
      slice(
        "hero",
        {
          eyebrow: `Virtual tour · Room ${room.number}`,
          title: room.title,
          lead: rt(room.summary),
          image: tourPhoto(first[0], first[1]),
          image_credit: first[2],
        },
        "page",
      ),
      slice("rich_text", { eyebrow: "", title: "", body: rt(...room.body) }),
      ...(rest.length
        ? [
            slice("gallery", {
              eyebrow: "To be seen",
              title: "In this room",
              intro: [],
              images: rest.map(([f, alt, caption]) => ({ image: tourPhoto(f, alt), caption })),
            }),
          ]
        : []),
      slice("cta_banner", {
        eyebrow: next ? `Next: room ${next.number}` : "End of the tour",
        title: next ? next.title : "Come and see it for real",
        body: rt(next ? next.summary : "The museum is open on Saturdays, by appointment. Entry is free."),
        image: next ? tourPhoto(next.images[0][0], next.images[0][1]) : noImage,
        primary_link: next ? doc("page", next.uid, "Next room") : doc("page", "visit", "Plan your visit"),
        secondary_link: doc("page", "virtual-tour", "All rooms"),
      }),
    ],
  });
});

/* -------------------------------------------------------------------------- */
/* Visit                                                                      */
/* -------------------------------------------------------------------------- */

const visit = document("page", "visit", {
  title: "Visit",
  meta_title: "Visit the museum",
  meta_description:
    "The Commando Museum in Flawinne (Namur) is open on Saturdays from 13:00 to 18:00, by appointment only. Free entry. Groups of ten or more book one month ahead.",
  meta_image: images.barracks,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Visit · Flawinne",
        title: "Plan your visit",
        lead: rt(
          "The museum is inside the Sous-Lieutenant Thibaut barracks, home of the 2nd Commando Battalion. Visits are by appointment only, and entry is free.",
        ),
        image: images.barracks,
        image_credit: "Entrance of the Sous-Lieutenant Thibaut barracks",
      },
      "page",
    ),
    slice("visit_info", {
      eyebrow: "Opening hours",
      title: "By appointment only",
      intro: rt(
        "Call us to book your visit. When you arrive, report to the guardhouse at the entrance of the barracks.",
      ),
      hours: [
        { label: "Museum", value: "Saturdays 13:00–18:00", note: "By appointment: +32 474 18 56 18" },
        { label: "Groups", value: "From 10 people", note: "Book one month in advance" },
        { label: "Shop", value: "Mondays 09:00–13:00", note: "Saturdays 13:30–17:00 by appointment" },
        { label: "Documentation centre", value: "Mondays from 09:00", note: "By appointment: +32 496 59 72 62" },
        { label: "Closed", value: "Sundays and public holidays", note: "" },
        { label: "Admission", value: "Free", note: "" },
      ],
      address: rt(
        "**« Musée des Commandos belges » asbl**",
        "Caserne Sous-Lieutenant Thibaut",
        "Rue Joseph Durieux 80",
        "5020 Namur (Flawinne)",
        "[cdomuseum@skynet.be](mailto:cdomuseum@skynet.be)",
      ),
      map_link: web(contact.maps, "Open in Google Maps"),
      primary_link: web(`tel:${contact.phone.replace(/\s/g, "")}`, "Call +32 474 18 56 18"),
      image: images.barracks,
    }),
    slice("faq", {
      eyebrow: "Getting here",
      title: "How to reach Flawinne",
      intro: [],
      items: [
        {
          question: "By public transport",
          answer: rt(
            "Take the train to Namur station. Outside the station, turn right to platform A (about 20 m) and take TEC bus line A towards Belgrade. Buses run roughly every fifteen minutes and the ride takes fifteen minutes. Get off at the “Casernes” stop, 100 m from the barracks entrance.",
          ),
        },
        {
          question: "By car",
          answer: rt(
            "Flawinne lies just west of Namur. Drive to Rue Joseph Durieux 80, 5020 Flawinne, and report to the guardhouse at the barracks gate.",
          ),
        },
        {
          question: "Can I visit with a group?",
          answer: rt(
            "Yes. Group visits are for at least ten people and must be booked one month in advance. Call +32 474 18 56 18 or email [cdomuseum@skynet.be](mailto:cdomuseum@skynet.be).",
          ),
        },
        {
          question: "Why do I need an appointment?",
          answer: rt(
            "The museum is located inside an active military barracks. Every visit has to be announced so that the guardhouse can let you in.",
          ),
        },
      ],
    }),
    slice("card_grid", {
      eyebrow: "Before you come",
      title: "Make the most of your visit",
      intro: [],
      tone: "sand",
      cards: [
        {
          image: images.howitzer,
          kicker: "Virtual tour",
          title: "Preview the rooms",
          body: "See what awaits you in each of the eighteen rooms.",
          link: doc("page", "virtual-tour", "Start the tour"),
        },
        {
          image: images.shopCounter,
          kicker: "Shop",
          title: "Books and souvenirs",
          body: "Berets, badges, books and the commando dagger.",
          link: doc("page", "shop", "Visit the shop"),
        },
        {
          image: images.documentation,
          kicker: "Research",
          title: "Documentation centre",
          body: "Prepare your research in the library and photo archive.",
          link: doc("page", "documentation-centre", "Search the library"),
        },
      ],
    }),
  ],
});

/* -------------------------------------------------------------------------- */
/* Shop                                                                       */
/* -------------------------------------------------------------------------- */

const shop = document("page", "shop", {
  title: "Shop",
  meta_title: "The museum shop",
  meta_description:
    "Books about the Belgian Commandos, berets, badges, the commando dagger and souvenirs. The museum shop in Flawinne is open on Mondays and, by appointment, on Saturdays.",
  meta_image: images.shop,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "The Museum · Shop",
        title: "The shop",
        lead: rt(
          "The exploits of the commandos have always fascinated the press and publishers. The shop offers a wide range of books about them, along with badges, berets and souvenirs.",
        ),
        image: images.shopCounter,
        image_credit: "",
      },
      "page",
    ),
    slice("visit_info", {
      eyebrow: "Opening hours",
      title: "When the shop is open",
      intro: rt(
        "When you arrive, report to the guardhouse. Items can also be sent by post for the cost of shipping, except daggers and berets: contact us.",
      ),
      hours: [
        { label: "Monday", value: "09:00–13:00", note: "" },
        { label: "Saturday", value: "13:30–17:00", note: "Call ahead: +32 474 18 56 18" },
        { label: "Payment", value: "Cash or card", note: "" },
      ],
      address: rt("Or order by email: [cdomuseum@skynet.be](mailto:cdomuseum@skynet.be)"),
      map_link: noLink,
      primary_link: file("shop-musee-liste-des-prix-version-15-09-25-1.pdf", "Download the price list (PDF)"),
      image: noImage,
    }),
    slice("text_media", {
      eyebrow: "New in the shop",
      title: "The latest items",
      body: rt(
        "Browse the latest additions to the shop, or download the full price list to see everything we offer.",
      ),
      image: images.shop,
      caption: "New in the shop, March 2026",
      link: file("shop-musee-liste-des-prix-version-15-09-25-1.pdf", "Price list (PDF)"),
      image_side: "right",
      tone: "sand",
    }),
    supportBanner(),
  ],
});

/* -------------------------------------------------------------------------- */
/* Membership                                                                 */
/* -------------------------------------------------------------------------- */

const membership = document("page", "membership", {
  title: "Become a member",
  meta_title: "Become a member",
  meta_description:
    "Support the Commando Museum: become a member of the association « Musée des Commandos – Museum der Commando's » for €15 a year.",
  meta_image: noImage,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Support the museum",
        title: "Become a member",
        lead: rt(
          "Join the association that keeps the museum running. Anyone can become a member, whether you served as a commando or simply care about their story.",
        ),
        image: images.roomOfHonour,
        image_credit: "",
      },
      "page",
    ),
    slice("intro_statement", {
      eyebrow: "Membership",
      title: "",
      statement: rt("**€15 a year** keeps the history of the Belgian Commandos alive."),
      body: rt(
        "Members support the work of the volunteers, receive the invitation to the general assembly and have free access to the reading room of the documentation centre.",
      ),
      facts: [
        { value: "€15", label: "Annual membership fee" },
        { value: "€0", label: "Reading room for members (otherwise €5)" },
      ],
    }),
    slice("faq", {
      eyebrow: "How to join",
      title: "Three steps",
      intro: [],
      items: [
        {
          question: "1. Fill in the form",
          answer: rt(
            "Download and print the membership form, or email us your name, first name, address, email address and phone number. Tell us if you are a (former) commando, and in which unit and period you served.",
          ),
        },
        {
          question: "2. Pay the membership fee",
          answer: rt(
            "Transfer €15 to account **BE55 0012 8958 0644** of « Musée des Commandos – Museum der Commando's » asbl, Caserne SLt Thibaut, 5020 Flawinne.",
          ),
        },
        {
          question: "3. Send us the form",
          answer: rt(
            "Email it to [cdomuseum@skynet.be](mailto:cdomuseum@skynet.be), or hand it in at the museum.",
          ),
        },
      ],
    }),
    slice("document_list", {
      eyebrow: "Download",
      title: "Membership form",
      intro: [],
      documents: [
        {
          title: "Membership form",
          meta: "PDF, to print and fill in",
          link_1: file("simple-bulletin-dadhesion-formulaire.pdf", "Download (PDF)"),
          link_2: web(`mailto:${contact.email}?subject=Membership`, "Apply by email"),
          link_3: noLink,
        },
      ],
    }),
    slice("card_grid", {
      eyebrow: "Other ways to help",
      title: "Support the museum",
      intro: [],
      tone: "sand",
      cards: [
        {
          image: noImage,
          kicker: "01",
          title: "Donate an object",
          body: "Uniforms, documents, photographs and equipment help us tell the story.",
          link: doc("page", "latest-acquisitions", "Recent gifts"),
        },
        {
          image: noImage,
          kicker: "02",
          title: "Visit the shop",
          body: "Every book and souvenir you buy supports the museum.",
          link: doc("page", "shop", "To the shop"),
        },
        {
          image: noImage,
          kicker: "03",
          title: "Read The Commando Dagger",
          body: "The museum's magazine, in French and Dutch.",
          link: doc("page", "commando-dagger-magazine", "Latest issues"),
        },
      ],
    }),
  ],
});

/* -------------------------------------------------------------------------- */
/* The Commando Dagger                                                        */
/* -------------------------------------------------------------------------- */

const issues: [no: string, cover: string, pdf: string][] = [
  ["49", "couverture-251127-dagger-49-fr-1.jpg", "251127-dagger-49-fr.pdf"],
  ["48", "couverture-21-mai2025-dagger-48-fr-1.jpg", "21-mai2025-dagger-48-fr.pdf"],
  ["46", "dagger-46-fr-1.jpg", "dagger-46-fr.pdf"],
  ["45", "dagger-45-fr-rp-1.jpg", "dagger-45-fr-rp.pdf"],
];

const magazine = document("page", "commando-dagger-magazine", {
  title: "The Commando Dagger",
  meta_title: "The Commando Dagger magazine",
  meta_description:
    "Read the latest issues of The Commando Dagger, the magazine of the Commando Museum in Flawinne, in French and Dutch.",
  meta_image: img(issues[0][1], "Cover of The Commando Dagger", credit.museum),
  slices: [
    slice(
      "hero",
      {
        eyebrow: "The Museum · Magazine",
        title: "The Commando Dagger",
        lead: rt(
          "The museum's own magazine, with news from the museum, history and stories from the commando family. It is published in French and Dutch.",
        ),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("card_grid", {
      eyebrow: "Latest issues",
      title: "Read online",
      intro: [],
      tone: "light",
      cards: issues.map(([no, cover, pdf]) => ({
        image: img(cover, `Cover of The Commando Dagger no. ${no}`, credit.museum),
        kicker: `No. ${no}`,
        title: `The Commando Dagger ${no}`,
        body: "",
        link: file(pdf, "Read (PDF)"),
      })),
    }),
    supportBanner(),
  ],
});

/* -------------------------------------------------------------------------- */
/* Photos and videos                                                          */
/* -------------------------------------------------------------------------- */

const media = document("page", "photos-and-videos", {
  title: "Photos and videos",
  meta_title: "Photos and videos",
  meta_description:
    "Photo albums and videos about the Belgian Commandos: the assault on Walcheren in 1944, the Kigali commemoration and the change of command of the 2nd Commando Battalion.",
  meta_image: photo("ceremonie-kigali-9.jpg", "Commemoration at the Camp Kigali memorial, 2017"),
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Photos and videos",
        title: "In pictures",
        lead: rt("Archive films and photo albums from the commando family."),
        image: photo("aimg-5659.jpg", "The standard of the 2nd Commando Battalion on parade"),
        image_credit: "The standard of the 2nd Commando Battalion, 2015",
      },
      "page",
    ),
    slice("video_list", {
      eyebrow: "Videos",
      title: "Archive film",
      intro: [],
      videos: [
        {
          youtube_url: "https://www.youtube.com/watch?v=xIber1VFkn4",
          title: "Assault on Walcheren, November 1944",
          meta: "Archive film",
          description: "The 4th Troop joined the first assault wave on Walcheren on 1 November 1944.",
        },
      ],
    }),
    slice("link_list", {
      eyebrow: "More videos",
      title: "Elsewhere",
      intro: [],
      items: [
        {
          category: "Archive",
          name: "Belgian Commando Manoeuvres",
          description: "Newsreel footage on British Pathé.",
          link: web("https://www.britishpathe.com/video/belgian-commando-manoeuvres", "britishpathe.com"),
        },
        {
          category: "2nd Commando Battalion",
          name: "Join us",
          description: "Recruitment film of the 2nd Commando Battalion.",
          link: file("2-cdo-join-us.mp4", "Watch the video (MP4)"),
        },
      ],
    }),
    slice("card_grid", {
      eyebrow: "Photo albums",
      title: "Albums",
      intro: [],
      tone: "sand",
      cards: [
        {
          image: photo("ceremonie-kigali-9.jpg", "Commemoration at the Camp Kigali memorial, 2017"),
          kicker: "10 April 2017",
          title: "Kigali commemoration",
          body: "Tribute to the Belgian victims of 1994, and in particular our ten commandos.",
          link: doc("page", "album-kigali-2017", "View the album"),
        },
        {
          image: photo("aimg-5633.jpg", "The new commander leads the parade of the 2nd Commando Battalion"),
          kicker: "7 October 2015",
          title: "Change of command, 2nd Commando Battalion",
          body: "Lieutenant-Colonel Pierard hands over the battalion to Lieutenant-Colonel Linotte.",
          link: doc("page", "album-handover-2015", "View the album"),
        },
      ],
    }),
  ],
});

const kigali = document("page", "album-kigali-2017", {
  title: "Kigali, 10 April 2017",
  meta_title: "Commemoration in Kigali, 2017",
  meta_description:
    "On 10 April 2017 the Belgian Embassy in Rwanda paid tribute to the Belgian victims of 1994, and in particular the ten commandos, at the Camp Kigali memorial.",
  meta_image: photo("ceremonie-kigali-9.jpg", "Commemoration at the Camp Kigali memorial, 2017"),
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Photo album · Kigali",
        title: "Commemoration at Camp Kigali",
        lead: rt("10 April 2017"),
        image: photo("ceremonie-kigali-9.jpg", "Commemoration at the Camp Kigali memorial, 2017"),
        image_credit: "",
      },
      "page",
    ),
    slice("rich_text", {
      eyebrow: "",
      title: "",
      body: rt(
        "April in Rwanda is a month of intense memories and emotion throughout the country. On 10 April, the Belgian Embassy, under the aegis of the Defence Attaché, Lieutenant-Colonel Alain Lambert, held the now traditional ceremony at the Camp Kigali memorial in tribute to the Belgian victims, and in particular to our commandos.",
        "The Belgian Ambassador to Rwanda welcomed a large audience, mainly diplomatic representatives and Belgian residents, as well as a sizeable delegation of the Rwandan Defence Forces, a sign of calmer relations.",
        "The memorial is perfectly maintained. Outside its protected perimeter, however, the surroundings are changing fast: the site no longer has a military role and now belongs to the University of Rwanda and hosts temporary exhibitions.",
        "The ceremony highlighted the remarkable work of the Institute of Veterans, a booklet and DVD, and the substantial book by the commander of the 15th Wing in 1994. A permanent display case will soon house these contributions to remembrance. The wreath laid by our veterans' associations found its place at the foot of the memorial plaque.",
      ),
    }),
    slice("gallery", {
      eyebrow: "Photos",
      title: "The ceremony",
      intro: [],
      images: [
        ["ceremonie-kigali-22.jpg", "Lieutenant-Colonel Lambert speaking at the ceremony", "Address by Lieutenant-Colonel Lambert"],
        ["ceremonie-kigali-21.jpg", "Lieutenant-Colonel Lambert speaking at the ceremony", "Address by Lieutenant-Colonel Lambert"],
        ["ceremonie-kigali-9.jpg", "The commemoration at the Camp Kigali memorial", "Ceremony in Kigali, 2017"],
        ["ceremonie-kigali-6.jpg", "The commemoration at the Camp Kigali memorial", "Ceremony in Kigali, 2017"],
        ["ceremonie-kigali-5.jpg", "The commemoration at the Camp Kigali memorial", "Ceremony in Kigali, 2017"],
        ["ceremonie-kigali-4.jpg", "The commemoration at the Camp Kigali memorial", "Ceremony in Kigali, 2017"],
        ["ceremonie-kigali-2.jpg", "Guests arriving at the ceremony", "Welcoming the guests"],
        ["ceremonie-kigali-1.jpg", "Guests arriving at the ceremony", "Welcoming the guests"],
      ].map(([f, alt, caption]) => ({ image: photo(f, alt), caption })),
    }),
    slice("cta_banner", {
      eyebrow: "Remembrance",
      title: "The ten commandos of Kigali",
      body: rt("Read about the commandos who died in operations and on duty."),
      image: noImage,
      primary_link: doc("page", "in-memoriam", "In memoriam"),
      secondary_link: doc("page", "photos-and-videos", "All photos and videos"),
    }),
  ],
});

const handover = document("page", "album-handover-2015", {
  title: "Change of command, 7 October 2015",
  meta_title: "Change of command of the 2nd Commando Battalion, 2015",
  meta_description:
    "On 7 October 2015 Lieutenant-Colonel Pierard handed over the 2nd Commando Battalion to Lieutenant-Colonel Frédéric Linotte at the Sous-Lieutenant Thibaut barracks in Flawinne.",
  meta_image: photo("aimg-5633.jpg", "The new commander leads the parade of the 2nd Commando Battalion"),
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Photo album · Flawinne",
        title: "Change of command",
        lead: rt("2nd Commando Battalion, 7 October 2015"),
        image: photo("aimg-5633.jpg", "The new commander leads the parade of the 2nd Commando Battalion"),
        image_credit: "",
      },
      "page",
    ),
    slice("rich_text", {
      eyebrow: "",
      title: "",
      body: rt(
        "On 7 October 2015 the 2nd Commando Battalion held a change of command at the Sous-Lieutenant Thibaut barracks in Flawinne. Lieutenant-Colonel BEM Pierard handed over the battalion to Lieutenant-Colonel BEM Frédéric Linotte.",
        "At the initiative of Alexis Laykoff, platoons A and B of the 1st Company of 1959 received their A parachute certificates from Colonel BEM Devogelaere and Lieutenant-Colonel BEM Pierard, 56 years late. Better late than never!",
      ),
    }),
    slice("gallery", {
      eyebrow: "Photos",
      title: "The ceremony",
      intro: [],
      images: [
        ["aimg-5396.jpg", "Former commanding officers are welcomed", "Welcoming the former commanding officers"],
        ["aimg-5430.jpg", "Colonel Peter Devogelaere", "Colonel BEM Peter Devogelaere, commander of the Light Brigade"],
        ["aimg-5472.jpg", "Lieutenant-Colonel Pierard speaking", "Address by Lieutenant-Colonel BEM Pierard"],
        ["aimg-5569.jpg", "Lieutenant-Colonel Pierard salutes his battalion", "Lieutenant-Colonel BEM Pierard salutes his battalion"],
        ["aimg-5613.jpg", "The handover of command", "The handover of command"],
        ["aimg-5619.jpg", "Lieutenant-Colonel Linotte", "Lieutenant-Colonel BEM Linotte"],
        ["aimg-5633.jpg", "Lieutenant-Colonel Linotte leads the parade", "Lieutenant-Colonel BEM Linotte at the head of the parade"],
        ["aimg-5652.jpg", "Platoon A of the 12th Company", "12th Company, platoon A"],
        ["aimg-5656.jpg", "Platoon B of the 12th Company", "12th Company, platoon B"],
        ["aimg-5659.jpg", "The standard of the 2nd Commando Battalion", "The standard of the 2nd Commando Battalion"],
        ["dimg-5486.jpg", "Chief Warrant Officer Roland Vandervelde receives a medal", "Chief Warrant Officer Roland Vandervelde receives the medal for 30 years of service in the Light Brigade from Colonel Devogelaere"],
        ["dimg-5481.jpg", "A veteran receives his parachute certificate", "Chief Warrant Officer Henri Gregoire receives his parachute certificate"],
        ["dimg-5489.jpg", "A veteran receives his parachute certificate", "Warrant Officer Michel Gregoire receives his parachute certificate"],
        ["dimg-5497.jpg", "A veteran receives his parachute certificate", "Chief Corporal Didier Pestiaux receives his parachute certificate"],
        ["eimg-5511.jpg", "The ceremony continues", "After the certificates, the ceremony continues"],
        ["eimg-5516.jpg", "The ceremony continues", "After the certificates, the ceremony continues"],
        ["eimg-5551.jpg", "The ceremony continues", "After the certificates, the ceremony continues"],
      ].map(([f, alt, caption]) => ({ image: photo(f, alt), caption })),
    }),
    slice("cta_banner", {
      eyebrow: "The battalion",
      title: "The 2nd Commando Battalion",
      body: rt("Direct heir of the 4th Troop, and the home of the museum."),
      image: noImage,
      primary_link: doc("page", "2nd-commando-battalion", "Read its history"),
      secondary_link: doc("page", "photos-and-videos", "All photos and videos"),
    }),
  ],
});

/* -------------------------------------------------------------------------- */
/* Links                                                                      */
/* -------------------------------------------------------------------------- */

const linksPage = document("page", "links", {
  title: "Links",
  meta_title: "Links",
  meta_description:
    "Links to the Belgian Defence, military museums, para-commando veterans' associations and tourism in the Namur region.",
  meta_image: noImage,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Links",
        title: "Friends and partners",
        lead: rt("Defence, military museums, veterans' associations and the region around Namur."),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("link_list", {
      eyebrow: "",
      title: "",
      intro: [],
      items: [
        ["Defence", "Belgian Defence", "Official website of the Belgian Armed Forces.", "https://www.mil.be"],
        ["Museums", "Royal Museum of the Armed Forces and Military History", "The army museum in Brussels.", "https://www.klm-mra.be"],
        ["Museums", "Pegasus Museum", "The museum of the Belgian paratroopers, at the Citadel of Diest.", "https://www.pegasus-museum.be"],
        ["Museums", "Museum of the Belgian Forces in Germany", "Museum der Belgischen Streitkräfte in Deutschland.", "https://museum-bsd.de"],
        ["Museums", "Spitfire Museum", "At Florennes air base.", "https://www.museespitfire.be"],
        ["Museums", "Engineer museum", "Website of the Belgian Engineer School museum.", "https://www.geniemus.be"],
        ["Museums", "C.L.H.A.M.", "Centre Liégeois d'Histoire et d'Archéologie Militaires.", "https://www.clham.org"],
        ["Museums", "Museums in Wallonia", "Portal of the museums of Wallonia.", "https://www.lesmuseesenwallonie.be"],
        ["Para-Commandos", "Paracommando.com", "Website about the Para-Commandos of the Belgian army.", "https://www.paracommando.com"],
        ["Para-Commandos", "Keep the Spirit Alive", "Veterans' association of 1 Para.", "https://ktsa.be"],
        ["Para-Commandos", "Amicale Nationale Para-Commando", "National Para-Commando veterans' association.", "https://www.anpcv.be"],
        ["Para-Commandos", "Union Nationale des Parachutistes", "National union of parachutists.", "https://www.union-nat-parachutistes.org"],
        ["Para-Commandos", "Fraternelle royale des Chasseurs ardennais", "Veterans of the Chasseurs Ardennais.", "https://www.fraternellechasseursardennais.be"],
        ["Para-Commandos", "20th Artillery Battalion", "Website of the 20th Artillery Battalion (20A).", "http://www.20a.be"],
        ["History", "The Citadel of Namur and the Commandos", "The commandos at the Citadel of Namur.", "https://www.cdomuseum.be/qr_citadelle_1_fr.html"],
        ["History", "Commando training", "How the commandos were trained.", "https://www.cdomuseum.be/qr_citadelle_2_fr.html"],
        ["History", "AB Collection", "Portal for military collectors.", "https://www.abcollection.com"],
        ["Region", "City of Namur", "Official website of the City of Namur.", "https://www.namur.be"],
        ["Region", "Visit Wallonia", "Tourism in Wallonia and Brussels.", "https://visitwallonia.be"],
      ].map(([category, name, description, url]) => ({
        category,
        name,
        description,
        link: web(url, url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "")),
      })),
    }),
  ],
});

/* -------------------------------------------------------------------------- */

const coreDocuments = [
  settings,
  home,
  museum,
  teamPage,
  documentation,
  acquisitions,
  virtualTour,
  ...roomPages,
  visit,
  shop,
  membership,
  magazine,
  media,
  kigali,
  handover,
  linksPage,
];

/** English seed documents per seed file, used by scripts/i18n-extract.ts. */
export const seedParts = {
  core: coreDocuments,
  history: historyDocuments,
  units: unitsDocuments,
  collection: collectionDocuments,
};

export const englishDocuments = [...coreDocuments, ...historyDocuments, ...unitsDocuments, ...collectionDocuments];

export const seedDocuments = withTranslations(englishDocuments);
