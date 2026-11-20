import type { Project, Service, TeamMember, Testimonial } from "../lib/types";

export const SITE = {
  name: "MN Consulting Engineering",
  legalName: "MN Consulting Engineering SARLU",
  url: "https://www.mnconsulting.cg",
  tagline: "Bureau d'études · Architecture · Génie civil",
  description:
    "Bureau d'études techniques et d'ingénierie basé à Mougali, Brazzaville. Architecture, structures, maîtrise d'œuvre, contrôle des travaux et expertises immobilières.",
  email: "mnconsulting.e@gmail.com",
  phone: "+242 06 979 17 36",
  phoneHref: "+242069791736",
  secondaryPhone: "+242 05 556 61 00",
  whatsapp: "https://wa.me/242069791736",
  address: "1811, Avenue Loutassi; Mougali",
  city: "Brazzaville",
  country: "République du Congo",
  hours: "Lundi – Vendredi, 8h00 – 17h00",
  founded: 2013,
  rccm: "CG-BZV-01-2013-B13-00413",
  capital: "1 000 000 FCFA",
  orderRegistration: "16",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=1811%20Avenue%20Loutassi%2C%20Mougali%2C%20Brazzaville",
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
  },
};

export const STATS = [
  { value: 2013, suffix: "", label: "année de création" },
  { value: 20, suffix: "+", label: "ans d'expérience cumulée" },
  { value: 16, suffix: "", label: "inscription à l'Ordre des ingénieurs" },
  { value: 3, suffix: "", label: "villes du projet MOSALA" },
];

export const CLIENTS = [
  "Université Marien-Ngouabi",
  "Banque Commerciale Internationale",
  "Fonds de Développement du Secteur de l'Eau",
  "Agence Française de Développement · projet AMES",
  "Ministère de la Santé et de la Population",
  "Banque mondiale · programmes sanitaires",
  "Programme MOSALA",
  "Banque Congolaise de l'Habitat",
];

export const VALUES = [
  {
    icon: "Ruler",
    title: "Exigence de qualité",
    description:
      "Le contrôle interne des études et des documents contribue à la qualité et à la fiabilité des livrables.",
  },
  {
    icon: "MapPin",
    title: "Proximité",
    description:
      "Basé à Mougali, Brazzaville, le bureau intervient au plus près des projets et des réalités du terrain congolais.",
  },
  {
    icon: "Sparkles",
      title: "Innovation",
    description:
      "Les outils de conception, de calcul et de levé topographique soutiennent les études et le suivi des opérations.",
  },
  {
    icon: "Handshake",
    title: "Intégrité",
    description:
      "L’écoute des maîtres d’ouvrage et la satisfaction des clients guident la conduite de chaque mission.",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Écoute & cadrage",
    description:
      "Nous clarifions vos objectifs, vos contraintes et votre budget lors d'un diagnostic approfondi sur site.",
  },
  {
    number: "02",
    title: "Études & faisabilité",
    description:
      "Levés topographiques, essais géotechniques, études techniques et financières : chaque hypothèse est sécurisée.",
  },
  {
    number: "03",
    title: "Conception & dimensionnement",
    description:
      "Plans d'exécution, notes de calcul et dossiers réglementaires, validés par une revue indépendante.",
  },
  {
    number: "04",
    title: "Exécution & suivi",
    description:
      "Pilotage des entreprises, contrôle qualité et reporting régulier pour tenir les délais et le budget.",
  },
  {
    number: "05",
    title: "Réception & accompagnement",
    description:
      "Essais, levée des réserves et accompagnement dans la vie de l'ouvrage, au-delà de la livraison.",
  },
];

export const FAQS = [
  {
    question: "Intervenez-vous en dehors de Brazzaville ?",
    answer:
      "Oui. Le bureau intervient à Brazzaville et réalise des missions dans plusieurs villes du Congo, notamment Pointe-Noire, Dolisie, Ouesso, Nkayi et Impfondo.",
  },
  {
    question: "Quel est le délai moyen d'une étude technique ?",
    answer:
      "Une étude de faisabilité prend généralement 2 à 4 semaines. Un dossier d'exécution complet demande 4 à 8 semaines selon la complexité de l'ouvrage et la disponibilité des données de terrain.",
  },
  {
    question: "Travaillez-vous avec les bailleurs internationaux ?",
    answer:
      "Oui. Nos dossiers sont structurés pour répondre aux exigences de la Banque mondiale, de la Banque africaine de développement et des agences des Nations unies.",
  },
  {
    question: "Pouvez-vous reprendre un projet déjà entamé ?",
    answer:
      "Oui. Nous réalisons d'abord un audit technique et documentaire, puis nous proposons un plan de reprise adapté : vérification des hypothèses, mise à niveau des études et reprise du suivi de chantier.",
  },
  {
    question: "Comment garantissez-vous la confidentialité des données ?",
    answer:
      "Toutes les informations transmises sont traitées de manière confidentielle, stockées sur des infrastructures sécurisées et accessibles uniquement aux membres de l'équipe projet concernés.",
  },
];

export const CERTIFICATIONS = [
  "Bureau inscrit au tableau de l’Ordre des ingénieurs du Congo · n° 16",
  "Démarche d’assurance qualité initiée, inspirée d’ISO 9001",
  "Procédures de contrôle interne des études et documents avant diffusion",
  "Suivi des réserves pendant la période de parfait achèvement",
];

export const TEAM_COMPETENCIES = [
  "Génie civil et structures",
  "Architecture et économie de la construction",
  "Hydraulique, assainissement et VRD",
  "Électricité et équipements du bâtiment (MEP)",
  "Géotechnique et topographie",
  "Environnement, social, santé et sécurité",
  "DAO/BIM, métreur et contrôle de travaux",
];

export const EQUIPMENT = [
  "Station totale, GNSS/DGPS et niveaux topographiques",
  "Drone de cartographie et équipements de levés",
  "Traceur grand format, imprimantes et scanner",
  "Véhicules de mission, dont pick-up 4×4",
  "Outils de conception et de calcul : AutoCAD, Revit, Robot, Graitec et Cype",
  "Outils de planification et de suivi : Microsoft Project et logiciels de chantier",
];

export const BUDGET_OPTIONS = [
  "Moins de 50 millions FCFA",
  "50 à 100 millions FCFA",
  "100 à 500 millions FCFA",
  "500 millions à 1 milliard FCFA",
  "Plus de 1 milliard FCFA",
  "À définir avec vous",
];

export const TIMELINE_OPTIONS = [
  "Dès que possible",
  "Dans 1 à 3 mois",
  "Dans 3 à 6 mois",
  "Dans plus de 6 mois",
  "À définir",
];

export const PROJECT_TYPE_OPTIONS = [
  "Bâtiment — logements, bureaux, équipements",
  "Infrastructure — ponts, ouvrages d'art",
  "Voirie et réseaux divers (VRD)",
  "Hydraulique — eau potable, assainissement",
  "Industriel — usines, plateformes",
  "Topographie, bornage et SIG",
  "Étude, conseil ou audit technique",
  "Autre projet",
];

export const fallbackServices: Service[] = [
  {
    id: "service-etudes",
    slug: "etudes-et-conseil",
    title: "Architecture & études techniques",
    excerpt:
      "Études de faisabilité, conception et dossiers d’exécution pour vos projets de bâtiment et de travaux publics.",
    description:
      "Le bureau réalise les études techniques d’architecture et d’ingénierie, de la faisabilité aux plans de détail et dossiers d’exécution.",
    icon: "PencilRuler",
    features: [
      "Études de faisabilité et conception",
      "Architecture et ingénierie du bâtiment",
      "Dossiers d’exécution et plans de détail",
      "Assistance technique à maîtrise d’ouvrage",
    ],
    order: 1,
  },
  {
    id: "service-structures",
    slug: "ingenierie-structurelle",
    title: "Ingénierie structurelle",
    excerpt:
      "Études de structures en béton, acier et bois, ouvrages d’art et génie civil.",
    description:
      "Études de structures de bâtiments et d’ouvrages de génie civil, incluant les structures en béton, acier et bois, ainsi que diagnostics et renforcement.",
    icon: "Building2",
    features: [
      "Structures en béton, acier et bois",
      "Ouvrages d’art, ponts, dalots et murs de quai",
      "Diagnostic et faisabilité de structure",
      "Solutions de renforcement et chiffrage",
    ],
    order: 2,
  },
  {
    id: "service-gestion",
    slug: "gestion-de-projets",
    title: "Gestion & maîtrise d'œuvre",
    excerpt:
      "Maîtrise d’œuvre, assistance au maître d’ouvrage et pilotage des opérations.",
    description:
      "Accompagnement technique des maîtres d’ouvrage publics, privés et industriels, coordination et ordonnancement des chantiers.",
    icon: "ClipboardCheck",
    features: [
      "Maîtrise d’œuvre bâtiment et VRD",
      "Assistance technique à maîtrise d’ouvrage",
      "Ordonnancement et pilotage de chantier (OPC)",
      "Conseil et coordination des intervenants",
    ],
    order: 3,
  },
  {
    id: "service-qualite",
    slug: "controle-technique-qualite",
    title: "Contrôle technique & qualité",
    excerpt:
      "Contrôle, inspection et surveillance des travaux de construction.",
    description:
      "Le bureau assure le contrôle et la surveillance des travaux, l’inspection des ouvrages construits ou en cours et le suivi des réserves.",
    icon: "ShieldCheck",
    features: [
      "Contrôle et surveillance de chantier",
      "Inspection technique d’ouvrages",
      "Contrôle interne des études et documents",
      "Suivi des réserves et réception",
    ],
    order: 4,
  },
  {
    id: "service-topographie",
    slug: "topographie-et-sig",
    title: "Topographie & SIG",
    excerpt:
      "Levés topographiques et appui technique à la conception et au suivi des travaux.",
    description:
      "Les géomètres-topographes du bureau mobilisent les équipements de levé et de positionnement disponibles pour les études et les opérations de terrain.",
    icon: "Map",
    features: [
      "Relevés topographiques",
      "Implantation et suivi de chantier",
      "Équipements GNSS/DGPS et station totale",
      "Plans et documents de terrain",
    ],
    order: 5,
  },
  {
    id: "service-vrd",
    slug: "voirie-hydraulique-vrd",
    title: "Voirie, hydraulique & VRD",
    excerpt:
      "Études de VRD, hydraulique, assainissement et corps d’états techniques.",
    description:
      "Le bureau traite les études de voirie et réseaux divers, les ouvrages hydrauliques et les corps d’états techniques et secondaires du bâtiment.",
    icon: "Route",
    features: [
      "Maîtrise d’œuvre bâtiment et VRD",
      "Hydraulique et assainissement",
      "Corps d’états techniques et secondaires",
      "Études et contrôle de travaux publics",
    ],
    order: 6,
  },
  {
    id: "service-expertise",
    slug: "diagnostic-expertise-immobiliere",
    title: "Diagnostics & expertises immobilières",
    excerpt:
      "Évaluation et diagnostic technique des bâtiments, ouvrages et corps d’états secondaires.",
    description:
      "Le bureau réalise des expertises techniques et immobilières, des diagnostics de bâtiments et d’équipements, ainsi que des études de faisabilité structurelle et des solutions de renforcement chiffrées.",
    icon: "ClipboardCheck",
    features: [
      "Expertises techniques et immobilières",
      "Évaluation financière de biens immobiliers",
      "Diagnostic des corps d’états secondaires et MEP",
      "Faisabilité structurelle et solutions de renforcement",
    ],
    order: 7,
  },
];

export const fallbackProjects: Project[] = [
  {
    id: "proj-mosala-maisons-emploi",
    slug: "maisons-departementales-emploi-mosala",
    title: "Maisons départementales de l’emploi · MOSALA",
    category: "BATIMENT",
    location: "Pointe-Noire · Dolisie · Ouesso",
    year: 2026,
    client: "Projet de Renforcement de l’Adéquation Formation–Emploi MOSALA",
    budget: "",
    surface: "3 villes",
    description:
      "Mission en cours : études architecturales et d’ingénierie, puis supervision des travaux de construction de trois maisons départementales de l’emploi à Pointe-Noire, Dolisie et Ouesso. Contrat CCG119301S/001/2026 du 19 août 2026.",
    coverImage: "/mosala-employment-center.jpg",
    images: ["/mn-office-2.jpg", "/mn-plotter.jpg"],
    featured: true,
    status: "PUBLISHED",
  },
  {
    id: "proj-immeuble-r8",
    slug: "suivi-immeuble-bureaux-r8-brazzaville",
    title: "Suivi d’un immeuble de bureaux R+8",
    category: "BATIMENT",
    location: "Brazzaville",
    year: 2026,
    client: "Maître d’ouvrage privé",
    budget: "",
    surface: "R+8 · 1 sous-sol",
    description:
      "Mission en cours de suivi et de contrôle des travaux de construction d’un immeuble de bureaux de huit étages, avec toiture-terrasse et un niveau de sous-sol.",
    coverImage: "/project-r8-brazzaville-reference.jpg",
    images: [],
    featured: true,
    status: "PUBLISHED",
  },
  {
    id: "proj-bci-libre-service-dg",
    slug: "amenagement-espace-libre-service-bci-brazzaville",
    title: "Aménagement de l’espace libre-service bancaire · BCI",
    category: "BATIMENT",
    location: "Brazzaville",
    year: 2026,
    client: "Banque Commerciale Internationale",
    budget: "",
    surface: "Aménagement intérieur",
    description: "Projet d’aménagement de l’espace libre-service bancaire de la Direction Générale de la Banque Commerciale Internationale à Brazzaville. Mission en cours.",
    coverImage: "/project-bci-ouenze-reference.jpg",
    images: [],
    featured: false,
    status: "PUBLISHED",
  },
  {
    id: "proj-bci-agence-vip",
    slug: "rehabilitation-agence-vip-bci-brazzaville",
    title: "Réhabilitation de l’agence bancaire VIP · BCI",
    category: "BATIMENT",
    location: "Brazzaville",
    year: 2026,
    client: "Banque Commerciale Internationale",
    budget: "",
    surface: "Réhabilitation · en cours",
    description: "Travaux de réhabilitation de l’agence bancaire VIP de la Banque Commerciale Internationale à Brazzaville. Mission en cours.",
    coverImage: "/project-bci-ouenze-reference-2.jpg",
    images: [],
    featured: false,
    status: "PUBLISHED",
  },
  {
    id: "proj-bci-bacongo",
    slug: "suivi-construction-agence-bci-bacongo",
    title: "Suivi et contrôle de l’agence BCI de Bacongo",
    category: "BATIMENT",
    location: "Bacongo · Brazzaville",
    year: 2025,
    client: "Banque Commerciale Internationale",
    budget: "",
    surface: "Suivi et contrôle des travaux",
    description: "Suivi et contrôle des travaux de construction de l’Agence Bancaire Commerciale Internationale de Bacongo, à Brazzaville.",
    coverImage: "/project-bci-ouenze-reference.jpg",
    images: [],
    featured: false,
    status: "PUBLISHED",
  },
  {
    id: "proj-bci-la-poste-apd-dao",
    slug: "apd-dao-rehabilitation-agence-bci-la-poste",
    title: "Études APD et DAO · Agence BCI La Poste",
    category: "BATIMENT",
    location: "Brazzaville",
    year: 2025,
    client: "Banque Commerciale Internationale",
    budget: "",
    surface: "Avant-projet détaillé · dossier d’appel d’offres",
    description: "Réalisation de l’avant-projet détaillé et établissement du dossier d’appel d’offres pour le projet de réhabilitation de l’agence BCI La Poste à Brazzaville.",
    coverImage: "/project-bci-ouenze-reference-2.jpg",
    images: [],
    featured: false,
    status: "PUBLISHED",
  },
  {
    id: "proj-sgc-extension-siege",
    slug: "etudes-extension-siege-societe-generale-congo",
    title: "Études d’aménagement · Siège Société Générale du Congo",
    category: "BATIMENT",
    location: "Brazzaville",
    year: 2024,
    client: "Société Générale du Congo",
    budget: "",
    surface: "Études d’aménagement",
    description: "Études des travaux d’aménagement du projet d’extension du siège de la Société Générale du Congo à Brazzaville.",
    coverImage: "/project-sgc-siege-reference.jpg",
    images: [],
    featured: false,
    status: "PUBLISHED",
  },
  {
    id: "proj-bci-pointe-noire-siege",
    slug: "etudes-agences-bci-pointe-noire-siege",
    title: "Études des agences BCI et rafraîchissement du siège",
    category: "BATIMENT",
    location: "Pointe-Noire · Brazzaville",
    year: 2024,
    client: "Banque Commerciale Internationale",
    budget: "",
    surface: "APD · DAO",
    description: "Approbation des avant-projets détaillés et dossiers d’appel d’offres des agences BCI de Pointe-Noire, ainsi que rafraîchissement du siège de la banque.",
    coverImage: "/project-bci-ouenze-reference.jpg",
    images: [],
    featured: false,
    status: "PUBLISHED",
  },
  {
    id: "proj-bci-agences-2022-2023",
    slug: "etudes-accompagnement-agences-bci-2022-2023",
    title: "Études et accompagnement des agences BCI",
    category: "BATIMENT",
    location: "République du Congo",
    year: 2023,
    client: "Banque Commerciale Internationale",
    budget: "",
    surface: "Missions 2022–2023 · conception et suivi des travaux",
    description: "Études d’aménagement et de construction de nouvelles agences BCI, en trois phases : études et conception, assistance et contrôle des travaux, puis suivi des travaux d’aménagement et de construction.",
    coverImage: "/project-bci-ouenze-reference-2.jpg",
    images: [],
    featured: false,
    status: "PUBLISHED",
  },
  {
    id: "proj-cm-valorisation-bioresources",
    slug: "centre-valorisation-bioresources",
    title: "Centre multiservice de valorisation des bioressources",
    category: "HYDRAULIQUE",
    location: "Brazzaville · Université Marien-Ngouabi",
    year: 2025,
    client: "Projet AMES · Agence Française de Développement",
    budget: "",
    surface: "Contrôle et surveillance technique",
    description:
      "Mission en cours de contrôle et de surveillance technique des travaux du Centre multiservice de valorisation des bioressources, situé à l’Université Marien-Ngouabi à Brazzaville et financé par l’Agence Française de Développement dans le cadre du projet AMES.",
    coverImage: "/project-cmvb-adiac.jpg",
    images: [],
    featured: true,
    status: "PUBLISHED",
  },
  {
    id: "proj-port-brazzaville",
    slug: "etudes-port-autonome-brazzaville",
    title: "Études techniques · Port autonome de Brazzaville",
    category: "INFRASTRUCTURE",
    location: "Brazzaville",
    year: 2013,
    client: "Port autonome de Brazzaville · Municipalisation accélérée",
    budget: "",
    surface: "Études techniques",
    description:
      "Études techniques réalisées en collaboration avec le Cabinet 3A dans le cadre du programme de municipalisation accélérée.",
    coverImage: "/project-port-adiac.jpg",
    images: [],
    featured: true,
    status: "PUBLISHED",
  },
  {
    id: "proj-reamenagement-lcde",
    slug: "reamenagement-bureaux-lcde",
    title: "Réaménagement structurel de bureaux · LCDE",
    category: "BATIMENT",
    location: "Kinkala · Madingou",
    year: 2026,
    client: "La Congolaise des Eaux · FDSE",
    budget: "",
    surface: "Études et travaux · en cours",
    description:
      "Travaux de réaménagement structurel des espaces de bureaux de La Congolaise des Eaux à Kinkala et Madingou, réalisés dans le cadre du Fonds de Développement du Secteur de l’Eau. Mission en cours.",
    coverImage: "/project-lcde-direction-reference.jpg",
    images: [],
    featured: false,
    status: "PUBLISHED",
  },
  {
    id: "proj-hopitaux-reference",
    slug: "etudes-hopitaux-reference-nkayi-ouesso",
    title: "Hôpitaux de deuxième référence · Nkayi et Ouesso",
    category: "BATIMENT",
    location: "Nkayi · Ouesso",
    year: 2012,
    client: "Ministère de la Santé et de la Population",
    budget: "",
    surface: "Études techniques et équipements",
    description:
      "Études techniques pour la construction et l’équipement des hôpitaux de deuxième référence de Nkayi (Bouenza) et d’Ouesso (Sangha), pour le ministère de la Santé et de la Population.",
    coverImage: "/project-hopital-nkayi.jpg",
    images: ["/project-hopital-ouesso.jpg"],
    featured: false,
    status: "PUBLISHED",
  },
];

export const fallbackTestimonials: Testimonial[] = [];

export const fallbackTeam: TeamMember[] = [
  {
    id: "team-narcisse",
    name: "Narcisse Malanda",
    role: "Fondateur · Directeur général",
    bio: "Fondateur de MN Consulting Engineering, créé à Brazzaville en 2013. Le bureau est inscrit au tableau de l’Ordre des ingénieurs du Congo sous le numéro 16.",
    photo: null,
    linkedin: "",
    order: 1,
    published: true,
  },
];
