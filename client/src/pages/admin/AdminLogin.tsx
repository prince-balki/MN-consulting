import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Field";
import { useAuth } from "../../context/AuthContext";
import { ApiError } from "../../lib/api";
import { useSeo } from "../../lib/seo";

export default function AdminLogin() {
  useSeo({
    title: "Connexion administration",
    description: "Espace réservé aux administrateurs de MN Consulting Engineering.",
    noindex: true,
  });

  const { user, loading: authLoading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper">
        <span className="size-10 animate-spin rounded-full border-2 border-ink/15 border-t-gold" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Connexion impossible. Vérifiez votre réseau.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="theme-surface relative hidden overflow-hidden bg-ink p-10 text-paper lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div className="absolute inset-0 bg-blueprint opacity-60" />
        <div className="absolute -right-24 top-1/3 size-96 rounded-full bg-gold/10 blur-[120px]" />

        <div className="relative">
          <Logo variant="light" />
        </div>

        <div className="relative">
          <span className="eyebrow inline-flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold" />
            Espace réservé
          </span>
          <h1 className="mt-5 max-w-md text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight">
            Pilotez le contenu de votre site.
          </h1>
          <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-paper/60">
            Gérez les demandes de devis, les messages reçus et les réalisations
            publiées depuis un tableau de bord unique.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-6 border-t border-white/10 pt-7">
          <div>
            <p className="font-display text-2xl font-bold">2013</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/45">
              Création du bureau
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold">16</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/45">
              Ordre des ingénieurs
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold">3</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/45">
              Villes · projet MOSALA
            </p>
          </div>
        </div>
      </aside>

      <main className="flex flex-col justify-center bg-paper px-5 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel transition-colors hover:text-gold-dark"
          >
            <ArrowLeft className="size-3.5" />
            Retour au site
          </Link>

          <div className="mt-10 lg:hidden">
            <Logo />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-gold/15 text-gold-dark">
              <LockKeyhole className="size-5" />
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Connexion
            </h2>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-steel">
            Accédez au back-office de MN Consulting Engineering. Utilisez vos identifiants
            administrateur.
          </p>

          {error ? (
            <div
              role="alert"
              className="mt-6 rounded-sm border border-red-500/30 bg-red-50 p-4 text-[13px] text-red-800"
            >
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <Input
              label="Adresse e-mail"
              type="email"
              name="email"
              required
              autoComplete="username"
              placeholder="vous@entreprise.cg"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          <p className="mt-6 text-[11px] leading-relaxed text-steel/70">
            Accès strictement réservé aux administrateurs autorisés. Les
            tentatives de connexion sont limitées pour prévenir toute utilisation
            abusive.
          </p>
        </div>
      </main>
    </div>
  );
}
