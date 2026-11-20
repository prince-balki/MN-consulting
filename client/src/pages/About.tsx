import { ArrowUpRight, Handshake, Linkedin, MapPin, Ruler, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { CtaSection } from "../components/sections/CtaSection";
import { Button } from "../components/ui/Button";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import {
  CERTIFICATIONS,
  EQUIPMENT,
  STATS,
  TEAM_COMPETENCIES,
  VALUES,
  fallbackTeam,
} from "../data/fallback";
import { getTeamSafe } from "../lib/api";
import { useSeo } from "../lib/seo";
import type { TeamMember } from "../lib/types";
import { initials } from "../lib/utils";

const valueIcons = { Ruler, MapPin, Sparkles, Handshake };

const photoGroups = [
  {
    title: "01 · Les bureaux",
    description: "Vues du bureau d’accueil et de la direction technique, dans l’ordre du dossier.",
    photos: [
      { src: "/equipment/01-bureau-accueil.jpg", alt: "Bureau d’accueil et secrétariat de MN Consulting Engineering" },
      { src: "/equipment/02-direction-technique.jpg", alt: "Espace de travail de la direction technique" },
    ],
  },
  {
    title: "02 · Équipements de terrain",
    description: "Drone, GNSS/DGPS, stations totales, niveaux et théodolites, dans la séquence des pages consacrées au matériel.",
    photos: [
      { src: "/equipment/03-drone.jpg", alt: "Drone professionnel présenté dans le dossier du cabinet" },
      { src: "/equipment/04-gnss.jpg", alt: "Équipement GNSS présenté dans le dossier" },
      { src: "/equipment/05-trepied.jpg", alt: "Trépied pour équipement topographique" },
      { src: "/equipment/06-station-mobile.jpg", alt: "Équipement mobile de levé topographique" },
      { src: "/equipment/07-module-rtk.jpg", alt: "Module de positionnement RTK" },
      { src: "/equipment/07-station-totale.jpg", alt: "Station totale de mesure topographique" },
      { src: "/equipment/08-niveau.jpg", alt: "Niveau optique et mire pour les levés" },
      { src: "/equipment/10-niveau-en-position.jpg", alt: "Niveau optique installé pour un relevé" },
      { src: "/equipment/09-theodolite.jpg", alt: "Théodolite de précision sur trépied" },
      { src: "/equipment/12-theodolite-detail.jpg", alt: "Vue rapprochée d’un théodolite de précision" },
      { src: "/equipment/13-station-totale.jpg", alt: "Station totale installée sur son trépied" },
      { src: "/equipment/10-instrument-topographique.jpg", alt: "Instrument topographique rangé dans son coffret" },
      { src: "/equipment/15-instrument-coffret.jpg", alt: "Instrument de mesure rangé dans son coffret" },
      { src: "/equipment/16-instrument-coffret-detail.jpg", alt: "Autre instrument topographique présenté en coffret" },
    ],
  },
  {
    title: "03 · Impression et reprographie",
    description: "Traceur grand format, imprimantes, scanner et copieur, présentés dans la séquence du PDF.",
    photos: [
      { src: "/equipment/11-traceur-grand-format.jpg", alt: "Traceur grand format pour plans techniques" },
      { src: "/equipment/12-officejet.jpg", alt: "Imprimante et photocopieuse HP OfficeJet" },
      { src: "/equipment/13-scanner.jpg", alt: "Scanner de documents techniques" },
      { src: "/equipment/14-copieur-canon.jpg", alt: "Photocopieur Canon ImageRunner" },
      { src: "/equipment/15-imprimante-hp.jpg", alt: "Imprimante HP OfficeJet" },
    ],
  },
  {
    title: "04 · Moyens roulants",
    description: "Les quatre véhicules sont classés ici dans le même ordre que leurs légendes dans le dossier de présentation.",
    photos: [
      { src: "/equipment/17-pickup-land-cruiser.jpg", alt: "01 · Pick-up Toyota Land Cruiser 4×4 pour les missions de terrain" },
      { src: "/equipment/18-berline.jpg", alt: "02 · Berline de mission" },
      { src: "/equipment/19-toyota-dyna.jpg", alt: "03 · Camion Toyota Dyna pour le transport de matériel" },
      { src: "/equipment/20-mercedes-10-17.jpg", alt: "04 · Camion Mercedes 10/17 pour le transport de matériel" },
    ],
  },
];

const milestones = [
  {
    year: "2013",
    title: "Création de MN Consulting Engineering",
    text: "Narcisse Malanda crée le bureau d’études à Brazzaville. MN Consulting Engineering est inscrit au tableau de l’Ordre des ingénieurs du Congo sous le numéro 16.",
  },
  {
    year: "2013–2025",
    title: "Des missions dans les secteurs public et privé",
    text: "Études et maîtrise d’œuvre pour des bâtiments, établissements de santé et d’enseignement, agences bancaires, ouvrages d’art, infrastructures portuaires et réseaux d’eau, dans plusieurs villes du Congo.",
  },
  {
    year: "2026",
    title: "Des missions multi-sites en cours",
    text: "Études architecturales et supervision de trois maisons départementales de l’emploi à Pointe-Noire, Dolisie et Ouesso, ainsi que des missions de suivi d’immeuble et de réaménagement de bureaux.",
  },
];

export default function About() {
  useSeo({
    title: "Le cabinet",
    description:
      "Découvrez MN Consulting Engineering : bureau d’études techniques créé à Brazzaville en 2013, ses expertises, son équipe et ses moyens.",
  });

  const [team, setTeam] = useState<TeamMember[]>(fallbackTeam);

  useEffect(() => {
    let active = true;
    getTeamSafe().then((members) => {
      if (active && members.length) setTeam(members);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Le cabinet · Depuis 2013"
        title={
          <>
            Une ingénierie{" "}
            <em className="serif-accent text-gradient-gold">
              ancrée dans le réel
            </em>
            , tournée vers l'avenir.
          </>
        }
        description="MN Consulting Engineering est un bureau congolais d’études techniques et d’ingénierie. Nous intervenons de la faisabilité à l’exécution, au contrôle et au suivi des travaux."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Le cabinet" }]}
      />

      <section className="container-wide grid gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Notre mission"
            title="Concevoir des ouvrages utiles, durables et adaptés au Congo."
            description="Les infrastructures structurent le développement d'un pays. Notre rôle est de transformer les intentions en solutions techniques réalistes, chiffrées et constructibles."
          />
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-steel">
            Nous travaillons avec les administrations, les collectivités, les
            bailleurs et les investisseurs privés. Chaque mission commence par
            une écoute attentive et se poursuit par des études documentées,
            vérifiables et conformes aux normes en vigueur.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-steel">
            Notre indépendance est notre meilleur atout : nous ne vendons ni
            matériaux ni travaux. Notre seul intérêt est la qualité de l'ouvrage
            et la réussite de votre projet.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-ink/10 pt-6">
            {STATS.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold tracking-tight">
                  {stat.value}
                  <span className="text-gold-dark">{stat.suffix}</span>
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-steel">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <figure className="relative mx-auto w-full max-w-[460px] overflow-hidden rounded-sm border border-ink/10 bg-sand shadow-card">
            <figcaption className="theme-surface relative bg-ink px-5 py-4 text-paper sm:px-6">
              <p className="font-display text-lg font-semibold tracking-tight">
                Narcisse Malanda
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                Fondateur · Directeur général
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="border-y border-ink/10 bg-white/50 py-20">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Nos valeurs"
              title="Ce qui guide chacune de nos décisions."
              description="Quatre principes simples, appliqués sans exception sur tous nos projets."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => {
              const Icon =
                valueIcons[value.icon as keyof typeof valueIcons] ?? Ruler;
              return (
                <Reveal key={value.title} delay={index * 0.06} className="h-full">
                  <article className="h-full rounded-sm border border-ink/10 bg-paper p-6">
                    <span className="grid size-11 place-items-center rounded-sm bg-gold/15 text-gold-dark">
                      <Icon className="size-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-steel">
                      {value.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-wide py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Notre histoire"
            title="Une expertise construite au fil des missions."
            description="Une croissance progressive, portée par la confiance de nos clients et l'engagement de nos équipes."
          />
        </Reveal>

        <div className="mt-10">
          {milestones.map((milestone, index) => (
            <Reveal key={milestone.year} delay={Math.min(index * 0.04, 0.2)}>
              <div className="grid gap-4 border-t border-ink/10 py-6 sm:grid-cols-[120px_1fr] sm:gap-8">
                <span className="font-display text-2xl font-bold text-gold-dark">
                  {milestone.year}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {milestone.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-steel">
                    {milestone.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand/40 py-20">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="L'équipe"
              title="Des ingénieurs engagés, proches de vos chantiers."
              description="Une équipe pluridisciplinaire qui couvre l'ensemble du cycle de vie des projets."
            />
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.id} delay={index * 0.06}>
                <article className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand">
                    {member.photo && member.name !== "Narcisse Malanda" ? (
                      <img
                        src={member.photo}
                        alt={`${member.name} — ${member.role}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="grid h-full place-items-center bg-ink font-display text-4xl font-bold text-gold">
                        {initials(member.name)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Profil LinkedIn de ${member.name}`}
                        className="absolute bottom-4 right-4 grid size-9 translate-y-2 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gold"
                      >
                        <Linkedin className="size-4" />
                      </a>
                    ) : null}
                  </div>
                  <h3 className="mt-4 font-display text-[17px] font-semibold tracking-tight">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-gold-dark">
                    {member.role}
                  </p>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-steel">
                    {member.bio}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide grid gap-12 py-20 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            eyebrow="Compétences mobilisées"
            title="Une équipe pluridisciplinaire, adaptée à chaque mission."
            description="Le bureau mobilise les compétences nécessaires selon la nature et l’ampleur du projet."
          />
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {TEAM_COMPETENCIES.map((item) => (
              <li key={item} className="rounded-sm border border-ink/10 bg-white/60 p-3 text-[13px] text-ink/80">{item}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="Moyens techniques"
            title="Des outils de terrain et de conception."
            description="Équipements de levés, production de plans et logiciels de calcul appuient les études et le suivi."
          />
          <ul className="mt-7 space-y-3">
            {EQUIPMENT.map((item) => (
              <li key={item} className="flex gap-3 border-b border-ink/10 pb-3 text-[13px] leading-relaxed text-steel"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-dark" />{item}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="border-y border-ink/10 bg-sand/40 py-20">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Galerie du dossier de présentation"
              title="Les locaux et les équipements, dans leur ordre d’origine."
              description="Les photographies ci-dessous proviennent de la présentation de MN Consulting Engineering. Les documents d’immatriculation et les pièces fiscales ne sont pas publiés."
            />
          </Reveal>
          <div className="mt-12 space-y-14">
            {photoGroups.map((group, groupIndex) => (
              <Reveal key={group.title} delay={groupIndex * 0.04}>
                <div className="mb-5 flex flex-col gap-2 border-b border-ink/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{group.title}</h3>
                  <p className="max-w-xl text-[12px] leading-relaxed text-steel">{group.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.photos.map((photo, photoIndex) => (
                    <figure key={photo.src} className="overflow-hidden rounded-sm border border-ink/10 bg-white shadow-sm">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className={`aspect-[4/3] w-full ${photo.src.includes("03-drone") ? "bg-white object-contain p-5" : "object-cover"}`}
                      />
                      <figcaption className="flex items-center gap-3 px-4 py-3 text-[12px] text-steel">
                        <span className="font-mono text-[9px] text-gold-dark">{String(photoIndex + 1).padStart(2, "0")}</span>
                        {photo.alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-surface relative overflow-hidden bg-ink py-20 text-paper">
        <div className="absolute inset-0 bg-blueprint opacity-50" />
        <div className="container-wide relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Nos garanties"
              title="La confiance se prouve, elle ne se déclare pas."
              description="Une inscription professionnelle, un contrôle interne des livrables et un suivi des réserves jusqu’à leur levée."
              tone="dark"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2">
              {CERTIFICATIONS.map((certification) => (
                <li
                  key={certification}
                  className="flex items-start gap-3 bg-ink-soft p-5 text-[13px] leading-relaxed text-paper/70"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  {certification}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                to="/contact"
                variant="outline"
                className="border-white/20 text-paper hover:border-gold hover:bg-gold/10 hover:text-gold"
                icon={<ArrowUpRight className="size-4" />}
              >
                Rencontrer l'équipe
              </Button>
              <Button
                to="/carrieres"
                variant="outline"
                className="border-white/20 text-paper hover:border-gold hover:bg-gold/10 hover:text-gold"
                icon={<ArrowUpRight className="size-4" />}
              >
                Nous rejoindre
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
