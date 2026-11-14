import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SITE } from "../../data/fallback";
import { fallbackServices } from "../../data/fallback";
import { Logo } from "../Logo";

const navigation = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "Le cabinet" },
  { to: "/services", label: "Expertises" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/contact", label: "Contact" },
  { to: "/carrieres", label: "Carrières" },
  { to: "/devis", label: "Demander un devis" },
];

const socials = [
  { href: SITE.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SITE.social.facebook, label: "Facebook", Icon: Facebook },
  { href: SITE.social.instagram, label: "Instagram", Icon: Instagram },
].filter(({ href }) => Boolean(href));

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-surface grain relative overflow-hidden bg-ink text-paper">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(233,183,91,0.6),rgba(20,166,126,0.6),transparent)]" />
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 bg-blueprint opacity-30" />
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-jade/10 blur-[120px]" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-[130px]" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none font-display text-[24vw] font-extrabold leading-none tracking-tighter text-white/[0.025]"
      >
        MM
      </span>

      <div className="container-wide relative">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 py-10 sm:flex-row sm:items-center">
          <p className="max-w-md font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
            Un ouvrage à{" "}
            <em className="serif-accent text-gold">concevoir</em>, sécuriser ou
            piloter ?
          </p>
          <Link
            to="/devis"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold transition-colors hover:text-paper"
          >
            Parlons de votre projet
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.1fr_1.2fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-paper/55">
              Cabinet d'ingénierie civile et de conseil basé à Brazzaville.
              Nous concevons, pilotons et contrôlons les infrastructures qui
              structurent le Congo de demain.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-sm border border-white/15 text-paper/60 transition-colors hover:border-jade-light/60 hover:text-jade-light"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[13.5px] text-paper/65 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">
              Expertises
            </h3>
            <ul className="mt-5 space-y-3">
              {fallbackServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services#${service.slug}`}
                    className="text-[13.5px] text-paper/65 transition-colors hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-[13.5px] text-paper/65">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {SITE.address}
                  <br />
                  {SITE.city}, {SITE.country}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0 text-gold" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.secondaryPhone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0 text-gold" />
                  {SITE.secondaryPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Mail className="size-4 shrink-0 text-gold" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[11px] text-paper/40 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {SITE.legalName}. Tous droits réservés.
          </p>
          <nav aria-label="Informations légales" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              to="/mentions-legales"
              className="transition-colors hover:text-gold"
            >
              Mentions légales
            </Link>
            <Link
              to="/politique-confidentialite"
              className="transition-colors hover:text-gold"
            >
              Confidentialité
            </Link>
            <Link
              to="/plan-du-site"
              className="transition-colors hover:text-gold"
            >
              Plan du site
            </Link>
          </nav>
          <p className="font-mono uppercase tracking-[0.16em]">
            Conçu à Brazzaville · République du Congo
          </p>
        </div>
      </div>
    </footer>
  );
}
