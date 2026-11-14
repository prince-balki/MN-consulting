import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { SITE } from "../../data/fallback";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function CtaSection() {
  return (
    <section className="grain relative overflow-hidden border-t border-gold/20 bg-ink py-20 text-paper sm:py-24">
      <img
        src="/mn-office-2.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
      <div className="absolute inset-0 bg-aurora opacity-80" />
      <div className="container-wide relative">
        <Reveal className="max-w-3xl">
          <span className="eyebrow inline-flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-[linear-gradient(90deg,#e9b75b,#5fe3bf)]" />
            Parlons de votre projet
          </span>
          <h2 className="mt-5 text-balance text-3xl leading-[1.08] tracking-tight sm:text-4xl lg:text-[46px]">
            Votre prochain ouvrage commence par une{" "}
            <em className="serif-accent text-gradient-gold">conversation</em>.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper/65">
            Décrivez-nous votre projet : nos ingénieurs vous répondent sous 48
            heures ouvrées, avec une première lecture technique et les prochaines
            étapes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              to="/devis"
              size="lg"
              icon={<ArrowUpRight className="size-4" />}
            >
              Demander un devis
            </Button>
            <Button
              href={`tel:${SITE.phoneHref}`}
              variant="outline"
              size="lg"
              className="border-white/20 text-paper hover:border-gold hover:bg-gold/10 hover:text-gold"
              icon={<Phone className="size-4" />}
            >
              {SITE.phone}
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-paper/50">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-gold"
            >
              <Mail className="size-3.5 text-gold" />
              {SITE.email}
            </a>
            <span>{SITE.hours}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
