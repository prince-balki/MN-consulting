import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Tone = "gold" | "light" | "dark" | "outline";

interface BadgeProps {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

const tones: Record<Tone, string> = {
  gold: "bg-gold text-ink",
  light: "bg-paper/95 text-ink",
  dark: "bg-ink text-paper",
  outline: "border border-ink/15 text-steel",
};

export function Badge({ tone = "gold", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
