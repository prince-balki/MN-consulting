import { MessageStatus, QuoteStatus } from "@prisma/client";
import { Router } from "express";
import { asyncHandler } from "../lib/errors";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

export const statsRouter = Router();

statsRouter.get(
  "/",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const [
      projects,
      services,
      testimonials,
      team,
      messages,
      newMessages,
      quotes,
      newQuotes,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.testimonial.count(),
      prisma.teamMember.count(),
      prisma.message.count(),
      prisma.message.count({ where: { status: MessageStatus.NEW } }),
      prisma.quoteRequest.count(),
      prisma.quoteRequest.count({ where: { status: QuoteStatus.NEW } }),
    ]);

    res.json({
      projects,
      services,
      testimonials,
      team,
      messages,
      newMessages,
      quotes,
      newQuotes,
    });
  }),
);
