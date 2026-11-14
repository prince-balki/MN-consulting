import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { getServiceIcon } from "../lib/icons";
import type { Service } from "../lib/types";
import { cn } from "../lib/utils";

interface ServiceCardProps {
  service: Service;
  index: number;
  featured?: boolean;
}

export function ServiceCard({ service, index, featured = false }: ServiceCardProps) {
  const Icon = getServiceIcon(service.icon);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7",
        featured
          ? "border border-white/10 bg-[linear-gradient(160deg,#0b261e,#061712_58%,#0a3a2c)] text-paper shadow-[0_40px_80px_-42px_rgba(4,20,15,0.75)] hover:border-gold/40"
          : "border border-ink/10 bg-[linear-gradient(165deg,rgba(255,255,255,0.9),rgba(247,243,233,0.65))] hover:border-jade/35 hover:shadow-[0_32px_70px_-38px_rgba(20,166,126,0.55)]",
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(233,183,91,0.7),rgba(20,166,126,0.7),transparent)] transition-opacity duration-300",
          featured ? "opacity-80" : "opacity-0 group-hover:opacity-100",
        )}
      />
      <div className="relative flex items-start justify-between">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-sm ring-1 transition-colors duration-300",
            featured
              ? "bg-gold-foil text-ink shadow-glow-gold ring-white/40"
              : "bg-[linear-gradient(145deg,#0b261e,#0a6b52)] text-gold shadow-[0_12px_30px_-16px_rgba(10,107,82,0.9)] ring-white/10 group-hover:bg-[linear-gradient(115deg,#f3d38c,#e9b75b_50%,#cf9432)] group-hover:text-ink group-hover:ring-white/40",
          )}
        >
          <Icon className="size-5" strokeWidth={1.7} />
        </span>
        {featured ? (
          <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-gold">
            Expertise phare
          </span>
        ) : (
          <span className="font-mono text-[11px] text-jade-dark/45">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <h3
        className={cn(
          "mt-6 font-display text-xl font-semibold tracking-tight",
          featured && "text-paper",
        )}
      >
        {service.title}
      </h3>
      <p
        className={cn(
          "mt-2.5 text-[14px] leading-relaxed",
          featured ? "text-paper/60" : "text-steel",
        )}
      >
        {service.excerpt}
      </p>

      <ul className="mt-5 space-y-2">
        {service.features.slice(0, 4).map((feature) => (
          <li
            key={feature}
            className={cn(
              "flex items-start gap-2 text-[13px]",
              featured ? "text-paper/75" : "text-ink/75",
            )}
          >
            <Check
              className={cn(
                "mt-0.5 size-3.5 shrink-0",
                featured ? "text-gold" : "text-jade-dark",
              )}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/services#${service.slug}`}
        className={cn(
          "mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors",
          featured ? "text-gold hover:text-paper" : "text-ink hover:text-gold-dark",
        )}
      >
        En savoir plus
        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
