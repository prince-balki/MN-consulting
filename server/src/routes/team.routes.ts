import { Router } from "express";
import { asyncHandler } from "../lib/errors";
import { prisma } from "../lib/prisma";
import { optionalAuth, requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  teamCreateSchema,
  teamUpdateSchema,
  type TeamCreateInput,
  type TeamUpdateInput,
} from "../validators/schemas";

export const teamRouter = Router();

function cleanOptionalFields(data: Record<string, unknown>) {
  const cleaned = { ...data };
  for (const key of ["photo", "linkedin"]) {
    if (cleaned[key] === "") {
      cleaned[key] = null;
    }
  }
  return cleaned;
}

teamRouter.get(
  "/",
  optionalAuth,
  asyncHandler(async (req, res) => {
    const team = await prisma.teamMember.findMany({
      where: req.user ? {} : { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    res.json(team);
  }),
);

teamRouter.post(
  "/",
  requireAuth,
  validate(teamCreateSchema),
  asyncHandler(async (req, res) => {
    const member = await prisma.teamMember.create({
      data: cleanOptionalFields(req.body as TeamCreateInput) as TeamCreateInput,
    });
    res.status(201).json(member);
  }),
);

teamRouter.put(
  "/:id",
  requireAuth,
  validate(teamUpdateSchema),
  asyncHandler(async (req, res) => {
    const member = await prisma.teamMember.update({
      where: { id: req.params.id },
      data: cleanOptionalFields(req.body as TeamUpdateInput) as TeamUpdateInput,
    });
    res.json(member);
  }),
);

teamRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    await prisma.teamMember.delete({ where: { id: req.params.id } });
    res.status(204).send();
  }),
);
