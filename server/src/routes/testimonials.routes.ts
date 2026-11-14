import { Router } from "express";
import { asyncHandler } from "../lib/errors";
import { prisma } from "../lib/prisma";
import { optionalAuth, requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  testimonialCreateSchema,
  testimonialUpdateSchema,
  type TestimonialCreateInput,
  type TestimonialUpdateInput,
} from "../validators/schemas";

export const testimonialsRouter = Router();

testimonialsRouter.get(
  "/",
  optionalAuth,
  asyncHandler(async (req, res) => {
    const testimonials = await prisma.testimonial.findMany({
      where: req.user ? {} : { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    res.json(testimonials);
  }),
);

testimonialsRouter.post(
  "/",
  requireAuth,
  validate(testimonialCreateSchema),
  asyncHandler(async (req, res) => {
    const testimonial = await prisma.testimonial.create({
      data: req.body as TestimonialCreateInput,
    });
    res.status(201).json(testimonial);
  }),
);

testimonialsRouter.put(
  "/:id",
  requireAuth,
  validate(testimonialUpdateSchema),
  asyncHandler(async (req, res) => {
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: req.body as TestimonialUpdateInput,
    });
    res.json(testimonial);
  }),
);

testimonialsRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.status(204).send();
  }),
);
