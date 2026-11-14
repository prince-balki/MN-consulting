import { MessageStatus, Prisma } from "@prisma/client";
import { Router } from "express";
import { asyncHandler } from "../lib/errors";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { formLimiter } from "../middleware/rateLimits";
import { validate } from "../middleware/validate";
import {
  messageCreateSchema,
  messageStatusSchema,
  type MessageCreateInput,
} from "../validators/schemas";

export const messagesRouter = Router();

messagesRouter.post(
  "/",
  formLimiter,
  validate(messageCreateSchema),
  asyncHandler(async (req, res) => {
    const data = req.body as MessageCreateInput;

    const message = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      },
    });

    res.status(201).json({
      id: message.id,
      createdAt: message.createdAt,
      message: "Votre message a bien été envoyé. Nous vous répondrons rapidement.",
    });
  }),
);

messagesRouter.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const where: Prisma.MessageWhereInput = {};
    const status = req.query.status as MessageStatus | undefined;

    if (status && Object.values(MessageStatus).includes(status)) {
      where.status = status;
    }

    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(messages);
  }),
);

messagesRouter.patch(
  "/:id/status",
  requireAuth,
  validate(messageStatusSchema),
  asyncHandler(async (req, res) => {
    const message = await prisma.message.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    });
    res.json(message);
  }),
);

messagesRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    await prisma.message.delete({ where: { id: req.params.id } });
    res.status(204).send();
  }),
);
