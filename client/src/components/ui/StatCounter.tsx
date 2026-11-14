import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}

export function StatCounter({
  value,
  suffix = "",
  label,
  tone = "light",
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reducedMotion]);

  return (
    <div ref={ref} className={className}>
      <p
        className={cn(
          "font-display text-4xl font-bold tracking-tight sm:text-5xl",
          tone === "dark" ? "text-paper" : "text-ink",
        )}
      >
        {new Intl.NumberFormat("fr-FR").format(display)}
        <span className="text-gold">{suffix}</span>
      </p>
      <p
        className={cn(
          "mt-2 font-mono text-[10px] uppercase tracking-[0.22em] sm:text-[11px]",
          tone === "dark" ? "text-paper/55" : "text-ink/55",
        )}
      >
        {label}
      </p>
    </div>
  );
}
