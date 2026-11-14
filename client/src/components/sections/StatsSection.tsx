import { STATS } from "../../data/fallback";
import { Reveal } from "../ui/Reveal";
import { StatCounter } from "../ui/StatCounter";

export function StatsSection() {
  return (
    <section className="theme-surface grain relative overflow-hidden border-y border-gold/25 bg-jade-deep py-14 text-paper">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-30" />
      <div className="absolute -right-24 -top-24 size-80 rounded-full bg-gold/10 blur-[120px]" />
      <div className="container-wide relative grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {STATS.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.06}>
            <div className="border-l border-white/15 pl-5">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                tone="dark"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
