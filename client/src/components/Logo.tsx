import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="MN Consulting Engineering — Accueil"
      className={cn("group flex items-center gap-3", className)}
    >
      <span className="on-media relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-sm bg-[linear-gradient(145deg,#0b261e,#061712_68%)] shadow-[0_12px_28px_-14px_rgba(10,107,82,0.9)] ring-1 ring-white/10">
        <span className="absolute -right-3 -top-3 size-7 rounded-full bg-jade/45 blur-md transition-all duration-300 group-hover:bg-jade/70" />
        <span className="relative font-display text-lg font-extrabold tracking-tight text-paper">
          MN
        </span>
        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,#e9b75b,#5fe3bf)] transition-all duration-300 group-hover:h-[5px]" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[17px] font-bold tracking-tight",
            variant === "light" ? "text-paper" : "text-ink",
          )}
        >
          MN Consulting
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[9px] uppercase tracking-[0.24em]",
            variant === "light" ? "text-paper/55" : "text-steel",
          )}
        >
          Bureau d’études
        </span>
      </span>
    </Link>
  );
}
