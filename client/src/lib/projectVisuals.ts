export interface ProjectVisualCredit {
  label: string;
  href: string;
  kind: "reference" | "project";
}

const creditsByImage: Record<string, ProjectVisualCredit> = {
  "/project-r8-brazzaville-reference.jpg": {
    label: "Photo de référence · chantier OCEANA à Brazzaville (2022)",
    href: "https://oceanacongo.com/projet-7.php",
    kind: "reference",
  },
  "/project-bci-ouenze-reference.jpg": {
    label: "Photo de référence · agence BCI de Ouenzé",
    href: "https://lasemaineafricaine.info/banque-commerciale-internationale-bci-renovee-lagence-de-ouenze-a-brazzaville-a-rouvert-ses-portes/",
    kind: "reference",
  },
  "/project-bci-ouenze-reference-2.jpg": {
    label: "Photo de référence · agence BCI de Ouenzé",
    href: "https://lasemaineafricaine.info/banque-commerciale-internationale-bci-renovee-lagence-de-ouenze-a-brazzaville-a-rouvert-ses-portes/",
    kind: "reference",
  },
  "/project-sgc-siege-reference.jpg": {
    label: "Photo de référence · siège Société Générale du Congo",
    href: "https://www.adiac-congo.com/content/banque-le-gouvernement-congolais-oppose-la-vente-de-la-filiale-societe-generale-149165",
    kind: "reference",
  },
  "/project-lcde-direction-reference.jpg": {
    label: "Photo de référence · direction générale LCDE, Brazzaville",
    href: "https://www.finances.gouv.cg/fr/articles/s%C3%A9ance-de-travail-du-ministre-christian-yoka-%C3%A0-la-congolaise-des-eaux-lcde",
    kind: "reference",
  },
  "/project-hopital-nkayi.jpg": {
    label: "Photo de référence · hôpital de référence de Nkayi",
    href: "https://nkayicity.wordpress.com/2019/09/16/hopital-de-reference-de-nkayi/",
    kind: "reference",
  },
  "/project-hopital-ouesso.jpg": {
    label: "Photo d’archives · chantier de l’hôpital général d’Ouesso (2014)",
    href: "https://www.adiac-congo.com/content/municipalisation-de-la-sangha-jean-jacques-bouya-fait-la-ronde-des-sites-retenus-25028",
    kind: "reference",
  },
  "/project-cmvb-adiac.jpg": {
    label: "Photo du chantier · Adiac",
    href: "https://www.adiac-congo.com/content/infrastructures-delphine-edith-emmanuel-visite-le-futur-centre-multiservice-de-la",
    kind: "project",
  },
  "/project-port-adiac.jpg": {
    label: "Photo des travaux · Adiac",
    href: "https://www.adiac-congo.com/content/port-autonome-de-brazzaville-les-travaux-de-rehabilitation-du-premier-module-avancent",
    kind: "project",
  },
};

export function getProjectVisualCredit(image: string): ProjectVisualCredit | null {
  return creditsByImage[image] ?? null;
}

export function projectVisualBadge(image: string): string | null {
  const credit = getProjectVisualCredit(image);
  if (!credit) return null;
  return credit.kind === "reference" ? "Photo de référence" : "Photo · Adiac";
}
