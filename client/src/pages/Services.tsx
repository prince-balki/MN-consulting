import { ArrowUpRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Accordion } from "../components/Accordion";
import { JsonLd } from "../components/JsonLd";
import { CtaSection } from "../components/sections/CtaSection";
import { Button } from "../components/ui/Button";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { FAQS, fallbackServices } from "../data/fallback";
import { getServicesSafe } from "../lib/api";
import { getServiceIcon } from "../lib/icons";
import { useSeo } from "../lib/seo";
import type { Service } from "../lib/types";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Services() {
  useSeo({
    title: "Nos expertises",
    description:
      "Architecture, études techniques, structures, maîtrise d’œuvre, contrôle, diagnostics et expertises immobilières au Congo.",
  });

  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    let active = true;
    getServicesSafe().then((items) => {
      if (active && items.length) setServices(items);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow="Nos expertises"
        title={
          <>
            De l'étude à la réception, nous couvrons{" "}
            <em className="serif-accent text-gradient-gold">
              tout le cycle de vie
            </em>{" "}
            de votre ouvrage.
          </>
        }
        description="Des pôles complémentaires, une seule équipe. Nous intervenons de la faisabilité aux études d’exécution, au contrôle des travaux et aux expertises."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Expertises" }]}
      />

      <section className="container-wide py-16 sm:py-20">
        <Reveal>
          <div className="grid gap-6 border-b border-ink/10 pb-10 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dark">
                Approche intégrée
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-steel">
                Une seule équipe de l'étude à la réception, sans rupture de
                responsabilité.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dark">
                Normes & preuves
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-steel">
                Calculs vérifiés, essais documentés, reporting transparent.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dark">
                Présence terrain
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-steel">
                Des missions réalisées dans plusieurs villes du Congo.
              </p>
            </div>
          </div>
        </Reveal>

        {services.map((service, index) => {
          const Icon = getServiceIcon(service.icon);
          return (
            <Reveal key={service.id}>
              <article
                id={service.slug}
                className="scroll-mt-32 border-b border-ink/10 py-10 lg:py-14"
              >
                <div className="grid gap-8 lg:grid-cols-[72px_1fr_300px] lg:gap-12">
                  <div>
                    <span className="font-mono text-[11px] text-steel/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-4 grid size-12 place-items-center rounded-sm bg-ink text-gold">
                      <Icon className="size-5" strokeWidth={1.7} />
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[30px]">
                      {service.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-steel">
                      {service.description}
                    </p>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-[13.5px] text-ink/80"
                        >
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/20">
                            <Check className="size-3 text-gold-dark" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-fit rounded-sm border border-ink/10 bg-white/60 p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-steel/70">
                      En résumé
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-steel">
                      {service.excerpt}
                    </p>
                    <Button
                      to="/devis"
                      variant="dark"
                      size="sm"
                      className="mt-5 w-full"
                      icon={<ArrowUpRight className="size-4" />}
                    >
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>

      <section
        id="faq"
        className="scroll-mt-32 border-y border-ink/10 bg-sand/40 py-20"
      >
        <div className="container-wide grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Questions fréquentes"
              title="Vous vous posez les bonnes questions."
              description="Délais, zones d'intervention, bailleurs, reprise de projets : voici les réponses aux questions que l'on nous pose le plus souvent."
            />
            <div className="mt-7">
              <Button
                to="/contact"
                variant="outline"
                icon={<ArrowUpRight className="size-4" />}
              >
                Poser une autre question
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={FAQS} />
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
