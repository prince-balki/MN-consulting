import { Router } from "express";
import { asyncHandler } from "../lib/errors";
import { prisma } from "../lib/prisma";
import { slugify } from "../lib/slug";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  serviceCreateSchema,
  serviceUpdateSchema,
  type ServiceCreateInput,
  type ServiceUpdateInput,
} from "../validators/schemas";

export const servicesRouter = Router();

async function resolveSlug(desired: string, currentId?: string) {
  const existing = await prisma.service.findUnique({ where: { slug: desired } });
  if (existing && existing.id !== currentId) {
    return `${desired}-${Date.now().toString(36)}`;
  }
  return desired;
}

servicesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const services = await prisma.service.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    res.json(services);
  }),
);

servicesRouter.post(
  "/",
  requireAuth,
  validate(serviceCreateSchema),
  asyncHandler(async (req, res) => {
    const data = req.body as ServiceCreateInput;
    const slug = await resolveSlug(data.slug ?? slugify(data.title));

    const service = await prisma.service.create({
      data: {
        ...data,
        slug,
        features: data.features ?? [],
      },
    });

    res.status(201).json(service);
  }),
);

servicesRouter.put(
  "/:id",
  requireAuth,
  validate(serviceUpdateSchema),
  asyncHandler(async (req, res) => {
    const data = req.body as ServiceUpdateInput;
    const updateData: Record<string, unknown> = { ...data };

    if (data.slug) {
      updateData.slug = await resolveSlug(data.slug, req.params.id);
    }

    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.json(service);
  }),
);

servicesRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    await prisma.service.delete({ where: { id: req.params.id } });
    res.status(204).send();
  }),
);
