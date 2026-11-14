import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../lib/types";
import { categoryLabel } from "../lib/types";
import { projectVisualBadge } from "../lib/projectVisuals";

interface ProjectCardProps {
  project: Project;
  large?: boolean;
}

export function ProjectCard({ project, large = false }: ProjectCardProps) {
  const visualBadge = projectVisualBadge(project.coverImage);
  if (large) {
    return (
      <Link
        to={`/realisations/${project.slug}`}
        className="group block"
        aria-label={`Voir la réalisation : ${project.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-ink-soft ring-1 ring-ink/10 transition-all duration-300 group-hover:ring-gold/40 lg:aspect-[21/9]">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={`${project.title} — ${project.location}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-90 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0 bg-blueprint opacity-70" aria-hidden="true" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
          <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-paper/95 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink shadow-sm sm:left-7 sm:top-7">
            <span className="mr-2 size-1.5 rotate-45 bg-[linear-gradient(135deg,#e9b75b,#14a67e)]" />
            {categoryLabel(project.category)}{visualBadge ? ` · ${visualBadge}` : ""}
          </span>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-6 sm:inset-x-7 sm:bottom-7">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-paper/75">
                <MapPin className="size-3.5 text-jade-light" />
                {project.location} · {project.year}
              </span>
              <h3 className="mt-3 max-w-xl font-display text-2xl font-semibold leading-tight tracking-tight text-paper transition-colors group-hover:text-gold sm:text-3xl lg:text-4xl">
                {project.title}
              </h3>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-ink shadow-glow-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowUpRight className="size-5" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/realisations/${project.slug}`}
      className="group block"
      aria-label={`Voir la réalisation : ${project.title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ink-soft ring-1 ring-ink/10 transition-all duration-300 group-hover:ring-gold/40">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={`${project.title} — ${project.location}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 bg-blueprint opacity-70" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-paper/95 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink shadow-sm">
          <span className="mr-2 size-1.5 rotate-45 bg-[linear-gradient(135deg,#e9b75b,#14a67e)]" />
          {categoryLabel(project.category)}{visualBadge ? ` · ${visualBadge}` : ""}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-paper/90">
          <MapPin className="size-3.5 text-jade-light" />
          {project.location} · {project.year}
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="max-w-[88%] font-display text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-gold-dark sm:text-xl">
          {project.title}
        </h3>
        <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 text-steel transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink group-hover:shadow-glow-gold">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
