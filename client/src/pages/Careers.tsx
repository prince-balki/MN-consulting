import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Compass,
  GraduationCap,
  HardHat,
  MapPin,
  Send,
  Target,
  Users,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SITE } from "../data/fallback";
import { useSeo } from "../lib/seo";

const reasons = [
  {
    Icon: HardHat,
    title: "Des projets concrets",
    text: "Routes, ponts, bâtiments, réseaux d'eau : vos études deviennent des ouvrages visibles et utiles au Congo.",
  },
  {
    Icon: GraduationCap,
    title: "Une exigence de formation",
    text: "Mentorat, revues techniques et veille normative pour progresser sur des projets de plus en plus complexes.",
  },
  {
    Icon: Users,
    title: "Une équipe pluridisciplinaire",
    text: "Ingénieurs, géomètres, économistes et chefs de projet travaillent ensemble, du diagnostic à la réception.",
  },
  {
    Icon: MapPin,
    title: "Le terrain au centre",
    text: "Nos équipes vont sur les chantiers, à Brazzaville comme en province, pour confronter les plans au réel.",
  },
];

const profiles = [
  {
    Icon: HardHat,
    title: "Ingénierie structurelle",
    text: "Calcul de structures béton et métal, dimensionnement, notes de calcul et suivi de l'exécution.",
  },
  {
    Icon: Compass,
    title: "Maîtrise d'œuvre & travaux",
    text: "Planification, coordination de chantier, contrôle qualité et interface avec les entreprises.",
  },
  {
    Icon: Target,
    title: "Topographie & SIG",
    text: "Relevés de terrain, modélisation, cartographie et exploitation de données géospatiales.",
  },
];

const steps = [
  {
    title: "Candidature",
    text: "Envoyez votre CV et une courte note expliquant le type de missions qui vous intéresse.",
  },
  {
    title: "Échange technique",
    text: "Un responsable métier étudie votre parcours et vous propose un échange approfondi.",
  },
  {
    title: "Cas pratique",
    text: "Selon le profil, un exercice technique court permet de valider les compétences clés.",
  },
  {
    title: "Rencontre d'équipe",
    text: "Nous vous présentons le cabinet, vos futurs collègues et les conditions de collaboration.",
  },
];

const applicationEmail = `mailto:${SITE.email}?subject=${encodeURIComponent(
  "Candidature spontanée — MN Consulting Engineering",
)}`;

export default function Careers() {
  useSeo({
    title: "Carrières",
    description:
      "Rejoignez MN Consulting Engineering : ingénieurs, architectes, géomètres et professionnels du génie civil. Candidatures à Brazzaville.",
  });

  return (
    <>
      <PageHero
        eyebrow="Carrières · Rejoignez-nous"
        title={
          <>
            Construisez des ouvrages{" "}
            <em className="serif-accent text-gradient-gold">qui comptent.</em>
          </>
        }
        description="Nous cherchons des professionnels rigoureux, curieux et attachés au terrain, prêts à faire avancer l'ingénierie congolaise."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Carrières" }]}
      />

      <section className="container-wide grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Pourquoi nous rejoindre"
            title="Un cabinet à taille humaine, des projets à grande échelle."
            description="Chez MN Consulting Engineering, les missions réunissent architecture, ingénierie, études techniques et suivi des travaux."
          />
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-steel">
            Nous croyons que la qualité d'un ouvrage commence par la qualité de
            ceux qui le conçoivent. Nous investissons dans la formation, la
            sécurité et la reconnaissance du travail bien fait.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12.5px] text-steel">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-jade-dark" />
              Basé à Brazzaville
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-jade-dark" />
              Missions nationales
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-jade-dark" />
              Candidatures spontanées
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-sm">
            <img
              src="/mn-plotter.jpg"
              alt="Traceur grand format utilisé par l’équipe de MN Consulting Engineering"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="border-y border-ink/10 bg-white/50 py-20">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Ce qui nous distingue"
              title="Une culture d'ingénierie, pas une promesse."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.06} className="h-full">
                <article className="h-full rounded-sm border border-ink/10 bg-paper p-6">
                  <span className="grid size-11 place-items-center rounded-sm bg-gold/15 text-gold-dark">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-steel">
                    {text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Profils recherchés"
            title="Les compétences qui font avancer nos projets."
            description="Nous étudions les candidatures spontanées tout au long de l'année. Les profils ci-dessous correspondent à nos besoins récurrents."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {profiles.map(({ Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-sm border border-ink/10 bg-sand/30 p-6">
                <Icon className="size-6 text-gold-dark" strokeWidth={1.6} />
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-steel">
                  {text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand/40 py-20">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Notre processus"
              title="Quatre étapes, zéro mystère."
              description="Nous voulons que chaque candidature reçoive une réponse claire et un calendrier réaliste."
            />
          </Reveal>

          <div className="space-y-0">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <div className="grid gap-4 border-t border-ink/10 py-5 sm:grid-cols-[48px_1fr]">
                  <span className="font-display text-2xl font-bold text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-steel">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-surface relative overflow-hidden bg-ink py-20 text-paper">
        <div className="absolute inset-0 bg-aurora opacity-80" />
        <div className="absolute inset-0 bg-blueprint opacity-30" />
        <div className="container-wide relative">
          <Reveal className="max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-[linear-gradient(90deg,#e9b75b,#5fe3bf)]" />
              Candidature spontanée
            </span>
            <h2 className="mt-5 text-balance text-3xl leading-[1.08] tracking-tight sm:text-4xl lg:text-[44px]">
              Votre parcours ne rentre pas dans une case ?{" "}
              <em className="serif-accent text-gradient-gold">
                Écrivez-nous quand même.
              </em>
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-paper/65">
              Envoyez votre CV et quelques lignes sur les missions qui vous
              motivent. Nous lisons chaque candidature et revenons vers vous
              lorsqu'un besoin correspond à votre profil.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={applicationEmail}
                size="lg"
                icon={<Send className="size-4" />}
              >
                Envoyer ma candidature
              </Button>
              <Button
                to="/a-propos"
                variant="outline"
                size="lg"
                className="border-white/20 text-paper hover:border-gold hover:bg-gold/10 hover:text-gold"
                icon={<ArrowUpRight className="size-4" />}
              >
                Découvrir l'équipe
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-[12px] text-paper/50">
              <Briefcase className="size-3.5 text-gold" />
              Candidatures traitées de manière confidentielle · {SITE.hours}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
