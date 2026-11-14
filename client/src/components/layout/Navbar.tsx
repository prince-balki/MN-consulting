import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { SITE } from "../../data/fallback";
import { cn } from "../../lib/utils";
import { Logo } from "../Logo";
import { Button } from "../ui/Button";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "Le cabinet" },
  { to: "/services", label: "Expertises" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="theme-surface relative overflow-hidden bg-ink text-paper">
        <div className="dark-only absolute inset-0 bg-[linear-gradient(90deg,rgba(20,166,126,0.24),transparent_35%,transparent_65%,rgba(233,183,91,0.16))]" />
        <div className="container-wide relative flex h-9 items-center justify-between gap-4 text-[10.5px]">
          <p className="hidden items-center gap-2 font-mono uppercase tracking-[0.16em] text-paper/55 sm:flex">
            <MapPin className="size-3 text-gold" />
            Brazzaville, République du Congo
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${SITE.email}`}
              className="hidden items-center gap-1.5 text-paper/60 transition-colors hover:text-gold md:flex"
            >
              <Mail className="size-3 text-gold" />
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="flex items-center gap-1.5 text-paper/60 transition-colors hover:text-gold"
            >
              <Phone className="size-3 text-gold" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b bg-paper/85 backdrop-blur-xl transition-all duration-300",
          scrolled ? "border-ink/10 shadow-[0_14px_34px_-26px_rgba(6,23,18,0.55)]" : "border-ink/5",
        )}
      >
        <div className="container-wide flex h-[74px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative py-2 text-[13.5px] font-semibold transition-colors hover:text-gold-dark",
                    "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:rounded-full after:bg-[linear-gradient(90deg,#e9b75b,#14a67e)] after:transition-all after:duration-300",
                    isActive
                      ? "text-gold-dark after:w-full"
                      : "text-ink/75 after:w-0 hover:after:w-full",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "white"
                  ? "Passer au thème émeraude"
                  : "Passer au thème blanc"
              }
              title={theme === "white" ? "Thème émeraude" : "Thème blanc"}
              className="inline-flex h-10 items-center gap-2 rounded-sm border border-ink/15 px-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink/60 transition-colors hover:border-gold hover:text-gold-dark"
            >
              {theme === "white" ? (
                <Moon className="size-3.5" />
              ) : (
                <Sun className="size-3.5" />
              )}
              <span className="hidden xl:inline">
                {theme === "white" ? "Émeraude" : "Blanc"}
              </span>
            </button>
            <Button
              to="/devis"
              size="sm"
              icon={<ArrowUpRight className="size-4" />}
            >
              Demander un devis
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid size-11 place-items-center rounded-sm border border-ink/15 text-ink transition-colors hover:border-gold lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(233,183,91,0.45),rgba(20,166,126,0.45),transparent)]" />

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-ink/10 bg-paper lg:hidden"
            >
              <nav aria-label="Navigation mobile" className="container-wide py-6">
                <ul className="divide-y divide-ink/10">
                  {links.map((link, index) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center justify-between py-4",
                            isActive ? "text-gold-dark" : "text-ink",
                          )
                        }
                      >
                        <span className="flex items-center gap-4">
                          <span className="font-mono text-[10px] text-steel/60">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-lg font-semibold tracking-tight">
                            {link.label}
                          </span>
                        </span>
                        <ArrowUpRight className="size-4 text-steel" />
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3">
                  <Button to="/devis" icon={<ArrowUpRight className="size-4" />}>
                    Demander un devis
                  </Button>
                  <Button href={`tel:${SITE.phoneHref}`} variant="outline">
                    {SITE.phone}
                  </Button>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={
                      theme === "white"
                        ? "Passer au thème émeraude"
                        : "Passer au thème blanc"
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-ink/15 text-[12.5px] font-semibold text-ink/70 transition-colors hover:border-gold hover:text-gold-dark"
                  >
                    {theme === "white" ? (
                      <Moon className="size-4" />
                    ) : (
                      <Sun className="size-4" />
                    )}
                    {theme === "white" ? "Thème émeraude" : "Thème blanc"}
                  </button>
                </div>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
