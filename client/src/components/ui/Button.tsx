import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

type Variant = "primary" | "dark" | "outline" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  to?: string;
  href?: string;
  icon?: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm font-semibold tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-60 hover:-translate-y-0.5 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "border border-white/40 bg-[linear-gradient(115deg,#f8e3ae_0%,#e9b75b_45%,#cf9432_100%)] text-ink shadow-[0_16px_38px_-18px_rgba(233,183,91,0.85)] before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:skew-x-[-18deg] before:bg-white/45 before:opacity-0 before:transition-all before:duration-700 hover:shadow-[0_22px_46px_-18px_rgba(233,183,91,0.95)] hover:brightness-[1.05] hover:before:left-[110%] hover:before:opacity-100",
  dark: "border border-white/10 bg-[linear-gradient(145deg,#0b261e,#061712_70%)] text-paper shadow-[0_16px_38px_-22px_rgba(4,20,15,0.9)] hover:border-jade/50 hover:text-jade-light",
  outline:
    "border border-ink/20 bg-transparent text-ink hover:border-gold hover:bg-gold/10 hover:text-gold-dark",
  light: "border border-white/60 bg-paper text-ink hover:bg-white",
  ghost: "text-ink hover:text-jade-dark",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  to,
  href,
  icon,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
