import bcrypt from "bcryptjs";
import { Router } from "express";
import { ApiError, asyncHandler } from "../lib/errors";
import { signToken } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { loginLimiter } from "../middleware/rateLimits";
import { validate } from "../middleware/validate";
import { loginSchema, type LoginInput } from "../validators/schemas";

export const authRouter = Router();

authRouter.post(
  "/login",
  loginLimiter,
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body as LoginInput;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, "E-mail ou mot de passe incorrect.");
    }

    const token = signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }),
);

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      throw new ApiError(404, "Utilisateur introuvable.");
    }

    res.json(user);
  }),
);
