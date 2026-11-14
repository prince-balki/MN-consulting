import { Prisma, QuoteStatus } from "@prisma/client";
import { Router } from "express";
import { asyncHandler } from "../lib/errors";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { formLimiter } from "../middleware/rateLimits";
import { validate } from "../middleware/validate";
import {
  quoteCreateSchema,
  quoteStatusSchema,
  type QuoteCreateInput,
} from "../validators/schemas";

export const quotesRouter = Router();

quotesRouter.post(
  "/",
  formLimiter,
  validate(quoteCreateSchema),
  asyncHandler(async (req, res) => {
    const data = req.body as QuoteCreateInput;

    const quote = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        projectType: data.projectType,
        budget: data.budget || null,
        timeline: data.timeline || null,
        description: data.description,
      },
    });

    res.status(201).json({
      id: quote.id,
      createdAt: quote.createdAt,
      message:
        "Votre demande de devis a bien été reçue. Notre équipe étudiera les informations transmises et vous recontactera.",
    });
  }),
);

quotesRouter.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const where: Prisma.QuoteRequestWhereInput = {};
    const status = req.query.status as QuoteStatus | undefined;

    if (status && Object.values(QuoteStatus).includes(status)) {
      where.status = status;
    }

    const quotes = await prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(quotes);
  }),
);

quotesRouter.patch(
  "/:id/status",
  requireAuth,
  validate(quoteStatusSchema),
  asyncHandler(async (req, res) => {
    const quote = await prisma.quoteRequest.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    });
    res.json(quote);
  }),
);

quotesRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    await prisma.quoteRequest.delete({ where: { id: req.params.id } });
    res.status(204).send();
  }),
);
