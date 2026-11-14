import { ArrowUpRight, FileText, FolderKanban, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SITE, fallbackProjects, fallbackServices } from "../data/fallback";
import { useSeo } from "../lib/seo";

const pages = [
  { to: "/", label: "Accueil", text: "Présentation du cabinet et de nos expertises." },
  {
    to: "/a-propos",
    label: "Le cabinet",
    text: "Mission, valeurs, histoire, équipe et garanties.",
  },
  {
    to: "/services",
    label: "Expertises",
    text: "Études, maîtrise d'œuvre, contrôle, topographie et VRD.",
  },
  {
    to: "/realisations",
    label: "Réalisations",
    text: "Une sélection de missions réalisées ou en cours au Congo.",
  },
  {
    to: "/carrieres",
    label: "Carrières",
    text: "Profils recherchés, processus et candidature spontanée.",
  },
  {
    to: "/contact",
    label: "Contact",
    text: "Coordonnées, horaires et formulaire de message.",
  },
  {
    to: "/devis",
    label: "Demander un devis",
    text: "Décrivez votre projet pour une étude de votre demande.",
  },
];

const legalPages = [
  { to: "/mentions-legales", label: "Mentions légales" },
  { to: "/politique-confidentialite", label: "Politique de confidentialité" },
];

export default function Sitemap() {
  useSeo({
    title: "Plan du site",
    description:
      "Retrouvez toutes les pages de MN Consulting Engineering : cabinet, expertises, réalisations, carrières, contact et informations légales.",
  });

  return (
    <>
      <PageHero
        eyebrow="Plan du site"
        title={
          <>
            Toutes les pages,{" "}
            <em className="serif-accent text-gradient-gold">au même endroit.</em>
          </>
        }
        description="Un accès direct à l'ensemble des contenus du site MN Consulting Engineering."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Plan du site" }]}
      />

      <section className="container-wide py-16 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Navigation"
            title="Pages principales"
            description="Les parcours essentiels pour découvrir le cabinet, nos expertises et nos réalisations."
          />
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page, index) => (
            <Reveal key={page.to} delay={Math.min(index * 0.04, 0.2)}>
              <Link
                to={page.to}
                className="group flex h-full flex-col justify-between rounded-sm border border-ink/10 bg-white/60 p-5 transition-colors hover:border-gold hover:bg-white"
              >
                <span>
                  <span className="font-display text-[16px] font-semibold tracking-tight text-ink">
                    {page.label}
                  </span>
                  <span className="mt-1.5 block text-[12.5px] leading-relaxed text-steel">
                    {page.text}
                  </span>
                </span>
                <ArrowUpRight className="mt-5 size-4 text-gold-dark transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand/40 py-16">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-sm bg-gold/15 text-gold-dark">
                <Wrench className="size-4" />
              </span>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Nos expertises
              </h2>
            </div>
            <ul className="mt-6 border-t border-ink/10">
              {fallbackServices.map((service) => (
                <li key={service.slug} className="border-b border-ink/10">
                  <Link
                    to={`/services#${service.slug}`}
                    className="group flex items-center justify-between gap-4 py-3.5 text-[13.5px] text-steel transition-colors hover:text-gold-dark"
                  >
                    {service.title}
                    <ArrowUpRight className="size-3.5 shrink-0 text-steel/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-sm bg-gold/15 text-gold-dark">
                <FolderKanban className="size-4" />
              </span>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Réalisations
              </h2>
            </div>
            <ul className="mt-6 border-t border-ink/10">
              {fallbackProjects.map((project) => (
                <li key={project.slug} className="border-b border-ink/10">
                  <Link
                    to={`/realisations/${project.slug}`}
                    className="group flex items-center justify-between gap-4 py-3.5 text-[13.5px] text-steel transition-colors hover:text-gold-dark"
                  >
                    <span>
                      {project.title}
                      <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.12em] text-steel/60">
                        {project.year}
                      </span>
                    </span>
                    <ArrowUpRight className="size-3.5 shrink-0 text-steel/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container-wide py-16">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-sm bg-gold/15 text-gold-dark">
              <FileText className="size-4" />
            </span>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Informations légales
            </h2>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/10 pt-5">
            {legalPages.map((page) => (
              <li key={page.to}>
                <Link
                  to={page.to}
                  className="text-[13.5px] text-steel transition-colors hover:text-gold-dark"
                >
                  {page.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="text-[13.5px] text-steel transition-colors hover:text-gold-dark"
              >
                Sitemap XML
              </a>
            </li>
          </ul>
          <p className="mt-8 text-[12.5px] text-steel">
            Une question ? Écrivez-nous à{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-semibold text-gold-dark underline decoration-gold/40 underline-offset-2 transition-colors hover:text-ink"
            >
              {SITE.email}
            </a>
            .
          </p>
        </Reveal>
      </section>
    </>
  );
}
