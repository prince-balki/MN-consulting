import { Prisma } from "@prisma/client";
import type { Request, Response } from "express";
import { ZodError } from "zod";
import { env } from "../config/env";
import { ApiError } from "../lib/errors";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    message: `Route introuvable : ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: (error?: unknown) => void,
) {
  if (error instanceof ApiError) {
    res.status(error.status).json({
      message: error.message,
      ...(error.details ? { details: error.details } : {}),
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(422).json({
      message: "Données invalides.",
      details: error.flatten(),
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      res.status(409).json({ message: "Cette valeur est déjà utilisée." });
      return;
    }
    if (error.code === "P2025") {
      res.status(404).json({ message: "Ressource introuvable." });
      return;
    }
  }

  console.error(error);
  res.status(500).json({
    message: env.isProduction
      ? "Erreur interne du serveur."
      : error instanceof Error
        ? error.message
        : "Erreur interne du serveur.",
  });
}
