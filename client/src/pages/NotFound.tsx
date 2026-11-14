import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useSeo } from "../lib/seo";

export default function NotFound() {
  useSeo({
    title: "Page introuvable",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    noindex: true,
  });

  return (
    <section className="theme-surface relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="absolute inset-0 bg-blueprint opacity-50" />
      <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[130px]" />

      <div className="container-wide relative text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">
          Erreur 404
        </p>
        <p className="mt-2 font-display text-[110px] font-extrabold leading-none text-white/[0.08] sm:text-[160px]">
          404
        </p>
        <h1 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Cette page n'existe pas.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-paper/60">
          Le lien est peut-être obsolète ou la page a été déplacée. Retrouvez
          votre chemin ci-dessous.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/" icon={<ArrowLeft className="size-4" />}>
            Retour à l'accueil
          </Button>
          <Button
            to="/realisations"
            variant="outline"
            className="border-white/20 text-paper hover:border-gold hover:bg-gold/10 hover:text-gold"
            icon={<ArrowUpRight className="size-4" />}
          >
            Voir nos réalisations
          </Button>
        </div>
      </div>
    </section>
  );
}
