import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROCESS_STEPS } from "../../data/fallback";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function ProcessSection() {
  return (
    <section className="theme-surface grain relative overflow-hidden bg-ink py-20 text-paper sm:py-24">
      <div className="absolute inset-0 bg-aurora opacity-70" />
      <div className="absolute inset-0 bg-blueprint opacity-40" />
      <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-jade/15 blur-[130px]" />
      <div className="absolute -left-24 top-0 size-72 rounded-full bg-gold/10 blur-[120px]" />

      <div className="container-wide relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Notre méthode"
              title={
                <>
                  Une{" "}
                  <em className="serif-accent text-gradient-gold">exigence</em>{" "}
                  à chaque étape.
                </>
              }
              description="Un processus éprouvé, jalonné et documenté, pour que chaque décision soit fondée sur des faits et non sur des hypothèses."
              tone="dark"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/devis"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:text-paper"
            >
              Lancer votre projet
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.number} delay={(index % 5) * 0.05} className="h-full">
              <article className="group relative flex h-full flex-col bg-ink-soft p-6 transition-colors hover:bg-ink-line/70">
                <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(233,183,91,0.6),rgba(20,166,126,0.6),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="serif-accent text-xl leading-none text-gold">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-[17px] font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-paper/55">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
