export type ProjectCategory =
  | "BATIMENT"
  | "INFRASTRUCTURE"
  | "VOIRIE"
  | "HYDRAULIQUE"
  | "INDUSTRIEL"
  | "TOPOGRAPHIE";

export type PublishStatus = "DRAFT" | "PUBLISHED";

export type MessageStatus = "NEW" | "READ" | "ARCHIVED";

export type QuoteStatus = "NEW" | "IN_REVIEW" | "PROPOSAL_SENT" | "WON" | "LOST";

export type UserRole = "ADMIN" | "EDITOR";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  client?: string | null;
  budget?: string | null;
  surface?: string | null;
  description: string;
  coverImage: string;
  images: string[];
  featured: boolean;
  status: PublishStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  published: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string | null;
  linkedin?: string | null;
  order: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  projectType: string;
  budget?: string | null;
  timeline?: string | null;
  description: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface DashboardStats {
  projects: number;
  services: number;
  testimonials: number;
  team: number;
  messages: number;
  newMessages: number;
  quotes: number;
  newQuotes: number;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "BATIMENT",
  "INFRASTRUCTURE",
  "VOIRIE",
  "HYDRAULIQUE",
  "INDUSTRIEL",
  "TOPOGRAPHIE",
];

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  BATIMENT: "Bâtiment",
  INFRASTRUCTURE: "Infrastructure",
  VOIRIE: "Voirie",
  HYDRAULIQUE: "Hydraulique",
  INDUSTRIEL: "Industriel",
  TOPOGRAPHIE: "Topographie",
};

export const MESSAGE_STATUS_LABELS: Record<MessageStatus, string> = {
  NEW: "Nouveau",
  READ: "Lu",
  ARCHIVED: "Archivé",
};

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  NEW: "Nouveau",
  IN_REVIEW: "En analyse",
  PROPOSAL_SENT: "Proposition envoyée",
  WON: "Gagné",
  LOST: "Perdu",
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category as ProjectCategory] ?? category;
}
