import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const commitments = [
  "Études de faisabilité à plans de détail",
  "Maîtrise d’œuvre et assistance technique",
  "Contrôle et surveillance des travaux",
  "Expertises immobilières et diagnostics",
];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-[linear-gradient(180deg,#fbf8f0_0%,rgba(255,255,255,0.7)_60%,#f7f3e9_100%)] py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-24 top-16 size-72 rounded-full bg-jade/10 blur-[110px]" />
      <div className="container-wide grid gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative mx-auto w-full max-w-[540px]">
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-sm ring-1 ring-ink/10">
              <img
                src="/equipment/01-bureau-accueil.jpg"
                alt="Équipe MN Consulting Engineering au bureau"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <div className="mt-12 overflow-hidden rounded-sm ring-1 ring-ink/10">
              <img
                src="/equipment/07-station-totale.jpg"
                alt="Station totale utilisée pour les levés topographiques"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>

          <div className="absolute -bottom-6 left-6 rounded-sm bg-[linear-gradient(145deg,#0b261e,#061712)] p-5 text-paper shadow-card ring-1 ring-white/10">
            <p className="serif-accent text-4xl leading-none text-gold">2013</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/55">
              Créé à Brazzaville
            </p>
          </div>

          <div className="absolute -right-4 top-0 hidden rounded-sm border border-gold/40 bg-paper px-4 py-3 sm:block">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-steel">
              Ordre des ingénieurs · n° 16
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <SectionHeading
            eyebrow="Le cabinet"
            title={
              <>
                Une ingénierie de proximité, adaptée aux{" "}
                <em className="serif-accent text-jade-dark">
                  réalités du terrain.
                </em>
              </>
            }
            description="Créé à Brazzaville en 2013 par Narcisse Malanda, MN Consulting Engineering est un bureau d’études techniques intervenant en architecture, bâtiment, génie civil et travaux publics."
          />

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-steel">
            Le bureau intervient auprès de maîtres d’ouvrage publics, privés et
            industriels. Ses missions couvrent les études de faisabilité, la
            conception, les dossiers d’exécution, le contrôle et la surveillance
            des travaux.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {commitments.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-ink/80">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-jade/15">
                  <Check className="size-3 text-jade-dark" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-7">
            <Button
              to="/a-propos"
              variant="dark"
              icon={<ArrowUpRight className="size-4" />}
            >
              Découvrir notre histoire
            </Button>
            <div>
              <p className="font-display text-[15px] font-semibold">Narcisse Malanda</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-steel">
                Directeur général
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
