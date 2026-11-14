import {
  MessageStatus,
  ProjectCategory,
  PublishStatus,
  QuoteStatus,
} from "@prisma/client";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Adresse e-mail invalide.").transform((email) => email.toLowerCase()),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

const optionalText = (max: number) => z.string().trim().max(max).optional();

const optionalUrl = z
  .string()
  .trim()
  .url("URL invalide.")
  .or(z.literal(""))
  .optional();

export const projectCreateSchema = z.object({
  title: z.string().trim().min(3, "Titre trop court.").max(160),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide.")
    .max(120)
    .optional(),
  category: z.nativeEnum(ProjectCategory),
  location: z.string().trim().min(2).max(120),
  year: z.coerce.number().int().min(1950).max(2100),
  client: optionalText(160),
  budget: optionalText(120),
  surface: optionalText(120),
  description: z.string().trim().min(20, "Description trop courte.").max(20000),
  coverImage: z.string().trim().url("URL de couverture invalide."),
  images: z.array(z.string().trim().url()).max(16).optional(),
  featured: z.boolean().optional(),
  status: z.nativeEnum(PublishStatus).optional(),
});

export const projectUpdateSchema = projectCreateSchema.partial();

export const serviceCreateSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide.")
    .max(120)
    .optional(),
  excerpt: z.string().trim().min(10).max(400),
  description: z.string().trim().min(20).max(10000),
  icon: z.string().trim().min(2).max(60),
  features: z.array(z.string().trim().min(2).max(160)).max(16).optional(),
  order: z.coerce.number().int().min(0).max(999).optional(),
});

export const serviceUpdateSchema = serviceCreateSchema.partial();

export const testimonialCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  content: z.string().trim().min(20).max(2000),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  published: z.boolean().optional(),
  order: z.coerce.number().int().min(0).max(999).optional(),
});

export const testimonialUpdateSchema = testimonialCreateSchema.partial();

export const teamCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(160),
  bio: z.string().trim().min(20).max(2000),
  photo: optionalUrl,
  linkedin: optionalUrl,
  order: z.coerce.number().int().min(0).max(999).optional(),
  published: z.boolean().optional(),
});

export const teamUpdateSchema = teamCreateSchema.partial();

export const messageCreateSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court.").max(100),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: optionalText(40),
  subject: z.string().trim().min(3, "Objet trop court.").max(160),
  message: z.string().trim().min(10, "Message trop court.").max(4000),
});

export const messageStatusSchema = z.object({
  status: z.nativeEnum(MessageStatus),
});

export const quoteCreateSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court.").max(100),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: optionalText(40),
  company: optionalText(160),
  projectType: z.string().trim().min(2, "Type de projet requis.").max(160),
  budget: optionalText(120),
  timeline: optionalText(120),
  description: z.string().trim().min(20, "Décrivez votre projet en quelques lignes.").max(6000),
});

export const quoteStatusSchema = z.object({
  status: z.nativeEnum(QuoteStatus),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type ServiceCreateInput = z.infer<typeof serviceCreateSchema>;
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;
export type TestimonialCreateInput = z.infer<typeof testimonialCreateSchema>;
export type TestimonialUpdateInput = z.infer<typeof testimonialUpdateSchema>;
export type TeamCreateInput = z.infer<typeof teamCreateSchema>;
export type TeamUpdateInput = z.infer<typeof teamUpdateSchema>;
export type MessageCreateInput = z.infer<typeof messageCreateSchema>;
export type QuoteCreateInput = z.infer<typeof quoteCreateSchema>;
