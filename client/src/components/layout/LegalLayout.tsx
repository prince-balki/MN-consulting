import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SITE } from "../../data/fallback";
import { PageHero } from "../ui/PageHero";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalLayoutProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalLayout({
  eyebrow,
  title,
  description,
  updated,
  sections,
}: LegalLayoutProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        crumbs={[{ label: "Accueil", to: "/" }, { label: eyebrow }]}
      />

      <section className="container-wide py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[250px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">Sommaire</p>
            <nav aria-label="Sommaire de la page" className="mt-5">
              <ol className="grid grid-cols-2 gap-x-5 gap-y-1 lg:block lg:space-y-1 lg:border-l lg:border-ink/10">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px flex gap-2 border-l-2 border-transparent py-1.5 text-[12px] leading-snug text-steel transition-colors hover:border-gold hover:text-ink lg:gap-3 lg:pl-4 lg:text-[12.5px]"
                    >
                      <span className="mt-0.5 font-mono text-[9px] text-gold-dark">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-8 hidden rounded-sm border border-ink/10 bg-sand/40 p-5 lg:block">
              <ShieldCheck className="size-5 text-gold-dark" />
              <p className="mt-3 font-display text-[15px] font-semibold tracking-tight">
                Une question sur vos données ?
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-steel">
                Notre équipe vous répond et vous accompagne dans l'exercice de
                vos droits.
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-gold-dark transition-colors hover:text-ink"
              >
                <Mail className="size-3.5" />
                {SITE.email}
              </a>
              <Link
                to="/contact"
                className="mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-steel transition-colors hover:text-gold-dark"
              >
                Nous contacter
                <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </aside>

          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
              Dernière mise à jour : {updated}
            </p>

            <div className="mt-10 space-y-12">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 border-t border-ink/10 pt-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 font-mono text-[10px] text-gold-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-2xl font-semibold tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="legal-copy mt-5">{section.content}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
