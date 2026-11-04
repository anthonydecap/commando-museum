import { doc, document, noImage, noLink, rt, slice, type SeedImage } from "./helpers";
import { photo } from "./shared";

/**
 * History of the Belgian commandos, from the 4th Troop of No. 10 (Inter-Allied)
 * Commando in 1942 to the Special Operations Regiment. Recovered and edited from
 * the former museedescommandos.be (French text is the reference).
 */

const images = {
  officers: photo(
    "00-10-cdo-2.jpg",
    "Officers of No. 10 (Inter-Allied) Commando in British battledress and berets, standing and sitting in two rows",
  ),
  danloy: photo("capitaine-georges-danloy.jpg", "Portrait of Captain Georges Danloy in uniform and commando beret"),
  mapBritain: photo(
    "carte-grande-bretagne-ok-3.png",
    "Map of Great Britain and Ireland marking Achnacarry, Abersoch and the other training locations",
  ),
  shoulderTitle: photo(
    "01-10-cdo.jpg",
    "Shoulder title “No. 10 Commando Belgium” above the commando dagger insignia",
  ),
  goatley: photo(
    "03c-gootley.jpg",
    "A Goatley folding assault boat with a crew of commando mannequins in the museum",
  ),
  snowRobe: photo(
    "04b-tenue-blanche.jpg",
    "A white hooded robe of a religious brotherhood, used as snow camouflage in Montenero",
  ),
  bunker: photo(
    "15a-bunkers.jpg",
    "Reconstruction of a German observation post on Walcheren, with commando mannequins",
  ),
  curvimeter: photo(
    "04d-curvimetre.jpg",
    "Display case with the curvimeter of the commander of the Walloon Legion, captured in 1945",
  ),
  canoes: photo(
    "05a-kayak-toile.jpg",
    "Canvas canoe, climbing ropes and mannequins in the museum room on the post-war years",
  ),
  postWarKit: photo(
    "05c-materiel-ce-cdo.jpg",
    "Climbing and assault equipment used at the Commando Training Centre after the war",
  ),
  parachutes: photo(
    "05d-3-parachutes.jpg",
    "Paratrooper mannequins with parachutes and air-drop containers in the museum",
  ),
  c119: photo(
    "11b-c119.jpg",
    "Mannequins at the door of a C-119 aircraft: the stick leader waits for the signal of the jump instructor",
  ),
  congoMap: photo(
    "ops-1960.jpg",
    "Map of Congo showing where the Para-Commando units were deployed in 1960",
  ),
  instructorBadge: photo(
    "01-badge.jpg",
    "Embroidered badge of a commando instructor in Zaire: a dagger and a leopard's head between laurels",
  ),
  amf: photo(
    "maneuvers-amfl.jpg",
    "A Chinook helicopter lifting a vehicle during an Allied Command Europe Mobile Force exercise",
  ),
  stanleyville: photo(
    "09-stan-et-paulis.jpg",
    "Rescued civilians walking past a Para-Commando jeep, Congo, November 1964",
  ),
  sahel: photo("opdracht-sahel.jpg", "An elderly man holding a child during the Sahel relief mission"),
  kolwezi: photo("09-kolwezi.jpg", "Para-Commandos advancing along a street in Kolwezi, May 1978"),
  greenBean: photo(
    "green-beam.jpg",
    "Commandos with a machine gun take position on a street in Kigali while a child watches, 1990",
  ),
  somalia: photo(
    "opdracht-restore-hope.jpg",
    "Commandos in jeeps and at an observation post in Somalia, 1993",
  ),
  unamir: photo(
    "09-kigali-unamir.jpg",
    "The bullet-marked building at Camp Kigali, its memorial plaque, and Belgian troops in Kigali, 1994",
  ),
  homeland: photo(
    "homeland.jpg",
    "Two commandos of the 2nd Commando Battalion on guard in a Brussels street",
  ),
  tenCommandos: photo(
    "03-10-cdos-kigali.jpg",
    "Portraits of the ten commandos killed in Kigali on 7 April 1994",
  ),
  kigaliMemorial: photo(
    "07b-monument-10-cdos.jpg",
    "The memorial to the ten commandos of Kigali in the museum, with flags and a zebra-skin panel",
  ),
};

/** The chapters, in reading order. */
const chapters = [
  {
    uid: "origin-of-the-word-commando",
    title: "Origin of the word “commando”",
    body: "From the Boer War to Churchill's raiding forces.",
  },
  {
    uid: "creation-of-the-belgian-commandos",
    title: "The Belgian commandos are born",
    body: "The 4th Troop of No. 10 (Inter-Allied) Commando, 1942.",
  },
  {
    uid: "second-world-war",
    title: "The Second World War",
    body: "Italy, Yugoslavia, Walcheren and the Baltic, 1943–1945.",
  },
  {
    uid: "post-war-period",
    title: "Home again",
    body: "Marche-les-Dames, Namur and the training for Korea, 1945–1951.",
  },
  {
    uid: "para-commando-regiment",
    title: "The Para-Commando Regiment",
    body: "Commandos and paratroopers in one regiment, from 1951.",
  },
  {
    uid: "african-period",
    title: "The African period",
    body: "Kamina, Kitona and Rwanda-Urundi, 1953–1962.",
  },
  {
    uid: "from-1962-to-today",
    title: "From 1962 to today",
    body: "NATO, humanitarian operations and the Special Operations Regiment.",
  },
  {
    uid: "in-memoriam",
    title: "In memoriam",
    body: "The commandos who died in operations and on duty.",
  },
];

/** Closing block of a chapter: the next chapter and the way back to the overview. */
const nextChapter = (uid: string) => {
  const index = chapters.findIndex((c) => c.uid === uid);
  const next = chapters[index + 1];
  return slice("cta_banner", {
    eyebrow: next ? "Next chapter" : "History",
    title: next ? next.title : "Back to the overview",
    body: rt(next ? next.body : "All chapters of the history of the Belgian commandos."),
    image: noImage,
    primary_link: next ? doc("page", next.uid, "Read the next chapter") : doc("page", "history", "All chapters"),
    secondary_link: next ? doc("page", "history", "All chapters") : doc("page", "virtual-tour", "Take the virtual tour"),
  });
};

const pageHero = (
  eyebrow: string,
  title: string,
  lead: string,
  image: SeedImage | typeof noImage = noImage,
  credit = "",
) =>
  slice(
    "hero",
    {
      eyebrow,
      title,
      lead: rt(lead),
      image,
      image_credit: credit,
    },
    "page",
  );

/* -------------------------------------------------------------------------- */
/* History overview                                                           */
/* -------------------------------------------------------------------------- */

const history = document("page", "history", {
  title: "History",
  meta_title: "History of the Belgian commandos",
  meta_description:
    "From the 4th Troop of No. 10 (Inter-Allied) Commando in 1942 to the 2nd Commando Battalion and the Special Operations Regiment: the history of the Belgian commandos.",
  meta_image: images.officers,
  slices: [
    pageHero(
      "History · 1942 to today",
      "From Achnacarry to Flawinne",
      "How a troop of Belgian volunteers in wartime Britain became the Commando Regiment, the Para-Commando Regiment and today's Special Operations Regiment.",
      images.officers,
      "Officers of No. 10 (Inter-Allied) Commando",
    ),
    slice("intro_statement", {
      eyebrow: "27 July 1942",
      title: "",
      statement: rt(
        "Belgium was occupied. So the first Belgian commandos were formed **in Britain, as the 4th Troop of No. 10 (Inter-Allied) Commando.**",
      ),
      body: rt(
        "Seven officers and about a hundred volunteers earned the green beret at Achnacarry in Scotland. Their troop became the Commando Regiment in 1945 and lives on in the 2nd Commando Battalion in Flawinne, home of the museum.",
      ),
      facts: [
        { value: "1942", label: "The 4th Troop is formed in Britain" },
        { value: "1945", label: "The Commando Regiment is born" },
        { value: "1951", label: "Commandos and paratroopers form one regiment" },
        { value: "2018", label: "The Special Operations Regiment" },
      ],
    }),
    slice("timeline", {
      eyebrow: "Timeline",
      title: "Eighty years in key moments",
      intro: [],
      events: [
        {
          year: "1940",
          title: "Churchill's raiders",
          body: rt(
            "At Winston Churchill's initiative, the British Army forms volunteer units for surprise raids. Lieutenant Colonel Dudley Clarke names them after the Boer “commandos”.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1942",
          title: "The 4th Troop",
          body: rt(
            "On 27 July, a Belgian troop is created within No. 10 (Inter-Allied) Commando under Captain Georges Danloy. Its men earn the green beret at Achnacarry.",
          ),
          image: images.danloy,
          caption: "Captain Georges Danloy",
        },
        {
          year: "1943",
          title: "Back in the fight",
          body: rt(
            "On 13 December, on the Sangro front in Italy, the 4th Troop becomes the first Belgian land unit to fight again after the defeat of May 1940.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1944",
          title: "Walcheren",
          body: rt(
            "On 1 November, the troop lands at Westkapelle in the first assault wave of a British commando brigade: the hardest and deadliest operation of its war.",
          ),
          image: images.bunker,
          caption: "Walcheren, reconstructed in the museum",
        },
        {
          year: "1945",
          title: "The Commando Regiment",
          body: rt(
            "On 15 May, the Independent Commando Unit takes the title of Commando Regiment. In September it returns to Belgium and settles at Marche-les-Dames.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1951",
          title: "The Para-Commando Regiment",
          body: rt(
            "On 3 November, all commando and parachute units are merged into the Para-Commando Regiment, commanded by Lieutenant Colonel Georges Danloy.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1953",
          title: "Africa",
          body: rt(
            "The first Para-Commando detachments leave for the base of Kamina in the Belgian Congo. Until 1962, the battalions take turns in Africa.",
          ),
          image: images.congoMap,
          caption: "Para-Commando deployments in Congo, 1960",
        },
        {
          year: "1962",
          title: "Flawinne",
          body: rt(
            "The 2nd Commando Battalion leaves the Citadel of Namur for the Sous-Lieutenant Thibaut barracks in Flawinne, where it is still based today.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1964",
          title: "Stanleyville",
          body: rt(
            "The 12th Company of the 2nd Commando Battalion reinforces the 1st Parachute Battalion in the rescue of 2,375 hostages in Congo.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1991",
          title: "The Para-Commando Brigade",
          body: rt(
            "The regiment becomes a brigade. In the 1990s it carries out more humanitarian operations than in any decade before.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1994",
          title: "Kigali",
          body: rt(
            "On 7 April, ten commandos of the 2nd Commando Battalion, serving with the UN mission in Rwanda, are killed by soldiers of the Rwandan army.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "2018",
          title: "Special Operations Regiment",
          body: rt(
            "On 7 March, the Para-Commando Light Brigade becomes the Special Operations Regiment. The 2nd Commando Battalion remains one of its pillars.",
          ),
          image: noImage,
          caption: "",
        },
      ],
    }),
    slice("card_grid", {
      eyebrow: "Chapters",
      title: "Read the full history",
      intro: rt("Eight chapters, from the origin of the word to the names on the memorial."),
      tone: "sand",
      cards: chapters.map((c, i) => ({
        image: noImage,
        kicker: String(i + 1).padStart(2, "0"),
        title: c.title,
        body: c.body,
        link: doc("page", c.uid, "Read the chapter"),
      })),
    }),
    slice("cta_banner", {
      eyebrow: "See it for yourself",
      title: "The history, room by room",
      body: rt(
        "The museum follows the commandos chronologically through some twenty rooms, from Achnacarry to the latest missions.",
      ),
      image: images.goatley,
      primary_link: doc("page", "visit", "Plan your visit"),
      secondary_link: doc("page", "virtual-tour", "Take the virtual tour"),
    }),
  ],
});

/* -------------------------------------------------------------------------- */
/* 1. Origin of the word                                                      */
/* -------------------------------------------------------------------------- */

const origin = document("page", "origin-of-the-word-commando", {
  title: "Origin of the word “commando”",
  meta_title: "Origin of the word “commando”",
  meta_description:
    "Why Britain's raiding forces of 1940 were called commandos: a name borrowed from the Boer War, and older still.",
  meta_image: noImage,
  slices: [
    pageHero(
      "History · Chapter 1",
      "Origin of the word “commando”",
      "In 1940 Britain needed a name for its new raiding troops. It chose one it had learned to respect, at its own expense, forty years earlier.",
    ),
    slice("rich_text", {
      eyebrow: "1940",
      title: "Churchill's special service troops",
      body: rt(
        "From 1940, at the initiative of Winston Churchill, the British Army set out to form troops specialised in raids: surprise attacks on precise but limited objectives.",
        "A “commando” of 1940 was a military unit of roughly battalion size, made up of volunteers for special service. The men kept the insignia of their original regiment.",
        "They formed a secret force whose only privilege was finding their own billets and rations. Each unit took on the style of its commanding officer.",
        "In his 1955 novel *Officers and Gentlemen*, the writer Evelyn Waugh noted that once the press was allowed to use the exotic term “commando”, its meaning grew so quickly that it came to include curates on motorcycles.",
      ),
    }),
    slice("quote", {
      quote: rt(
        "Lieutenant Colonel Dudley Clarke, who was given the task of organising the commandos, was also the man who named them, in memory of the Boer War.",
      ),
      attribution: "Dudley Clarke",
      role: "Founder of the British commandos",
      tone: "sand",
    }),
    slice("rich_text", {
      eyebrow: "1834–1902",
      title: "A Boer word",
      body: rt(
        "There is no doubt that the British Army borrowed a name whose value it had learned at its own expense during the Boer War of 1899–1902.",
        "The Boer commandos served as the regular army of the Orange Free State and the Transvaal. They gathered, usually on horseback, the able-bodied men from 16 to 20 years old, who all had to do military service. Each commando was organised at the level of an electoral district.",
        "Long before that war, the Afrikaner settlers already used the word for armed groups that carried out private punitive expeditions against their African neighbours, following the example of the Portuguese. Murray's great dictionary of the English language (1892) gives two examples from 1884 and one from as early as 1834, describing the commando as an old and lamentable system of military reprisals.",
        "So “commando”, in the sense of a special unit, was probably brought to South Africa by the Portuguese. But it was clearly the Boers who made the word famous in Europe: first during the war of 1899–1902 and, above all, once again in the Second World War.",
      ),
    }),
    nextChapter("origin-of-the-word-commando"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 2. Creation of the Belgian commandos                                       */
/* -------------------------------------------------------------------------- */

const creation = document("page", "creation-of-the-belgian-commandos", {
  title: "The Belgian commandos are born",
  meta_title: "Creation of the Belgian commandos",
  meta_description:
    "In 1942, Belgian volunteers in Britain formed the 4th Troop of No. 10 (Inter-Allied) Commando under Captain Georges Danloy and earned the green beret at Achnacarry.",
  meta_image: images.officers,
  slices: [
    pageHero(
      "History · Chapter 2",
      "The Belgian commandos are born",
      "In the summer of 1942, Belgian volunteers in Britain formed their own troop within an international commando, and earned the green beret in the Scottish Highlands.",
      images.danloy,
      "Captain Georges Danloy",
    ),
    slice("text_media", {
      eyebrow: "1942",
      title: "The 4th Troop",
      body: rt(
        "In 1942 the “4th Troop” of No. 10 (Inter-Allied) Commando was created in Great Britain under the command of Captain Georges Danloy. A “troop” is the commando name for a company.",
        "It counted about a hundred men, organised in two assault sections and a headquarters. No. 10 Commando also had troops from other occupied countries: France, the Netherlands, Poland, Norway and more.",
        "After intensive training at the Commando Training Centre in Achnacarry, Scotland, the first candidates received their commando badge and their green beret. Based at Abersoch in Wales, the unit specialised in amphibious operations and raids.",
      ),
      image: images.mapBritain,
      caption: "Great Britain, with the location of the training centres",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    slice("text_media", {
      eyebrow: "Spring 1942",
      title: "No. 10 (Inter-Allied) Commando",
      body: rt(
        "No. 10 (Inter-Allied) Commando was raised in the spring of 1942. It was made up of troops of about a hundred men from different nations, each with its own number:",
        "- **1st Troop**, French, the first to be raised in May 1942 under Commandant (Major) Kieffer and formed with sailors.",
        "- **2nd Troop**, Dutch, under Captain Mulders.",
        "- **3rd Troop**, the “X-Troop”, under Captain Bryan Hilton Jones (UK): German-speaking Germans and Austrians, nearly all Jewish, as well as Hungarians, Romanians and Czechoslovaks.",
        "- **4th Troop**, Belgian, under Captain Georges Danloy.",
        "- **5th Troop**, Norwegian, under Captain Hauge.",
        "- **6th Troop**, Polish, under Major Smrokowski.",
        "- **7th Troop**, Yugoslav.",
        "- **8th Troop**, French, raised only in May 1943 under Lieutenant Trepel, until then Kieffer's second-in-command.",
        "None of the X-Troop's men had any illusion about their fate if the Germans captured them. The troop never fought as a unit: small teams went into action with the other troops as interpreters, to question prisoners and read captured documents.",
      ),
      image: images.officers,
      caption: "The officers of No. 10 (Inter-Allied) Commando",
      link: noLink,
      image_side: "left",
      tone: "dark",
    }),
    slice("rich_text", {
      eyebrow: "The photograph",
      title: "Who is who",
      body: rt(
        "**Standing, from left to right:** Captain E. F. Lutyens (liaison officer, Belgian troop), Captain Clarcke (adjutant), Lieutenant Colonel Dudley Lister (commanding officer, No. 10 Commando), Major P. Laycock (second-in-command), Captain Bryan Hilton Jones (X-Troop) and Captain Hodges (medical officer).",
        "**Sitting, from left to right:** Lieutenant Woloszowski (second-in-command, Polish troop), Captain Mulders (Dutch troop), Captain G. Danloy (Belgian troop), Captain Hauge (Norwegian troop) and Commandant (Major) P. Kieffer (French troop).",
      ),
    }),
    slice("timeline", {
      eyebrow: "1942–1945",
      title: "The 4th Troop at a glance",
      intro: rt("Read the full story of its campaigns in [the Second World War](page:second-world-war)."),
      events: [
        {
          year: "1942",
          title: "Achnacarry and Abersoch",
          body: rt(
            "On 27 July, a Belgian troop (No. 4) is created within No. 10 (Inter-Allied) Commando. Seven officers and about a hundred volunteers from the Belgian forces in Britain go through the tough training at Achnacarry and win the green beret. The troop then settles at Abersoch in North Wales and also trains at Portsmouth and Plymouth (amphibious training) and St Ives (cliff assaults).",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1943",
          title: "Italy",
          body: rt(
            "In September the troop leaves for North Africa, near Algiers, and joins the 2nd Commando Brigade. On Monday 13 December 1943 at 1 p.m., it becomes the first Belgian land unit to fight again after the defeat of 1940: patrols and raids on the Sangro front, in the mountains around San Pietro Avellana and Montenero. In January 1944 it crosses the Garigliano and takes part in the capture of Minturno and Monte Ornito.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1944",
          title: "Vis, Yeu and Walcheren",
          body: rt(
            "In March the troop is on the Yugoslav island of Vis: defending the island, harassing the enemy on neighbouring islands and boarding enemy supply ships. Back in Britain, a section raids the Île d'Yeu off Saint-Nazaire in August. From 1 November, the troop is in the first assault wave on Walcheren, liberated after fierce fighting.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1945",
          title: "From troop to regiment",
          body: rt(
            "In January the troop is reinforced by 250 new Belgian commandos, recruited in liberated Belgium and trained at Achnacarry. In April, now the Independent Commando Unit, it joins the 1st Commando Brigade in northern Germany and ends the war on the Baltic coast. In Schleswig-Holstein it hunts Nazis and captures Belgians who wore the German uniform, among them Major Hellebaut, commander of the Walloon Legion. On 15 May 1945 the unit takes the title of Commando Regiment.",
          ),
          image: noImage,
          caption: "",
        },
      ],
    }),
    slice("text_media", {
      eyebrow: "Three languages",
      title: "One troop",
      body: rt(
        "The 4th Troop was trilingual. It brought together French-speaking and Dutch-speaking Belgians, and English-speaking Belgians who had come from Anglo-Saxon countries. Within No. 10 (Inter-Allied) Commando, the common language was English.",
      ),
      image: images.shoulderTitle,
      caption: "“No. 10 Commando Belgium” shoulder title",
      link: noLink,
      image_side: "right",
      tone: "sand",
    }),
    nextChapter("creation-of-the-belgian-commandos"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 3. The Second World War                                                    */
/* -------------------------------------------------------------------------- */

const ww2 = document("page", "second-world-war", {
  title: "The Second World War",
  meta_title: "The Belgian commandos in the Second World War",
  meta_description:
    "Italy, Yugoslavia, Walcheren and Germany: the campaigns of the Belgian 4th Troop from 1943 to 1945, and its three citations.",
  meta_image: images.bunker,
  slices: [
    pageHero(
      "History · Chapter 3 · 1943–1945",
      "The Second World War",
      "From the Sangro to Walcheren and the Baltic: the war of the 4th Troop, and the three citations it earned on the way.",
      images.goatley,
      "Goatley assault boat, Commando Museum",
    ),
    slice("text_media", {
      eyebrow: "Italy · 1943–1944",
      title: "The first Belgians back in action",
      body: rt(
        "**September 1943.** The 4th Troop of No. 10 (Inter-Allied) Commando leaves Great Britain on 10 September aboard the SS *Athlone Castle*, bound for Algeria, to prepare for operations in Italy. It leaves North Africa on 28 November aboard the *Ville d'Oran*.",
        "**December 1943.** On 2 December the troop lands at Taranto. From 13 December, under the British Eighth Army, it fights on the Sangro front (patrols, raids, ambushes) and takes part in the attack on Petrili. Our compatriots are the first of the Belgian land forces to go into action since May 1940.",
        "**January 1944.** Attached to the US Fifth Army, the troop distinguishes itself at the crossing of the Garigliano, in the attack on Minturno and in the capture of Monte Ornito.",
      ),
      image: images.snowRobe,
      caption: "Snow camouflage made from a brotherhood's robe, Montenero",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    slice("quote", {
      quote: rt(
        "The Belgian Commando Unit proudly carried our colours on the battlefields of Italy where, through its enthusiastic dash, it earned the highest praise from the commanders under whom it showed the worth of our arms, notably in patrols at San Pietro and Montenero and in the assault on the Gustav Line at Tremensuoli and Monte Ornito.",
      ),
      attribution: "First citation",
      role: "Italy, winter 1943–1944",
      tone: "sand",
    }),
    slice("text_media", {
      eyebrow: "Yugoslavia · 1944",
      title: "Privateers in the Adriatic",
      body: rt(
        "**March 1944.** The troop joins the British 2nd Commando Brigade on the island of Vis, held by Tito's partisans. From there it lands on the German-occupied Dalmatian islands and attacks enemy supply convoys at sea.",
      ),
      image: noImage,
      caption: "",
      link: noLink,
      image_side: "left",
      tone: "light",
    }),
    slice("quote", {
      quote: rt("The Belgian Commando Unit took part in daring operations boarding enemy vessels at the island of Vis."),
      attribution: "Second citation",
      role: "Yugoslavia, 1944",
      tone: "dark",
    }),
    slice("text_media", {
      eyebrow: "Walcheren · November 1944",
      title: "Operation Infatuate",
      body: rt(
        "**May 1944.** The troop returns to England, takes in reinforcements and keeps training. On 25 August 1944, one of its sections carries out a reconnaissance raid on the Île d'Yeu off Saint-Nazaire.",
        "**November 1944.** Brought back to the Belgian coast in October, the 4th Troop takes part in Operation Infatuate: the landing on the island of Walcheren in the Netherlands. The island was a fortress packed with guns, blocking the Scheldt and the way to Antwerp. It was the hardest and deadliest operation of the troop's war.",
      ),
      image: images.bunker,
      caption: "A German observation post on Walcheren, reconstructed in the museum",
      link: noLink,
      image_side: "left",
      tone: "light",
    }),
    slice("quote", {
      quote: rt(
        "The Belgian Commando Unit took part in the operations on the Atlantic coast and in Holland. It landed at Westkapelle on the island of Walcheren on 1 November, in the first assault wave of a British commando brigade, reached the shore swimming when its boat was disabled by the deadly fire of the enemy coastal artillery, and was on its objective at the minute set in the initial plan. From 1 to 8 November it played an active part in taking the island and, with enthusiasm and bravery despite serious losses in men and officers, in the capture of Domburg and the clearing of the dunes towards Veere, seizing important equipment.",
      ),
      attribution: "Third citation",
      role: "Walcheren, November 1944",
      tone: "sand",
    }),
    slice("text_media", {
      eyebrow: "Germany · 1945",
      title: "To the Baltic",
      body: rt(
        "**December 1944.** Back in Britain, the unit takes charge of the new volunteers fresh from Achnacarry, where they have earned their green beret. With these recruits it forms three troops, the 4th, 9th and 10th, and a headquarters, all under Georges Danloy, now a major.",
        "**April 1945.** The commandos reach Emsdetten in Germany and join the 1st Commando Brigade. They push on to the Baltic Sea, receive the surrender of several German units, capture Major Hellebaut, commander of the Walloon Legion, and meet the first survivors of the concentration camps. On 5 May the Belgian troops reach Lübeck, then the Baltic coast.",
        "**9 May 1945.** End of hostilities.",
        "**15 May 1945.** The 4th Troop of No. 10 (Inter-Allied) Commando, renamed the Independent Commando Unit in April 1945, takes the title of Commando Regiment.",
      ),
      image: images.curvimeter,
      caption: "The curvimeter of the commander of the Walloon Legion",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    nextChapter("second-world-war"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 4. The post-war period                                                     */
/* -------------------------------------------------------------------------- */

const postWar = document("page", "post-war-period", {
  title: "Home again",
  meta_title: "The return and the immediate post-war period",
  meta_description:
    "In 1945 the Belgian commandos came home to Marche-les-Dames and Namur. From 1950 they trained the Belgian volunteers for Korea.",
  meta_image: images.canoes,
  slices: [
    pageHero(
      "History · Chapter 4 · 1945–1951",
      "Home again",
      "In September 1945 the Belgian commandos came home, and settled on the cliffs of the Meuse at Marche-les-Dames.",
      images.canoes,
      "The post-war room of the museum",
    ),
    slice("text_media", {
      eyebrow: "September 1945",
      title: "Marche-les-Dames",
      body: rt(
        "After taking in the volunteers recruited at the liberation of Belgium, the Belgian commando unit returned home and moved to Marche-les-Dames. The regiment then comprised:",
        "- a training centre at the Citadel of Namur;",
        "- a commando training centre at Marche-les-Dames;",
        "- and later, a troop at Seilles.",
        "From 1950 the Commando Regiment was in charge of training: first the cadre of the Belgian battalion of volunteers for Korea, then the reinforcements sent out later, at the camp of Wartet.",
      ),
      image: images.postWarKit,
      caption: "Equipment of the Commando Training Centre",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    slice("timeline", {
      eyebrow: "1945–1951",
      title: "The first peacetime years",
      intro: [],
      events: [
        {
          year: "1945",
          title: "Back in Belgium",
          body: rt("The Commando Regiment returns in September and settles at Marche-les-Dames and the Citadel of Namur."),
          image: noImage,
          caption: "",
        },
        {
          year: "1946",
          title: "A standard",
          body: rt("The Commando Regiment receives its standard."),
          image: noImage,
          caption: "",
        },
        {
          year: "1947",
          title: "The Commando Training Centre",
          body: rt("The Commando Training Centre is officially created."),
          image: noImage,
          caption: "",
        },
        {
          year: "1950",
          title: "Korea",
          body: rt(
            "Many commandos volunteer for Korea. The regiment trains the officers, and later the reinforcements, of the Belgian Volunteer Corps for Korea.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1951",
          title: "One regiment",
          body: rt("Commandos and paratroopers are merged into the Para-Commando Regiment."),
          image: noImage,
          caption: "",
        },
      ],
    }),
    nextChapter("post-war-period"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 5. The Para-Commando Regiment                                              */
/* -------------------------------------------------------------------------- */

const regiment = document("page", "para-commando-regiment", {
  title: "The Para-Commando Regiment",
  meta_title: "Creation of the Para-Commando Regiment",
  meta_description:
    "On 3 November 1951, all Belgian commando and parachute units were merged into the Para-Commando Regiment under Lieutenant Colonel Georges Danloy.",
  meta_image: images.parachutes,
  slices: [
    pageHero(
      "History · Chapter 5 · 1951–1962",
      "The Para-Commando Regiment",
      "Green berets and red berets in one regiment: on 3 November 1951, the commandos and the paratroopers joined forces.",
      images.parachutes,
      "Parachutes and air-drop equipment, Commando Museum",
    ),
    slice("text_media", {
      eyebrow: "3 November 1951",
      title: "Commandos and paratroopers united",
      body: rt(
        "On 3 November 1951, all commando and parachute units were merged into a Para-Commando Regiment under Lieutenant Colonel Georges Danloy. It was made up of:",
        "- a headquarters (Citadel of Namur);",
        "- a commando battalion (two companies at Seilles, one at Wartet);",
        "- a parachute battalion (Leopoldsburg);",
        "- a training centre (Citadel of Namur);",
        "- a Para-Commando school company (Citadel of Namur);",
        "- a commando training centre (Marche-les-Dames);",
        "- a parachute training centre (Schaffen).",
      ),
      image: noImage,
      caption: "",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    slice("intro_statement", {
      eyebrow: "Missions",
      title: "",
      statement: rt("SAS and commando missions. **Elite infantry.** Amphibious and airborne operations."),
      body: rt(
        "The regiment's tasks also included guarding and defending vital points in the Belgian Congo. Amphibious operations were the commandos' speciality, airborne operations the paratroopers'.",
      ),
      facts: [],
    }),
    slice("timeline", {
      eyebrow: "1950–1962",
      title: "A regiment takes shape",
      intro: [],
      events: [
        {
          year: "1950",
          title: "Volunteers for Korea",
          body: rt(
            "On 2 October the Belgian-Luxembourg Volunteer Corps for Korea is formed. Commando instructors train it at Marche-les-Dames and Kaulille; the volunteers receive their brown beret at the end of training.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1953",
          title: "To the Congo",
          body: rt(
            "Detachments leave for the Belgian Congo: from 1953 to the base of Kamina (Katanga), from 1959 to Kitona (Lower Congo) and from 1960 to Rwanda-Urundi.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1954",
          title: "Commando and parachutist",
          body: rt(
            "On 1 February the Commando Training Centre becomes a unit in its own right, with Captain René Meunier as its first commanding officer. The 3rd Company of 2 Cdo, under Captain Joseph Delpierre, is the first unit of the regiment to earn both the commando and the parachute brevet. On 15 November an air-supply platoon is created at the parachute training centre.",
          ),
          image: images.c119,
          caption: "The moment of truth at the door of a C-119",
        },
        {
          year: "1955",
          title: "New homes",
          body: rt(
            "The 3rd Parachute Battalion is created, with the brown beret and badge of the Korea Corps, later the red beret. On 16 June the last volunteers return from Korea. The regimental headquarters moves to the Château d'Arenberg at Marche-les-Dames, 2 Cdo occupies the Terra Nova citadel in Namur, the training centre is disbanded and the Para-Commando school company moves to Wartet.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1958",
          title: "A new training centre",
          body: rt("Commandant Jean Militis begins a thorough overhaul of the Commando Training Centre."),
          image: noImage,
          caption: "",
        },
        {
          year: "1959",
          title: "A new parachute",
          body: rt(
            "The British Irvin Type X parachute is replaced by the French TAP-665, a more stable canopy of 65 m².",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1960",
          title: "Leaving the Congo",
          body: rt(
            "In January a Para-Commando medical centre opens at Marche-les-Dames; in 1962 it moves to the military hospital in Namur. In August the Para-Commando units leave the Congo, relieved by United Nations troops.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1962",
          title: "Flawinne",
          body: rt(
            "After the ESR company is officially formed in 1961, the 2nd Commando Battalion leaves the citadel in 1962 and moves into the Sous-Lieutenant Thibaut barracks in Flawinne.",
          ),
          image: noImage,
          caption: "",
        },
      ],
    }),
    nextChapter("para-commando-regiment"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 6. The African period                                                      */
/* -------------------------------------------------------------------------- */

type Detachment = [title: string, lines: string[]];

const detachments: Detachment[] = [
  [
    "1st detachment · one para and one commando company",
    [
      "- **Incorporation:** August 1952",
      "- **Departure from Antwerp on the TNA Kamina:** 9 November 1953",
      "- **Stay at Kamina:** 25 November 1953 – 4 June 1954",
      "- **Return to Antwerp on the TNA Kamina:** 26 October 1954",
    ],
  ],
  [
    "2nd detachment · one para and one commando company",
    [
      "- **Incorporation:** February 1953",
      "- **Departure from Antwerp on the TNA Kamina:** 3 May 1954",
      "- **Stay at Kamina:** end of May – October 1954",
      "- **Return to Antwerp on the TNA Kamina:** 26 October 1954",
    ],
  ],
  [
    "3rd detachment · one para and one commando company",
    [
      "- **Incorporation:** August 1953",
      "- **Departure from Ostend on the TNA Kamina:** 15 September 1954",
      "- **Stay at Kamina:** October 1954 – March 1955",
      "- **Return to Ostend on the TNA Kamina:** 8 April 1955",
    ],
  ],
  [
    "4th detachment · one para and one commando company",
    [
      "- **Incorporation:** February 1954",
      "- **Departure from Ostend on the TNA Kamina:** 28 February 1955",
      "- **Stay at Kamina:** 16 March – 3 September 1955",
      "- **Return to Ostend on the TNA Kamina:** 21 September 1955",
    ],
  ],
  [
    "5th detachment · one para and one commando company",
    [
      "- **Incorporation:** August 1954",
      "- **Departure from Antwerp on the TNA Kamina:** 12 August 1955",
      "- **Stay at Kamina, creation of the 3rd Para-Commando Battalion:** September 1955 – March 1956",
      "- **Return to Antwerp on the TNA Kamina:** 22 March 1956",
    ],
  ],
  [
    "7th detachment",
    [
      "- **Incorporation:** 1 August 1955",
      "- **Departure from Antwerp on the TNA Kamina:** 18 July 1956",
      "- **Stay at Kamina:** August 1956 – March 1957",
      "- **Return to Antwerp on the TNA Kamina:** 23 March 1957",
    ],
  ],
  [
    "9th detachment",
    [
      "- **Incorporation:** September 1956",
      "- **Departure from Ostend on the TNA Kamina:** 8 August 1957",
      "- **Stay at Kamina:** September – December 1957",
      "- **Return to Zeebrugge on the TNA Kamina:** 14 January 1958",
    ],
  ],
  [
    "11th detachment",
    [
      "- **Incorporation:** 4 November 1957",
      "- **Departure from Ostend on the TNA Kamina:** 2 July 1958",
      "- **Stay at Kamina:** July – December 1958",
      "- **Diverted via Lisbon on the TNA Kamina:** 10 January 1959",
      "- Flown back to Kamina after the riots of 4 January in Léopoldville",
      "- **Return to Melsbroek by air:** mid-February 1959",
    ],
  ],
  [
    "13th detachment",
    [
      "- **Incorporation:** July 1958",
      "- **Emergency departure to Léopoldville by Sabena:** 10 January 1959",
      "- **Stay in Léopoldville, then Kitona, forming the 4th Commando Battalion:** January – September 1959",
      "- **Return to Melsbroek by air:** September 1959",
    ],
  ],
  [
    "15th detachment",
    [
      "- **Incorporation:** May 1959",
      "- **Departure by air:** September 1959",
      "- **Stay at Kitona, then Rwanda (4 Commando):** September 1959 – August 1960",
      "- **Return to Melsbroek:** August 1960",
    ],
  ],
  [
    "17th detachment",
    [
      "- **Incorporation:** November 1959",
      "- **Advance departure by air:** 25 February – 15 March 1960",
      "- **Stay at Kamina, Kitona (forming 6 Commando), then Usumbura (Urundi):** May 1960 – January 1961",
      "- **Return to Melsbroek:** 10–15 January 1961",
    ],
  ],
  [
    "19th detachment",
    [
      "- **Incorporation:** June 1960",
      "- **Departure by air:** October 1960",
      "- **Stay at Usumbura, Urundi (6 Commando):** October – December 1960",
      "- **Stay in Rwanda (4 Commando):** January – July 1961",
      "- **Return to Melsbroek:** 6–12 July 1961",
    ],
  ],
  [
    "21st detachment",
    [
      "- **Incorporation:** December 1960",
      "- **Departure by air:** July 1961",
      "- **Stay in Rwanda (4 Commando):** July 1961 – February 1962",
      "- **Return to Melsbroek:** 8–16 February 1962",
    ],
  ],
  [
    "23rd detachment",
    [
      "- **Incorporation:** July 1961",
      "- **Departure by air:** February 1962",
      "- **Stay in Rwanda (4 Commando):** February – July 1962",
      "- **Return to Melsbroek:** 6–21 July 1962",
    ],
  ],
];

const africa = document("page", "african-period", {
  title: "The African period",
  meta_title: "1953–1962: the African period",
  meta_description:
    "From 1953 to 1962, Para-Commando detachments served at the bases of Kamina and Kitona in the Belgian Congo, and in Rwanda-Urundi. In 1960 they evacuated thousands of Europeans.",
  meta_image: images.congoMap,
  slices: [
    pageHero(
      "History · Chapter 6 · 1953–1962",
      "The African period",
      "For almost ten years, the battalions of the Para-Commando Regiment took turns in Central Africa: at Kamina and Kitona, and finally in the turmoil of independence.",
      images.congoMap,
      "Para-Commando deployments in Congo, 1960",
    ),
    slice("text_media", {
      eyebrow: "Kamina and Kitona",
      title: "Two bases in the Congo",
      body: rt(
        "In 1950 Belgium decided to build a military base in the Belgian Congo: outside the home country but under national control. It was to give Central Africa an infrastructure of international use under the Western defence agreements, and to let the Belgian army defend the overseas territories together with the Force Publique.",
        "The base of Kamina (BAKA) lies on the high plateaus of Katanga. In 1953 construction began on a second base, Kitona (BAKI), near the mouth of the Congo River.",
      ),
      image: noImage,
      caption: "",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    slice("timeline", {
      eyebrow: "1953–1962",
      title: "Detachment after detachment",
      intro: [],
      events: [
        {
          year: "1953",
          title: "The reconnaissance detachment",
          body: rt(
            "On 15 April 1953, a first group of 44 Para-Commandos (4 officers, 8 NCOs and 32 corporals and soldiers) sails from Zeebrugge on the Kamina, bound for the Belgian Congo. Its unique title is “Reconnaissance Detachment”. For six months, until its planned return on 1 December, it prepares Kamina for the detachments to come and tests the training programme designed for Africa.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1953",
          title: "The first major detachment",
          body: rt(
            "On 9 November, 330 Para-Commandos (a parachute company, a commando company and a recce platoon) embark at Antwerp for six months in the colony. They sail on the troopship TNA (Transport Naval Auxiliaire) Kamina (A957) to Moanda, from where an airlift takes them to the base. From then on, each battalion of the regiment takes its turn in Africa for about six months.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1955",
          title: "Taking turns",
          body: rt(
            "The first five detachments each consist of a para company, a commando company and a recce platoon. From 1955, when the 3rd Parachute Battalion is created, the detachments are formed alternately by the 1st Parachute Battalion and the 2nd Commando Battalion.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1959",
          title: "4 Commando at Kitona",
          body: rt("The newly created 4th Commando Battalion settles at the base of Kitona (BAKI)."),
          image: noImage,
          caption: "",
        },
        {
          year: "1962",
          title: "The return",
          body: rt(
            "After the operations to restore order and rescue civilians in the unrest around the independence of the Congo, Rwanda and Burundi (1959–1962), all Para-Commando units return to Belgium.",
          ),
          image: noImage,
          caption: "",
        },
      ],
    }),
    slice("faq", {
      eyebrow: "The detachments",
      title: "Detachments to Africa, 1953–1962",
      intro: rt("The dates of the detachments, as recorded by the museum."),
      items: detachments.map(([title, lines]) => ({ question: title, answer: rt(...lines) })),
    }),
    slice("text_media", {
      eyebrow: "Congo · 1960",
      title: "The operations of 1960",
      body: rt(
        "At independence, the metropolitan command (COMETRO) first called on the green and red beret units, some 3,000 Para-Commandos, to seize airfields, organise the repatriation of Europeans and disarm the Force Publique.",
        "Units were often relieved quickly by marching companies and sent elsewhere on new missions. In about eight days they restored calm across a large part of the Congo, and some 10,000 Europeans could be evacuated.",
        "Albertville, Ankoro, Bakwanga, Banana, Banningville, Boende, Boma, Bunia, Coquilhatville, Elisabethville, Gemena, Goma, Jadotville, Libenge, Luluabourg, Kabalo, Kaniama, Kibanguala, Kikwit, Kasongo, Kindu, Kongolo, Léopoldville, Lokandu, Lusangi, Manono, Nyunzu, Piana, Tshikapa.",
      ),
      image: images.congoMap,
      caption: "Para-Commando deployments in Congo, 1960",
      link: noLink,
      image_side: "left",
      tone: "dark",
    }),
    slice("text_media", {
      eyebrow: "1954–1994",
      title: "Military technical cooperation",
      body: rt(
        "On 1 January 1954, the 1st Congolese Commando Company of the Force Publique was formed at Matadi in the Lower Congo. Its first commander was Captain Noël Dedeken, a 1942 volunteer of the 4th Troop. A year later it moved to Thysville. Many officers and NCOs who were former commandos and SAS paratroopers served in it until independence in 1960; its last commander was Captain Jef De Keyser.",
        "In 1964 Belgium agreed to provide qualified staff for a commando training centre in Zaire, at Kota-Koli. From 1965, Lieutenant Gaston Bebronne and a team of Para-Commando instructors overcame many difficulties to build a camp there, with quarters, rope and obstacle courses, climbing routes and even an airstrip for the C-130, and wrote a training programme using the Ubangi valley. Commando training ran continuously from 1966 until 1990, when Belgium ended its military technical assistance to Zaire. Major Michel Van Emrik was the camp's last commander.",
        "In 1967 Belgium also agreed to set up a commando training centre in Rwanda, at Bigogwe, created by Captain Lucien Lochy and his Para-Commando instructors. The camp ran until 1994: its last commander, Major Willy Biot, and his instructors left Rwanda during the events of April 1994.",
      ),
      image: images.instructorBadge,
      caption: "Badge of a Zairean commando instructor",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    nextChapter("african-period"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 7. From 1962 to today                                                      */
/* -------------------------------------------------------------------------- */

const today = document("page", "from-1962-to-today", {
  title: "From 1962 to today",
  meta_title: "From 1962 to today",
  meta_description:
    "NATO exercises, rescue missions from Stanleyville to Kigali, the Para-Commando Brigade and the Special Operations Regiment: the Belgian commandos since 1962.",
  meta_image: images.amf,
  slices: [
    pageHero(
      "History · Chapter 7 · 1962 to today",
      "From 1962 to today",
      "A rapid reaction force for NATO, and the unit Belgium sends when its citizens or its allies need help, from Stanleyville to Kabul.",
      images.amf,
      "Allied Command Europe Mobile Force exercise",
    ),
    slice("text_media", {
      eyebrow: "A rapid reaction unit",
      title: "The regiment turns to NATO",
      body: rt(
        "From 1962, the organisation, training and equipment of the Para-Commando Regiment were reoriented towards NATO missions, without giving up the character and physical training or the tactical and technical skills of the Para-Commando.",
        "Besides its own typical exercises, the 2nd Commando Battalion worked repeatedly with the Belgian 1st Corps in West Germany, and in national or combined manoeuvres with the Interior Forces. It received weapons, vehicles and equipment better suited to European theatres.",
        "To increase its operational strength, the Para-Commando Anti-Tank Company was created on 1 March 1963 in Flawinne, alongside the 2nd Commando Battalion. A Para-Commando Field Artillery Battery followed in 1974, and a Para-Commando Recce Squadron a year later.",
      ),
      image: noImage,
      caption: "",
      link: noLink,
      image_side: "right",
      tone: "light",
    }),
    slice("text_media", {
      eyebrow: "Allied Command Europe Mobile Force",
      title: "Exercises across Europe",
      body: rt(
        "To perfect their training, the regiment's units, and above all our commandos, trained in West Germany, England, Corsica and the south of France, and took part in many NATO exercises.",
        "Within the Allied Command Europe Mobile Force (AMF), the regiment learned allied operations and procedures and developed four essential qualities: versatility, speed of intervention, availability and effectiveness. Every year a battalion, and later the Para-Commando Field Artillery Battery, exercised in Greece, Turkey, Denmark or Italy.",
        "In 1982, HRH Prince Philippe served six months in the Para-Commando units and earned the green beret and the commando and parachute brevets. During his holidays in August 1983 he also earned his free-fall brevet at Schaffen.",
        "In 1983 the 2nd Commando Battalion became a French-speaking unit: the 15th Company of 3 Para joined the battalion and its 12th Company joined 3 Para. In 1984 the Para-Commando Medical Centre moved to Belgrade (Namur).",
      ),
      image: images.amf,
      caption: "Heavy lift during an AMF exercise",
      link: noLink,
      image_side: "left",
      tone: "sand",
    }),
    slice("timeline", {
      eyebrow: "Operations",
      title: "Wherever they were needed",
      intro: rt(
        "During these years the units of the regiment, and later the brigade, carried out many humanitarian missions in Africa, Asia and even Europe.",
      ),
      events: [
        {
          year: "1964",
          title: "Stanleyville · Red Dragon and Black Dragon",
          body: rt(
            "From 24 to 27 November, the 12th Company of the 2nd Commando Battalion (134 men: 7 officers, 18 NCOs and 109 corporals and soldiers) reinforces the 1st Parachute Battalion in the rescue of 2,375 hostages and ensures their safety.",
          ),
          image: images.stanleyville,
          caption: "Rescued civilians, November 1964",
        },
        {
          year: "1974",
          title: "Sahel, Niger",
          body: rt(
            "From 1973, the Para-Commando Regiment and the 15th Air Transport Wing drop 520 tonnes of food for nomads driven south by a terrible drought. Between August and September 1973 a detachment under Major L. Verstraeten delivers another 1,805 tonnes. In March 1974 a column of 18 vehicles with about thirty Para-Commandos of 3 Para carries 40 tonnes of food from Belgium, followed by detachments of 1 Para (Major R. Verbeke) and 2 Cdo (Major J. Célis).",
          ),
          image: images.sahel,
          caption: "The Sahel relief mission",
        },
        {
          year: "1978",
          title: "Kolwezi · Red Bean",
          body: rt(
            "In May, half of the 2nd Commando Battalion and the Para-Commando Anti-Tank Company take part in the humanitarian operation at Kolwezi, in Shaba (formerly Katanga), to help the European and Zairean population.",
          ),
          image: images.kolwezi,
          caption: "Kolwezi, May 1978",
        },
        {
          year: "1979",
          title: "Kitona · Green Apple",
          body: rt(
            "In February, the 2nd Commando Battalion under Lieutenant Colonel De Clerck is sent to Zaire to train units of the Zairean Armed Forces for six weeks at the camp of Kitona.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1987",
          title: "Persian Gulf · Octopus",
          body: rt(
            "From September 1987, a two-man Milan anti-tank team of the Para-Commando Anti-Tank Company (an NCO and a volunteer) serves aboard a ship of the Belgian Navy in the Gulf.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1990",
          title: "Kigali · Green Bean",
          body: rt(
            "In November, under Lieutenant Colonel Van de Weghe, the whole 2nd Commando Battalion protects the evacuation of expatriates from Rwanda.",
          ),
          image: images.greenBean,
          caption: "Kigali, 1990",
        },
        {
          year: "1991",
          title: "Iraq and Zaire · Blue Lodge and Blue Beam",
          body: rt(
            "From 23 May to 28 June, Para-Commandos take part in Operation Provide Comfort, set up by the United States in northern Iraq. From 24 September to 4 November, the Anti-Tank Company secures Kinshasa, Moanda, Boma, Matadi and Kikwit, while the 16th Company of 2 Cdo (120 men) waits in Libreville, Gabon, from 28 October to 22 November, ready to be dropped into Zaire if needed.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1993",
          title: "Brazzaville · Sunny Winter",
          body: rt(
            "From 20 January to 24 February, the Anti-Tank Company stands by in Brazzaville to help evacuate Belgians from Zaire, then serves a week as rear guard.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1993",
          title: "Somalia · Restore Hope and UNOSOM II",
          body: rt(
            "From April to August, the 2nd Commando Battalion and the Para-Commando Battery take over from 1 Para. They are the first units of the brigade to wear the UN blue beret. From August to December the Anti-Tank Company, converted to CVRT reconnaissance vehicles, reinforces 3 Para, together with a jeep reconnaissance platoon.",
          ),
          image: images.somalia,
          caption: "Somalia, 1993",
        },
        {
          year: "1994",
          title: "Kigali · UNAMIR and Silver Back",
          body: rt(
            "From 20 March to 21 April, under Lieutenant Colonel Dewez, the whole battalion serves again as UN blue berets in Rwanda. The mission ends early after ten commandos are murdered on 7 April. Despite the shock, the battalion keeps its head and plays an essential role in the evacuation of expatriates, Operation Silver Back, with the Para-Commando Artillery Battery and Anti-Tank Company.",
          ),
          image: images.unamir,
          caption: "Camp Kigali and the UNAMIR mission, 1994",
        },
        {
          year: "1997",
          title: "Brazzaville · Green Stream",
          body: rt(
            "From 19 April to 1 June, the whole battalion helps evacuate expatriates from Congo-Brazzaville (Pointe-Noire) during the transfer of power from Mobutu to Kabila.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1999",
          title: "Albania · Allied Harbour",
          body: rt(
            "From 17 April to 21 July, the battalion leads the Belgian contingent of 594 soldiers near the port of Durrës, with missions towards the Kosovo border at Kukës. In July, under Lieutenant Colonel Lattaque, it is the first Belgian unit to enter Kosovo.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "2002",
          title: "Kosovo",
          body: rt(
            "From 25 November 2002 to 3 April 2003, under Lieutenant Colonel A. Maes, the battalion forms battle group BELUKROKO XI at Leposavić, working with the UN mission and its police.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "2004",
          title: "Democratic Republic of the Congo",
          body: rt(
            "From 30 January to 21 June, under Lieutenant Colonel P. Laureys, the battalion trains the 1st Congolese Brigade (three battalions) in peace support operations, as part of the rebuilding of the Congolese armed forces.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "2005",
          title: "Afghanistan · ISAF",
          body: rt(
            "From November 2004 to February 2005, 25 men of the battalion reinforce 1 Para during the elections. From March to early July 2008, under Major Xavier van de Werve, the battalion provides most of the force protecting Kabul airport (ISAF 16).",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "2009",
          title: "Lebanon · BELUFIL 10",
          body: rt(
            "From mid-October 2009 to the end of February 2010, the 16th Company provides security for the Belgian UN contingent at Tibnin.",
          ),
          image: noImage,
          caption: "",
        },
      ],
    }),
    slice("timeline", {
      eyebrow: "Organisation",
      title: "From regiment to Special Operations Regiment",
      intro: [],
      events: [
        {
          year: "1991",
          title: "The Para-Commando Brigade",
          body: rt(
            "The regiment becomes a brigade: a headquarters and HQ company; three battalions (1 Para, 2 Cdo, 3 Para) of three companies; the Para-Commando Field Artillery Battery; new support units (14th Engineer Company, 16th Medical Company, 35th Anti-Aircraft Battery and 210th Logistics Company); the 3rd Parachute Lancers, the new name of the recce squadron; and the two training centres.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "1994",
          title: "3rd Parachute Lancers",
          body: rt(
            "Merged with the Para-Commando Anti-Tank Company, the 3rd Parachute Lancers become a regiment: the brigade's fourth battalion, based in Flawinne. In the 1990s the brigade carries out more humanitarian operations than in any decade before.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "2002",
          title: "Restructuring",
          body: rt(
            "A series of reorganisations disbands the 14th Engineer Company, the 35th Anti-Aircraft Battery, the 16th Medical Company and the 210th Logistics Company.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "2004",
          title: "Immediate Reaction Capability",
          body: rt(
            "The brigade becomes the IRC Para-Commando: an operational headquarters, three battalions (1 Para, 2 Cdo, 3 Para) and the two training centres, with support when needed from Para-Commando elements of the field artillery battery (now with 2 A), the engineers, the 20th Logistics Battalion and the 6th CIS Group.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "2010",
          title: "Farewell to 1 Para",
          body: rt(
            "After a transformation plan of the Chief of Defence launched in 2008, the Special Forces Group (1 June) and 12/13 Li (1 July) come under the IRC. On 27 August, after 1 Para is disbanded, a Farewell Day is held in the city of Diest.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "2011",
          title: "The Para-Commando Light Brigade",
          body: rt(
            "Created on 3 January: a command and control element (Marche-en-Famenne), three battalions (12/13 Li in Spa, the 2nd Commando Battalion in Flawinne and 3 Para in Tielen), the Special Forces Group (Heverlee) and the two training centres, with Para-Commando artillery, engineer, medical and logistics support when needed.",
          ),
          image: noImage,
          caption: "",
        },
        {
          year: "2018",
          title: "The Special Operations Regiment",
          body: rt(
            "On 7 March, the Light Brigade becomes the Special Operations Regiment, a pillar of the Land Component answering a changing world and growing threats. It has a headquarters and the Special Forces Group in Heverlee; the 2nd Commando Battalion (Flawinne) and 3 Para (Tielen), which form the combat and rapid reaction units for NATO, Belgium and humanitarian missions and support the Special Forces Group; the commando (Marche-les-Dames) and parachute (Schaffen) training centres; and the 6th CIS Group with its Para-Commando capability.",
          ),
          image: images.homeland,
          caption: "Commandos of the 2nd Commando Battalion in Brussels",
        },
      ],
    }),
    nextChapter("from-1962-to-today"),
  ],
});

/* -------------------------------------------------------------------------- */
/* 8. In memoriam                                                             */
/* -------------------------------------------------------------------------- */

const inOperations: [heading: string, names: string[]][] = [
  [
    "Italy · 1943–1944",
    [
      "1. Corporal **MAIRESSE M.** · 20 December 1943 · San Pietro Avellana",
      "1. Lieutenant **DETON A.** · 3 January 1944 · Montenero",
    ],
  ],
  [
    "Walcheren · 1944",
    ["1. Lieutenant **MENY A.** · 6 November 1944", "1. Corporal **DIVE F.** · 6 November 1944"],
  ],
  [
    "Korea · 1951–1953",
    [
      "1. Lieutenant **BEAUPREZ P.** · 18 March 1951 · Tchu-Done",
      "1. Commando **CORNETTE R.** · 23 April 1951 · Imjin",
      "1. Sergeant **SCHOUTERDEN C.** · 11 October 1951 · Haktang-Ni",
      "1. Commando **GOBERT G.** · 12 November 1951 · Kandon",
      "1. Captain **LOQUET J.** · 26 September 1952 · Kojakol",
      "1. Commando **DEMOL O.** · 8 April 1953 · Chatkol",
      "1. Commando **THOMAS R.** · 2 May 1953 · Handong-Ni",
    ],
  ],
  [
    "Congo · 1960–1961",
    [
      "1. Commando **HOSSELET R.** · 19 July 1960 · Bunia",
      "1. Commando **SOSNOWSKI J.** · 20 July 1960 · Bunia",
      "1. Commando **DELAHAUT D.** · 27 July 1960 · Bunia",
      "1. Commando **RENARD J-C.** · 13 January 1961 · Kisenyi",
      "1. Adjudant **BUYSCHAERT R.** · 31 January 1961 · Katanga",
      "1. Adjudant **PEETERS L.** · 8 April 1961 · Kabolo",
    ],
  ],
  ["Zaire · 1978", ["1. Commando **DIGIARO G.** · 25 May 1978 · Kolwezi"]],
  ["Bosnia and Herzegovina · 1992", ["1. Commandant **BORREY B.** · 2 May 1992 · Cula"]],
  [
    "Rwanda · 7 April 1994",
    [
      "1. Corporal **BASSINNE B.**",
      "1. Corporal **DEBATTY A.**",
      "1. Corporal **DUPONT CH.**",
      "1. First Sergeant **LEROY Y.**",
      "1. Corporal **LHOIR S.**",
      "1. Lieutenant **LOTIN TH.**",
      "1. Corporal **MEAUX B.**",
      "1. Corporal **PLESCIA L.**",
      "1. Corporal **RENWA CH.**",
      "1. Corporal **UYTTEBROECK M.**",
    ],
  ],
];

const onDuty = [
  "1. Commando **BOULET P.** · 20-03-1943",
  "1. Corporal **DUFOUR G.** · 09-09-1946",
  "1. Corporal **GIGNIEZ L.** · 06-06-1947",
  "1. Sergeant **HANSE J.** · 06-06-1947",
  "1. Corporal **VANDENBERGEN L.** · 26-08-1952",
  "1. Commando **MAHIEU M.** · 27-02-1953",
  "1. Lieutenant **PETRY J.** · 07-11-1953",
  "1. Corporal **VAN NOORWEGE H.** · 08-11-1955",
  "1. Commando **DAVID**",
  "1. Commando **MAES T.** · 26-04-1956",
  "1. Commando **DELVAUX**",
  "1. Commando **DRUART E.** · 27-10-1956",
  "1. Commando **MILO E.** · 07-07-1956",
  "1. Corporal **BOCKSTAEL S.** · 06-09-1956",
  "1. Commando **DEWILDE J.** · 12-02-1957",
  "1. Commando **HOREMANS L.** · 12-02-1957",
  "1. Second Lieutenant **LARUELLE P.** · 12-02-1957",
  "1. Commando **GEELEN R.** · 21-05-1960",
  "1. Commando **GERAETS P.** · 23-07-1960",
  "1. Commando **LECUIVRE C.** · 06-10-1960",
  "1. Commando **WESTHOF P.** · 13-12-1960",
  "1. Commando **DOCQUIER J.** · 16-04-1961",
  "1. Lieutenant **DEMOOR G.** · 09-11-1963",
  "1. Corporal **NICOLAY I.** · 30-11-1963",
  "1. Commando **DEHAN M.** · 30-11-1963",
  "1. Commando **LYNA J.** · 21-07-1964",
  "1. Sergeant **MACHARIS** · 15-12-1966",
  "1. Sergeant **DENUIT M.** · 07-07-1968",
  "1. Commando **D'HONDT M.** · 29-09-1968",
  "1. Corporal **SEYNAEVE G.** · 26-04-1969",
  "1. Commando **WYART M.** · 10-11-1969",
  "1. Commando **DIGIARO G.** · 25-05-1978",
  "1. Commando **HUBERLAND JM.** · 19-10-1979",
  "1. Commando **LOPEZ L.** · 06-12-1979",
  "1. Commando **DE NIL H.** · 07-10-1980",
  "1. Corporal **DEWAELE H.** · 26-04-1984",
  "1. Commando **JEUNEHOMME D.** · 26-04-1984",
  "1. First Sergeant-Major **MARROY J.** · 28-04-1988",
  "1. Commando **WILKET J.** · 17-12-1989",
  "1. Caporal-Chef **BOUSSINGAULT E.** · 03-06-1995",
  "1. 1st Caporal-Chef **LARBOUILLAT C.** · 06-07-1997",
  "1. Private First Class **TRAIANIS D.** · 27-02-2018",
];

const memoriam = document("page", "in-memoriam", {
  title: "In memoriam",
  meta_title: "In memoriam: commandos who died in operations and on duty",
  meta_description:
    "The names of the Belgian commandos who died in operations, from Italy in 1943 to Kigali in 1994, and of those who died on duty.",
  meta_image: images.tenCommandos,
  slices: [
    pageHero(
      "History · Chapter 8",
      "In memoriam",
      "From the mountains of Italy to Kigali: the commandos who did not come home, and those who died on duty. Their names are also kept in the museum's room of honour.",
      images.kigaliMemorial,
      "The memorial to the ten commandos of Kigali in the museum",
    ),
    ...inOperations.map(([heading, names], i) =>
      slice("rich_text", {
        eyebrow: i === 0 ? "Died in operations" : "",
        title: heading,
        body: rt(...names),
      }),
    ),
    slice("text_media", {
      eyebrow: "Kigali · 7 April 1994",
      title: "The ten of the mortar platoon",
      body: rt(
        "In March 1994 the 2nd Commando Battalion relieved the 1st Parachute Battalion in Rwanda for the UN mission UNAMIR. On 7 April, ten commandos of the mortar platoon were murdered by soldiers of the Rwandan army.",
        "A memorial to them stands in the museum. Every April, a ceremony at the Camp Kigali memorial pays tribute to the Belgian victims.",
      ),
      image: images.tenCommandos,
      caption: "The ten commandos killed in Kigali",
      link: doc("page", "album-kigali-2017", "Kigali, 11 April 2017"),
      image_side: "right",
      tone: "dark",
    }),
    slice("rich_text", {
      eyebrow: "Died on duty",
      title: "Commandos who died on duty",
      body: rt(...onDuty),
    }),
    slice("cta_banner", {
      eyebrow: "The room of honour",
      title: "Their names in the museum",
      body: rt(
        "The room of honour keeps the names of the commandos who died in operations or on duty, beside the badges of every commando unit.",
      ),
      image: noImage,
      primary_link: doc("page", "virtual-tour", "Take the virtual tour"),
      secondary_link: doc("page", "history", "All chapters"),
    }),
  ],
});

export const historyDocuments = [history, origin, creation, ww2, postWar, regiment, africa, today, memoriam];
