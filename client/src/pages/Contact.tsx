import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { Input, Textarea } from "../components/ui/Field";
import { SITE } from "../data/fallback";
import { ApiError, createMessage } from "../lib/api";
import { useSeo } from "../lib/seo";

type Status = "idle" | "loading" | "success" | "error";

const contactCards = [
  {
    Icon: Phone,
    label: "Téléphone principal",
    value: SITE.phone,
    href: `tel:${SITE.phoneHref}`,
  },
  {
    Icon: Phone,
    label: "Téléphone secondaire",
    value: SITE.secondaryPhone,
    href: `tel:${SITE.secondaryPhone.replace(/\D/g, "")}`,
  },
  {
    Icon: Mail,
    label: "E-mail",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    Icon: MapPin,
    label: "Bureau",
    value: `${SITE.address}, ${SITE.city}`,
    href: SITE.mapUrl,
  },
  {
    Icon: Clock,
    label: "Horaires",
    value: SITE.hours,
  },
];

export default function Contact() {
  useSeo({
    title: "Contact",
    description:
      "Contactez MN Consulting Engineering à Brazzaville pour vos projets d’architecture, d’études techniques, de génie civil et de maîtrise d’œuvre.",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setFeedback("");

    try {
      const result = await createMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        subject: String(data.get("subject") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setStatus("success");
      setFeedback(result.message);
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof ApiError
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer.",
      );
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Parlons de votre projet,{" "}
            <em className="serif-accent text-gradient-gold">simplement.</em>
          </>
        }
        description="Une question technique, une demande de partenariat ou un projet à cadrer : contactez notre équipe à Brazzaville."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Contact" }]}
      />

      <section className="container-wide grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Nos coordonnées</p>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Une équipe disponible et à l'écoute.
          </h2>
          <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-steel">
            Passez nous voir au {SITE.address}, {SITE.city.toUpperCase()} ou
            contactez-nous par téléphone, e-mail ou WhatsApp.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {contactCards.map(({ Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid size-9 place-items-center rounded-sm bg-gold/15 text-gold-dark">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-steel/70">
                      {label}
                    </span>
                    <span className="mt-1 block text-[13px] font-medium leading-snug text-ink">
                      {value}
                    </span>
                  </span>
                </>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-start gap-3 rounded-sm border border-ink/10 bg-white/60 p-4 transition-colors hover:border-gold/50 hover:bg-white"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-sm border border-ink/10 bg-white/60 p-4"
                >
                  {inner}
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <Button
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              variant="dark"
              icon={<MessageCircle className="size-4" />}
            >
              Discuter sur WhatsApp
            </Button>
            <Button
              href={SITE.mapUrl}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              icon={<MapPin className="size-4" />}
            >
              Voir l'itinéraire
            </Button>
          </div>

          <div className="theme-surface theme-card relative mt-6 overflow-hidden rounded-sm bg-ink p-6 text-paper">
            <div className="absolute inset-0 bg-blueprint opacity-60" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                  Notre bureau
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-paper/70">
                  {SITE.address}
                  <br />
                  {SITE.city}, {SITE.country}
                </p>
              </div>
              <span className="grid size-10 place-items-center rounded-full border border-gold/40 text-gold">
                <MapPin className="size-4" />
              </span>
            </div>

            <div className="relative mt-5 grid h-44 place-items-center overflow-hidden rounded-sm border border-white/10 bg-ink-soft">
              <div className="absolute inset-0 bg-blueprint opacity-80" />
              <div className="absolute left-1/3 top-1/2 h-px w-2/3 -rotate-12 bg-gold/20" />
              <div className="absolute left-1/4 top-1/3 h-px w-1/2 rotate-12 bg-white/10" />
              <div className="relative text-center">
                <span className="mx-auto grid size-10 place-items-center rounded-full bg-gold text-ink">
                  <MapPin className="size-5" />
                </span>
                <p className="mt-2 font-display text-sm font-semibold">
                  Brazzaville
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/45">
                  {SITE.address}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-sm border border-ink/10 bg-white/70 p-6 sm:p-8">
            <p className="eyebrow">Formulaire</p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Écrivez-nous.
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-steel">
              Les champs marqués d'un astérisque sont obligatoires. Nous
              n'utilisons vos données que pour répondre à votre demande.
            </p>

            {status === "success" ? (
              <div
                role="status"
                className="mt-5 flex items-start gap-3 rounded-sm border border-emerald-600/30 bg-emerald-50 p-4 text-[13px] text-emerald-900"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                <span>{feedback}</span>
              </div>
            ) : null}

            {status === "error" ? (
              <div
                role="alert"
                className="mt-5 rounded-sm border border-red-500/30 bg-red-50 p-4 text-[13px] text-red-800"
              >
                {feedback}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Nom complet"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Votre nom"
                />
                <Input
                  label="E-mail"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="vous@exemple.cg"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Téléphone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={SITE.phone}
                />
                <Input
                  label="Objet"
                  name="subject"
                  required
                  placeholder="Objet de votre message"
                />
              </div>

              <Textarea
                label="Message"
                name="message"
                required
                rows={6}
                placeholder="Décrivez votre demande en quelques lignes..."
              />

              <label className="flex items-start gap-3 text-[12px] leading-relaxed text-steel">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 size-4 rounded border-ink/30 accent-ink"
                />
                <span>
                  J'accepte que mes données soient utilisées pour être recontacté
                  dans le cadre de ma demande, conformément à la{" "}
                  <Link
                    to="/politique-confidentialite"
                    className="font-semibold text-gold-dark underline decoration-gold/40 underline-offset-2 transition-colors hover:text-ink"
                  >
                    politique de confidentialité
                  </Link>
                  .
                </span>
              </label>

              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="w-full"
                icon={<Send className="size-4" />}
              >
                {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  );
}
