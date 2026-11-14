import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE } from "../../data/fallback";
import { JsonLd } from "../JsonLd";

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  crumbs?: Crumb[];
}

export function PageHero({ eyebrow, title, description, crumbs }: PageHeroProps) {
  const { pathname } = useLocation();
  const currentPath =
    pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const breadcrumbJsonLd = crumbs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => {
          const to = crumb.to ?? currentPath;
          return {
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: to === "/" ? `${SITE.url}/` : `${SITE.url}${to}`,
          };
        }),
      }
    : null;

  return (
    <>
      {breadcrumbJsonLd ? <JsonLd data={breadcrumbJsonLd} /> : null}
      <section className="theme-surface grain relative overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-blueprint opacity-40" />
      <div className="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-jade/15 blur-[140px]" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(233,183,91,0.45),rgba(20,166,126,0.45),transparent)]" />

      <div className="container-wide relative py-16 sm:py-20 lg:py-24">
        {crumbs?.length ? (
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[11px] text-paper/45">
              {crumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                  {crumb.to ? (
                    <Link
                      to={crumb.to}
                      className="transition-colors hover:text-gold"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-paper/70">{crumb.label}</span>
                  )}
                  {index < crumbs.length - 1 ? (
                    <ChevronRight className="size-3 text-paper/30" />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <span className="eyebrow inline-flex items-center gap-3 text-gold">
          <span className="h-px w-8 bg-[linear-gradient(90deg,#e9b75b,#5fe3bf)]" />
          {eyebrow}
        </span>

        <h1 className="mt-6 max-w-4xl text-balance text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-[64px]">
          {title}
        </h1>

        {description ? (
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-paper/65 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      <span className="pointer-events-none absolute -bottom-8 right-6 hidden select-none font-serif text-[150px] italic leading-none text-white/[0.03] lg:block">
        MM
      </span>
      </section>
    </>
  );
}
