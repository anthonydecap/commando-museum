import { doc, document, noImage, noLink, rt, slice } from "./helpers";
import { photo } from "./shared";

/**
 * The Belgian Commando units: the 2nd Battalion of Commandos and the Commando Training Centre,
 * which still exist, and the units that once wore the green beret and have since been disbanded.
 * Sources: museedescommandos.be (French version first, it is the most up to date).
 */

type Person = [rank: string, name: string, period: string];

/** Commanders and corps NCOs. Ranks are written the Belgian way and stay the same in every language. */
const people = (list: Person[]) =>
  list.map(([rank, name, period]) => ({ image: noImage, rank, name, period }));

const grid = (eyebrow: string, title: string, list: Person[], intro: string[] = []) =>
  slice("portrait_grid", { eyebrow, title, intro: intro.length ? rt(...intro) : [], people: people(list) });

/** Closing banner of a unit page: on to the next unit, or back to the overview. */
const next = (uid: string, name: string) =>
  slice("cta_banner", {
    eyebrow: "Belgian Commando units",
    title: `Next: ${name}`,
    body: rt("Every unit that wore the green beret has its place in the museum in Flawinne."),
    image: noImage,
    primary_link: doc("page", uid, "Next unit"),
    secondary_link: doc("page", "units", "All units"),
  });

const badges = {
  cdo2: photo(
    "02-2-cdo.png",
    "Badge of the 2nd Battalion of Commandos: a commando dagger framed by a green scroll reading United We Conquer",
  ),
  cdo4: photo(
    "05-4-cdo.png",
    "Badge of the 4th Commando Battalion: a dagger and a palm tree on wings, ringed with the names Leo, Kitona, Rwanda, Bunia and Goma",
  ),
  cdo6: photo(
    "06-6-cdo.jpg",
    "Unofficial badge of the 6th Commando Battalion: a winged dagger and a stylised 6 inside a star, with the words United We Conquer",
  ),
  ctrg: photo("07-ce-cdo.png", "Badge of the Commando Training Centre at Marche-les-Dames"),
  atk: photo(
    "08-cie-atk.jpg",
    "Winged badge of the Para-Commando Anti-Tank Company: a dagger in front of an open parachute",
  ),
  fa: photo(
    "09-bie-aie.png",
    "Badge of the Para-Commando Field Artillery Battery: a dagger and parachute in front of two crossed artillery shells",
  ),
  gn: photo(
    "10-14-gn.jpg",
    "Winged badge of the 14th Para-Commando Engineer Company with a Roman engineer's helmet",
  ),
  aa: photo(
    "11-35aa.jpg",
    "Winged badge of the 35th Para-Commando Anti-Aircraft Battery with two crossed missiles",
  ),
  log: photo(
    "12-210-log.png",
    "Winged badge of the 210th Para-Commando Logistics Company with the symbols of the Logistics branch",
  ),
};

/* -------------------------------------------------------------------------- */
/* Overview                                                                   */
/* -------------------------------------------------------------------------- */

const units = document("page", "units", {
  title: "Units",
  meta_title: "The Belgian Commando units",
  meta_description:
    "The 2nd Battalion of Commandos, the Commando Training Centre and the disbanded units that wore the green beret: the Belgian Commando units, from 1942 to today.",
  meta_image: photo(
    "maneuvers-amfl.jpg",
    "A helicopter lifts a vehicle during an Allied Command Europe Mobile Force exercise",
  ),
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Belgian Commando units",
        title: "Under the green beret",
        lead: rt(
          "Every unit of the Belgian army that has proudly worn the green beret of the Commandos is represented in the museum: the two that still carry the tradition today, and those that have since been disbanded.",
        ),
        image: photo(
          "maneuvers-amfl.jpg",
          "A helicopter lifts a vehicle during an Allied Command Europe Mobile Force exercise",
        ),
        image_credit: "AMF(L) exercise",
      },
      "page",
    ),
    slice("intro_statement", {
      eyebrow: "Since 1942",
      title: "",
      statement: rt(
        "It started with one troop of volunteers in wartime Britain. **The green beret has since been worn by battalions, batteries and companies all over the world.**",
      ),
      body: rt(
        "The 2nd Battalion of Commandos is the direct heir of the 4th Troop of No. 10 Inter-Allied Commando. The Commando Training Centre at Marche-les-Dames has trained every para-commando since 1955. Around them, new units were created as the needs of the Para-Commando Regiment and Brigade changed, and disbanded when the army was reorganised.",
      ),
      facts: [
        { value: "1942", label: "4th Troop of No. 10 Inter-Allied Commando" },
        { value: "2", label: "Units still active today" },
        { value: "7", label: "Disbanded units with Commando traditions" },
        { value: "1961", label: "2 Cdo moves to the barracks in Flawinne" },
      ],
    }),
    slice("card_grid", {
      eyebrow: "Active units",
      title: "Still carrying the tradition",
      intro: rt("Both units are part of the Special Operations Regiment (SO Regt), created on 7 March 2019."),
      tone: "sand",
      cards: [
        {
          image: noImage,
          kicker: "2 Cdo",
          title: "2nd Battalion of Commandos",
          body: "Heir of the 4th Troop since 1942, based in Flawinne since 1961. Motto: United We Conquer.",
          link: doc("page", "2nd-commando-battalion", "Read the history"),
        },
        {
          image: noImage,
          kicker: "CTrg Cdo",
          title: "Commando Training Centre",
          body: "Marche-les-Dames, since 1946. Where every para-commando earns the Commando brevet.",
          link: doc("page", "commando-training-centre", "Read the history"),
        },
      ],
    }),
    slice("card_grid", {
      eyebrow: "Disbanded units",
      title: "Units that wore the green beret",
      intro: rt(
        "From the battalions of the African period to the support units of the Para-Commando Brigade, disbanded in the reorganisations of the Belgian army.",
      ),
      tone: "light",
      cards: [
        {
          image: noImage,
          kicker: "4 Cdo",
          title: "4th Commando Battalion",
          body: "1959–1962: Kitona, then Rwanda. Later a reserve battalion, until 1994.",
          link: doc("page", "4th-commando-battalion", "Read the history"),
        },
        {
          image: noImage,
          kicker: "6 Cdo",
          title: "6th Commando Battalion",
          body: "May to December 1960: the Congo in the weeks after independence.",
          link: doc("page", "6th-commando-battalion", "Read the history"),
        },
        {
          image: noImage,
          kicker: "ATk",
          title: "Para-Commando Anti-Tank Company",
          body: "1963–1994: Entac and Milan missiles, Kolwezi, Zaire and Somalia.",
          link: doc("page", "anti-tank-company", "Read the history"),
        },
        {
          image: noImage,
          kicker: "Bie Aie",
          title: "Para-Commando Field Artillery Battery",
          body: "1973–2004: 105 mm howitzers, from Somalia to Albania.",
          link: doc("page", "field-artillery-battery", "Read the history"),
        },
        {
          image: noImage,
          kicker: "14 Gn",
          title: "14th Para-Commando Engineer Company",
          body: "1992–2003: combat engineers, mine warfare and combat swimmers.",
          link: doc("page", "14th-engineer-company", "Read the history"),
        },
        {
          image: noImage,
          kicker: "35 AA",
          title: "35th Para-Commando Anti-Aircraft Battery",
          body: "1994–2002: Mistral missiles to protect the Brigade from the air.",
          link: doc("page", "35th-anti-aircraft-battery", "Read the history"),
        },
        {
          image: noImage,
          kicker: "210 Log",
          title: "210th Para-Commando Logistics Company",
          body: "1994–2003: supply, transport and maintenance for the Brigade.",
          link: doc("page", "210th-logistics-company", "Read the history"),
        },
      ],
    }),
    slice("cta_banner", {
      eyebrow: "Further reading",
      title: "Books on the Belgian Commandos",
      body: rt(
        "A selection of books on the history of the Commandos and the Para-Commando units, in French and English.",
      ),
      image: noImage,
      primary_link: doc("page", "bibliography", "See the bibliography"),
      secondary_link: doc("page", "history", "Read the history"),
    }),
  ],
});

/* -------------------------------------------------------------------------- */
/* 2nd Battalion of Commandos                                                 */
/* -------------------------------------------------------------------------- */

const op = (year: string, title: string, body: string[], image?: [string, string], caption = "") => ({
  year,
  title,
  body: rt(...body),
  image: image ? photo(...image) : noImage,
  caption,
});

const cdo2 = document("page", "2nd-commando-battalion", {
  title: "2nd Battalion of Commandos",
  meta_title: "2nd Battalion of Commandos (2 Cdo)",
  meta_description:
    "The 2nd Battalion of Commandos, heir of the 4th Troop of 1942: its history, operations from Stanleyville to Niger, traditions and commanders.",
  meta_image: photo("green-apple.jpg", "Commandos of the 2nd Commando Battalion in combat kit"),
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Active unit · 2 Cdo · Flawinne",
        title: "2nd Battalion of Commandos",
        lead: rt(
          "The direct heir of the 4th Troop of No. 10 Inter-Allied Commando. From the barracks in Flawinne, the battalion has served in Africa, the Balkans, Afghanistan and the Sahel.",
        ),
        image: photo("green-apple.jpg", "Commandos of the 2nd Commando Battalion in combat kit"),
        image_credit: "Mission Green Apple, 1979",
      },
      "page",
    ),
    slice("artifact", {
      eyebrow: "Traditions",
      title: "United We Conquer",
      body: rt(
        "The 2nd Battalion of Commandos is the direct heir of the traditions of the 4th Troop of No. 10 Inter-Allied Commando. It wears the green beret with a badge designed in 1950 by the chaplain of the time, Padre Devos.",
        "The colours of the unit are black and white. The personnel wear black collar patches with white piping (old dress) and the dagger on the shoulder straps, the word COMMANDO at the top of each sleeve, the Commando brevet A on the right sleeve and the Parachute brevet A above the right breast pocket.",
        "Bilingual since its creation, the battalion became French-speaking only in 1982. On 1 January 1995 its name changed once more, from 2de Bataljon Commando to 2ème Bataillon de Commandos.",
      ),
      image: badges.cdo2,
      caption: "Badge of the 2nd Battalion of Commandos",
      link: noLink,
      specs: [
        { label: "Heir of", value: "4th Troop, No. 10 Inter-Allied Commando (1942)" },
        { label: "Motto", value: "United We Conquer" },
        { label: "Colours", value: "Black and white" },
        { label: "Badge", value: "Designed in 1950 by Padre Devos" },
        { label: "Barracks", value: "Caserne Slt Thibaut, Flawinne, since 1961" },
        { label: "Godparent", value: "Han-sur-Lesse (Rochefort), since 4 June 1972" },
      ],
    }),
    slice("timeline", {
      eyebrow: "1945–1964",
      title: "From Commando Regiment to 2nd Commando Battalion",
      intro: [],
      events: [
        op("1945", "Back in Belgium", [
          "In September 1945 the Commando Regiment returns to Belgium and settles in Marche-les-Dames and Namur, and later also in Seilles.",
        ]),
        op("1946", "A standard for the regiment", [
          "By decree no. 2837 of the Prince Regent of 26 August 1946, the regiment is given a standard. On 22 October, at a ceremony at the Royal Palace in Brussels, Lieutenant-Colonel G. Danloy receives it from the hands of the Prince Regent, with the battle honours Italy, Yugoslavia and Walcheren.",
        ]),
        op("1951", "Commando Battalion", [
          "On 1 April 1951 the Commando Regiment is renamed Commando Battalion. For a few months it is even called the 1st Commando Battalion. In 1955 the unit takes the name 2nd Commando Battalion.",
        ]),
        op("1953", "The African period", [
          "From 1953 the Commandos take an active part in the African period, training many detachments for the Kamina base (BAKA), the Kitona base (BAKI) in the Belgian Congo, and Ruanda. The battalion then has two rifle companies (1st and 2nd) and a Headquarters and Services Company.",
        ]),
        op("1959", "Leopoldville, without warning", [
          "After the riots of January 1959 the battalion is flown to Leopoldville as a matter of urgency and stays about a month. It is the first time a Belgian unit is sent abroad without prior alert: woken in the night of 10 January, the Commandos take off late that afternoon for the Belgian Congo on board Sabena aircraft. Part of the cadre and the conscripts then form the 4th Commando Battalion, which settles in Kitona in Lower Congo.",
        ]),
        op("1960", "Kamina and Kitona", [
          "In February 1960 the battalion moves to Kamina, where its conscripts, three months into their service, spend two months completing their training and earning the Parachute brevet A: the first battalion to qualify without a single refusal to jump. It then settles at the Kitona base. Once again, part of the cadre and the conscripts stay behind in Kitona and form a new battalion, the 6th Commando Battalion.",
        ]),
        op("1962", "Three rifle companies", [
          "Until February 1962 the battalion trains cadre and conscripts in Belgium and sends them to the 4th Commando Battalion in Rwanda. After the African period it is reorganised into three rifle companies, the 12th, 14th and 16th, and a Headquarters and Services Company.",
        ]),
      ],
    }),
    slice("timeline", {
      eyebrow: "1964–2022",
      title: "Operations",
      intro: rt(
        "Humanitarian rescues, peacekeeping under the blue beret, training missions and support to the Special Forces Group: the battalion's main deployments.",
      ),
      events: [
        op(
          "1964",
          "Red Dragon and Black Dragon",
          [
            "From 16 to 30 November 1964, part of the battalion staff and the 12th Company take part, alongside the 1st Parachute Battalion, in the humanitarian operation at Stanleyville and Paulis in the Congo. The detachment is mentioned in the Order of the Day of the Armed Forces:",
            "**…the 12th Company of the 2nd Commando Battalion. “From 24 to 27 November 1964, for having shown a high degree of composure, drive and discipline in carrying out a delicate and dangerous mission to free Belgian and foreign civilians held hostage in Stanleyville and Paulis.”**",
          ],
          [
            "09-stan-et-paulis.jpg",
            "Freed hostages walk through a street in Stanleyville past a Belgian jeep, November 1964",
          ],
          "Stanleyville, November 1964",
        ),
        op(
          "1966",
          "AMF(L) exercises",
          [
            "From 1966 the battalion, like the other units of the Para-Commando Brigade, regularly takes part in exercises of the Allied Command Europe Mobile Force (Land) in Denmark, Greece, Italy and Turkey.",
          ],
          [
            "maneuvers-amfl.jpg",
            "A helicopter lifts a vehicle during an Allied Command Europe Mobile Force exercise",
          ],
        ),
        op(
          "1974",
          "Sahel",
          [
            "From June to August 1974 a detachment of 30 men carries out a humanitarian mission for the starving population of the Sahel.",
          ],
          ["opdracht-sahel.jpg", "An elderly man holding a child reads a letter, Sahel"],
        ),
        op("1975", "Aid to the nation", [
          "In 1975 the 12th Company helps farmers after their fields were flooded. For a week it stays in the buildings of a flax grower in Jodoigne and every day brings in the flax from a designated field. During a mission along the N4 at Beuzet, the regimental commander pays an unannounced visit.",
          "In 1976 the battalion is called out to Ruisbroek after floods: sandbags, and more sandbags.",
        ]),
        op(
          "1978",
          "Red Bean: Kolwezi",
          [
            "In 1978 the 14th Company and the 4.2-inch mortar platoon (216 men) take part in the humanitarian operation Red Bean in Shaba (Kolwezi) within the Para-Commando Regiment. The detachment is mentioned in the Order of the Day of the Armed Forces:",
            "**Kolwezi. …the Para-Commando Anti-Tank Company. …the 14th Company and the Mortar Platoon of the 2nd Commando Battalion. “From 19 May to 10 July 1978, for having shown composure and remarkable discipline and efficiency in a mission to free and protect Belgians and foreigners whose lives were threatened, in Shaba and in particular in Kolwezi.”**",
          ],
          [
            "09-kolwezi.jpg",
            "A tree-lined street in Kolwezi with a vehicle and soldiers on the ground, 1978",
          ],
          "Kolwezi, 1978",
        ),
        op("1979", "Green Apple", [
          "The following year, fearing a repeat of the events in Kolwezi, the battalion is sent to train the Zairean Armed Forces and to act as a deterrent in Lower Zaire. It is at the Kitona base from 12 February to 30 March 1979, under Lieutenant-Colonel BEM R. De Clerck.",
        ]),
        op(
          "1985",
          "The CCC attacks",
          [
            "In 1985 the battalion reinforces the Gendarmerie with security patrols to protect the population against the terrorist attacks of the Cellules Communistes Combattantes (CCC).",
          ],
          ["opdracht-c-c-c.png", "The Commando dagger in a black inverted triangle"],
        ),
        op(
          "1990",
          "Green Bean: Kigali",
          [
            "On 4 October 1990, operation Green Bean: reinforced by a company of the 3rd Parachute Battalion and a platoon of the Para-Commando Recce Squadron, the battalion is sent to Kigali in Rwanda. Its mission: hold the airfield to keep it out of the hands of the Tutsi rebels and, if necessary, allow the evacuation of Belgian and German nationals. The mission ends on 31 October.",
          ],
          [
            "green-beam.jpg",
            "Commandos with a machine gun in a firing position by a roadside in Kigali, a child crying nearby, 1990",
          ],
        ),
        op(
          "1991",
          "Blue Beam: Zaire",
          [
            "In September 1991, operation Blue Beam: the Para-Commando Regiment is sent to Zaire to protect the evacuation of Belgian nationals. On 27 October the 16th Company is sent to Libreville in Gabon as an intervention reserve.",
          ],
          [
            "blue-bean.jpg",
            "Aerial view of a winding river in Central Africa, seen from the door of an aircraft",
          ],
        ),
        op(
          "1993",
          "Restore Hope and UNOSOM II: Somalia",
          [
            "In April 1993, in Kismayo, the battalion and the Para-Commando Field Artillery Battery take over from the 1st Parachute Battalion. On 4 May 1993, under the United Nations, they become the first units of the Para-Commando Brigade to wear the blue beret. The mission is commanded by Lieutenant-Colonel F. Van de Weghe. A series of weapons captured during this mission is on display in the museum.",
          ],
          [
            "opdracht-restore-hope.jpg",
            "Belgian soldiers on patrol with vehicles and weapons in Somalia, 1993",
          ],
        ),
        op(
          "1994",
          "UNAMIR: ten Commandos killed",
          [
            "In March 1994 the battalion takes over from the 1st Parachute Battalion in Rwanda for the UN mission UNAMIR. On 6 April the President of Rwanda is assassinated, unleashing massacres on an unprecedented scale. On 7 April the Prime Minister, Agathe Uwilingiyimana, is murdered with her children by soldiers of the Presidential Guard.",
            "A section of the Mortar Platoon, tasked with her protection, tried in vain to cover her escape. Arrested by Rwandan soldiers who outnumbered them, the ten men were taken to a Rwandan army camp and savagely murdered.",
          ],
          [
            "03-10-cdos-kigali.jpg",
            "Portraits of the ten Commandos killed in Kigali on 7 April 1994, with their names and dates of birth",
          ],
          "The ten Commandos killed in Kigali",
        ),
        op(
          "1994",
          "Blue Safari",
          [
            "On 19 April 1994 the Belgian government decides to withdraw the Belgian Commandos from UNAMIR. In operation Blue Safari, 16 C-130 flights of the 15th Air Transport Wing of the Belgian Air Force bring the battalion out of Kigali in under five hours.",
          ],
          [
            "09-kigali-unamir.jpg",
            "Belgian blue-beret soldiers in Kigali, with the bullet-marked building and memorial plaque of Camp Kigali",
          ],
        ),
        op(
          "1997",
          "Green Stream: Pointe-Noire",
          [
            "From 19 April to 4 June 1997, under Lieutenant-Colonel BEM D. Adam, the whole battalion, with the Para-Commando Field Artillery Battery as its 4th Company, takes part in operation Green Stream in Congo-Brazzaville (Pointe-Noire), ready to evacuate expatriates from the former Zaire, together with the Para-Commando Brigade and American, French and British units.",
          ],
          [
            "09-green-stream.jpg",
            "Commandos in boats and on a riverbank during operation Green Stream, 1997",
          ],
        ),
        op(
          "1999",
          "Allied Harbour: Albania and Kosovo",
          [
            "From 17 April 1999 the battalion, with a detachment of the Field Artillery Battery, flies to Albania for the humanitarian AMF(L) operation Allied Harbour, escorting and protecting convoys of Kosovar refugees between Kukës and Mjede. After a short stay in Kosovo it returns to Belgium from 17 July. Half of the 210th Para-Commando Logistics Company keeps it supplied.",
          ],
          ["09-albanie-allied-harbour.jpg", "The Belgian camp in a valley in Albania, 1999"],
        ),
        op(
          "2002",
          "Belukroko XI: Kosovo",
          [
            "From 25 November 2002 to 3 April 2003, under Lieutenant-Colonel BEM A. Maes, the battalion takes part in security and peacekeeping in Kosovo. Stationed in Leposavić, it forms the Belukroko XI battle group, working with UNMIK and its police in its area of responsibility: the municipality of Leposavić and the Stari Trg valley in northern Kosovo.",
          ],
          ["09-kosovo-belukroko.jpg", "A watchtower and a NATO sign at the Belgian base in Kosovo"],
        ),
        op(
          "2004",
          "Mission Avenir: Kisangani",
          [
            "From 30 January to 21 June 2004, under Lieutenant-Colonel BEM P. Laureys, the battalion is deployed in the Democratic Republic of the Congo to train the 1st Congolese Brigade (three battalions) in peacekeeping techniques, as part of the rebuilding of the Congolese armed forces.",
          ],
          ["09-avenir.jpg", "Belgian and Congolese soldiers talking during mission Avenir, 2004"],
        ),
        op(
          "2004",
          "ISAF 9: Kabul",
          [
            "From November 2004 to February 2005 a detachment of 25 men reinforces the 1st Parachute Battalion in Kabul during the elections.",
          ],
          ["09-afgha-13.jpg", "Belgian vehicles in a crowded street in Kabul"],
        ),
        op(
          "2008",
          "ISAF 16: Kabul airport",
          [
            "From March to the beginning of July 2008, under Major X. Van de Werve, the battalion, as lead unit, provides most of the personnel of the detachment protecting Kabul airport.",
          ],
          ["09-af-belu-isaf-16.jpg", "A Belgian soldier stands guard in front of UN vehicles in Kabul, 2008"],
        ),
        op(
          "2009",
          "UNIFIL: southern Lebanon",
          [
            "From mid-October 2009 to the end of February 2010 the 16th Company takes part in the Belufil 10 mission in southern Lebanon, within the United Nations Interim Force in Lebanon (UNIFIL), under Major L. Lemaire, the battalion's second in command. Under the orders of the 11th Engineer Battalion, the Commandos protect the Belgian contingent at Camp Scorpion in Tibnin, the engineers during demining, and convoys and movements.",
          ],
          [
            "09-liban-deminage.jpg",
            "A deminer in protective gear at work among marker stakes in southern Lebanon",
          ],
        ),
        op(
          "2009",
          "OMLT 3: Kunduz",
          [
            "From 29 December 2009 to 1 July 2010 the battalion provides the Operational Mentoring and Liaison Team OMLT 3 for ISAF in Afghanistan, under Lieutenant-Colonel BEM C. Closset. Stationed in Kunduz, in the north of the country, the team mentors and supports a combat battalion of the Afghan National Army, in training and in operations.",
          ],
          ["09-af-omlt-3-kunduz.jpg", "Belgian and Afghan soldiers in a firing position, Kunduz"],
        ),
        op(
          "2010",
          "Expedition Buta",
          [
            "In November and December 2010 a detachment of the battalion and Congolese soldiers, under Major Thierry Landas, searches the equatorial forest around Buta, in the north-east of the DRC, for an H-21B helicopter that disappeared with its three Belgian crew members in 1965. The 34 men left in groups between 8 and 21 November, including three from the Commando Training Centre and Commandant Maurer, and were all back on 18 December 2010.",
          ],
          ["buta.jpg", "A loaded all-terrain vehicle on a forest track during the Buta expedition, 2010"],
        ),
        op(
          "2011",
          "URR 2: Kindu",
          [
            "From the beginning of October 2011 to the beginning of April 2012, 72 Commandos, with eleven extra specialists such as a doctor, are in Kindu, on the Lualaba river in Maniema province, under the battalion commander Lieutenant-Colonel BEM J.-M. Vermeulen. Their mission: train the Congolese 322nd Commando Battalion for six months before it joins its garrison in Lokandu. The first mission of this kind, URR 1, was carried out by the 3rd Parachute Battalion. To give as many members of the battalion as possible the chance to take part, the mission is carried out in three two-month rotations.",
          ],
          ["urr2.jpg", "Belgian and Congolese flags over a parade of soldiers in Kindu"],
        ),
        op(
          "2014",
          "Train the trainer",
          [
            "In 2014, under Lieutenant-Colonel BEM V. Pierard, the battalion trains Congolese instructors, who in turn train the reinforcements of the rapid reaction units of the Congolese army.",
          ],
          ["09-rdc-urr-2.jpg", "Sign of Camp Jericho Training Commando in the DRC"],
        ),
        op(
          "2015",
          "Homeland",
          [
            "From April 2015 the battalion takes part in operation Homeland, guarding sensitive sites in Brussels in response to the growing terrorist threat.",
          ],
          ["homeland.jpg", "Two armed Commandos on guard in front of a building in Brussels"],
        ),
        op(
          "2017",
          "Vigilant Phoenix: Iraq",
          [
            "Small detachments reinforce the Special Operations Regiment in operation Vigilant Phoenix (OVP) in Iraq, in support of the Special Forces Group:",
            "- July–October 2017: 14 Commandos",
            "- October 2017–February 2018: 11 Commandos",
            "- February–July 2018: 6 Commandos",
            "- May–September 2018: 23 Commandos",
            "- September–November 2018: 21 Commandos",
          ],
          ["iraq.jpg", "Commandos advancing with weapons near a building in Iraq"],
        ),
        op(
          "2019",
          "Burkina Faso and Niger",
          [
            "In 2019 three small detachments of eight Commandos each take part in the force protection mission of the Special Operations Regiment in Burkina Faso (February–June, May–September and September–December).",
            "In Niger, three detachments take part in operation New Nero (ONN) in Maradi, training Nigerien units for special operations: 10 Commandos in March–April 2019, 42 in August–December 2019, and 62 from October 2020 to January 2021. Fifteen more Commandos serve with CSR 2 from September to December 2019, and two in Afghanistan.",
          ],
          ["09-maradi-fox.jpg", "An armoured vehicle under trees during operation New Nero in Maradi, Niger"],
        ),
        op(
          "2022",
          "Burkina Faso, DRC, Niger and Mali",
          [
            "In rotation 22/08, four small detachments reinforce the Special Operations Regiment: seven Commandos in Burkina Faso (DAS), eight in the DRC (PPM COD), five in Niger (CEFS) and one with ONN, and one in Mali (Tabuca).",
          ],
          [
            "blasons.jpg",
            "Three badges side by side: the para-commando wings, the badge of the 2nd Battalion of Commandos and the SAS winged dagger",
          ],
        ),
      ],
    }),
    slice("text_media", {
      eyebrow: "Today",
      title: "The battalion now",
      body: rt(
        "Since the restructuring of the Belgian army, the battalion and the 3rd Parachute Battalion are the two large combat units of the Special Operations Regiment. They are deployed as rapid reaction units for NATO and for Belgium in humanitarian missions, and in support of the Special Forces Group.",
        "Driven by the obligations of its past, the battalion keeps preparing for every conceivable mission, in Belgium, in Europe and overseas. Demanding training sharpens its adaptability and makes it an operational tool of choice. Circumstances, missions and means have changed; the soldier has lost none of the qualities of those who went before.",
        "Those qualities are summed up in one word, **SPIRIT**: vitality, availability, surpassing oneself, emulation, adaptability, loyalty to the nation, comradeship, good humour and a certain dose of simplicity. Drawing on its imagination, contacts and experience, the battalion has developed its own Hostage Rescue procedure to face the crises of modern conflict.",
      ),
      image: photo("homeland.jpg", "Two armed Commandos on guard in front of a building in Brussels"),
      caption: "Operation Homeland, Brussels",
      link: noLink,
      image_side: "right",
      tone: "dark",
    }),
    slice("rich_text", {
      eyebrow: "Since 7 March 2019",
      title: "Organisation within the SO Regt",
      body: rt(
        "Since the creation of the Special Operations Regiment on 7 March 2019, the 2nd Battalion of Commandos consists of:",
        "- A battalion staff.",
        "- Company A, air and land oriented, with a staff and two platoons.",
        "- Company B, amphibious, with a staff and two platoons.",
        "- Support and Special Reconnaissance Company (SSR), with a mortar platoon, a special reconnaissance platoon, a joint terminal attack controller section (JTAC), a sniper section and a Special Operations Engineer Detachment (SOED).",
        "- Headquarters Company, with a battalion support detachment (BSD), a communications capability (NEC) and a medical detachment.",
        "### Quarters",
        "On its return to Belgium in September 1945 the Commando Regiment settles in Marche-les-Dames. In December the first conscripts are enlisted at the Terra Nova citadel in Namur. As its strength grows, the regiment is spread over three quarters: Marche-les-Dames, the citadel of Namur and Seilles.",
        "In 1952 two companies (1st and 2nd) occupy the barracks in Seilles, the staff is housed in the castle of Marche-les-Dames and the 3rd Company is at the camp of Wartet. In 1955 the battalion, reduced to two rifle companies and a Headquarters Company, moves to the citadel of Namur. It stays there until 1961, when it moves to the Caserne Sous-Lieutenant Thibaut in Flawinne, where it is still based today.",
      ),
    }),
    grid("Since 1942", "Commanding officers", [
      ["Lt Col", "G. Danloy", "27.07.1942 – 03.11.1951"],
      ["Lt Col", "A. Renard", "03.11.1951 – 22.10.1957"],
      ["Maj", "P. Lemercier", "22.10.1957 – 17.04.1959"],
      ["Maj", "O. Janssens", "17.04.1959 – 26.06.1961"],
      ["Maj", "P. Lemercier", "26.06.1961 – 25.02.1962"],
      ["Maj", "A. Lemasson", "25.02.1962 – 26.06.1964"],
      ["Maj BEM", "J. Rousseaux", "26.06.1964 – 23.03.1967"],
      ["Maj", "A. Bruggeman", "23.03.1967 – 21.06.1969"],
      ["Lt Col", "R. Meunier", "21.06.1969 – 13.10.1972"],
      ["Lt Col BEM", "R. Lardin", "13.10.1972 – 07.02.1975"],
      ["Lt Col", "J. Celis †", "07.02.1975 – 12.04.1975"],
      ["Lt Col BEM", "H. de Maere d’Aertrycke", "09.06.1975 – 23.06.1978"],
      ["Lt Col BEM", "R. De Clerck", "23.06.1978 – 04.07.1980"],
      ["Lt Col BEM", "L. Henrot", "04.07.1980 – 03.09.1982"],
      ["Lt Col BEM", "J. Jeunehomme", "03.09.1982 – 26.09.1985"],
      ["Lt Col BEM", "A. De Smet", "26.09.1985 – 11.09.1987"],
      ["Col Ir BEM", "C. Buze", "11.09.1987 – 05.09.1990"],
      ["Lt Col", "F. Van De Weghe", "05.09.1990 – 24.09.1993"],
      ["Lt Col BEM", "J. Dewez", "24.09.1993 – 17.10.1995"],
      ["Lt Col BEM", "D. Adam", "17.10.1995 – 03.04.1998"],
      ["Lt Col", "Ph. Lattaque", "03.04.1998 – 07.06.2001"],
      ["Lt Col BEM", "A. Maes", "07.06.2001 – 23.05.2003"],
      ["Lt Col BEM", "P. Laureys", "23.05.2003 – 22.02.2006"],
      ["Lt Col BEM", "L. Hanset", "22.02.2006 – 19.12.2007"],
      ["Lt Col BEM", "C. Closset", "19.12.2007 – 28.10.2010"],
      ["Col BEM", "J.-M. Vermeulen", "28.10.2010 – 05.09.2013"],
      ["Lt Col BEM", "V. Pierard", "05.09.2013 – 07.10.2015"],
      ["Lt Col Ir BEM", "F. Linotte", "07.10.2015 – 10.07.2018"],
      ["Lt Col Ir BEM", "T. Landas", "10.07.2018 – 23.09.2020"],
      ["Lt Col BEM", "C. Van der Vorst", "23.09.2020 – 28.09.2022"],
      ["Lt Col BEM", "J.-C. Defawes", "28.09.2022 –"],
    ]),
    grid("Since 1945", "Corps warrant officers", [
      ["Adjt", "J. Jonckers", "1945 – 1948"],
      ["Adjt", "A. Jamin", "1948 – 1959"],
      ["Adjt", "L. Dewilde", "1959 – 1972"],
      ["Adjt Chef", "G. Helderweirt", "1972 – 1980"],
      ["Adjt Chef", "T. Van Mol", "1980 – 1981"],
      ["Adjt Chef", "J. Leysen", "1981 – 1993"],
      ["Adjt Maj", "P. Martinus", "1993 – 2003"],
      ["Adjt Maj", "C. Fievet", "2003 – 2011"],
      ["Adjt Maj", "H. Lamotte", "2011 – 2019"],
      ["Adjt Maj", "D. Colige", "2019 – 2023"],
      ["Adjt Chef", "P. Dorval", "2023 –"],
    ]),
    grid("Since 1995", "Corps corporals", [
      ["1Cpl Chef", "J. Mayeur", "1995 – 1997"],
      ["1Cpl Chef", "Ph. Lambrette", "1997 – 1999"],
      ["1Cpl Chef", "J.-C. Verschaeren", "1999 – 2010"],
      ["1Cpl Chef", "A. Masson", "2010 – 2018"],
      ["1Cpl Chef", "L. Raison", "2018 – 2023"],
      ["1Cpl Chef", "D. Robert", "2023 –"],
    ]),
    next("commando-training-centre", "Commando Training Centre"),
  ],
});

/* -------------------------------------------------------------------------- */
/* Commando Training Centre                                                   */
/* -------------------------------------------------------------------------- */

const ctrg = document("page", "commando-training-centre", {
  title: "Commando Training Centre",
  meta_title: "Commando Training Centre (CTrg Cdo), Marche-les-Dames",
  meta_description:
    "Since 1946 the Commando Training Centre at Marche-les-Dames has trained the Belgian Commandos: its history, companies, deployments and commanders.",
  meta_image: badges.ctrg,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Active unit · CTrg Cdo · Marche-les-Dames",
        title: "Commando Training Centre",
        lead: rt(
          "Rocks, open water and steep woodland on the Meuse: since 1946 Marche-les-Dames has been where Belgian Commandos earn their brevet.",
        ),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("text_media", {
      eyebrow: "1942–1947",
      title: "From Achnacarry to Marche-les-Dames",
      body: rt(
        "The first Belgian Commandos, under Captain G. Danloy, received their Commando training in August and September 1942 at the Commando Basic Training Centre in Achnacarry, Scotland.",
        "At the end of the Second World War the Belgian Commandos were quartered in Germany, near Lübeck. Volunteers who joined the unit there did their commando course on the Baltic coast in Schleswig-Holstein; at the end of it the first post-war Commando brevets A were awarded.",
        "On 12 September 1945 the unit left Germany for Marche-les-Dames. The first volunteer conscripts, enlisted in December 1945, joined the Commandos at the citadel of Namur. Second Lieutenants de Heusch and Liénard were then tasked with setting up a commando camp at Marche-les-Dames, a site perfectly suited to this kind of training: rocks, stretches of water, wooded and rugged ground. They built obstacle courses and recreated the Stamina and Do or Die courses of Achnacarry, helped by German prisoners of war provided, against payment, by the Namur provincial command.",
        "The camp welcomed its first conscripts on 16 February 1946, under the command of Second Lieutenant P. Beauprez. On 20 October 1947 it became an independent unit under Captain P. Roman, and from then on the courses (brevet A, brevet B and others) followed one another without a break.",
      ),
      image: badges.ctrg,
      caption: "Badge of the Commando Training Centre",
      link: noLink,
      image_side: "left",
      tone: "light",
    }),
    slice("timeline", {
      eyebrow: "1955–2019",
      title: "Key dates",
      intro: [],
      events: [
        op("1955", "One brevet for the whole regiment", [
          "From the end of 1955, all personnel of the Para-Commando Regiment earn their Commando brevet at Marche-les-Dames.",
        ]),
        op("1976", "The standard of the 4th Commando Battalion", [
          "On 20 April 1976 the centre is entrusted with the standard of the disbanded 4th Commando Battalion.",
        ]),
        op("1979", "Training centre of the regiment", [
          "On 1 March 1979 the centre becomes the Commando Training Centre of the Para-Commando Regiment, training all officer, NCO and soldier candidates. It has four companies: the Instruction Company and School Company in Wartet, and the Camp Company and Headquarters and Services Company in Marche-les-Dames.",
        ]),
        op("1981", "Quartier Lieutenant-Général Pierre Roman", [
          "Until 1981 the camp is known as the Arenberg quarters. On 23 October 1981 it is renamed Quartier Lieutenant-Général Pierre Roman, after the officer who commanded the centre from 1947 and later founded the Commando Museum.",
        ]),
        op("1994", "Silver Back", [
          "In April 1994, within the Para-Commando Brigade, the centre takes part in operation Silver Back in Rwanda to evacuate foreign nationals.",
        ]),
        op("2011", "The standard leaves, and returns", [
          "On 18 February 2011 the standard of the 4th Commando Battalion passes to the headquarters of the Light Brigade (Para-Commando) in Marche-en-Famenne, and the centre receives a flag of the Royal School of Cadets in its place. On 3 July 2018, when the Light Brigade becomes the Special Operations Regiment in Heverlee, the standard passes to the SO Regt. On 22 March 2019 it returns to the centre for good.",
        ]),
      ],
    }),
    slice("text_media", {
      eyebrow: "Today",
      title: "Training every para-commando",
      body: rt(
        "The centre provides the specialised training of all para-commandos. It is also the Defence competence centre for obstacle crossing, close combat, sniping and survival, and trains many Belgian and foreign units and schools. It supports the units of the SO Regt, in particular the 2nd Battalion of Commandos and the 3rd Parachute Battalion, in moving through complex terrain such as mountains and rivers, in operations and in training.",
        "### School Company",
        "Responsible for statutory training. It gives the Military Initiation Phase to para-commando volunteers for the combat units, trains officers, NCOs and soldiers of units with a para-commando capability in the command techniques of para-commando missions, and prepares candidates physically, professionally and technically for the special operations of the SO Regt and of the units with a para-commando capability (engineers, artillery, medical service and others).",
      ),
      image: photo(
        "09-cecdo-school.jpg",
        "Badge of the School Company: a dagger and parachute wings on a shield in the Belgian colours",
      ),
      caption: "School Company",
      link: noLink,
      image_side: "right",
      tone: "sand",
    }),
    slice("text_media", {
      eyebrow: "Camp Company",
      title: "Rock, water and close combat",
      body: rt(
        "Mainly responsible for complementary training. It runs courses in close combat, lead climbing, commando instructor, survival, camouflage and sniping for the whole of Defence, and trains para-commando candidates to cross obstacles such as rock faces and rivers. It supports the SO Regt and the units of the Land Component with teams that help them cross complex terrain.",
        "### Military partnership",
        "In recent years the centre has also trained commando instructors, mainly from the Great Lakes region: the former Zaire, Rwanda and Burundi. The partnership with Burundi provided for follow-up support in Burundi itself once the training in Belgium was complete.",
      ),
      image: photo("09-cecdo-camp.jpg", "Badge of the Camp Company: a black dragon pierced by a dagger"),
      caption: "Camp Company",
      link: noLink,
      image_side: "left",
      tone: "light",
    }),
    slice("rich_text", {
      eyebrow: "Deployments",
      title: "Where the centre has served",
      body: rt(
        "- **1965–1990** Kota-Koli, Zaire (military technical cooperation)",
        "- **1967–1994** Bigogwe, Rwanda (military technical cooperation)",
        "- **1994** Rwanda, operation Silver Back",
        "- **1997, 1998** Eastern Slavonia",
        "- **2000, 2001** Kosovo",
        "- **2001, 2003** Benin",
        "- **2008, 2013, 2015** Kindu, DRC",
        "- **2008, 2013, 2015** South Pole",
        "- **2010–2014** Buta, DRC, and Gitega, Burundi",
        "- **2015** Mediterranean",
        "- **2016, 2017, 2018** Tunisia",
        "- **2016–2018** Operation Vigilant Guardian, Belgium",
        "- **2018** Niger",
        "The staff of the centre keep the beret of their unit of origin, with the regimental badge. The commander wears the green beret and the Commando uniform.",
      ),
    }),
    slice("quote", {
      quote: rt("You don’t get what you wish for… You get what you work for!"),
      attribution: "Commando Training Centre",
      role: "Marche-les-Dames",
      tone: "dark",
    }),
    grid("Since 1947", "Commanding officers", [
      ["Capt", "P. Roman", "1947 – 1950"],
      ["Lt", "A. Lemasson", "1950 – 1953"],
      ["Capt", "R. Meunier", "1953 – 1958"],
      ["Maj", "J. Militis", "1958 – 1964"],
      ["Maj", "A. Gosse", "1964 – 1968"],
      ["Lt Col", "G. de Groote", "1968 – 1972"],
      ["Lt Col", "R. Vanderperre", "1972 – 1976"],
      ["Maj", "L. Raes", "1976 – 1979"],
      ["Lt Col BEM", "P. Malherbe", "1979 – 1981"],
      ["Lt Col", "P. Deom", "1981 – 1985"],
      ["Lt Col BEM", "J. Beaudoin", "1985 – 1988"],
      ["Lt Col", "J. Engelen", "1988 – 1990"],
      ["Lt Col", "L. Noël", "1990 – 1992"],
      ["Lt Col BEM", "L. Legrain", "1992 – 1994"],
      ["Lt Col", "E. Debontridder", "1994 – 1998"],
      ["Lt Col", "A. Baumans", "1998 – 2000"],
      ["Maj", "D. Doumont", "2000 – 2002"],
      ["Lt Col BEM", "B. Vandriessche", "2002 – 2005"],
      ["Lt Col BEM", "P. Lupcin", "2005 – 2008"],
      ["Lt Col", "A. Dantinne", "2008 – 2011"],
      ["Lt Col", "Th. Hinnekens", "2011 – 2014"],
      ["Lt Col BEM", "St. Van Den Bogaert", "2014 – 2016"],
      ["Lt Col", "X. Van De Werve de Schilde", "2016 – 2019"],
      ["Lt Col BEM", "S. Lindelauf", "2019 – 2021"],
      ["Lt Col BEM", "P. Gysel", "2021 –"],
    ]),
    grid("Since 1947", "Corps warrant officers", [
      ["1Sgt", "L. Peeters", "1947 – 1958"],
      ["1Sgt", "A. Paenhuys", "1958 – 1961"],
      ["Adjt", "B. Schils", "1961 – 1964"],
      ["Adjt", "G. Deroost", "1964 – 1970"],
      ["Adjt Chef", "A. Paenhuys", "1970 – 1978"],
      ["Adjt Chef", "M. Leiding", "1978 – 1980"],
      ["Adjt Chef", "L. Verheyden", "1980 – 1981"],
      ["Adjt Chef", "T. Van Mol", "1981 – 1987"],
      ["Adjt Chef", "P. Debaerdemaker", "1987 – 1993"],
      ["Adjt Maj", "J. Catinus", "1993 – 2004"],
      ["Adjt Maj", "M. Jassogne", "2004 – 2010"],
      ["Adjt Maj", "M. Vanderlinden", "2010 – 2013"],
      ["Adjt Maj", "T. Verachtert", "2013 – 2022"],
      ["Adjt Chef", "C. Dechaumes", "2022 –"],
    ]),
    grid("Since 1996", "Corps corporals", [
      ["1Cpl Chef", "C. Larbouillat", "1996 – 1997"],
      ["1Cpl Chef", "S. Dubois", "1997 – 2003"],
      ["1Cpl Chef", "A. Trullemans", "2003 – 2013"],
      ["1Cpl Chef", "S. Warzee", "2013 – 2018"],
      ["1Cpl Chef", "W. Bosmans", "2018 –"],
    ]),
    next("4th-commando-battalion", "4th Commando Battalion"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 4th Commando Battalion                                                     */
/* -------------------------------------------------------------------------- */

const cdo4 = document("page", "4th-commando-battalion", {
  title: "4th Commando Battalion",
  meta_title: "4th Commando Battalion (4 Bn Cdo)",
  meta_description:
    "Formed in Kitona in 1959, deployed in Rwanda until its independence in 1962: the history, standard, chronicle and commanders of the 4th Commando Battalion.",
  meta_image: badges.cdo4,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Disbanded unit · 4 Bn Cdo · 1959–1962",
        title: "4th Commando Battalion",
        lead: rt(
          "Born in the Congo after the Leopoldville riots, the battalion kept order in Rwanda until its independence, then lived on as the reserve battalion of the Para-Commando Regiment.",
        ),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("text_media", {
      eyebrow: "1959–1962",
      title: "From Kitona to Rwanda",
      body: rt(
        "The 4th Commando Battalion was formed on 2 April 1959 from the conscripts and part of the officers and NCOs of the 2nd Commando Battalion, which had been flown to the Belgian Congo from 10 January after the riots in Leopoldville. It settled in Kitona and from then on ensured a permanent presence of the metropolitan forces in Lower Congo.",
        "In April 1960, after a year at the Kitona base, the battalion left the Congo for Rwanda. It had to intervene several times there to keep the peace and prevent bloody fighting between Batutsi and Bahutu.",
        "In July 1960 the heavy weapons platoons of the Headquarters and Services Company intervened twice to help the population of Goma and to take the airfield. The 1st Company made a parachute assault on Bunia, after which a platoon pushed on to Mongbwalu to rescue two columns of European refugees. On the way the platoon ran into three ambushes; three Commandos were shot and mortally wounded: **Delahaut, Hosselet and Sosnowski**.",
        "In January 1961 at Kisenyi, the 1st Company held off an attack by the Congolese National Army (ANC) coming from Goma. Commando Renard, captured during a night patrol, was murdered by the Congolese soldiers.",
        "The battalion kept order in Rwanda until the country's independence on 1 July 1962. Its personnel were repatriated in July, and the battalion was officially disbanded on 1 October 1962.",
      ),
      image: badges.cdo4,
      caption: "Badge of the 4th Commando Battalion",
      link: noLink,
      image_side: "left",
      tone: "light",
    }),
    slice("text_media", {
      eyebrow: "The standard",
      title: "Presented by King Baudouin",
      body: rt(
        "Royal decree no. 7397 of 23 October 1959 granted the battalion a standard. King Baudouin presented it to Major V. Bruneau at a ceremony on the esplanade of the Cinquantenaire in Brussels on 1 April 1960.",
        "After the battalion was disbanded, the standard was deposited at the Royal Army Museum. On 20 April 1976 it was entrusted to the Commando Training Centre. On 18 February 2011 it passed to the headquarters of the Light Brigade (Para-Commando) in Marche-en-Famenne, and on 3 July 2018, when the Light Brigade became the Special Operations Regiment in Heverlee, to the SO Regt. On 22 March 2019 it returned to the Commando Training Centre for good.",
      ),
      image: photo(
        "09-etendard-4-cdo.jpg",
        "King Baudouin presents the standard of the 4th Commando Battalion to Major Bruneau, 1 April 1960",
      ),
      caption: "Brussels, 1 April 1960",
      link: noLink,
      image_side: "right",
      tone: "sand",
    }),
    slice("rich_text", {
      eyebrow: "Traditions and quarters",
      title: "A reserve battalion until 1994",
      body: rt(
        "The battalion took over the traditions of the Commandos: the green beret and the badge of the 2nd Commando Battalion. In Rwanda the Headquarters and Services Company was based in Kigali, the 1st Company in Astrida and later Kisenyi, and the 2nd Company in Shangugu.",
        "At the beginning of 1970 the 4th Commando Battalion became the reserve unit of the Para-Commando Regiment, made up of reservists from the other battalions, with its officers, NCOs and other staff provided by the Commando Training Centre. It had a Headquarters and Services Company and the 23rd, 24th and 25th Companies, and was recalled in 1974, 1977, 1983, 1986 and 1990. It then had its own badge, a copy of the coat of arms designed in 1962 by its commander, Major V. Bruneau: a dagger and a palm tree against the African star.",
        "In the first restructuring of the Land Forces in 1994, the 4th Commando Battalion, reserve unit of the Para-Commando Brigade, was abolished.",
      ),
    }),
    slice("rich_text", {
      eyebrow: "Chronicle",
      title: "Day by day, 1959–1962",
      body: rt(
        "- **10 January 1959** Alert for the 2nd Commando Battalion in Namur. One company is on training jumps at Schaffen, another on Commando training in the snow in the Ardennes.",
        "- **12 January 1959** The whole battalion is in Leopoldville. After four weeks in the Congolese capital it takes the Kitona base as its garrison.",
        "- **14 March 1959** Visit by Lieutenant-General Jacques de Dixmude and Colonel BEM Lefèvre.",
        "- **April 1959** The officers and NCOs of the 2nd Commando Battalion are partly relieved by reinforcements from Belgium. The 4th Detachment is entrusted to the new battalion.",
        "- **September 1959** Arrival of the 15th Detachment. Incident at the Kitona base.",
        "- **26 February 1960** Visit by Lieutenant-General de Cumont, Chairman of the Chiefs of Staff Committee.",
        "- **27 March 1960** Visit by Vice-Admiral Sir Dymock Watson, Commander-in-Chief South Atlantic and South America, aboard the Puma.",
        "- **1 April 1960** King Baudouin presents the standard to Major V. Bruneau.",
        "- **21 April 1960** The 1st Company leaves for Ruanda-Urundi; it reaches Biumba on 5 May.",
        "- **19 May 1960** The battalion leaves for Usumbura.",
        "- **21 May 1960** Death of R. Geelen near Biumba.",
        "- **24 May 1960** The battalion takes charge of the pacification of Rwanda: the 2nd Company in Nyanza, later Shangugu–Kibuye; the battalion staff in Astrida, then Kigali.",
        "- **30 June 1960** Independence of the Congo.",
        "- **8 July 1960** Mutiny of the Force Publique in Goma, put down the same day by the Headquarters Company.",
        "- **10 July 1960** Mutiny of the Force Publique in Kigali and the other towns of Rwanda, put down on 12 July.",
        "- **17 July 1960** The Headquarters Company takes Goma airport and is joined there by a company of the 3rd Chasseurs Ardennais. The families of the Force Publique at Rumangabo are freed.",
        "- **18 July 1960** The 1st Company takes Bunia airport and disarms the Force Publique there.",
        "- **19 July 1960** Fighting at Mongbwalu: Delahaut, Hosselet and Sosnowski are killed. A C-119 crashes. With the company of the 3rd Chasseurs Ardennais, the battalion organises the rescue operation and the repatriation of the bodies.",
        "- **22 July 1960** Fatal accident of J. Geraets at Bugarama.",
        "- **28 August 1960** The 17th Detachment relieves the 15th.",
        "- **12 January 1961** Attack on Kisenyi by the Congolese National Army (ANC). Murder of J.-L. Renard by the ANC.",
        "- **20 January 1961** Death of P. Westhof in Astrida.",
        "- **February 1961** The 19th Detachment relieves the 17th.",
        "- **16 April 1961** Death of J. Docquiers in Ruhengeri.",
        "- **July 1961** The 21st Detachment relieves the 19th.",
        "- **25 September 1961** Legislative elections in Rwanda: a clear victory for Parmehutu.",
        "- **6 February 1962** The 23rd Detachment relieves the 21st.",
        "- **23 February 1962** Visit by Lieutenant-General Thomas, Chief of Staff and Inspector of the Army.",
        "- **28 March 1962** “Matines brugeoises” in Biumba.",
        "- **24 April 1962** Crash of a Tri-Pacer aircraft: four injured.",
        "- **1 July 1962** Independence of Rwanda. The battalion takes part in the celebrations.",
        "- **20 July 1962** The battalion says farewell to Rwanda.",
        "- **28 September 1962** The standard is handed over to the Royal Army Museum.",
        "- **1 October 1962** The 4th Commando Battalion is disbanded.",
      ),
    }),
    grid("1959–1962", "Commanding officers and corps warrant officers", [
      ["Maj", "P. Lemercier", "04.1959 – 07.1959"],
      ["Maj", "O. Janssens", "07.1959 – 11.1959"],
      ["Maj", "V. Bruneau", "11.1959 – 08.1960"],
      ["Cdt", "A. Lemasson", "08.1960 – 10.1960"],
      ["Cdt a.i.", "J. Vaes", "10.1960 – 01.1961"],
      ["Maj", "P. Lemercier", "01.1961 – 07.1961"],
      ["Maj", "O. Janssens", "07.1961 – 02.1962"],
      ["Maj", "V. Bruneau", "02.1962 – 10.1962"],
      ["Adjt", "B. Schils", "1959 – 1961"],
      ["1Sgt Maj", "M. Leiding", "1962"],
    ]),
    next("6th-commando-battalion", "6th Commando Battalion"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 6th Commando Battalion                                                     */
/* -------------------------------------------------------------------------- */

const cdo6 = document("page", "6th-commando-battalion", {
  title: "6th Commando Battalion",
  meta_title: "6th Commando Battalion (6 Bn Cdo)",
  meta_description:
    "Formed in May 1960 and disbanded on 31 December 1960, the 6th Commando Battalion served in the Congo in the turbulent weeks after independence.",
  meta_image: badges.cdo6,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Disbanded unit · 6 Bn Cdo · 1960",
        title: "6th Commando Battalion",
        lead: rt("Seven months of existence, in the most turbulent weeks of the young Congo's independence."),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("text_media", {
      eyebrow: "May–December 1960",
      title: "A battalion for the Congo",
      body: rt(
        "The bilingual 6th Commando Battalion was formed on 16 May 1960 from the conscripts and part of the officers and NCOs of the 2nd Commando Battalion, which had arrived in the Belgian Congo in February. After earning the parachute brevet at Kamina, it took over the Kitona base from the 4th Commando Battalion, which was leaving for Ruanda.",
        "On 30 June the 2nd Company was sent to the Stanley base in Leopoldville. On 8 July it rescued the commander of the Force Publique, Lieutenant-General E. Janssens, and on 12 July it took Ndjili airport. Meanwhile the rest of the battalion, from Kitona, took Boma on 11 July and organised help and escorts for columns of refugees heading to Kitona.",
        "On the morning of 14 July the reinforced 1st Company neutralised the naval base of Banana; that afternoon the whole battalion assembled at Ndjili airport. On 16 July it took Coquilhatville, and on 17 July the reinforced 2nd Company took Boende. On 31 July the battalion was reunited at the Kitona base, and in August it left for Usumbura.",
        "On 24 December the Recce platoon escorted a detachment of the Congolese National Army that set out from Rwanda to retake Bukavu from the rebels. Under fire, and under orders not to intervene, the platoon withdrew. On 31 December 1960 the 6th Commando Battalion was disbanded.",
      ),
      image: badges.cdo6,
      caption: "The unofficial badge of the 6th Commando Battalion",
      link: noLink,
      image_side: "left",
      tone: "light",
    }),
    slice("rich_text", {
      eyebrow: "Traditions",
      title: "The uniform they arrived in",
      body: rt(
        "The battalion kept the Commando traditions, the green beret and the badge of the 2nd Commando Battalion; in fact the men simply kept the uniform they wore when they arrived in the colony.",
        "An unofficial badge was created, based on the badge of a French parachute regiment, but seen from the back so that it shows the number 6.",
      ),
    }),
    grid("1960", "Commanding officers and corps warrant officer", [
      ["Cdt", "A. Lemasson", "05.1960 – 08.1960"],
      ["Maj", "P. Lemercier", "08.1960 – 12.1960"],
      ["Adjt", "H. Pellens", "05.1960 – 12.1960"],
    ]),
    next("anti-tank-company", "Para-Commando Anti-Tank Company"),
  ],
});

/* -------------------------------------------------------------------------- */
/* Anti-Tank Company                                                          */
/* -------------------------------------------------------------------------- */

const atk = document("page", "anti-tank-company", {
  title: "Para-Commando Anti-Tank Company",
  meta_title: "Para-Commando Anti-Tank Company (Cie ATk Para-Cdo)",
  meta_description:
    "From 1963 to 1994 the Para-Commando Anti-Tank Company in Flawinne fired Entac and Milan missiles and served in Kolwezi, Zaire and Somalia.",
  meta_image: badges.atk,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Disbanded unit · Cie ATk Para-Cdo · 1963–1994",
        title: "Para-Commando Anti-Tank Company",
        lead: rt(
          "When the African missions ended, the Para-Commando Regiment turned to Europe and needed anti-tank weapons that could hit a target at 2,000 metres.",
        ),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("text_media", {
      eyebrow: "1962–1963",
      title: "Missiles for the regiment",
      body: rt(
        "When the African missions came to an end in 1962, the Para-Commando Regiment was to be deployable in Europe. It needed a unit with anti-tank weapons more powerful than the Energa and the Blindicide, able to fire at least 2,000 metres. An anti-tank company was created for that purpose.",
        "From August 1962 the cadre and gunners of the future company followed a two-month course at the Entac Centre of the Infantry School in Leopoldsburg. The French-speaking unit was officially created on 1 March 1963 at the Caserne Slt Thibaut in Flawinne.",
        "It was equipped with the French-designed, wire-guided Entac missile (Engin téléguidé antichar). With 6 officers, 29 NCOs and 94 volunteers and conscripts, it had a staff and three platoons, each of two sections with two firing posts.",
      ),
      image: badges.atk,
      caption: "Badge of the Para-Commando Anti-Tank Company",
      link: noLink,
      image_side: "left",
      tone: "light",
    }),
    slice("timeline", {
      eyebrow: "1970–1994",
      title: "Thirty years in key moments",
      intro: [],
      events: [
        op("1970", "Godparent Grand-Han", [
          "The municipality of Grand-Han asks to become the company's godparent. The sponsorship ceremonies take place there on 15 and 16 August 1970.",
        ]),
        op("1978", "Red Bean: Kolwezi", [
          "From 18 May to 26 June 1978 the company takes part in operation Red Bean in Kolwezi, Shaba, and is mentioned in the Order of the Day of the Army:",
          "**Kolwezi. …the Para-Commando Anti-Tank Company. “From 19 May to 10 July 1978, for having shown composure and remarkable discipline and efficiency in a mission to free and protect Belgians and foreigners whose lives were threatened, in Shaba and in particular in Kolwezi.”**",
        ]),
        op("1979", "The Milan", [
          "Now fully professional, the company receives a new missile: the Milan (Missile léger antichar).",
        ]),
        op("1988", "Persian Gulf", [
          "During the Belgian Navy's mission in the Persian Gulf, the company permanently provides two Milan gunners, relieved at regular intervals.",
        ]),
        op("1991", "Blue Beam: Zaire", [
          "From 24 September to 4 November 1991 the company takes part in operation Blue Beam in Zaire, in a detachment of the Para-Commando Brigade (brigade staff, 1st and 3rd Parachute Battalions, Recce Squadron and the Anti-Tank Company). At first its mission is limited to Kinshasa: the staff and two platoons hold Ndjili airport, one platoon the CAMAC building, the former headquarters of Belgian military technical cooperation in the heart of the capital.",
          "From 25 October, at the Brigade's request, the company carries out evacuation and security missions in Moanda, Boma and Matadi in Lower Zaire, and in Kikwit. On 3 November it leaves Ndjili after covering the departure of the last C-130, spends the night in the city centre, and the next day crosses the Zaire river to Congo-Brazzaville.",
        ]),
        op("1993", "Sunny Winter: Brazzaville", [
          "From 20 January to 24 February 1993 the company takes part, with the 3rd Parachute Battalion, in operation Sunny Winter in Congo-Brazzaville, to prepare the evacuation of Belgians from neighbouring Zaire, where unrest threatened their safety. After a month on standby, calm returns and the detachment heads home.",
        ]),
        op("1993", "UNOSOM II: Somalia", [
          "From 9 August to 17 December 1993 the company, 112 men strong, reinforces the 3rd Parachute Battalion in operation UNOSOM II in Somalia, with three platoons on CVR(T) light tracked reconnaissance vehicles and one platoon on jeeps. The day after arriving in Kismayo, the heavy elements set up about a hundred kilometres further north at Bandar Salaam, near the town of Jilib; the jeep platoon settles at Bilis Qooqaani, near the Kenyan border. After an eventful mission the company returns home between 8 and 17 December.",
        ]),
        op("1994", "Silver Back and the last chapter", [
          "On 8 April 1994, the day after Major Lattaque hands over command to Major Kesteloot, the company is put on alert for operation Silver Back in Rwanda. On 9 April it flies to Nairobi as intervention reserve; only a few elements briefly reach Kigali to help the 2nd Commando Battalion defend the airport. It is back in Belgium on 21 April, after a false alarm and a stopover in Djibouti, where a joint intervention in Burundi with French forces was being considered.",
          "On 27 May 1994, in a restructuring of the armed forces, the company merges with the Para-Commando Recce Squadron to form the 3rd Lancers Parachute Battalion (3 LP), itself disbanded in 2003. Its men then wear the maroon beret.",
        ]),
      ],
    }),
    slice("rich_text", {
      eyebrow: "Traditions and quarters",
      title: "Flawinne, alongside 2 Cdo",
      body: rt(
        "The company kept the Commando traditions and wore the green beret with the regimental badge and the same insignia on the uniform as the 2nd Commando Battalion. From its creation in 1963 until 1994 it was stationed with the 2nd Commando Battalion at the Caserne Slt Thibaut in Flawinne.",
        "Read the full story of the company: [Once upon a time, the ATk (PDF)](file:il-etait-une-fois-latk-ok.pdf).",
      ),
    }),
    grid("1963–1994", "Commanding officers", [
      ["Maj", "G. De Groote", "01.03.1963 – 30.09.1968"],
      ["Maj", "R. Vanderperre", "30.09.1968 – 29.01.1971"],
      ["Maj", "E. Genot", "29.01.1971 – 10.09.1973"],
      ["Cdt BEM", "P. Malherbe", "10.09.1973 – 16.09.1974"],
      ["Cdt", "A. Detry", "16.09.1974 – 15.06.1976"],
      ["Maj", "F. Hanot", "15.06.1976 – 16.09.1978"],
      ["Cdt", "B. Brijs", "16.09.1978 – 01.08.1980"],
      ["Maj", "H. Laroy", "01.08.1980 – 29.07.1982"],
      ["Maj", "A. Gerard", "29.07.1982 – 05.10.1984"],
      ["Maj", "L. Noël", "05.10.1984 – 22.12.1988"],
      ["Maj", "Y. de Lavareille", "22.12.1988 – 04.01.1991"],
      ["Maj", "Ph. Lattaque", "04.01.1991 – 07.04.1994"],
      ["Maj", "H. Kesteloot", "07.04.1994 – 27.05.1994"],
    ]),
    grid("1963–1994", "Corps warrant officers and corps corporal", [
      ["Adjt", "J. Hauffman", "1963 – 1965"],
      ["Adjt", "M. Leiding", "1965 – 1971"],
      ["Adjt Chef", "R. Brichard", "1971 – 1983"],
      ["Adjt Chef", "M. Cardinal", "1983 – 1989"],
      ["Adjt", "M. Etienne", "1989 – 1992"],
      ["Adjt", "M. Dimanche", "1992 – 27.05.1994"],
      ["1Cpl Chef", "S. Dubois", "1991 – 27.05.1994"],
    ]),
    next("field-artillery-battery", "Para-Commando Field Artillery Battery"),
  ],
});

/* -------------------------------------------------------------------------- */
/* Field Artillery Battery                                                    */
/* -------------------------------------------------------------------------- */

const fa = document("page", "field-artillery-battery", {
  title: "Para-Commando Field Artillery Battery",
  meta_title: "Para-Commando Field Artillery Battery (Bie Aie Para-Cdo)",
  meta_description:
    "From 1973 to 2004 the Para-Commando Field Artillery Battery gave the regiment its own 105 mm howitzers, from Somalia and Rwanda to Albania.",
  meta_image: badges.fa,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Disbanded unit · Bie Aie Para-Cdo · 1973–2004",
        title: "Para-Commando Field Artillery Battery",
        lead: rt("Six towed 105 mm howitzers to give the Para-Commando Regiment its own firepower."),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("artifact", {
      eyebrow: "1973",
      title: "Artillery with a green beret",
      body: rt(
        "To increase the firepower of the Para-Commando Regiment, it was decided in 1972 to create a para-commando field artillery battery. The unit was formed on an experimental basis in Brasschaat on 14 May 1973 from the 4.2-inch mortar platoons of the 1st Parachute Battalion, the 2nd Commando Battalion and the 3rd Parachute Battalion, under Commandant BEM L. Henrot. On 1 April 1974 it officially became an independent unit.",
        "With 9 officers, 24 NCOs and 97 volunteers and conscripts, it was organised to operate on its own, with six American 105 mm howitzers towed by diesel Unimog trucks. The six guns bear battle honours of the three para-commando battalions: Normandy, Oldenburg, Italy, Walcheren, Chatkol and Imjin.",
        "The battery regularly took part in Allied Command Europe Mobile Force (AMF(L)) manoeuvres in Denmark, Italy, Greece and Turkey, and every year in the AMF(L) artillery exercises.",
      ),
      image: badges.fa,
      caption: "Badge of the Para-Commando Field Artillery Battery",
      link: noLink,
      specs: [
        { label: "Created", value: "14 May 1973, Brasschaat" },
        { label: "Guns", value: "Six 105 mm howitzers (US), LG1 Mk II from 1998" },
        { label: "Language", value: "Bilingual" },
        { label: "Godparent", value: "Bornem, since 4 September 1976" },
        { label: "Since 2004", value: "Para-Commando Battery of the 2nd Artillery Battalion" },
      ],
    }),
    slice("timeline", {
      eyebrow: "1974–2004",
      title: "Operations and milestones",
      intro: [],
      events: [
        op("1993", "Sunny Winter and UNOSOM", [
          "From 29 January to 9 February 1993 the battery takes part in operation Sunny Winter in Congo-Brazzaville, with the 3rd Parachute Battalion and the Para-Commando Anti-Tank Company, to protect the evacuation of expatriates from Zaire. Later that year it serves with the 2nd Commando Battalion in UNOSOM in Somalia, under the blue beret of the United Nations.",
        ]),
        op("1994", "Silver Back", [
          "In April 1994, within the Para-Commando Brigade, the battery takes part in operation Silver Back in Rwanda, to cover the withdrawal of the 2nd Commando Battalion from UNAMIR and the evacuation of foreigners.",
        ]),
        op("1995", "Multinational Division", [
          "From 1995 the battery, like the Para-Commando Brigade, is assigned to the Multinational Division Central (MND C).",
        ]),
        op("1997", "Green Stream", [
          "In May 1997 the battery takes part in operation Green Stream in Congo-Brazzaville as the 4th Company of the 2nd Battalion of Commandos.",
        ]),
        op("1998", "The LG1", [
          "From 1998 the battery is equipped with the French 105 mm LG1 Mk II (GIAT). It keeps three American 105 mm howitzers to fire salutes for events of the Royal Family: weddings, births, funerals and the taking of the oath by a new King. It is the only battery of the Belgian armed forces with towed guns, simpler and cheaper to use.",
        ]),
        op("1999", "Allied Harbour: Albania", [
          "In April 1999 a detachment of the battery accompanies the 2nd Battalion of Commandos to Albania for the AMF(L) operation Allied Harbour, escorting and protecting convoys of Kosovar refugees from Kukës to Mjede, and returns in mid-July. The second half of the battery then reinforces the 3rd Lancers Parachute Battalion in Albania and returns in mid-August.",
        ]),
        op("2004", "Battery of the 2nd Artillery Battalion", [
          "On 2 March 2004 the battery merges with the 2nd Artillery Battalion (2A) and becomes the Para-Commando Battery / 2A. Its personnel keep the green beret and continue to jump. The battery also keeps the standard of the Régiment de Chasseurs Ardennais that it received as the Para-Commando Field Artillery Battery.",
        ]),
      ],
    }),
    slice("rich_text", {
      eyebrow: "Traditions and quarters",
      title: "Brasschaat",
      body: rt(
        "The bilingual battery took over the Commando traditions: the green beret with its own badge and the same insignia on the uniform as the 2nd Commando Battalion. Since its creation it was based in Brasschaat. The municipality of Bornem has been its godparent since 4 September 1976.",
      ),
    }),
    grid("1973–2004", "Commanding officers", [
      ["Maj BEM", "L. Henrot", "1973 – 1975"],
      ["Maj", "E. Van Den Broek", "1975 – 1979"],
      ["Maj BEM Ir", "C. Buze", "1979 – 1981"],
      ["Maj BEM Ir", "J.-P. Roman", "1981 – 1983"],
      ["Maj BEM", "W. Vanstraelen", "1983 – 1986"],
      ["Maj", "L. Saelens", "1986 – 1990"],
      ["Maj BEM", "M. Compernol", "1990 – 1994"],
      ["Maj", "H. Koumans", "1994 – 1996"],
      ["Maj BEM", "M. Depauw", "1996 – 1998"],
      ["Cdt", "L. Helsen", "1998 – 2000"],
      ["Maj", "H. Holsteyn", "2000 – 2003"],
      ["Cdt", "E. Norga", "2003 – 2004"],
    ]),
    grid("1976–2004", "Corps warrant officers and corps corporals", [
      ["Adjt Chef", "A. Vandermaelen", "1976 – 1986"],
      ["Adjt Maj", "W. Ophalfvens", "1986 – 2003"],
      ["Adjt Chef", "M. Van Hassel", "2003 – 2004"],
      ["1Cpl Chef", "G. Panier", "1995 – 1999"],
      ["1Cpl Chef", "H. Claessens", "1999 – 2004"],
    ]),
    next("14th-engineer-company", "14th Para-Commando Engineer Company"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 14th Engineer Company                                                      */
/* -------------------------------------------------------------------------- */

const gn = document("page", "14th-engineer-company", {
  title: "14th Para-Commando Engineer Company",
  meta_title: "14th Para-Commando Engineer Company (14 Cie Gn Para-Cdo)",
  meta_description:
    "From 1992 to 2003 the 14th Para-Commando Engineer Company opened the way for the Brigade, in Somalia, Congo-Brazzaville and Albania.",
  meta_image: badges.gn,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Disbanded unit · 14 Cie Gn Para-Cdo · 1992–2003",
        title: "14th Para-Commando Engineer Company",
        lead: rt(
          "Via VI: “I open the way”. Combat engineers, mine warfare specialists and combat swimmers for the Para-Commando Brigade.",
        ),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("artifact", {
      eyebrow: "1991–1992",
      title: "Engineers for the brigade",
      body: rt(
        "On 14 October 1991 the Chief of Staff of the Land Forces decided to give the Para-Commando Regiment an engineer company. The Dutch-speaking 14th Engineer Company, based in Arolsen in Germany, was chosen, and its first NCOs began their para-commando training at Marche-les-Dames. On 1 July 1992 the 14th Para-Commando Engineer Company was officially created.",
        "With 9 officers, 46 NCOs and 128 corporals and soldiers, it had two combat engineer platoons, a minelaying platoon, a countermine platoon, a MAT platoon and a staff platoon, which included a section of combat swimmers.",
      ),
      image: badges.gn,
      caption: "Badge of the 14th Para-Commando Engineer Company",
      link: noLink,
      specs: [
        { label: "Created", value: "1 July 1992" },
        { label: "Motto", value: "Via VI (I open the way)" },
        { label: "Standard", value: "14th Engineer Battalion: Antwerp, Yser, 1914–1918 campaigns" },
        { label: "Godparent", value: "Sint-Niklaas, since 1994" },
        { label: "Disbanded", value: "3 September 2003" },
      ],
    }),
    slice("timeline", {
      eyebrow: "1992–1999",
      title: "Operations",
      intro: [],
      events: [
        op("1992", "Restore Hope and UNOSOM: Somalia", [
          "From 23 December 1992 to 14 December 1993 the company provides a platoon in rotation to reinforce the 2nd Commando Battalion and the 3rd Parachute Battalion in operations Restore Hope and UNOSOM in Somalia. Within a year, the whole company has taken part in these armed humanitarian missions under the United Nations.",
        ]),
        op("1993", "Sunny Winter: Brazzaville", [
          "For operation Sunny Winter, which protects the evacuation of expatriates from Kinshasa, a section reinforces the 3rd Parachute Battalion and the Para-Commando Anti-Tank Company in Congo-Brazzaville from 30 January to 7 February 1993.",
        ]),
        op("1994", "Silver Back: Djibouti", [
          "During operation Silver Back in Rwanda, the company sends a section to reinforce the troops in Djibouti from 27 April to 5 May 1994.",
        ]),
        op("1999", "Allied Harbour: Albania and Kosovo", [
          "From 17 April 1999 part of the company reinforces the 2nd Battalion of Commandos in the humanitarian AMF(L) operation Allied Harbour in Albania, returning at the end of July. The rest of the company leaves in mid-July to reinforce the 3rd Lancers Parachute Battalion, still in Albania, and spends time in Kosovo before returning in mid-August.",
        ]),
      ],
    }),
    slice("rich_text", {
      eyebrow: "Traditions and quarters",
      title: "From Arolsen to Heverlee",
      body: rt(
        "In May and June 1992 the company left Germany for Emblem, near Lier. In April and May 1994 it moved to Heverlee (Leuven).",
        "It took over the Commando traditions and wore the green beret with the badge of the Para-Commando Brigade, on which a Roman engineer's helmet can be seen, and the same uniform as the 2nd Commando Battalion. It carried the standard of the 14th Engineer Battalion, with the battle honours Antwerp, Yser and the 1914–1918 campaigns. The municipality of Sint-Niklaas was its godparent from 1994. The company was disbanded on 3 September 2003.",
      ),
    }),
    grid("1992–2003", "Commanders, warrant officers and corporals", [
      ["Maj", "B. Vercruyssen", "1992 – 1994"],
      ["Maj", "P. Van Goethem", "1994 – 1997"],
      ["Maj", "W. De Cauwer", "1997 – 2000"],
      ["Maj", "R. Wagemans", "2000 – 2003"],
      ["Adjt Chef", "D. Robbens", "1992 – 2000"],
      ["Adjt Chef", "L. Pauwels", "2000 – 2003"],
      ["1Cpl Chef", "F. Willems", "1994 – 1997"],
      ["1Cpl Chef", "F. Van Der Verren", "1997 – 2003"],
    ]),
    next("35th-anti-aircraft-battery", "35th Para-Commando Anti-Aircraft Battery"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 35th Anti-Aircraft Battery                                                 */
/* -------------------------------------------------------------------------- */

const aa = document("page", "35th-anti-aircraft-battery", {
  title: "35th Para-Commando Anti-Aircraft Battery",
  meta_title: "35th Para-Commando Anti-Aircraft Battery (35 AA Para-Cdo)",
  meta_description:
    "From 1994 to 2002 the 35th Para-Commando Anti-Aircraft Battery protected the Brigade with eighteen Mistral missile posts.",
  meta_image: badges.aa,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Disbanded unit · 35 AA Para-Cdo · 1994–2002",
        title: "35th Para-Commando Anti-Aircraft Battery",
        lead: rt("Eighteen Mistral firing posts to protect the Para-Commando Brigade against aircraft."),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("artifact", {
      eyebrow: "1951–2002",
      title: "From the 35th Battalion to a para-commando battery",
      body: rt(
        "The 35th Anti-Aircraft Artillery Battalion was created on 1 June 1951 and took over the traditions of the Défense terrestre contre aéronefs (ground-based air defence). In 1992 it received the Mistral weapon system (Missile transportable anti-aérien léger).",
        "When the battalion was disbanded in 1994, one battery was kept and became the 35th Para-Commando Anti-Aircraft Battery. On 1 July 1994 it received its establishment: 8 officers, 60 NCOs and 90 corporals and soldiers, most of them from the 35th Battalion, the 62nd Battalion and the ESR company (Équipes spéciales de renseignements).",
        "Designed to operate on its own, the battery had 18 Mistral firing posts, protecting against aircraft up to an altitude of 2,000 metres, with an optimal range of 800 to 5,000 metres.",
      ),
      image: badges.aa,
      caption: "Badge of the 35th Para-Commando Anti-Aircraft Battery",
      link: noLink,
      specs: [
        { label: "Created", value: "1 July 1994" },
        { label: "Weapon", value: "18 Mistral firing posts" },
        { label: "Standard", value: "35th Artillery Battalion: Battle of Belgium 1940" },
        {
          label: "Twinned with",
          value: "35th Parachute Battery, 54th Artillery Regiment (France), since 1997",
        },
        { label: "Disbanded", value: "2 September 2002" },
      ],
    }),
    slice("rich_text", {
      eyebrow: "Operations, traditions and quarters",
      title: "Allied Harbour, 1999",
      body: rt(
        "In 1999 a section reinforced the 2nd Battalion of Commandos in Albania for the AMF(L) operation Allied Harbour and returned in mid-July. From 15 July to 9 August the battery took part in the same operation, reinforcing the 3rd Lancers Parachute Battalion. On 2 September 2002, in the reorganisation of the Belgian army, the battery was disbanded.",
        "The French-speaking battery, part of whose personnel was Dutch-speaking, took over the Commando traditions: the green beret with the badge of the Para-Commando Brigade, showing two stylised crossed missiles, and the same insignia on the uniform as the 2nd Battalion of Commandos. By royal decree of 30 July 1994 it was entrusted with the standard of the 35th Artillery Battalion, which bears the battle honour “Battle of Belgium 1940”. From 1997 it was twinned with the 35th Parachute Battery of the French 54th Artillery Regiment, equipped with the same weapon.",
        "The battery was based at the Knesselaere quarters in Spich, Germany, and in Wartet.",
      ),
    }),
    grid("1994–2002", "Commanders, warrant officers and corporals", [
      ["Maj Ir", "G. Vandeweyer", "1994 – 1996"],
      ["Maj Ir", "J.-L. Hiel", "1996 – 1998"],
      ["Maj Ir", "W.D. Peeters", "1998 – 2000"],
      ["Maj", "P. Darvil", "2000 – 2002"],
      ["Adjt Chef", "L. Hillaert", "1994 – 1996"],
      ["Adjt Chef", "L.P. Bauwens", "1996 – 2002"],
      ["1Cpl Chef", "J. Bosmans", "1994 – 1997"],
      ["1Cpl Chef", "F. Bouckaert", "1997 – 2000"],
      ["1Cpl Chef", "S. Jeanmenne", "2000 – 2002"],
    ]),
    next("210th-logistics-company", "210th Para-Commando Logistics Company"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 210th Logistics Company                                                    */
/* -------------------------------------------------------------------------- */

const log = document("page", "210th-logistics-company", {
  title: "210th Para-Commando Logistics Company",
  meta_title: "210th Para-Commando Logistics Company (210 Cie Log Para-Cdo)",
  meta_description:
    "From 1994 to 2003 the 210th Para-Commando Logistics Company supplied, moved and maintained the Para-Commando Brigade, including in Albania in 1999.",
  meta_image: badges.log,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Disbanded unit · 210 Cie Log Para-Cdo · 1994–2003",
        title: "210th Para-Commando Logistics Company",
        lead: rt("Food, fuel, ammunition and equipment: the logistic backbone of the Para-Commando Brigade."),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("artifact", {
      eyebrow: "1983–2003",
      title: "Supplying the brigade",
      body: rt(
        "The 210th Logistics Company was created on 1 July 1983 in Arolsen, Germany, as a sub-unit of the 18th Logistics Battalion, by merging the 210th Materiel Company and the 107th Supply and Transport Platoon. In 1994 it moved to Heverlee (Leuven), and on 30 September it became the 210th Para-Commando Logistics Company. On 1 January 1995 it became an independent unit providing the logistic support of the Para-Commando Brigade.",
        "It supplied and transported food (class I), equipment, weapons and materiel (class II), fuel (class III) and ammunition (class V) for the units of the Brigade, and maintained the Brigade's vehicles.",
      ),
      image: badges.log,
      caption: "Badge of the 210th Para-Commando Logistics Company",
      link: noLink,
      specs: [
        { label: "Para-Commando", value: "From 30 September 1994" },
        { label: "Strength", value: "10 officers, 73 NCOs, 132 corporals and soldiers" },
        { label: "Language", value: "Bilingual" },
        { label: "Quarters", value: "Heverlee (Leuven)" },
        { label: "Disbanded", value: "September 2003" },
      ],
    }),
    slice("rich_text", {
      eyebrow: "Organisation and operations",
      title: "Eight elements, one mission",
      body: rt(
        "The company consisted of:",
        "- a headquarters and services cell;",
        "- a supply and transport platoon with five sections;",
        "- a technical platoon that organised the work of the platoons;",
        "- a supply platoon;",
        "- a vehicle maintenance platoon;",
        "- a materiel platoon;",
        "- a supervision platoon;",
        "- and a National Support Element (NSE) section for when the Brigade or a para-commando unit operated in an international setting.",
        "From 17 April 1999 half of the company reinforced the 2nd Battalion of Commandos in the humanitarian AMF(L) operation Allied Harbour in Albania, returning at the end of July. On 9 July the other half accompanied the 3rd Lancers Parachute Battalion to Albania to complete the operation, staying until mid-August.",
        "In September 2003 the company helped form the 20th Logistics Battalion and was disbanded.",
        "### Traditions",
        "The bilingual company took over the Commando traditions: the green beret with the badge of the Para-Commando Brigade and, superimposed, the symbols of the Logistics branch. The insignia on the uniform were the same as those of the other units with Commando traditions.",
      ),
    }),
    grid("1994–2003", "Commanders, warrant officers and corporals", [
      ["Maj", "P. Vandeput", "1994 – 1998"],
      ["Maj", "F. Cotton", "1998 – 2001"],
      ["Maj", "D. Laforce", "2001 – 2003"],
      ["Adjt Chef", "F. Meulemans", "1994 – 1998"],
      ["Adjt Maj", "A. Torremans", "1998 – 2003"],
      ["1Cpl Chef", "M. Maire", "1994 – 1997"],
      ["1Cpl Chef", "J. Davidovic", "1997 – 2002"],
      ["1Cpl Chef", "G. Denis", "2002 – 2003"],
    ]),
    slice("cta_banner", {
      eyebrow: "Belgian Commando units",
      title: "Back to all units",
      body: rt("Every unit that wore the green beret has its place in the museum in Flawinne."),
      image: noImage,
      primary_link: doc("page", "units", "All units"),
      secondary_link: doc("page", "bibliography", "Bibliography"),
    }),
  ],
});

/* -------------------------------------------------------------------------- */
/* Bibliography                                                               */
/* -------------------------------------------------------------------------- */

const book = (category: string, name: string, description: string) => ({
  category,
  name,
  description,
  link: noLink,
});

const bibliography = document("page", "bibliography", {
  title: "Bibliography",
  meta_title: "Bibliography of the Belgian Commandos",
  meta_description:
    "Books on the history of the Belgian Commandos, the Para-Commando units and the British Commandos, selected by the Commando Museum.",
  meta_image: noImage,
  slices: [
    slice(
      "hero",
      {
        eyebrow: "Units · Further reading",
        title: "Bibliography",
        lead: rt(
          "A selection of books on the Belgian Commandos and the Para-Commando units, and on the British Commandos with whom it all began.",
        ),
        image: noImage,
        image_credit: "",
      },
      "page",
    ),
    slice("link_list", {
      eyebrow: "Books",
      title: "Recommended reading",
      intro: [],
      items: [
        book("Français", "Donnez-nous un champ de bataille", "Carlo G. Seghers · Didier Hatier, 1984"),
        book("Français", "Bérets rouges, bérets verts", "Emile Genot · 1986"),
        book("Français", "Chesty George… Captain Blunt", "Emile Genot"),
        book("Français", "Histoire des unités Para-Commando", "Emile Genot · editions 1, 2 and 3"),
        book("Français", "Centre d’entraînement pour parachutistes", "Emile Genot"),
        book("Français", "Des rives du Sangro jusqu’à Kunduz", "Emile Genot"),
        book("Français", "Centre d’entraînement de commandos", "Emile Genot"),
        book(
          "Français",
          "Historique des régiments parachutistes S.A.S., Commando et Para-Commando belges",
          "Guy de Pierpont and André Lefèvre · 3 volumes · Groupe GO & Co, 1977",
        ),
        book("English", "The Green Beret: The Story of the Commandos 1940–1945", "Saunders"),
        book("English", "The Green Beret: The Commandos at War", "Saunders"),
        book("English", "Tobruk Commando", "Landsborough"),
        book("English", "Commando Attack", "Holman"),
        book("English", "Castle Commando", "Gilchrist"),
        book("English", "The Commandos", "Miller"),
      ],
    }),
    slice("cta_banner", {
      eyebrow: "Documentation centre",
      title: "Research the Commandos",
      body: rt("The museum's library and photo archive are open for research by appointment."),
      image: noImage,
      primary_link: doc("page", "documentation-centre", "Documentation centre"),
      secondary_link: doc("page", "units", "All units"),
    }),
  ],
});

export const unitsDocuments = [units, cdo2, ctrg, cdo4, cdo6, atk, fa, gn, aa, log, bibliography];
