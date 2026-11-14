import { Prisma, ProjectCategory, PublishStatus } from "@prisma/client";
import { Router } from "express";
import { ApiError, asyncHandler } from "../lib/errors";
import { prisma } from "../lib/prisma";
import { slugify } from "../lib/slug";
import { requireAuth, optionalAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  projectCreateSchema,
  projectUpdateSchema,
  type ProjectCreateInput,
  type ProjectUpdateInput,
} from "../validators/schemas";

export const projectsRouter = Router();

function cleanOptionalFields(data: Record<string, unknown>) {
  const cleaned = { ...data };
  for (const key of ["client", "budget", "surface"]) {
    if (cleaned[key] === "") {
      cleaned[key] = null;
    }
  }
  return cleaned;
}

async function resolveSlug(desired: string, currentId?: string) {
  const existing = await prisma.project.findUnique({ where: { slug: desired } });
  if (existing && existing.id !== currentId) {
    return `${desired}-${Date.now().toString(36)}`;
  }
  return desired;
}

projectsRouter.get(
  "/",
  optionalAuth,
  asyncHandler(async (req, res) => {
    const where: Prisma.ProjectWhereInput = {};

    if (!req.user) {
      where.status = PublishStatus.PUBLISHED;
    }

    if (req.query.featured === "true") {
      where.featured = true;
    }

    if (typeof req.query.category === "string") {
      const category = req.query.category as ProjectCategory;
      if (Object.values(ProjectCategory).includes(category)) {
        where.category = category;
      }
    }

    const limit = Math.min(Number(req.query.limit) || 50, 100);

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ featured: "desc" }, { year: "desc" }, { createdAt: "desc" }],
      take: limit,
    });

    res.json(projects);
  }),
);

projectsRouter.get(
  "/:slug",
  optionalAuth,
  asyncHandler(async (req, res) => {
    const project = await prisma.project.findFirst({
      where: {
        slug: req.params.slug,
        ...(req.user ? {} : { status: PublishStatus.PUBLISHED }),
      },
    });

    if (!project) {
      throw new ApiError(404, "Réalisation introuvable.");
    }

    res.json(project);
  }),
);

projectsRouter.post(
  "/",
  requireAuth,
  validate(projectCreateSchema),
  asyncHandler(async (req, res) => {
    const data = req.body as ProjectCreateInput;
    const slug = await resolveSlug(data.slug ?? slugify(data.title));

    const project = await prisma.project.create({
      data: {
        ...(cleanOptionalFields(data) as ProjectCreateInput),
        slug,
        images: data.images ?? [],
      },
    });

    res.status(201).json(project);
  }),
);

projectsRouter.put(
  "/:id",
  requireAuth,
  validate(projectUpdateSchema),
  asyncHandler(async (req, res) => {
    const data = req.body as ProjectUpdateInput;
    const updateData: Record<string, unknown> = cleanOptionalFields(data);

    if (data.slug) {
      updateData.slug = await resolveSlug(data.slug, req.params.id);
    }

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.json(project);
  }),
);

projectsRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).send();
  }),
);
