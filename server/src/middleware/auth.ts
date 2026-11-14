import type { Role } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/errors";
import { verifyToken } from "../lib/jwt";

function attachUser(req: Request, token: string): boolean {
  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role as Role,
    };
    return true;
  } catch {
    return false;
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    next(new ApiError(401, "Authentification requise."));
    return;
  }

  if (!attachUser(req, header.slice(7))) {
    next(new ApiError(401, "Session invalide ou expirée."));
    return;
  }

  next();
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (header?.startsWith("Bearer ")) {
    attachUser(req, header.slice(7));
  }

  next();
}
