import { CLIENTS } from "../../data/fallback";

export function TrustBar() {
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section className="border-b border-ink/10 bg-sand/60 py-6">
      <div className="container-wide flex flex-col gap-5 md:flex-row md:items-center">
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-steel/80">
          Références de missions
        </p>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-10">
            {items.map((client, index) => (
              <span
                key={`${client}-${index}`}
                className="flex items-center gap-10 whitespace-nowrap font-display text-[12.5px] font-semibold text-ink/55 before:size-1.5 before:rotate-45 before:bg-[linear-gradient(135deg,#e9b75b,#14a67e)] before:opacity-70 before:content-['']"
                aria-hidden={index >= CLIENTS.length}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
