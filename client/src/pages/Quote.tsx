import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input, Select, Textarea } from "../components/ui/Field";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import {
  BUDGET_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  SITE,
  TIMELINE_OPTIONS,
} from "../data/fallback";
import { ApiError, createQuote } from "../lib/api";
import { useSeo } from "../lib/seo";

type Status = "idle" | "loading" | "success" | "error";

const steps = [
  {
    title: "Vous décrivez votre projet",
    text: "Quelques lignes suffisent. Plus le contexte est précis, plus notre réponse sera utile.",
  },
  {
    title: "Nous analysons votre demande",
    text: "Un ingénieur étudie les grandes lignes du projet et identifie les prochaines étapes.",
  },
  {
    title: "Nous étudions votre demande",
    text: "Notre équipe examine les informations transmises et vous recontacte pour préciser les besoins de la mission.",
  },
];

export default function Quote() {
  useSeo({
    title: "Demander un devis",
    description:
      "Décrivez votre projet de génie civil et contactez MN Consulting Engineering à Brazzaville.",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [reference, setReference] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setFeedback("");

    try {
      const result = await createQuote({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        company: String(data.get("company") ?? ""),
        projectType: String(data.get("projectType") ?? ""),
        budget: String(data.get("budget") ?? ""),
        timeline: String(data.get("timeline") ?? ""),
        description: String(data.get("description") ?? ""),
      });
      setStatus("success");
      setFeedback(result.message);
      setReference(result.id);
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
        eyebrow="Demande de devis"
        title={
          <>
            Décrivez votre projet.{" "}
            <em className="serif-accent text-gradient-gold">
              Nous faisons le reste.
            </em>
          </>
        }
        description="En quelques minutes, donnez-nous les grandes lignes de votre projet. Notre équipe étudiera les informations transmises et vous recontactera."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Demander un devis" }]}
      />

      <section className="container-wide grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <div className="rounded-sm border border-ink/10 bg-white/70 p-6 sm:p-8">
            {status === "success" ? (
              <div className="py-6 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="size-7" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                  Demande envoyée.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-steel">
                  {feedback}
                </p>
                {reference ? (
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-steel/70">
                    Référence : {reference}
                  </p>
                ) : null}
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    to="/realisations"
                    variant="dark"
                    icon={<ArrowUpRight className="size-4" />}
                  >
                    Voir nos réalisations
                  </Button>
                  <Button to="/" variant="outline">
                    Retour à l'accueil
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="eyebrow">Votre projet</p>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Parlez-nous de votre besoin.
                </h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-steel">
                  Les champs marqués d'un astérisque sont obligatoires. Vos
                  informations restent confidentielles.
                </p>

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
                      label="Entreprise / Organisation"
                      name="company"
                      autoComplete="organization"
                      placeholder="Nom de votre structure"
                    />
                  </div>

                  <Select label="Type de projet" name="projectType" required defaultValue="">
                    <option value="" disabled>
                      Sélectionnez un type de projet
                    </option>
                    {PROJECT_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select label="Budget estimé" name="budget" defaultValue="">
                      <option value="">À définir</option>
                      {BUDGET_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Select label="Échéance souhaitée" name="timeline" defaultValue="">
                      <option value="">À définir</option>
                      {TIMELINE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <Textarea
                    label="Description du projet"
                    name="description"
                    required
                    rows={7}
                    placeholder="Localisation, nature de l'ouvrage, surfaces, contraintes particulières, échéances..."
                  />

                  <label className="flex items-start gap-3 text-[12px] leading-relaxed text-steel">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 size-4 rounded border-ink/30 accent-ink"
                    />
                    <span>
                      J'accepte que mes données soient utilisées pour l'étude de
                      ma demande de devis, conformément à la{" "}
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
                    {status === "loading"
                      ? "Envoi en cours..."
                      : "Envoyer ma demande de devis"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5">
          <div className="rounded-sm border border-ink/10 bg-sand/50 p-6">
            <p className="eyebrow">La suite</p>
            <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">
              Ce qui se passe ensuite.
            </h2>
            <ol className="mt-5 space-y-5">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-gold/50 font-mono text-[10px] text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[13.5px] font-semibold text-ink">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-relaxed text-steel">
                      {step.text}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="theme-surface theme-card relative overflow-hidden rounded-sm bg-ink p-6 text-paper">
            <div className="absolute inset-0 bg-blueprint opacity-50" />
            <div className="relative">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                Contact direct
              </p>
              <p className="mt-3 font-display text-lg font-semibold leading-snug">
                Vous préférez en parler de vive voix ?
              </p>
              <div className="mt-5 space-y-3 text-[13px] text-paper/70">
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 text-gold" />
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Mail className="size-4 text-gold" />
                  {SITE.email}
                </a>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <MessageCircle className="size-4 text-gold" />
                  WhatsApp
                </a>
                <p className="flex items-center gap-3">
                  <Clock className="size-4 text-gold" />
                  {SITE.hours}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-sm border border-ink/10 bg-white/60 p-4 text-[12px] leading-relaxed text-steel">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold-dark" />
            Vos informations sont traitées de manière confidentielle et ne sont
            transmises à aucun tiers.
          </div>
        </Reveal>
      </section>
    </>
  );
}
