import {
  fallbackProjects,
  fallbackServices,
  fallbackTeam,
  fallbackTestimonials,
} from "../data/fallback";
import type {
  AuthUser,
  DashboardStats,
  Message,
  MessageStatus,
  Project,
  QuoteRequest,
  QuoteStatus,
  Service,
  TeamMember,
  Testimonial,
} from "./types";

const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:4000/api").replace(
  /\/+$/,
  "",
);

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 0, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = Omit<RequestInit, "headers"> & {
  token?: string | null;
  timeout?: number;
  headers?: Record<string, string>;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, timeout = 9000, headers, ...init } = options;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });

    if (response.status === 204) {
      return undefined as T;
    }

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(
        body?.message ?? "Une erreur est survenue. Veuillez réessayer.",
        response.status,
        body?.details,
      );
    }

    return body as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      "Impossible de joindre le serveur. Vérifiez votre connexion puis réessayez.",
      0,
    );
  } finally {
    window.clearTimeout(timer);
  }
}

async function withFallback<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

interface ProjectQuery {
  featured?: boolean;
  category?: string;
  limit?: number;
}

function projectQueryString({ featured, category, limit }: ProjectQuery = {}) {
  const params = new URLSearchParams();
  if (featured) params.set("featured", "true");
  if (category) params.set("category", category);
  if (limit) params.set("limit", String(limit));
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function getProjects(query: ProjectQuery = {}) {
  return request<Project[]>(`/projects${projectQueryString(query)}`, { timeout: 4000 });
}

export async function getProjectsSafe(query: ProjectQuery = {}): Promise<Project[]> {
  const fallback = fallbackProjects.filter((project) => {
    if (query.featured && !project.featured) return false;
    if (query.category && project.category !== query.category) return false;
    return true;
  });
  const projects = await withFallback(getProjects(query), fallback);
  const seen = new Set<string>();
  return projects.filter((project) => {
    if (seen.has(project.slug)) return false;
    seen.add(project.slug);
    return true;
  });
}

export function getProject(slug: string) {
  return request<Project>(`/projects/${encodeURIComponent(slug)}`, { timeout: 4000 });
}

export async function getProjectSafe(slug: string): Promise<Project | null> {
  try {
    return await getProject(slug);
  } catch {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }
}

export function getServices() {
  return request<Service[]>("/services", { timeout: 4000 });
}

export function getServicesSafe() {
  return withFallback(getServices(), fallbackServices);
}

export function getTestimonials() {
  return request<Testimonial[]>("/testimonials", { timeout: 4000 });
}

export function getTestimonialsSafe() {
  return withFallback(getTestimonials(), fallbackTestimonials);
}

export function getTeam() {
  return request<TeamMember[]>("/team", { timeout: 4000 });
}

export function getTeamSafe() {
  return withFallback(getTeam(), fallbackTeam);
}

export interface MessageInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface QuoteInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  description: string;
}

export function createMessage(input: MessageInput) {
  return request<{ id: string; message: string }>("/messages", {
    method: "POST",
    body: JSON.stringify(input),
    timeout: 12000,
  });
}

export function createQuote(input: QuoteInput) {
  return request<{ id: string; message: string }>("/quotes", {
    method: "POST",
    body: JSON.stringify(input),
    timeout: 12000,
  });
}

export function login(email: string, password: string) {
  return request<{ token: string; user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    timeout: 12000,
  });
}

export function getMe(token: string) {
  return request<AuthUser>("/auth/me", { token });
}

export function getMessages(token: string) {
  return request<Message[]>("/messages", { token });
}

export function updateMessageStatus(token: string, id: string, status: MessageStatus) {
  return request<Message>(`/messages/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ status }),
  });
}

export function deleteMessage(token: string, id: string) {
  return request<void>(`/messages/${encodeURIComponent(id)}`, { method: "DELETE", token });
}

export function getQuotes(token: string) {
  return request<QuoteRequest[]>("/quotes", { token });
}

export function updateQuoteStatus(token: string, id: string, status: QuoteStatus) {
  return request<QuoteRequest>(`/quotes/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ status }),
  });
}

export function deleteQuote(token: string, id: string) {
  return request<void>(`/quotes/${encodeURIComponent(id)}`, { method: "DELETE", token });
}

export function getDashboardStats(token: string) {
  return request<DashboardStats>("/stats", { token });
}

export function getAdminProjects(token: string) {
  return request<Project[]>("/projects?limit=100", { token });
}

export type ProjectUpdatePayload = Partial<
  Pick<
    Project,
    | "title"
    | "slug"
    | "category"
    | "location"
    | "year"
    | "client"
    | "budget"
    | "surface"
    | "description"
    | "coverImage"
    | "images"
    | "featured"
    | "status"
  >
>;

export function updateProject(token: string, id: string, payload: ProjectUpdatePayload) {
  return request<Project>(`/projects/${encodeURIComponent(id)}`, {
    method: "PUT",
    token,
    body: JSON.stringify(payload),
  });
}

export function deleteProject(token: string, id: string) {
  return request<void>(`/projects/${encodeURIComponent(id)}`, { method: "DELETE", token });
}
