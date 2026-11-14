import { ArrowUpRight } from "lucide-react";
import type { Service } from "../../lib/types";
import { ServiceCard } from "../ServiceCard";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#f7f3e9,#fbf8f0)] py-20 sm:py-24">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Nos expertises"
              title={
                <>
                  Six disciplines, une même
                  <br className="hidden sm:block" />{" "}
                  <em className="serif-accent text-jade-dark">
                    exigence de précision.
                  </em>
                </>
              }
              description="De l'étude géotechnique au contrôle de réception, nous intervenons sur toute la chaîne de valeur du génie civil."
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Button
              to="/services"
              variant="outline"
              icon={<ArrowUpRight className="size-4" />}
            >
              Toutes nos prestations
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 0.06} className="h-full">
              <ServiceCard
                service={service}
                index={index}
                featured={index === 0}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
