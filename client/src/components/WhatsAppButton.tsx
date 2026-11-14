import { MessageCircle } from "lucide-react";
import { SITE } from "../data/fallback";

export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Discuter avec MN Consulting Engineering sur WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-6 sm:right-6"
    >
      <span className="hidden rounded-sm bg-ink px-3 py-2 text-[11px] font-semibold text-paper opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
        Parlons de votre projet
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_36px_-14px_rgba(37,211,102,0.8)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <MessageCircle className="relative size-6" fill="currentColor" />
      </span>
    </a>
  );
}
