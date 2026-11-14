import { useEffect, useState } from "react";
import { CtaSection } from "../components/sections/CtaSection";
import { ProjectCard } from "../components/ProjectCard";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { fallbackProjects } from "../data/fallback";
import { getProjectsSafe } from "../lib/api";
import { useSeo } from "../lib/seo";
import {
  PROJECT_CATEGORIES,
  categoryLabel,
  type Project,
  type ProjectCategory,
} from "../lib/types";
import { cn } from "../lib/utils";

type Filter = "ALL" | ProjectCategory;

export default function Projects() {
  useSeo({
    title: "Réalisations",
    description:
      "Découvrez des missions de MN Consulting Engineering : études, maîtrise d’œuvre, contrôle et surveillance des travaux au Congo.",
  });

  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [filter, setFilter] = useState<Filter>("ALL");

  useEffect(() => {
    let active = true;
    getProjectsSafe({ limit: 100 }).then((items) => {
      if (active && items.length) setProjects(items);
    });
    return () => {
      active = false;
    };
  }, []);

  const filteredProjects =
    filter === "ALL"
      ? projects
      : projects.filter((project) => project.category === filter);

  const countFor = (category: Filter) =>
    category === "ALL"
      ? projects.length
      : projects.filter((project) => project.category === category).length;

  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title={
          <>
            Des projets concrets, mesurés et{" "}
            <em className="serif-accent text-gradient-gold">documentés.</em>
          </>
        }
        description="Découvrez les missions du cabinet. Chaque fiche précise la provenance des photos et signale clairement les vues de référence lorsqu’elles ne montrent pas le chantier concerné."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Réalisations" }]}
      />

      <section className="container-wide py-16 sm:py-20">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-ink/10 pb-8 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter("ALL")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors",
                  filter === "ALL"
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/15 text-ink/70 hover:border-gold hover:text-gold-dark",
                )}
              >
                Toutes
                <span className="font-mono text-[10px] opacity-60">
                  {countFor("ALL")}
                </span>
              </button>
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors",
                    filter === category
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/15 text-ink/70 hover:border-gold hover:text-gold-dark",
                  )}
                >
                  {categoryLabel(category)}
                  <span className="font-mono text-[10px] opacity-60">
                    {countFor(category)}
                  </span>
                </button>
              ))}
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
              {filteredProjects.length} réalisation
              {filteredProjects.length > 1 ? "s" : ""}
            </p>
          </div>
        </Reveal>

        {filteredProjects.length ? (
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.id} delay={(index % 3) * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-sm border border-dashed border-ink/20 py-16 text-center">
            <p className="font-display text-lg font-semibold">
              Aucune réalisation dans cette catégorie pour le moment.
            </p>
            <p className="mt-2 text-sm text-steel">
              D'autres projets sont en cours de publication.
            </p>
          </div>
        )}
      </section>

      <CtaSection />
    </>
  );
}
