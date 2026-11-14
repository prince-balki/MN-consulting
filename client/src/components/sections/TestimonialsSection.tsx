import type { Testimonial } from "../../lib/types";
import { TestimonialCard } from "../TestimonialCard";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;
  return (
    <section className="relative overflow-hidden border-t border-ink/10 bg-[linear-gradient(180deg,#f2ecdd_0%,#f7f3e9_55%,#efe8d8_100%)] py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-jade/10 blur-[110px]" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none font-serif text-[190px] leading-none text-ink/[0.035]"
      >
        “
      </span>
      <div className="container-wide relative">
        <Reveal>
          <SectionHeading
            eyebrow="Témoignages"
            title={
              <>
                La confiance{" "}
                <em className="serif-accent text-jade-dark">se construit</em>,
                elle aussi.
              </>
            }
            description="Maîtres d'ouvrage publics et privés nous confient leurs projets les plus exigeants. Voici ce qu'ils en disent."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.07} className="h-full">
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
