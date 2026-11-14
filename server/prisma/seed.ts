import {
  MessageStatus,
  PrismaClient,
  ProjectCategory,
  PublishStatus,
  QuoteStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { fallbackServices } from "../../client/src/data/fallback";

const prisma = new PrismaClient();

async function main() {
  const isProduction = process.env.NODE_ENV === "production";
  const password = process.env.ADMIN_PASSWORD?.trim() || undefined;

  if (isProduction && !password) {
    throw new Error(
      "ADMIN_PASSWORD doit être défini avant d'exécuter le seed en production.",
    );
  }

  if (isProduction && password === "Admin@2026!") {
    throw new Error(
      "Le mot de passe administrateur de démonstration est interdit en production.",
    );
  }

  const adminPassword = password ?? "Admin@2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: "admin@mnconsulting.cg" },
    update: { password: passwordHash },
    create: {
      email: "admin@mnconsulting.cg",
      password: passwordHash,
      name: "Administrateur MN Consulting Engineering",
      role: "ADMIN",
    },
  });

  const legacyServiceSlugs = [
    "etudes-et-conseil",
    "ingenierie-structurelle",
    "gestion-de-projets",
    "controle-technique-qualite",
    "topographie-et-sig",
    "voirie-hydraulique-vrd",
  ];

  await prisma.service.deleteMany({
    where: { slug: { in: legacyServiceSlugs } },
  });
  const services = fallbackServices.map(({ id: _id, ...service }) => service);

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  const legacyProjectSlugs = [
    "rehabilitation-pont-tsieme",
    "congo-business-center",
    "adduction-eau-potable-dolisie",
    "voie-contournement-est-pointe-noire",
    "complexe-industriel-maloukou",
    "lotissement-vrd-lintele",
  ];

  await prisma.project.deleteMany({
    where: { slug: { in: legacyProjectSlugs } },
  });

  const projects = [
    {
      slug: "maisons-departementales-emploi-mosala",
      title: "Maisons départementales de l’emploi · MOSALA",
      category: ProjectCategory.BATIMENT,
      location: "Pointe-Noire · Dolisie · Ouesso",
      year: 2026,
      client: "Projet MOSALA",
      budget: null,
      surface: "3 villes",
      description: "Mission en cours : études architecturales et d’ingénierie, puis supervision des travaux de construction de trois maisons départementales de l’emploi. Contrat CCG119301S/001/2026 du 19 août 2026.",
      coverImage: "/mosala-employment-center.jpg",
      images: ["/mn-office-2.jpg", "/mn-plotter.jpg"],
      featured: true,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "amenagement-espace-libre-service-bci-brazzaville",
      title: "Aménagement de l’espace libre-service bancaire · BCI",
      category: ProjectCategory.BATIMENT,
      location: "Brazzaville",
      year: 2026,
      client: "Banque Commerciale Internationale",
      budget: null,
      surface: "Aménagement intérieur",
      description: "Projet d’aménagement de l’espace libre-service bancaire de la Direction Générale de la Banque Commerciale Internationale à Brazzaville. Mission en cours.",
      coverImage: "/project-bci-ouenze-reference.jpg",
      images: [],
      featured: false,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "rehabilitation-agence-vip-bci-brazzaville",
      title: "Réhabilitation de l’agence bancaire VIP · BCI",
      category: ProjectCategory.BATIMENT,
      location: "Brazzaville",
      year: 2026,
      client: "Banque Commerciale Internationale",
      budget: null,
      surface: "Réhabilitation · en cours",
      description: "Travaux de réhabilitation de l’agence bancaire VIP de la Banque Commerciale Internationale à Brazzaville. Mission en cours.",
      coverImage: "/project-bci-ouenze-reference-2.jpg",
      images: [],
      featured: false,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "suivi-construction-agence-bci-bacongo",
      title: "Suivi et contrôle de l’agence BCI de Bacongo",
      category: ProjectCategory.BATIMENT,
      location: "Bacongo · Brazzaville",
      year: 2025,
      client: "Banque Commerciale Internationale",
      budget: null,
      surface: "Suivi et contrôle des travaux",
      description: "Suivi et contrôle des travaux de construction de l’Agence Bancaire Commerciale Internationale de Bacongo, à Brazzaville.",
      coverImage: "/project-bci-ouenze-reference.jpg",
      images: [],
      featured: false,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "apd-dao-rehabilitation-agence-bci-la-poste",
      title: "Études APD et DAO · Agence BCI La Poste",
      category: ProjectCategory.BATIMENT,
      location: "Brazzaville",
      year: 2025,
      client: "Banque Commerciale Internationale",
      budget: null,
      surface: "Avant-projet détaillé · dossier d’appel d’offres",
      description: "Réalisation de l’avant-projet détaillé et établissement du dossier d’appel d’offres pour le projet de réhabilitation de l’agence BCI La Poste à Brazzaville.",
      coverImage: "/project-bci-ouenze-reference-2.jpg",
      images: [],
      featured: false,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "etudes-extension-siege-societe-generale-congo",
      title: "Études d’aménagement · Siège Société Générale du Congo",
      category: ProjectCategory.BATIMENT,
      location: "Brazzaville",
      year: 2024,
      client: "Société Générale du Congo",
      budget: null,
      surface: "Études d’aménagement",
      description: "Études des travaux d’aménagement du projet d’extension du siège de la Société Générale du Congo à Brazzaville.",
      coverImage: "/project-sgc-siege-reference.jpg",
      images: [],
      featured: false,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "etudes-agences-bci-pointe-noire-siege",
      title: "Études des agences BCI et rafraîchissement du siège",
      category: ProjectCategory.BATIMENT,
      location: "Pointe-Noire · Brazzaville",
      year: 2024,
      client: "Banque Commerciale Internationale",
      budget: null,
      surface: "APD · DAO",
      description: "Approbation des avant-projets détaillés et dossiers d’appel d’offres des agences BCI de Pointe-Noire, ainsi que rafraîchissement du siège de la banque.",
      coverImage: "/project-bci-ouenze-reference.jpg",
      images: [],
      featured: false,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "etudes-accompagnement-agences-bci-2022-2023",
      title: "Études et accompagnement des agences BCI",
      category: ProjectCategory.BATIMENT,
      location: "République du Congo",
      year: 2023,
      client: "Banque Commerciale Internationale",
      budget: null,
      surface: "Missions 2022–2023 · conception et suivi des travaux",
      description: "Études d’aménagement et de construction de nouvelles agences BCI, en trois phases : études et conception, assistance et contrôle des travaux, puis suivi des travaux d’aménagement et de construction.",
      coverImage: "/project-bci-ouenze-reference-2.jpg",
      images: [],
      featured: false,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "suivi-immeuble-bureaux-r8-brazzaville",
      title: "Suivi d’un immeuble de bureaux R+8",
      category: ProjectCategory.BATIMENT,
      location: "Brazzaville",
      year: 2026,
      client: "Maître d’ouvrage privé",
      budget: null,
      surface: "R+8 · 1 sous-sol",
      description: "Mission en cours de suivi et de contrôle des travaux de construction d’un immeuble de bureaux de huit étages, avec toiture-terrasse et un niveau de sous-sol.",
      coverImage: "/project-r8-brazzaville-reference.jpg",
      images: [],
      featured: true,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "centre-valorisation-bioresources",
      title: "Centre multiservice de valorisation des bioressources",
      category: ProjectCategory.HYDRAULIQUE,
      location: "Brazzaville · Université Marien-Ngouabi",
      year: 2025,
      client: "Projet AMES",
      budget: null,
      surface: "Contrôle et surveillance technique",
      description: "Mission en cours de contrôle et de surveillance technique des travaux du Centre multiservice de valorisation des bioressources, situé à l’Université Marien-Ngouabi à Brazzaville et financé par l’Agence Française de Développement dans le cadre du projet AMES.",
      coverImage: "/project-cmvb-adiac.jpg",
      images: [],
      featured: true,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "etudes-port-autonome-brazzaville",
      title: "Études techniques · Port autonome de Brazzaville",
      category: ProjectCategory.INFRASTRUCTURE,
      location: "Brazzaville",
      year: 2013,
      client: "Port autonome de Brazzaville",
      budget: null,
      surface: "Études techniques",
      description: "Études techniques réalisées en collaboration avec le Cabinet 3A dans le cadre du programme de municipalisation accélérée.",
      coverImage: "/project-port-adiac.jpg",
      images: [],
      featured: true,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "reamenagement-bureaux-lcde",
      title: "Réaménagement structurel de bureaux · LCDE",
      category: ProjectCategory.BATIMENT,
      location: "Kinkala · Madingou",
      year: 2026,
      client: "La Congolaise des Eaux · FDSE",
      budget: null,
      surface: "Études et travaux · en cours",
      description: "Travaux de réaménagement structurel des espaces de bureaux de La Congolaise des Eaux à Kinkala et Madingou, dans le cadre du Fonds de Développement du Secteur de l’Eau. Mission en cours.",
      coverImage: "/project-lcde-direction-reference.jpg",
      images: [],
      featured: false,
      status: PublishStatus.PUBLISHED,
    },
    {
      slug: "etudes-hopitaux-reference-nkayi-ouesso",
      title: "Hôpitaux de deuxième référence · Nkayi et Ouesso",
      category: ProjectCategory.BATIMENT,
      location: "Nkayi · Ouesso",
      year: 2012,
      client: "Ministère de la Santé et de la Population",
      budget: null,
      surface: "Études techniques et équipements",
      description: "Études techniques pour la construction et l’équipement des hôpitaux de deuxième référence de Nkayi (Bouenza) et d’Ouesso (Sangha), pour le ministère de la Santé et de la Population.",
      coverImage: "/project-hopital-nkayi.jpg",
      images: ["/project-hopital-ouesso.jpg"],
      featured: false,
      status: PublishStatus.PUBLISHED,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  await prisma.testimonial.deleteMany({
    where: { id: { in: ["seed-testimonial-cbc", "seed-testimonial-dolisie", "seed-testimonial-park"] } },
  });
  const testimonials: never[] = [];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: {},
      create: testimonial,
    });
  }

  await prisma.teamMember.deleteMany({
    where: { id: { in: ["seed-team-marc", "seed-team-sandrine", "seed-team-jeanbaptiste", "seed-team-liliane"] } },
  });
  const team = [
    {
      id: "seed-team-narcisse",
      name: "Narcisse Malanda",
      role: "Fondateur · Directeur général",
      bio: "Fondateur de MN Consulting Engineering, créé à Brazzaville en 2013. Le bureau est inscrit au tableau de l’Ordre des ingénieurs du Congo sous le numéro 16.",
      photo: "/narcisse-malanda-directeur.jpeg",
      linkedin: null,
      order: 1,
      published: true,
    },
  ];

  for (const member of team) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: {
        photo: member.photo,
      },
      create: member,
    });
  }

  await prisma.message.upsert({
    where: { id: "seed-message-1" },
    update: {},
    create: {
      id: "seed-message-1",
      name: "Chancelvie Nkodia",
      email: "c.nkodia@example.cg",
      phone: "+242 06 555 12 34",
      subject: "Étude géotechnique Brazzaville",
      message:
        "Bonjour, nous préparons la construction d'un immeuble R+4 à Bacongo et recherchons un cabinet pour une étude géotechnique complète. Pouvez-vous nous proposer un devis et un délai ?",
      status: MessageStatus.NEW,
    },
  });

  await prisma.message.upsert({
    where: { id: "seed-message-2" },
    update: {},
    create: {
      id: "seed-message-2",
      name: "Hervé Okemba",
      email: "herve.okemba@example.cg",
      subject: "Partenariat bureau d'études",
      message:
        "Nous sommes une entreprise de construction basée à Pointe-Noire et souhaitons discuter d'un partenariat pour la maîtrise d'œuvre de nos prochains chantiers.",
      status: MessageStatus.READ,
    },
  });

  await prisma.quoteRequest.upsert({
    where: { id: "seed-quote-1" },
    update: {},
    create: {
      id: "seed-quote-1",
      name: "Grâce Mavoungou",
      email: "grace.mavoungou@example.cg",
      phone: "+242 05 701 88 20",
      company: "Immo Congo",
      projectType: "Bâtiment — immeuble résidentiel",
      budget: "500 millions à 1 milliard FCFA",
      timeline: "Démarrage dans 3 mois",
      description:
        "Projet de 24 logements à Kintélé. Nous recherchons des études structure, les plans d'exécution et le suivi de chantier jusqu'à la réception.",
      status: QuoteStatus.NEW,
    },
  });

  await prisma.quoteRequest.upsert({
    where: { id: "seed-quote-2" },
    update: {},
    create: {
      id: "seed-quote-2",
      name: "Fabrice Ondongo",
      email: "f.ondongo@example.cg",
      phone: "+242 06 222 45 67",
      company: "Coopérative agricole du Niari",
      projectType: "Hydraulique — adduction d'eau",
      budget: "100 à 500 millions FCFA",
      timeline: "Démarrage dans 6 mois",
      description:
        "Nous souhaitons alimenter un site de production agricole en eau potable : forage, château d'eau et réseau de distribution sur environ 4 km.",
      status: QuoteStatus.IN_REVIEW,
    },
  });

  console.log("Base initialisée : admin, services, projets, équipe, témoignages, messages et devis.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
