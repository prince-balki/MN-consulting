import { Quote, Star } from "lucide-react";
import type { Testimonial } from "../lib/types";
import { initials } from "../lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-sm border border-ink/10 bg-white/75 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label={`Note : ${testimonial.rating} sur 5`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={
                index < testimonial.rating
                  ? "size-3.5 fill-gold text-gold"
                  : "size-3.5 text-ink/15"
              }
            />
          ))}
        </div>
        <Quote className="size-7 text-jade/35" />
      </div>

      <blockquote className="mt-5 flex-1 text-[14.5px] leading-relaxed text-ink/80">
        “{testimonial.content}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,#0b261e,#0a6b52)] font-display text-[12px] font-bold text-gold ring-1 ring-white/10">
          {initials(testimonial.name)}
        </span>
        <span>
          <span className="block text-[13px] font-semibold text-ink">
            {testimonial.name}
          </span>
          <span className="block text-[11.5px] text-steel">
            {testimonial.role}, {testimonial.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
