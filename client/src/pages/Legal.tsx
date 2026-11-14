import { Link } from "react-router-dom";
import { LegalLayout, type LegalSection } from "../components/layout/LegalLayout";
import { SITE } from "../data/fallback";
import { useSeo } from "../lib/seo";

export default function Legal() {
  useSeo({
    title: "Mentions légales",
    description:
      "Informations légales du site MN Consulting Engineering : éditeur, hébergement, propriété intellectuelle, responsabilité et droit applicable.",
  });

  const sections: LegalSection[] = [
    {
      id: "editeur",
      title: "Éditeur du site",
      content: (
        <>
          <p>
            Le site <strong>{SITE.url.replace("https://", "")}</strong> est édité
            par <strong>{SITE.legalName}</strong>, société de droit congolais
            spécialisée dans l'ingénierie civile et le conseil.
          </p>
          <ul>
            <li>
              <strong>Forme juridique :</strong> société à responsabilité limitée
              unipersonnelle (SARLU)
            </li>
            <li>
              <strong>Siège social :</strong> {SITE.address}, {SITE.city},{" "}
              {SITE.country}
            </li>
            <li>
              <strong>Téléphone :</strong>{" "}
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            </li>
            <li>
              <strong>E-mail :</strong>{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <strong>Directeur de la publication :</strong> Narcisse Malanda,
              Directeur général
            </li>
            <li>
              <strong>RCCM :</strong> {SITE.rccm}. Le numéro d’identification
              fiscale est communiqué directement aux partenaires concernés.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "hebergement",
      title: "Hébergement",
      content: (
        <>
          <p>
            Le site est hébergé par des prestataires techniques situés aux
            États-Unis. Les données sont traitées conformément aux engagements
            décrits dans notre politique de confidentialité.
          </p>
          <ul>
            <li>
              <strong>Site web :</strong>{" "}
              <a href="https://www.netlify.com" target="_blank" rel="noreferrer">
                Netlify, Inc.
              </a>
            </li>
            <li>
              <strong>API :</strong>{" "}
              <a href="https://render.com" target="_blank" rel="noreferrer">
                Render Services, Inc.
              </a>
            </li>
            <li>
              <strong>Base de données :</strong>{" "}
              <a href="https://neon.tech" target="_blank" rel="noreferrer">
                Neon, Inc.
              </a>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "propriete-intellectuelle",
      title: "Propriété intellectuelle",
      content: (
        <>
          <p>
            L'ensemble des éléments du site — textes, identité visuelle, logo,
            graphismes, mises en page, photographies et documents — est protégé
            par le droit de la propriété intellectuelle. Toute reproduction,
            représentation, modification ou exploitation, totale ou partielle,
            sans autorisation écrite préalable de {SITE.legalName}, est
            interdite.
          </p>
        </>
      ),
    },
    {
      id: "responsabilite",
      title: "Limitation de responsabilité",
      content: (
        <>
          <p>
            Les informations publiées sur ce site sont fournies à titre
            indicatif. Elles ne constituent ni une offre contractuelle, ni un
            engagement technique ou financier. Malgré le soin apporté à leur
            rédaction, {SITE.legalName} ne garantit pas leur exhaustivité, leur
            exactitude ou leur actualité.
          </p>
          <p>
            {SITE.legalName} ne saurait être tenue responsable des dommages
            directs ou indirects résultant de l'utilisation du site, d'une
            indisponibilité temporaire ou du contenu de sites externes vers
            lesquels des liens sont proposés.
          </p>
        </>
      ),
    },
    {
      id: "donnees-personnelles",
      title: "Données personnelles",
      content: (
        <>
          <p>
            Les formulaires de contact et de devis collectent des données
            personnelles nécessaires au traitement de vos demandes. Les
            modalités de collecte, les finalités, les durées de conservation et
            vos droits sont détaillés dans notre{" "}
            <Link to="/politique-confidentialite">
              politique de confidentialité
            </Link>
            .
          </p>
          <p>
            Pour toute question relative à vos données, écrivez à{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies et stockage local",
      content: (
        <>
          <p>
            Le site n'utilise ni cookie publicitaire ni outil de mesure
            d'audience. Seuls des mécanismes de stockage local strictement
            fonctionnels sont utilisés : préférence de thème et session
            d'administration. Leur fonctionnement est décrit dans la{" "}
            <Link to="/politique-confidentialite">
              politique de confidentialité
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      id: "droit-applicable",
      title: "Droit applicable et litiges",
      content: (
        <>
          <p>
            Le présent site et ses conditions d'utilisation sont soumis au droit
            congolais. En cas de différend, les parties s'efforceront de trouver
            une solution amiable avant toute action contentieuse. À défaut
            d'accord, les tribunaux compétents de Brazzaville seront seuls
            compétents.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "Nous contacter",
      content: (
        <>
          <p>
            Pour toute question relative au site, à son contenu ou à vos
            données personnelles, vous pouvez nous joindre :
          </p>
          <ul>
            <li>
              Par e-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              Par téléphone : <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            </li>
            <li>
              Par courrier : {SITE.legalName}, {SITE.address}, {SITE.city},{" "}
              {SITE.country}
            </li>
          </ul>
          <p>
            Vous pouvez également utiliser notre{" "}
            <Link to="/contact">formulaire de contact</Link>.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalLayout
      eyebrow="Informations légales"
      title={
        <>
          Des informations claires,{" "}
          <em className="serif-accent text-gradient-gold">
            sans zone d'ombre.
          </em>
        </>
      }
      description="Éditeur, hébergement, propriété intellectuelle et droit applicable : retrouvez ici les informations légales de MN Consulting Engineering."
      updated="8 novembre 2026"
      sections={sections}
    />
  );
}
