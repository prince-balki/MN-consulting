import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { JsonLd } from "../components/JsonLd";
import { ProjectCard } from "../components/ProjectCard";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { SITE } from "../data/fallback";
import { getProjectSafe, getProjectsSafe } from "../lib/api";
import { useSeo } from "../lib/seo";
import { categoryLabel, type Project } from "../lib/types";
import { getProjectVisualCredit } from "../lib/projectVisuals";

export default function ProjectDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [others, setOthers] = useState<Project[]>([]);

  useSeo({
    title: project ? project.title : "Réalisation",
    description: project
      ? project.description.slice(0, 155)
      : "Découvrez une mission de MN Consulting Engineering en République du Congo.",
    image: project?.coverImage || undefined,
    type: project ? "article" : "website",
  });

  useEffect(() => {
    let active = true;
    setProject(undefined);

    getProjectSafe(slug).then((result) => {
      if (active) setProject(result);
    });

    getProjectsSafe({ limit: 100 }).then((items) => {
      if (active) setOthers(items);
    });

    return () => {
      active = false;
    };
  }, [slug]);

  if (project === undefined) {
    return (
      <div className="container-wide py-24">
        <div className="h-4 w-32 animate-pulse rounded bg-ink/10" />
        <div className="mt-6 h-12 w-2/3 animate-pulse rounded bg-ink/10" />
        <div className="mt-10 aspect-[16/7] w-full animate-pulse rounded-sm bg-ink/10" />
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="container-wide py-24 text-center sm:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark">
          Erreur 404
        </p>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight">
          Cette réalisation est introuvable.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-steel">
          Le projet a peut-être été déplacé ou n'est plus publié. Retrouvez
          l'ensemble de nos réalisations.
        </p>
        <div className="mt-8 flex justify-center">
          <Button to="/realisations" icon={<ArrowUpRight className="size-4" />}>
            Voir les réalisations
          </Button>
        </div>
      </div>
    );
  }

  const paragraphs = project.description.split("\n\n").filter(Boolean);
  const related = others
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);

  const facts = [
    { label: "Maître d'ouvrage", value: project.client },
    { label: "Budget", value: project.budget },
    { label: "Superficie / longueur", value: project.surface },
    { label: "Année de référence", value: String(project.year) },
    { label: "Localisation", value: project.location },
    { label: "Catégorie", value: categoryLabel(project.category) },
  ];

  const projectUrl = `${SITE.url}/realisations/${project.slug}`;
  const photoSource = getProjectVisualCredit(project.coverImage);
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: `${SITE.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Réalisations",
            item: `${SITE.url}/realisations`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: projectUrl,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}#project`,
        name: project.title,
        headline: project.title,
        description: project.description,
        ...(project.coverImage ? { image: project.coverImage } : {}),
        dateCreated: `${project.year}-01-01`,
        locationCreated: {
          "@type": "Place",
          name: project.location,
        },
        about: categoryLabel(project.category),
        url: projectUrl,
        creator: { "@id": `${SITE.url}/#organization` },
        isPartOf: { "@id": `${SITE.url}/#website` },
      },
    ],
  };

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <section className="relative overflow-hidden bg-ink text-paper">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        <div className="absolute inset-0 bg-blueprint opacity-30" />
        {photoSource ? <a href={photoSource.href} target="_blank" rel="noreferrer" className="absolute right-5 top-5 max-w-[calc(100%-2.5rem)] rounded-full bg-ink/80 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-paper underline underline-offset-2 sm:right-8 sm:top-8">{photoSource.label}</a> : null}

        <div className="container-wide relative py-16 sm:py-20 lg:py-24">
          <Link
            to="/realisations"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-gold"
          >
            <ArrowLeft className="size-3.5" />
            Toutes les réalisations
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] text-paper/65">
            <span className="rounded-full bg-gold px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
              {categoryLabel(project.category)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-gold" />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-gold" />
              {project.year}
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl text-balance text-4xl leading-[1.04] tracking-tight sm:text-5xl lg:text-[58px]">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="container-wide grid gap-12 py-16 lg:grid-cols-[1fr_340px] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              Le projet
            </p>
            <div className="mt-6 space-y-4">
              {photoSource ? <p className="text-xs text-steel">{photoSource.kind === "reference" ? "Cette image est une photo de référence et ne représente pas nécessairement le chantier présenté." : "Photo publiée de ce projet."} <a href={photoSource.href} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-gold-dark">{photoSource.label} · Voir la source</a></p> : null}
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[15px] leading-relaxed text-steel"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {project.images.length ? (
            <Reveal delay={0.1} className="mt-10">
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-steel/70">
                Photos du projet et vues de référence
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.images.map((image, index) => (
                  <div
                    key={image}
                    className={
                      index === 0
                        ? "overflow-hidden rounded-sm sm:col-span-2"
                        : "overflow-hidden rounded-sm"
                    }
                  >
                    <img
                      src={image}
                      alt={`${project.title} — vue ${index + 1}`}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />
                    {getProjectVisualCredit(image) ? <p className="p-2 text-[11px] text-steel"><a href={getProjectVisualCredit(image)!.href} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-gold-dark">{getProjectVisualCredit(image)!.label} · Source</a>{getProjectVisualCredit(image)!.kind === "reference" ? " · photo de référence" : ""}</p> : null}
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>

        <aside className="space-y-5">
          <Reveal>
            <div className="rounded-sm border border-ink/10 bg-white/70 p-6">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
                Fiche technique
              </h2>
              <dl className="mt-5 space-y-4">
                {facts
                  .filter((fact) => fact.value)
                  .map((fact) => (
                    <div key={fact.label} className="border-b border-ink/10 pb-3 last:border-0 last:pb-0">
                      <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-steel/70">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-[13.5px] font-medium text-ink">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="theme-surface theme-card relative overflow-hidden rounded-sm bg-ink p-6 text-paper">
              <div className="absolute inset-0 bg-blueprint opacity-50" />
              <div className="relative">
                <h2 className="font-display text-xl font-semibold leading-snug">
                  Un projet similaire en préparation ?
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-paper/60">
                  Envoyez-nous les grandes lignes : nous vous répondons sous 48
                  heures ouvrées.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Button
                    to="/devis"
                    size="sm"
                    icon={<ArrowUpRight className="size-4" />}
                  >
                    Demander un devis
                  </Button>
                  <Button
                    href={`tel:${SITE.phoneHref}`}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-paper hover:border-gold hover:bg-gold/10 hover:text-gold"
                    icon={<Phone className="size-3.5" />}
                  >
                    {SITE.phone}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </aside>
      </section>

      {related.length ? (
        <section className="border-t border-ink/10 bg-sand/40 py-16">
          <div className="container-wide">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Autres réalisations
              </h2>
              <Link
                to="/realisations"
                className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-steel transition-colors hover:text-gold-dark sm:inline-flex"
              >
                Tout voir
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
            <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2">
              {related.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
