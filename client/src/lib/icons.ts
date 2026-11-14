import {
  Building2,
  ClipboardCheck,
  Map,
  PencilRuler,
  Route,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  PencilRuler,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  Map,
  Route,
};

export function getServiceIcon(name: string): LucideIcon {
  return icons[name] ?? Building2;
}
