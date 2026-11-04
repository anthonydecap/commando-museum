import { doc, document, noImage, noLink, rt, slice } from "./helpers";
import { photo } from "./shared";

/**
 * Collection section: the hub, the evolution of the Commando uniforms and the
 * commando knife (Fairbairn–Sykes). Sources: the former museedescommandos.be
 * pages "Evolution des tenues" and "Le poignard Commando" (article by Marcel
 * Dimanche with Alexis Laykoff).
 */

/* -------------------------------------------------------------------------- */
/* Collection hub                                                             */
/* -------------------------------------------------------------------------- */

const collection = document("page", "collection", {
  title: "Collection",
  meta_title: "The collection",
  meta_description:
    "Documents, equipment, weapons, vehicles and souvenirs in some twenty rooms: the collection of the Commando Museum in Flawinne, from 1942 to today.",
  meta_image: photo("08-obusier-105-mm.jpg", "A 105 mm howitzer on display in the Commando Museum"),
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Collection",
        title: "Objects that tell the story",
        lead: rt(
          "Uniforms, weapons, vehicles, documents and souvenirs: eighty years of Belgian Commandos, told through the things they carried.",
        ),
        image: photo(
          "08-obusier-105-mm.jpg",
          "A 105 mm howitzer of the Para-Commando Artillery Battery on display in the museum",
        ),
        image_credit: "105 mm howitzer, room 8",
      },
      "page",
    ),
    slice("intro_statement", {
      eyebrow: "Some twenty rooms",
      title: "",
      statement: rt(
        "Every unit of the Belgian army that proudly wore the green beret of the Commandos **is represented in the museum.**",
      ),
      body: rt(
        "The collections – documents, equipment, weapons, vehicles and souvenirs – are presented in chronological order and by theme. They follow the Belgian Commandos from 1942, when the first unit was formed in Great Britain, to the present day. Modest in its early years, the museum keeps growing thanks to the gifts of those who served.",
      ),
      facts: [
        { value: "1942", label: "First Belgian Commando unit, in Great Britain" },
        { value: "1980", label: "Museum founded" },
        { value: "±20", label: "Rooms of collections" },
        { value: "€0", label: "Admission. Always free." },
      ],
    }),
    slice("card_grid", {
      eyebrow: "Explore",
      title: "Highlights of the collection",
      intro: [],
      tone: "light",
      cards: [
        {
          image: photo("03c-gootley.jpg", "A Goatley folding assault boat with its mannequin crew"),
          kicker: "Virtual tour",
          title: "Room by room",
          body: "Walk through the museum from the room of honour to the barrack room, with the story behind each display.",
          link: doc("page", "virtual-tour", "Start the tour"),
        },
        {
          image: photo("0-1.jpg", "A display case of numbered Fairbairn–Sykes knives with a green beret"),
          kicker: "Arms",
          title: "The commando knife",
          body: "The story of the Fairbairn–Sykes fighting knife, and the many variants in the collection.",
          link: doc("page", "commando-knife", "Discover the knife"),
        },
        {
          image: photo(
            "05-anciennes-tenues.jpg",
            "Five mannequins in Commando uniforms of the 1950s: work, walking-out, guard, battle and marching order",
          ),
          kicker: "Uniforms",
          title: "Evolution of the uniforms",
          body: "From the battle dress of 1942 to today's combat dress, uniform by uniform.",
          link: doc("page", "evolution-of-outfits", "See the uniforms"),
        },
        {
          image: photo(
            "dg35-decorations-roman-1.jpg",
            "The green beret and decorations of Lieutenant General Pierre Roman",
          ),
          kicker: "New in the museum",
          title: "Latest acquisitions",
          body: "Recent gifts to the museum, from weapons and uniforms to personal belongings.",
          link: doc("page", "latest-acquisitions", "See what's new"),
        },
      ],
    }),
    slice("cta_banner", {
      eyebrow: "Donations",
      title: "Every object has a story",
      body: rt(
        "The collection grows thanks to gifts from Commandos and their families. Do you have equipment, documents or photographs you would like to entrust to the museum? Get in touch with us.",
      ),
      image: noImage,
      primary_link: doc("page", "visit", "Contact the museum"),
      secondary_link: doc("page", "documentation-centre", "The documentation centre"),
    }),
  ],
});

/* -------------------------------------------------------------------------- */
/* Evolution of the uniforms                                                  */
/* -------------------------------------------------------------------------- */

/** A uniform on a mannequin. No `rank` key, so the name is translated. */
const outfit = (file: string, name: string, period: string, alt: string) => ({
  image: photo(file, alt),
  name,
  period,
});

const outfits = document("page", "evolution-of-outfits", {
  title: "Evolution of the uniforms",
  meta_title: "Evolution of the Commando uniforms",
  meta_description:
    "From the battle dress of the Second World War to colonial, UN and today's combat dress: how the uniforms of the Belgian Commandos changed since 1942.",
  meta_image: photo(
    "05-anciennes-tenues.jpg",
    "Five mannequins in Commando uniforms of the 1950s",
  ),
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Collection · Uniforms",
        title: "Evolution of the uniforms",
        lead: rt(
          "Eighty years of Commando dress, from the battle dress of 1942 to today's combat uniform, shown on mannequins in the museum.",
        ),
        image: photo(
          "05-anciennes-tenues.jpg",
          "Five mannequins in Commando uniforms of the 1950s: work, walking-out, guard, battle and marching order",
        ),
        image_credit: "Commando uniforms after 1950",
      },
      "page",
    ),
    slice("portrait_grid", {
      eyebrow: "1942–1945",
      title: "The creation and the war years",
      intro: rt(
        "At Walcheren in November 1944, the Commandos still wore their first battle dress.",
      ),
      people: [
        outfit(
          "01-tenue-de-combat-fr.jpg",
          "Battle dress",
          "During the war",
          "Mannequin in the Commando battle dress worn during the Second World War",
        ),
        outfit(
          "02-variante-apres-juin-44-fr.jpg",
          "Battle dress",
          "From June 1944",
          "Mannequin in the variant of the Commando battle dress introduced in June 1944",
        ),
        outfit(
          "03-bd-1-guerre.jpg",
          "Battle Dress No. 1",
          "Canadian",
          "Mannequin in a Canadian Battle Dress No. 1",
        ),
        outfit(
          "04-tenue-nbc-guerre.jpg",
          "Gas protection",
          "Anti-gas dress",
          "Mannequin in wartime anti-gas protective clothing",
        ),
      ],
    }),
    slice("text_media", {
      eyebrow: "After 1950",
      title: "Five orders of dress",
      body: rt(
        "1. **Work dress**, with a Cap Comfort.",
        "2. **Walking-out dress**: Battle Dress No. 1 with belt.",
        "3. **Guard dress**: Battle Dress No. 1 with belt, dagger, ankle boots and puttees.",
        "4. **Battle dress**: FBO, Full Battle Order.",
        "5. **Marching dress**: FSMO, Full Special Maintien Order.",
      ),
      image: photo(
        "05-anciennes-tenues.jpg",
        "Five mannequins in Commando uniforms of the 1950s, numbered one to five",
      ),
      caption: "From left to right: work, walking-out, guard, battle and marching dress",
      link: doc("page", "commando-knife", "The dagger worn with guard dress"),
      image_side: "left",
      tone: "dark",
    }),
    slice("portrait_grid", {
      eyebrow: "1950s",
      title: "Parade and colonial dress",
      intro: rt(
        "From 1953 the Commandos served in the Belgian Congo, at Kamina, Kitona and in Ruanda-Urundi, with uniforms made for the tropics.",
      ),
      people: [
        outfit(
          "06-bd-1-parade.jpg",
          "Parade dress",
          "With Battle Dress No. 1",
          "Mannequin in parade dress with Battle Dress No. 1",
        ),
        outfit(
          "08-tenue-coloniale.jpg",
          "Colonial barracks dress",
          "For office duty",
          "Mannequin in the colonial barracks dress worn in the offices",
        ),
        outfit(
          "10-tenue-de-brousse.jpg",
          "Bush dress",
          "With machete and survival scarf",
          "Mannequin in bush dress with machete and the survival scarf used to identify crews during air reconnaissance",
        ),
        outfit(
          "11-tenue-de-travail.jpg",
          "Walking-out dress",
          "Kamina, 1954",
          "Mannequin in colonial walking-out dress holding the pennant of the 2nd detachment of the Commando Company at Kamina, May–October 1954",
        ),
      ],
    }),
    slice("portrait_grid", {
      eyebrow: "After 1960",
      title: "From the sixties onwards",
      intro: [],
      people: [
        outfit("12-combat-ancienne.jpg", "Battle dress", "1960s", "Mannequin in Commando battle dress of the 1960s"),
        outfit(
          "14-bd-1.jpg",
          "Walking-out dress",
          "Battle Dress No. 1",
          "Mannequin in walking-out dress, Battle Dress No. 1",
        ),
        outfit(
          "15-nbc.jpg",
          "NBC dress",
          "Nuclear, biological, chemical",
          "Mannequin in NBC protective suit with gas mask",
        ),
        outfit("16-tenue-ete.jpg", "Summer walking-out dress", "Summer", "Mannequin in summer walking-out dress"),
        outfit("18-ville-femme.jpg", "Women's dress", "Walking-out", "Mannequin in the women's walking-out dress"),
      ],
    }),
    slice("portrait_grid", {
      eyebrow: "UN and today",
      title: "UN missions and today",
      intro: rt(
        "Under the United Nations flag, in Somalia and Rwanda, the Commandos exchanged their green beret for the blue one.",
      ),
      people: [
        outfit(
          "19-travail-onu.jpg",
          "Work dress",
          "United Nations",
          "Mannequin in camouflage work dress with the blue UN beret",
        ),
        outfit(
          "20-combat-onu.jpg",
          "Battle dress",
          "United Nations, with US flak jacket",
          "Mannequin in UN battle dress with blue helmet and US-type flak jacket",
        ),
        outfit(
          "21-nouvelle-tenue-de-combat.jpg",
          "New combat dress",
          "Today",
          "Mannequin in the current Belgian combat dress",
        ),
        outfit("23-nouveau-sd.jpg", "Walking-out dress (SD)", "Today", "Mannequin in the current walking-out dress"),
      ],
    }),
    slice("gallery", {
      eyebrow: "Up close",
      title: "Details of the uniforms",
      intro: [],
      images: [
        {
          image: photo("07-bd-1-details-fr.jpg", "Annotated details of the Battle Dress No. 1"),
          caption: "Battle Dress No. 1",
        },
        {
          image: photo("09-coloniale-details-fr.jpg", "Annotated details of the colonial barracks dress"),
          caption: "Colonial barracks dress",
        },
        {
          image: photo("13-combat-details-fr.jpg", "Annotated details of the 1960s battle dress"),
          caption: "Battle dress, 1960s",
        },
        {
          image: photo("22-nouveau-harnais-de-combat.jpg", "The new combat harness"),
          caption: "New combat harness",
        },
        {
          image: photo("17-ete-face-fr.jpg", "Annotated details of the summer walking-out dress"),
          caption: "Summer walking-out dress",
        },
        {
          image: photo("24-details-sd-fr.jpg", "Annotated details of the current walking-out jacket"),
          caption: "Walking-out jacket (SD)",
        },
      ],
    }),
    slice("cta_banner", {
      eyebrow: "Next in the collection",
      title: "The commando knife",
      body: rt(
        "Worn with the guard dress and carried in combat since 1941: the story of the Fairbairn–Sykes fighting knife.",
      ),
      image: noImage,
      primary_link: doc("page", "commando-knife", "Discover the knife"),
      secondary_link: doc("page", "collection", "Back to the collection"),
    }),
  ],
});

/* -------------------------------------------------------------------------- */
/* The commando knife                                                         */
/* -------------------------------------------------------------------------- */

const knife = document("page", "commando-knife", {
  title: "The commando knife",
  meta_title: "The commando knife: the Fairbairn–Sykes fighting knife",
  meta_description:
    "From the police of Shanghai to the Commandos of 1941 and today's Belgian Commandos: the history of the Fairbairn–Sykes fighting knife, and the knives in the museum's collection.",
  meta_image: photo("mod-1-type-2.jpg", "A first-pattern Fairbairn–Sykes fighting knife and its sheath"),
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Collection · Arms",
        title: "The commando knife",
        lead: rt(
          "Designed in 1940 by two former Shanghai police officers, the Fairbairn–Sykes fighting knife became the emblem of the Commandos – and of special forces around the world.",
        ),
        image: photo(
          "placement-02.jpg",
          "A Second World War paratrooper in a camouflage smock and netted helmet, his fighting knife at his side",
        ),
        image_credit: "Always within reach",
      },
      "page",
    ),
    slice("intro_statement", {
      eyebrow: "The Fairbairn–Sykes fighting knife",
      title: "",
      statement: rt(
        "The knife is as unique as the first men who carried it into battle. **The first Commandos, like their knife, were exceptional.**",
      ),
      body: rt(
        "The F-S knife was issued to the Commandos during the Second World War. It is still worn by Belgian Commandos today: the third model on parade, its successor as part of their operational kit.",
      ),
      facts: [
        { value: "1940", label: "Shape finalised at Wilkinson, Sheffield" },
        { value: "7 in", label: "Double-edged blade (17.78 cm)" },
        { value: "500", label: "First knives made by hand" },
        { value: "3", label: "Wartime models, 1941–1943" },
      ],
    }),
    slice("text_media", {
      eyebrow: "A · Shanghai",
      title: "Forged on the streets of Shanghai",
      body: rt(
        "To understand the F-S fighting knife, we have to go back to Shanghai. There, William Ewart Fairbairn and his friend Eric Anthony Sykes trained and led sections of the Shanghai Municipal Police, including the riot squad and the sharpshooter units.",
        "Shanghai was then known as the most dangerous city in the world: armed robbery, murder, extortion, kidnapping, hostage-taking and riots were daily events.",
        "Fairbairn joined the Shanghai police in 1907, after serving in the Royal Marines. His talent was quickly recognised: he was appointed shooting and drill instructor in 1910, rose to assistant commissioner in 1935 and retired in 1940, shortly before the world war broke out. Over the years he took part in more than 200 skirmishes with criminals, and kept refining the corps' methods: unarmed combat, and self-defence with baton, knife and pistol. Instead of shooting at fixed targets, as was the rule at the time, he introduced shooting at moving targets.",
      ),
      image: photo("fairbairn.jpg", "Portrait of William Ewart Fairbairn"),
      caption: "William Ewart Fairbairn",
      link: noLink,
      image_side: "left",
      tone: "light",
    }),
    slice("text_media", {
      eyebrow: "1920–1940",
      title: "From Shanghai to Lochailort",
      body: rt(
        "Around 1920 Fairbairn met Eric Sykes. Together they formed a close team that the War Office would put to good use twenty years later. Sykes was an excellent shot, and in the 1920s Fairbairn gave him command of a sharpshooter unit within the police's special units.",
        "The first design of their fighting knife may well date from the time US Marines were stationed in Shanghai. Fairbairn was well regarded by the Marines, and many came to study his methods. According to one of their officers, Captain S. Yeaton, a stock of old Boer War bayonets in the police armoury was used for experiments.",
        "Fairbairn and Sykes returned to England together and offered their services to the War Office. In May 1940 they were made captains and sent to Lochailort, in the west of Scotland, where a special training camp had been set up. They taught hand-to-hand combat and the use of the revolver and the Tommy gun; Captain P. N. Walbridge taught rifle and bayonet. Together with the other instructors, they formed a unique team.",
      ),
      image: photo("eric-sykes.jpg", "Portrait of Eric Anthony Sykes"),
      caption: "Eric Anthony Sykes",
      link: noLink,
      image_side: "right",
      tone: "sand",
    }),
    slice("artifact", {
      eyebrow: "A knife for close combat",
      title: "Designed for one task",
      body: rt(
        "The first Commando units had no fighting knife of their own. The knives in use were of limited value, and many Commandos carried their own weapons, some of them relics of the First World War.",
        "Fairbairn and Sykes argued that a purpose-built weapon should meet the needs of Commandos in hand-to-hand fighting. Shanghai had taught them that it must be carried so that it could be drawn quickly and surely: tabs on the sheath let it be fixed to clothing. A heavy grip gave a firm hold, and the point of balance sat at the middle finger for agility. The double-edged blade allowed both cut and thrust, and the point could strike quickly and deeply.",
        "The knife was meant above all for silent killing, or for close combat when a firearm could not be used. Some critics never understood its purpose. It was ideal for its main task: eliminating a sentry.",
      ),
      image: photo("dimmensions.jpg", "Technical drawing of the Fairbairn–Sykes knife with its dimensions and point of balance"),
      caption: "Dimensions and point of balance",
      link: noLink,
      specs: [
        { label: "Blade", value: "7 in (17.78 cm), double-edged" },
        { label: "Grip", value: "5 in, heavy, for a firm hold" },
        { label: "Balance", value: "At the middle finger" },
        { label: "Tang", value: "Steel runs through to the pommel, which can also strike" },
        { label: "Sheath", value: "Tabs to fix it to clothing" },
      ],
    }),
    slice("artifact", {
      eyebrow: "1st model · 1941",
      title: "The first pattern",
      body: rt(
        "The original design, known as the first model, was made in Sheffield by the world-famous Wilkinson company. Fairbairn and Sykes visited the factory in November 1940 and, with John Wilkinson-Latham, settled the shape that has since become legendary. The first 500 knives were made by hand from the best black steel.",
        "The blade was polished bright on purpose: the moment the knife was drawn, light would flash on it to frighten the enemy, make him lose confidence and surrender. Later models were given a matt or black finish so they would go unnoticed at night.",
        "The first knives were very probably issued to No. 3 and No. 4 Commandos for the first major Commando raid, on the Lofoten Islands in Norway in March 1941. While the landing ships gathered at Scapa Flow, Captains Fairbairn and Sykes visited the Commandos and taught them how to use it.",
      ),
      image: photo("mod-1-type-2.jpg", "A first-pattern Fairbairn–Sykes knife with S-shaped guard, above its sheath"),
      caption: "First model, with S-shaped guard",
      link: noLink,
      specs: [
        { label: "Maker", value: "Wilkinson, Sheffield" },
        { label: "In production", value: "From about January 1941" },
        { label: "Blade", value: "7 in, polished" },
        { label: "Grip", value: "5 in, chequered bronze" },
        { label: "Guard", value: "S-shaped, nickel-plated" },
        { label: "Price", value: "13 shillings and 6 pence with sheath (about €4.50)" },
      ],
    }),
    slice("artifact", {
      eyebrow: "2nd model · April 1941",
      title: "Built in numbers",
      body: rt(
        "The second model was ready in April 1941. A different blade simplified production, and the S-shaped guard gave way to a straight one.",
        "The second and third models were mass-produced, because so many were needed, and their quality suffered. Many other makers in Sheffield, Birmingham and London joined in.",
      ),
      image: photo("mod-2.jpg", "A second-pattern Fairbairn–Sykes knife with straight guard, above its sheath"),
      caption: "Second model, with straight guard",
      link: noLink,
      specs: [
        { label: "Guard", value: "Straight" },
        { label: "Makers", value: "Sheffield, Birmingham and London" },
      ],
    }),
    slice("artifact", {
      eyebrow: "3rd model · February 1943",
      title: "The legend in black",
      body: rt(
        "The third model, made from February 1943, was black, with a ribbed grip of cheaper material. It became world-famous: the knife is the symbol of many special forces and appears on their badges.",
        "Belgian Commandos still carry this model on parade.",
      ),
      image: photo("mod3.jpg", "A black third-pattern Fairbairn–Sykes knife with ribbed grip, above its sheath"),
      caption: "Third model, with ribbed grip",
      link: noLink,
      specs: [
        { label: "Finish", value: "Black" },
        { label: "Grip", value: "Ribbed" },
        { label: "Today", value: "Worn on parade by Belgian Commandos" },
      ],
    }),
    slice("text_media", {
      eyebrow: "In combat",
      title: "Fear for the enemy, courage for its bearer",
      body: rt(
        "The knife was used in battle by units of many nations, among them:",
        "- the British Army and the Royal Marine Commandos",
        "- No. 10 Inter-Allied Commando",
        "- British and Canadian paratroopers",
        "- the Special Operations Executive and the Office of Strategic Services",
        "- the Home Guard Auxiliary Units and the SAS",
        "- the Long Range Desert Group and the Chindits",
        "- the American Rangers, Merrill's Marauders and even some Gurkha units",
        "Wherever it was carried and used, it spread fear and dread among the enemy, while giving its bearer courage and self-confidence.",
      ),
      image: photo("distribution.jpg", "Commandos in berets receiving their fighting knives"),
      caption: "Issue of the knives",
      link: noLink,
      image_side: "right",
      tone: "dark",
    }),
    slice("quote", {
      quote: rt(
        "The knife is now part of the legend of the Allied Commandos. It will always pay tribute to their deeds, and to its designers William Ewart Fairbairn and Eric Anthony Sykes: two exceptionally gifted men, far ahead of their time.",
      ),
      attribution: "Marcel Dimanche",
      role: "Commando Museum",
      tone: "sand",
    }),
    slice("text_media", {
      eyebrow: "How it was carried",
      title: "Always within reach",
      body: rt(
        "The tabs on the sheath let each man sew or tie the knife exactly where his hand would find it: on the thigh, on the webbing or on the parachute smock.",
      ),
      image: photo(
        "placement-01.jpg",
        "A soldier in a netted helmet straps a Fairbairn–Sykes knife in its sheath to his leg",
      ),
      caption: "Strapping the knife to the leg",
      link: noLink,
      image_side: "left",
      tone: "light",
    }),
    slice("artifact", {
      eyebrow: "B · Private collection",
      title: "The Alexis Laykoff collection",
      body: rt(
        "Alexis Laykoff, administrator and active member of the museum, assembled a remarkable collection of Fairbairn–Sykes knives and their variants. The case is numbered: the list below describes each knife.",
      ),
      image: photo("0-1.jpg", "Display case with nineteen numbered Fairbairn–Sykes knives around a green beret"),
      caption: "The Laykoff collection, numbered 1 to 19",
      link: noLink,
      specs: [],
    }),
    slice("rich_text", {
      eyebrow: "The collection, knife by knife",
      title: "Nineteen knives",
      body: rt(
        "1. **1st model.** Steel blade and grip, guilloché grip. Ricasso marked “F&S”, S-shaped guard.",
        "2. **1st model.** Guard marked “B2” without number. Brass grip, blued blade.",
        "3. **1st model.** Same as no. 2, with “B2” and a number on the guard and “EM” on the grip. Probably used in a unit (staff and services company of 2 Cdo?).",
        "4. **2nd model.** Blade and grip with the look of red copper; the grip is stamped with a diamond containing a Cross of Lorraine. According to several sources, these knives were dropped to the French Resistance. Three of them are known in other collections.",
        "5. **2nd model.** British soldiers who could afford it wore a knife with a beaded grip when going out: a private, unmarked fancy weapon.",
        "6. **2nd model.** “Zamak”-type grip and bright blade. Square guard marked “WD” (Scotland?).",
        "7. **2nd model.** Raised mark on the grip near the guard: “A and two crossed keys”. Original fixing of the blade with a hexagonal nut.",
        "8. **2nd model.** Same model as no. 6, with “↑2” marked on the grip.",
        "9. **2nd model.** The daggers in service with the units have a hole in the guard for a chain that, fixed to the sheath, prevents loss. The ricasso runs almost to the point, giving a three-faceted look. After the events of 1960, several daggers were struck off. Guard marked “◊0378” (from Kamina).",
        "10. **2nd model.** Same model as no. 9. In 1993 a very large number of these daggers, made for Africa, turned up at collectors' fairs. Guard marked “ABL C 3064” (from Kota-Koli).",
        "11. **2nd model.** Chrome fancy model, marked on the grip with two raised keys.",
        "12. **2nd model.** Gilded model, marked on the grip with two raised keys.",
        "13. **2nd model.** Black grip, gilded brass guard, chrome-plated blade.",
        "14. **2nd model.** Made as a souvenir of the Falklands War. Black grip and guard, chrome-plated blade, marked “IN HONOUR OF THE FALKLANDS CAMPAIGN APRIL 10 JUNE 1982”.",
        "15. **2nd model.** Made as a souvenir of the Second World War, marked “TO COMMEMORATE THE 50th ANNIVERSARY OF WORLD WAR II 1939 TO 1945”.",
        "16. **2nd model.** Same as no. 7 except for the fixing of the blade to the guard. Guard marked “↑ W.D”.",
        "17. **2nd model.** Made by J. Nowill & Sons, Est. 1700, Sheffield, England. Both sides of the blade are marked; this side reads “UNITED COMMANDOS – THE ARMY COMMANDOS 1940-45”.",
        "18. **2nd model.** Same as no. 17, seen from the other side: “THEY PERFORMED WHATSOEVER THE KING COMMANDED” and “WHEN SHALL THEIR GLORY FADE”.",
        "19. **3rd model.** Very fine marking on the blade: “J. NOWILL & SONS – SHEFFIELD ENGLAND – ESTABLISHED AD 1700”.",
      ),
    }),
    slice("text_media", {
      eyebrow: "No. 4",
      title: "A dagger for the Resistance",
      body: rt(
        "This second-model knife has the look of red copper, and its grip bears a diamond containing a Cross of Lorraine. According to several sources, knives like it were dropped by parachute to the French Resistance. Only three others are known in other collections.",
      ),
      image: photo("4.jpg", "Second-model Fairbairn–Sykes knife with a copper-coloured blade and grip"),
      caption: "No. 4, Cross of Lorraine",
      link: noLink,
      image_side: "right",
      tone: "sand",
    }),
    slice("text_media", {
      eyebrow: "No. 9",
      title: "Made for Kamina",
      body: rt(
        "The daggers used by the Belgian units have a hole in the guard for a chain fixed to the sheath, so the weapon cannot be lost. The flat of the blade runs almost to the point. This one is marked “◊0378”: it comes from Kamina, the Commando base in the Belgian Congo.",
      ),
      image: photo("9.jpg", "Second-model Fairbairn–Sykes knife used by the Belgian units, with a hole in the guard"),
      caption: "No. 9, from Kamina",
      link: noLink,
      image_side: "left",
      tone: "light",
    }),
    slice("gallery", {
      eyebrow: "Up close",
      title: "Markings and details",
      intro: rt("Makers' stamps, unit markings and engravings tell where each knife came from."),
      images: [
        { image: photo("1bis-2.jpg", "Close-up of the F-S marking and a numbered guard"), caption: "No. 1 · Ricasso and guard" },
        { image: photo("4bis.jpg", "Close-up of a diamond with a Cross of Lorraine stamped on a copper grip"), caption: "No. 4 · Cross of Lorraine" },
        { image: photo("14bis.jpg", "Close-up of the Falklands Campaign engraving on a chrome blade"), caption: "No. 14 · Falklands" },
        { image: photo("15bis.jpg", "Close-up of the Second World War anniversary engraving on a blade"), caption: "No. 15 · 50th anniversary" },
        { image: photo("17bis.jpg", "Close-up of the United Commandos engraving on a blade"), caption: "No. 17 · United Commandos" },
        { image: photo("18bis.jpg", "Close-up of the engraving on the reverse of the United Commandos blade"), caption: "No. 18 · When shall their glory fade" },
      ],
    }),
    slice("text_media", {
      eyebrow: "C · Through the years",
      title: "From bayonet to dagger",
      body: rt(
        "The prototype of the dagger was made from a British Lee-Metford bayonet of 1888. In the same way, the trench daggers of 1914–1918 were made from Greener bayonets. Another origin lies in Belgian Mod. 89 bayonets, picked up on the battlefields of 1914–1918, sent to Great Britain to become trench daggers and back at the front in 1916.",
        "We are going round in circles. Consult six archives and you find six different versions; the deeper you dig, the more you flounder. All your information is welcome.",
      ),
      image: photo("2-tranchee.jpg", "A 1914–1918 trench dagger made by Sanderson Brothers & Newbould, Sheffield"),
      caption: "Trench dagger 1914–1918",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    slice("rich_text", {
      eyebrow: "Step by step",
      title: "The evolution of the dagger",
      body: rt(
        "1. **Belgian bayonet, model 1924.** Note the ricasso, the flat at the start of the blade after the guard.",
        "2. **Trench dagger, 1914–1918.** The basis for the design of the Commando dagger. The ricasso is marked “SANDERSON BROS & NEWBOULD SHEFFIELD”, barely legible through wear. Note the similar blade with its flat.",
        "3. **Old S.A. FN bayonet.** Fixing and grip cut down to make a dagger; again, note the similar blade with its flat.",
        "4. **Model 1 (F&S).**",
        "5. **Model 2 (F&S).**",
        "6. **Model 3 (F&S).** Still used on parade by the Belgian Commandos. The flat has disappeared.",
        "7. **Current model.** Issued to the Belgian Commandos as part of their operational equipment.",
        "8. **Training model.** Used for training at the Commando Training Centre (CE Cdo) in Marche-les-Dames.",
      ),
    }),
    slice("artifact", {
      eyebrow: "Today",
      title: "The current model",
      body: rt(
        "Today's Belgian Commandos are issued a modern fighting knife as part of their operational equipment, in a black synthetic sheath. A training version is used at the [Commando Training Centre](page:commando-training-centre) in Marche-les-Dames.",
      ),
      image: photo("7-actuel.jpg", "The current Belgian Commando fighting knife with its black sheath"),
      caption: "Current model",
      link: noLink,
      specs: [
        { label: "Issued to", value: "Belgian Commandos" },
        { label: "Use", value: "Operational equipment" },
      ],
    }),
    slice("text_media", {
      eyebrow: "D · Other models",
      title: "The Nogent dagger",
      body: rt(
        "A dagger of French origin, also made with a fixing to mount it as a bayonet on the US M1 carbine. It was used by the French Navy Commandos in Algeria. The guard is marked “LE COMMANDO” and “Modèle déposé inox super Nogent”.",
        "The collection also holds another model, marked “SHEFFIELD ENGLAND” on the guard.",
      ),
      image: photo("1a-nogent.jpg", "The French Nogent commando dagger"),
      caption: "Nogent model",
      link: noLink,
      image_side: "left",
      tone: "sand",
    }),
    slice("artifact", {
      eyebrow: "E · In the museum",
      title: "Gifts to the museum",
      body: rt(
        "The knives on the museum's own panel were all gifts:",
        "- **L. Verboven**: the knife of Carlo Segers, a model given at the end of the war to every Commando in England, engraved with his name.",
        "- **R. Decaluwe**",
        "- **J. Charron**: commemorative 1940–45 knife with engraving.",
        "- **M. Dimanche**: model 3, still used on parade.",
        "- **J. Peyralbe**: version with a wooden grip, made by British firms from surplus blades after their official army contract ended.",
        "- **M. Jottrand**: engraved “The Army COMMANDOS 1940-45”.",
        "- **D. Kervyn de Marcke**: made in Gembloux, Belgium.",
      ),
      image: photo("panneaux.jpg", "Octagonal display panel with eight numbered commando knives in the museum"),
      caption: "The knife panel in the museum",
      link: doc("page", "virtual-tour", "Visit the museum online"),
      specs: [],
    }),
    slice("rich_text", {
      eyebrow: "Sources",
      title: "",
      body: rt(
        "This article was written by Marcel Dimanche, based on the sources below, with the expert help of Alexis Laykoff and his collection and personal documentation. The Dutch translation is the work of Joseph Leysen.",
        "- *The Commando Dagger*, no. 3, 1 November 2002",
        "- *Fighting Knives*, Frederick J. Stephens",
        "- *Commando Dagger*, Leroy Thompson",
      ),
    }),
    slice("cta_banner", {
      eyebrow: "See them for yourself",
      title: "The knives are on display in Flawinne",
      body: rt("The museum is open by appointment. Admission is free."),
      image: noImage,
      primary_link: doc("page", "visit", "Plan your visit"),
      secondary_link: doc("page", "evolution-of-outfits", "Evolution of the uniforms"),
    }),
  ],
});

export const collectionDocuments = [collection, outfits, knife];
