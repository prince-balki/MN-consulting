import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow inline-flex items-center gap-3",
            tone === "dark" && "text-gold",
          )}
        >
          <span className="h-px w-8 bg-[linear-gradient(90deg,#e9b75b,#14a67e)]" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-balance text-3xl leading-[1.08] tracking-tight sm:text-4xl lg:text-[44px]",
          tone === "dark" ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-base",
            tone === "dark" ? "text-paper/65" : "text-steel",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
