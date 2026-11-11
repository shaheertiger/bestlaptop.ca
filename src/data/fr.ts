// French-Canadian (fr-CA) mirror of the key best lists, served at /fr/{slug}.
//
// Targets the Quebec / francophone long tail from the Semrush CA export
// ("ordinateur portable" 12.1K/mo at KD 35, the "pas cher" cluster ~5.9K at KD ~26),
// which is far less competitive than the English head terms. Each page reuses the
// English list's ranking (same filter + sort) so numbers always agree, with
// translated slugs, French copy and reciprocal hreflang.

export interface FrenchList {
  slug: string; // translated slug under /fr/
  enSlug: string; // matching /laptop/reviews/best/{enSlug}
  title: string; // <title>
  h1: string;
  nav: string; // short label for hubs / links
  subject: string; // phrase used in "Le meilleur {subject} est…"
  intro: string;
  sections?: { heading: string; body: string[] }[];
  faq?: { q: string; a: string }[];
}

export const frenchLists: FrenchList[] = [
  {
    slug: "ordinateur-portable-pas-cher",
    enSlug: "budget",
    title: "Meilleur ordinateur portable pas cher au Canada (2026) : nos choix testés",
    h1: "Les meilleurs ordinateurs portables pas chers au Canada (2026)",
    nav: "Pas cher",
    subject: "ordinateur portable pas cher",
    intro: "Un bon ordinateur portable pas cher doit rester rapide pendant des années pour la navigation, les documents, le streaming et les appels vidéo. Nous avons classé les modèles abordables que nous avons testés selon leur note globale et leur rapport qualité-prix, avec les prix canadiens.",
    sections: [
      {
        heading: "Quel est le meilleur ordinateur portable pas cher en 2026 ?",
        body: [
          "L'Acer Swift Go 14 est le meilleur rapport qualité-prix que nous avons testé : écran OLED, 16 Go de mémoire vive et 13,8 heures d'autonomie pour moins de 1 000 $. Sous 500 $, l'Acer Chromebook Plus 514 a tenu 16,2 heures dans notre test d'autonomie.",
        ],
      },
      {
        heading: "Que faut-il éviter dans un portable pas cher ?",
        body: [
          "Évitez les portables Windows avec 8 Go de mémoire vive, un stockage eMMC ou un écran 1366 × 768 : ils deviennent lents en moins d'un an. Un Chromebook avec 8 Go reste correct, car ChromeOS est plus léger.",
        ],
      },
    ],
    faq: [
      { q: "Quel est un bon ordinateur portable pas cher au Canada ?", a: "Sous 500 $, un Chromebook Plus. Autour de 750 $, l'Acer Aspire 5 sous Windows. Sous 1 000 $, l'Acer Swift Go 14, avec écran OLED et une autonomie d'une journée complète." },
      { q: "Quand acheter un ordinateur portable au meilleur prix au Canada ?", a: "Le Vendredi fou (Black Friday), le Boxing Day et la rentrée scolaire (juillet à septembre) offrent les plus gros rabais, souvent de 100 $ à 300 $." },
    ],
  },
  {
    slug: "ordinateur-portable-gamer",
    enSlug: "gaming",
    title: "Meilleur ordinateur portable gamer au Canada (2026) : classé par FPS réels",
    h1: "Les meilleurs ordinateurs portables gamer au Canada (2026)",
    nav: "Gamer",
    subject: "ordinateur portable gamer",
    intro: "Nous classons les portables de jeu selon leurs images par seconde mesurées en 1080p (réglages élevés) dans notre suite de jeux, puis selon la chauffe, l'écran et le prix canadien.",
    sections: [
      {
        heading: "Quelle carte graphique choisir pour jouer en 1080p ou 1440p ?",
        body: [
          "Une RTX 4060 ou RTX 5060 suffit pour la plupart des jeux en 1080p au-dessus de 60 images par seconde. Pour le 1440p ou un écran de 165 Hz et plus, visez une RTX 4070/5070 ou mieux. La puissance (en watts) de la carte compte autant que son nom.",
        ],
      },
    ],
    faq: [
      { q: "Combien coûte un bon portable gamer au Canada ?", a: "Comptez de 1 200 $ à 1 600 $ pour un modèle RTX 4060 qui fait tourner les jeux récents en 1080p, et de 2 300 $ à 3 300 $ pour une RTX 4070, 4080 ou 5070." },
      { q: "Les portables gamer ont-ils une bonne autonomie ?", a: "Rarement. Nos portables de jeu ont tenu de 6 à 9 heures en navigation web, et beaucoup moins en jouant. Prévoyez de jouer branché." },
    ],
  },
  {
    slug: "ordinateur-portable-gamer-pas-cher",
    enSlug: "budget-gaming",
    title: "Meilleur portable gamer pas cher au Canada (2026) : le plus de FPS par dollar",
    h1: "Les meilleurs portables gamer pas chers au Canada (2026)",
    nav: "Gamer pas cher",
    subject: "portable gamer pas cher",
    intro: "Ce classement divise nos images par seconde mesurées en 1080p par le prix canadien le plus bas : il récompense les portables qui jouent bien pour leur prix, pas seulement les plus rapides.",
    faq: [
      { q: "Quel est le portable gamer le moins cher qui vaut la peine ?", a: "Dans nos tests, l'ASUS TUF Gaming A15 (environ 1 299 $) offre le plus d'images par dollar : 104 FPS en moyenne en 1080p avec une RTX 4060." },
    ],
  },
  {
    slug: "ordinateur-portable-etudiant",
    enSlug: "student",
    title: "Meilleur ordinateur portable pour étudiant au Canada (2026), testé",
    h1: "Les meilleurs ordinateurs portables pour étudiants au Canada (2026)",
    nav: "Étudiants",
    subject: "ordinateur portable pour étudiant",
    intro: "Le portable idéal pour le cégep ou l'université tient une journée de cours sur une charge, pèse moins de 1,5 kg et a 16 Go de mémoire vive. Nous l'avons vérifié avec nos propres tests d'autonomie.",
    sections: [
      {
        heading: "MacBook, Windows ou Chromebook pour les études ?",
        body: [
          "Vérifiez d'abord votre programme : le génie, l'architecture et certains cours de gestion exigent des logiciels Windows. Les étudiants en arts, sciences humaines et sciences générales sont bien servis par un MacBook Air. Un Chromebook convient au secondaire et aux cours entièrement en ligne.",
        ],
      },
    ],
    faq: [
      { q: "Combien un étudiant devrait-il dépenser pour un portable ?", a: "La plupart des étudiants canadiens devraient prévoir de 700 $ à 1 400 $. Ce budget donne 16 Go de mémoire vive, un SSD et une autonomie d'une journée." },
      { q: "Un Chromebook suffit-il pour l'université ?", a: "Pour la rédaction, la recherche et les applications web, oui. Pour les logiciels Windows ou macOS (CAO, statistiques, Adobe), non. Vérifiez votre liste de cours." },
    ],
  },
  {
    slug: "ordinateur-portable-tactile",
    enSlug: "touchscreen",
    title: "Meilleur ordinateur portable tactile au Canada (2026), testé",
    h1: "Les meilleurs ordinateurs portables à écran tactile au Canada (2026)",
    nav: "Écran tactile",
    subject: "ordinateur portable tactile",
    intro: "Voici les meilleurs portables à écran tactile que nous avons testés, des modèles classiques aux convertibles 2 en 1, classés selon notre note globale.",
    faq: [
      { q: "Les MacBook ont-ils un écran tactile ?", a: "Non. Aucun MacBook n'a d'écran tactile en 2026. Chez Apple, l'alternative est un iPad avec clavier." },
      { q: "Un écran tactile réduit-il l'autonomie ?", a: "Légèrement. La couche tactile consomme un peu, mais la Surface Laptop 7 a tout de même tenu 16 heures dans notre test." },
    ],
  },
  {
    slug: "ordinateur-portable-2-en-1",
    enSlug: "2-in-1",
    title: "Meilleur ordinateur portable 2 en 1 au Canada (2026), testé",
    h1: "Les meilleurs ordinateurs portables 2 en 1 au Canada (2026)",
    nav: "2 en 1",
    subject: "ordinateur portable 2 en 1",
    intro: "Un bon 2 en 1 doit être aussi agréable en mode portable qu'en mode tablette. Nous avons testé la charnière, l'écran tactile, le stylet et l'autonomie.",
  },
  {
    slug: "petit-ordinateur-portable",
    enSlug: "lightweight",
    title: "Meilleur petit ordinateur portable léger au Canada (2026) : moins de 1,3 kg",
    h1: "Les meilleurs petits ordinateurs portables légers (2026)",
    nav: "Petit et léger",
    subject: "petit ordinateur portable léger",
    intro: "Chaque portable de cette liste pèse 1,3 kg ou moins sur notre balance, classé du plus léger au plus lourd, sans sacrifier l'autonomie ni le clavier.",
    faq: [
      { q: "Quel est le portable le plus léger qui vaut la peine ?", a: "Le Lenovo ThinkPad X1 Carbon Gen 12, à 1,09 kg, est le plus léger que nous avons testé, et il a aussi le meilleur clavier de notre labo." },
    ],
  },
  {
    slug: "ordinateur-portable-pour-la-maison",
    enSlug: "home-use",
    title: "Meilleur ordinateur portable pour la maison au Canada (2026)",
    h1: "Les meilleurs ordinateurs portables pour la maison et la famille (2026)",
    nav: "Pour la maison",
    subject: "ordinateur portable pour la maison",
    intro: "Un portable pour la maison doit gérer la navigation, les courriels, le streaming, les photos et les appels vidéo pendant des années, sans coûter une fortune. Classement selon la note globale et le rapport qualité-prix, sous 1 700 $.",
    faq: [
      { q: "Combien dépenser pour un portable à la maison ?", a: "De 500 $ à 1 000 $ suffit pour un usage quotidien. Sous 500 $, un Chromebook est le meilleur choix ; de 750 $ à 950 $, un bon portable Windows avec 16 Go." },
    ],
  },
  {
    slug: "ordinateur-portable-montage-video",
    enSlug: "video-editing",
    title: "Meilleur portable pour le montage vidéo (2026) : classé par temps d'export 4K",
    h1: "Les meilleurs ordinateurs portables pour le montage vidéo (2026)",
    nav: "Montage vidéo",
    subject: "ordinateur portable pour le montage vidéo",
    intro: "Ce classement suit le temps d'exportation de notre montage 4K de 10 minutes : l'ordre reflète la vitesse réelle de montage, pas la fiche technique.",
    sections: [
      {
        heading: "Quelle configuration pour le montage vidéo 4K ?",
        body: [
          "Pour le 4K : 32 Go de mémoire vive (ou 24 Go et plus de mémoire unifiée sur Mac), une carte NVIDIA RTX ou une puce Apple M4 Pro/Max, un SSD de 1 To et plus, et un écran couvrant au moins 95 % du DCI-P3.",
        ],
      },
    ],
    faq: [
      { q: "Quel est le meilleur portable pour le montage vidéo ?", a: "Le MacBook Pro 14 (M4 Pro) a exporté notre montage 4K en 2,6 minutes, le résultat le plus rapide de notre labo, avec 16,8 heures d'autonomie." },
    ],
  },
  {
    slug: "ordinateur-portable-longue-autonomie",
    enSlug: "long-battery-life",
    title: "Ordinateurs portables avec la meilleure autonomie (2026) : jusqu'à 18 h, testés",
    h1: "Les ordinateurs portables avec la meilleure autonomie (2026)",
    nav: "Meilleure autonomie",
    subject: "ordinateur portable pour l'autonomie de la batterie",
    intro: "Classement selon notre test d'autonomie en navigation web à 150 nits, mesuré dans notre labo et non tiré des promesses des fabricants.",
    faq: [
      { q: "Quel portable a la plus longue autonomie ?", a: "Le MacBook Air 15 (M4) a tenu 18,4 heures dans notre test de navigation web. Côté Windows, la Surface Laptop 7 a tenu 16 heures." },
    ],
  },
  {
    slug: "ordinateur-portable-windows-11",
    enSlug: "windows",
    title: "Meilleur ordinateur portable Windows 11 au Canada (2026), testé",
    h1: "Les meilleurs ordinateurs portables Windows 11 au Canada (2026)",
    nav: "Windows 11",
    subject: "ordinateur portable Windows 11",
    intro: "Les meilleurs portables Windows 11 que nous avons testés, des ultraportables aux machines de jeu, classés selon notre note globale avec les prix canadiens.",
  },
  {
    slug: "ordinateur-portable-moins-de-500",
    enSlug: "under-500",
    title: "Meilleur ordinateur portable à moins de 500 $ au Canada (2026)",
    h1: "Les meilleurs ordinateurs portables à moins de 500 $ (2026)",
    nav: "Moins de 500 $",
    subject: "ordinateur portable à moins de 500 $",
    intro: "Sous 500 $, visez une machine fiable pour la navigation, les documents et le streaming. Voici les modèles qui tiennent le mieux la route à ce prix.",
  },
  {
    slug: "ordinateur-portable-moins-de-1000",
    enSlug: "under-1000",
    title: "Meilleur ordinateur portable à moins de 1 000 $ au Canada (2026)",
    h1: "Les meilleurs ordinateurs portables à moins de 1 000 $ (2026)",
    nav: "Moins de 1 000 $",
    subject: "ordinateur portable à moins de 1 000 $",
    intro: "Sous 1 000 $, on trouve un portable vraiment bon pour tous les jours, avec de bonnes performances et une excellente autonomie.",
  },
  {
    slug: "meilleur-macbook",
    enSlug: "macbook",
    title: "Meilleur MacBook au Canada (2026) : lequel acheter ?",
    h1: "Les meilleurs MacBook au Canada (2026)",
    nav: "MacBook",
    subject: "MacBook",
    intro: "La gamme MacBook est courte mais solide. Nous avons testé les performances, l'autonomie et l'écran de chaque modèle pour vous aider à choisir.",
  },
  {
    slug: "meilleur-chromebook",
    enSlug: "chromebook",
    title: "Meilleur Chromebook au Canada (2026), testé",
    h1: "Les meilleurs Chromebook au Canada (2026)",
    nav: "Chromebook",
    subject: "Chromebook",
    intro: "Un bon Chromebook est rapide pour le web, a une longue autonomie et reste abordable. Nous avons testé les performances, l'autonomie et la fabrication.",
  },
];

export const frHub = {
  title: "Meilleur ordinateur portable au Canada (2026) : tests, prix et comparatifs",
  h1: "Les meilleurs ordinateurs portables au Canada (2026)",
  intro:
    "BestLaptop.ca teste les ordinateurs portables en laboratoire et les classe selon l'autonomie mesurée, la performance réelle et le prix en dollars canadiens. Trouvez le meilleur portable pour votre budget et votre usage.",
  sections: [
    {
      heading: "Comment choisir un ordinateur portable en 2026 ?",
      body: [
        "Pour la plupart des gens, le bon choix est un portable de 13 à 15 pouces avec une puce efficace (Apple M4, Intel Core Ultra, Snapdragon X ou AMD Ryzen AI), 16 Go de mémoire vive, un SSD de 512 Go et au moins 12 heures d'autonomie réelle.",
        "Ajoutez une carte graphique dédiée seulement si vous jouez ou faites du montage vidéo ou de la 3D.",
      ],
    },
    {
      heading: "Quel est le meilleur rapport qualité-prix ?",
      body: [
        "L'Acer Swift Go 14 offre le meilleur rapport qualité-prix que nous avons mesuré : écran OLED, 16 Go et 13,8 heures d'autonomie pour moins de 1 000 $. Sous 500 $, les Chromebook Plus sont les seuls portables qui restent vraiment rapides.",
      ],
    },
    {
      heading: "Combien coûte un bon ordinateur portable au Canada ?",
      body: [
        "De 900 $ à 1 500 $ offre le meilleur équilibre entre vitesse, écran et autonomie. Sous 700 $, attendez-vous à des compromis sur l'écran et la fabrication ; au-delà de 2 000 $, vous payez une carte graphique dédiée, des matériaux haut de gamme ou un écran professionnel.",
      ],
    },
  ],
  faq: [
    { q: "Quelle est la meilleure marque d'ordinateur portable ?", a: "Apple, Lenovo et ASUS obtiennent les meilleures notes dans nos tests. Apple domine pour l'autonomie, Lenovo ThinkPad pour le clavier et ASUS pour le rapport qualité-prix." },
    { q: "16 Go de mémoire vive suffisent-ils en 2026 ?", a: "Oui, pour la plupart des gens, y compris les étudiants et le travail de bureau. Prenez 32 Go pour le montage vidéo ou le multitâche intensif." },
    { q: "Mac ou PC portable Windows ?", a: "Le Mac l'emporte pour l'autonomie et la fabrication ; Windows pour le choix, le jeu et les prix d'entrée plus bas. Choisissez selon les logiciels que vous utilisez." },
    { q: "Les prix sont-ils en dollars canadiens ?", a: "Oui. Tous les prix sont en dollars canadiens, relevés chez les grands détaillants canadiens, et peuvent changer." },
  ],
};

export const frByEnSlug = (enSlug: string) => frenchLists.find((f) => f.enSlug === enSlug);
export const getFrenchList = (slug: string) => frenchLists.find((f) => f.slug === slug);

export const formatCADfr = (n: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);
export const frNum = (n: number) => n.toLocaleString("fr-CA");
