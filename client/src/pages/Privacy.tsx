import { Link } from "react-router-dom";
import { LegalLayout, type LegalSection } from "../components/layout/LegalLayout";
import { SITE } from "../data/fallback";
import { useSeo } from "../lib/seo";

export default function Privacy() {
  useSeo({
    title: "Politique de confidentialité",
    description:
      "Comment MN Consulting Engineering collecte, utilise, conserve et protège vos données personnelles, et comment exercer vos droits.",
  });

  const sections: LegalSection[] = [
    {
      id: "responsable",
      title: "Responsable du traitement",
      content: (
        <>
          <p>
            Le responsable du traitement des données collectées sur ce site est{" "}
            <strong>{SITE.legalName}</strong>, dont le siège social est situé{" "}
            {SITE.address}, {SITE.city}, {SITE.country}.
          </p>
          <p>
            Pour toute question relative à la protection des données, vous
            pouvez nous écrire à{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ou nous appeler au{" "}
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>.
          </p>
        </>
      ),
    },
    {
      id: "donnees-collectees",
      title: "Données collectées",
      content: (
        <>
          <p>
            Nous collectons uniquement les données que vous nous transmettez
            volontairement, ainsi que certaines données techniques nécessaires
            au fonctionnement et à la sécurité du site.
          </p>
          <h3>Formulaire de contact</h3>
          <ul>
            <li>Nom complet</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone, si vous le renseignez</li>
            <li>Objet et contenu de votre message</li>
          </ul>
          <h3>Formulaire de devis</h3>
          <ul>
            <li>Nom, e-mail et téléphone</li>
            <li>Société, si vous la renseignez</li>
            <li>Type de projet, budget et délai envisagés</li>
            <li>Description de votre besoin</li>
          </ul>
          <h3>Données techniques et administration</h3>
          <ul>
            <li>
              Journaux techniques de connexion (adresse IP, navigateur, date et
              heure) conservés par nos hébergeurs pour la sécurité du service
            </li>
            <li>
              Identifiants de connexion au back-office, avec mot de passe haché
            </li>
          </ul>
          <p>
            Nous ne collectons pas de données sensibles et ne demandons jamais
            d'informations bancaires via ce site.
          </p>
        </>
      ),
    },
    {
      id: "finalites",
      title: "Finalités du traitement",
      content: (
        <>
          <p>Vos données sont utilisées pour :</p>
          <ul>
            <li>répondre à vos demandes de contact et de renseignement ;</li>
            <li>étudier et traiter vos demandes de devis ;</li>
            <li>assurer le suivi de la relation commerciale et des missions ;</li>
            <li>garantir la sécurité, la disponibilité et l'intégrité du site ;</li>
            <li>respecter nos obligations légales et comptables.</li>
          </ul>
          <p>
            Nous n'utilisons pas vos données pour de la prospection non
            sollicitée et ne les vendons jamais à des tiers.
          </p>
        </>
      ),
    },
    {
      id: "bases-legales",
      title: "Bases légales",
      content: (
        <>
          <p>
            Selon le cas, le traitement repose sur votre <strong>consentement</strong>{" "}
            (case d'acceptation des formulaires), sur notre{" "}
            <strong>intérêt légitime</strong> à répondre aux demandes
            professionnelles et à sécuriser nos services, ou sur une{" "}
            <strong>obligation légale</strong> lorsque la conservation de
            certaines informations est requise.
          </p>
          <p>
            Vous pouvez retirer votre consentement à tout moment, sans que cela
            remette en cause les traitements déjà réalisés.
          </p>
        </>
      ),
    },
    {
      id: "destinataires",
      title: "Destinataires des données",
      content: (
        <>
          <p>
            Les données sont accessibles aux seuls membres de {SITE.legalName}{" "}
            habilités à traiter votre demande. Elles peuvent être transmises à
            nos sous-traitants techniques, agissant sur nos instructions :
          </p>
          <ul>
            <li>
              <strong>Netlify, Inc.</strong> pour l'hébergement du site web
            </li>
            <li>
              <strong>Render Services, Inc.</strong> pour l'hébergement de l'API
            </li>
            <li>
              <strong>Neon, Inc.</strong> pour l'hébergement de la base de
              données
            </li>
          </ul>
          <p>
            Ces prestataires sont soumis à des obligations de confidentialité et
            de sécurité. Aucune donnée n'est vendue, louée ou cédée à des fins
            commerciales. Nous pouvons toutefois communiquer des informations
            aux autorités compétentes lorsque la loi l'exige.
          </p>
        </>
      ),
    },
    {
      id: "conservation",
      title: "Durées de conservation",
      content: (
        <>
          <ul>
            <li>
              <strong>Demandes de contact et de devis :</strong> 36 mois à
              compter du dernier échange, puis suppression ou anonymisation.
            </li>
            <li>
              <strong>Messages et pièces liés à une mission :</strong> pendant la
              durée de la relation contractuelle, puis selon les obligations
              légales applicables.
            </li>
            <li>
              <strong>Comptes administrateurs :</strong> pendant la durée du
              compte, puis 12 mois après sa désactivation.
            </li>
            <li>
              <strong>Journaux techniques :</strong> 12 mois maximum, sauf
              nécessité liée à un incident de sécurité.
            </li>
          </ul>
          <p>
            À l'expiration de ces durées, les données sont supprimées ou
            anonymisées de manière irréversible.
          </p>
        </>
      ),
    },
    {
      id: "securite",
      title: "Sécurité",
      content: (
        <>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles
            adaptées pour protéger vos données : chiffrement des échanges via
            HTTPS, contrôle des accès, mots de passe administrateurs hachés,
            jetons de session limités dans le temps et restriction des accès aux
            personnes habilitées.
          </p>
          <p>
            Malgré ces précautions, aucun système d'information ne peut être
            garanti à 100 %. En cas d'incident affectant vos données, nous
            prendrons les mesures nécessaires et vous informerons dans les
            délais requis.
          </p>
        </>
      ),
    },
    {
      id: "transferts",
      title: "Transferts hors du Congo",
      content: (
        <>
          <p>
            Certains de nos prestataires peuvent héberger ou traiter des données
            en dehors de la République du Congo, notamment aux États-Unis. Dans
            ce cas, nous veillons à ce que des garanties contractuelles
            appropriées encadrent ces transferts et assurent un niveau de
            protection suffisant.
          </p>
        </>
      ),
    },
    {
      id: "droits",
      title: "Vos droits",
      content: (
        <>
          <p>
            Conformément à la réglementation applicable, vous disposez des droits
            suivants sur vos données personnelles :
          </p>
          <ul>
            <li>droit d'accès et de copie ;</li>
            <li>droit de rectification ;</li>
            <li>droit à l'effacement ;</li>
            <li>droit à la limitation du traitement ;</li>
            <li>droit d'opposition ;</li>
            <li>droit à la portabilité, lorsque applicable ;</li>
            <li>droit de retirer votre consentement à tout moment.</li>
          </ul>
          <p>
            Pour exercer ces droits, écrivez à{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> en précisant votre
            demande. Nous répondons dans un délai maximal d'un mois. Une pièce
            d'identité pourra être demandée en cas de doute raisonnable sur
            votre identité.
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez
            introduire une réclamation auprès de l'autorité de protection des
            données compétente.
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
            Ce site n'utilise pas de cookies publicitaires, de cookies de
            réseaux sociaux ni d'outil de mesure d'audience. Aucun consentement
            n'est donc requis pour ces usages.
          </p>
          <p>
            Deux mécanismes de stockage local strictement fonctionnels sont
            utilisés :
          </p>
          <ul>
            <li>
              <strong>mm_theme</strong> : mémorise votre préférence entre le
              thème émeraude et le thème blanc ;
            </li>
            <li>
              <strong>mm_consulting_token</strong> : conserve la session des
              administrateurs connectés au back-office.
            </li>
          </ul>
          <p>
            Ces informations restent sur votre appareil et ne sont pas utilisées
            à des fins publicitaires. Vous pouvez les supprimer à tout moment via
            les paramètres de votre navigateur. La suppression du jeton vous
            déconnecte simplement du back-office.
          </p>
          <p>
            Si un outil de mesure d'audience ou un service tiers venait à être
            ajouté, une bannière de consentement serait mise en place avant tout
            dépôt de cookie non essentiel.
          </p>
        </>
      ),
    },
    {
      id: "modifications",
      title: "Modifications et contact",
      content: (
        <>
          <p>
            Cette politique peut être mise à jour pour tenir compte de
            l'évolution de nos services ou de la réglementation. La date de
            dernière mise à jour figure en haut de cette page.
          </p>
          <p>
            Pour toute question ou pour exercer vos droits, contactez-nous à{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ou par courrier à{" "}
            {SITE.legalName}, {SITE.address}, {SITE.city}, {SITE.country}.
          </p>
          <p>
            Vous pouvez également consulter nos{" "}
            <Link to="/mentions-legales">mentions légales</Link> ou utiliser
            notre <Link to="/contact">formulaire de contact</Link>.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalLayout
      eyebrow="Confidentialité"
      title={
        <>
          Vos données,{" "}
          <em className="serif-accent text-gradient-gold">
            traitées avec rigueur.
          </em>
        </>
      }
      description="Transparence sur les données collectées, leur utilisation, leur conservation et les droits dont vous disposez."
      updated="8 novembre 2026"
      sections={sections}
    />
  );
}
