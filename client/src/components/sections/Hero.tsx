import { ArrowUpRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE, STATS } from "../../data/fallback";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { StatCounter } from "../ui/StatCounter";

export function Hero() {
  const yearsSinceFounded = new Date().getFullYear() - SITE.founded;

  return (
    <section className="theme-surface grain relative overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-blueprint opacity-50" />
      <div className="absolute -left-40 top-1/4 size-[560px] rounded-full bg-jade/15 blur-[170px]" />
      <div className="absolute -right-28 top-0 size-[420px] rounded-full bg-gold/10 blur-[150px]" />
      <div className="absolute -bottom-32 right-1/3 size-[380px] rounded-full bg-jade-light/10 blur-[140px]" />

      <div className="container-wide relative grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
        <div>
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-[linear-gradient(90deg,#e9b75b,#5fe3bf)]" />
              Bureau d'études · Brazzaville
            </span>

            <h1 className="mt-6 text-balance text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-[62px]">
              Bâtir les infrastructures{" "}
              <em className="serif-accent text-gradient-aurora">
                qui font avancer
              </em>{" "}
              le Congo.
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper/65 sm:text-base">
              MN Consulting Engineering est un bureau d’études techniques et
              d’ingénierie basé à Brazzaville. Nous intervenons en architecture,
              structures, maîtrise d’œuvre, contrôle des travaux et expertise
              immobilière.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                to="/realisations"
                size="lg"
                icon={<ArrowUpRight className="size-4" />}
              >
                Découvrir nos réalisations
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="lg"
                className="border-white/20 text-paper hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                Parler à un ingénieur
              </Button>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[12px] text-paper/60">
              {[
                "Études & faisabilité",
                "Maîtrise d'œuvre",
                "Contrôle qualité",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.15}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-7 sm:gap-8"
          >
            {STATS.slice(0, 3).map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                tone="dark"
              />
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative mx-auto w-full max-w-[460px] lg:max-w-[500px]">
          <div className="absolute -left-5 -top-5 h-full w-full rounded-sm border border-gold/30" />
          <div className="relative rounded-sm bg-[linear-gradient(150deg,rgba(233,183,91,0.8),rgba(20,166,126,0.55)_45%,rgba(255,255,255,0.08))] p-px shadow-[0_45px_100px_-45px_rgba(20,166,126,0.55)]">
            <div className="relative overflow-hidden rounded-[1px] bg-ink-soft">
              <div className="on-media relative px-8 py-32">
                <Link to="/a-propos" className="group block">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-jade-light">
                    Fondateur · Directeur général
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold leading-tight text-paper">
                    Narcisse Malanda
                  </p>
                  <p className="mt-1 text-xs text-paper/70">
                    MN Consulting Engineering · {SITE.city}
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="on-media animate-float-slow absolute -right-6 top-16 hidden items-center gap-3 rounded-sm border border-white/15 bg-ink/70 px-4 py-3 text-paper shadow-card backdrop-blur-md [animation-delay:1.8s] sm:flex">
            <ShieldCheck className="size-4 text-jade-light" />
            <div>
              <p className="text-[11px] font-semibold leading-none">
                Assurance qualité
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-paper/50">
                Procédures internes
              </p>
            </div>
          </div>

          <div className="animate-float-slow absolute -left-10 top-12 hidden rounded-sm bg-paper p-4 text-ink shadow-card ring-1 ring-white/60 sm:block">
            <p className="serif-accent text-3xl leading-none">
              {yearsSinceFounded}<span className="text-gold-dark">+</span>
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-steel">
              ans depuis la création
            </p>
          </div>

          <div className="absolute -bottom-6 -right-4 hidden rounded-sm bg-gold-foil p-5 text-ink shadow-glow-gold ring-1 ring-white/40 sm:block">
            <p className="serif-accent text-3xl leading-none">16</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/70">
              inscription à l’Ordre
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-wide flex h-14 items-center justify-between gap-6">
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="animate-marquee flex w-max items-center gap-8 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40">
              {[
                "Études de faisabilité",
                "Maîtrise d'œuvre",
                "Contrôle qualité",
                "Conseil stratégique",
                "Gestion de projets",
                "Études de faisabilité",
                "Maîtrise d'œuvre",
                "Contrôle qualité",
                "Conseil stratégique",
                "Gestion de projets",
              ].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex items-center gap-8 whitespace-nowrap"
                  aria-hidden={index >= 5}
                >
                  {item}
                  <span className="size-1 rotate-45 bg-gold/60" />
                </span>
              ))}
            </div>
          </div>
          <span className="hidden shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/35 sm:flex">
            <MapPin className="size-3 text-gold" />
            Interventions dans plusieurs villes du Congo
          </span>
        </div>
      </div>
    </section>
  );
}
