import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { ApiError } from "./lib/errors";
import { prisma } from "./lib/prisma";
import { errorHandler, notFoundHandler } from "./middleware/error";
import { authRouter } from "./routes/auth.routes";
import { messagesRouter } from "./routes/messages.routes";
import { projectsRouter } from "./routes/projects.routes";
import { quotesRouter } from "./routes/quotes.routes";
import { servicesRouter } from "./routes/services.routes";
import { statsRouter } from "./routes/stats.routes";
import { teamRouter } from "./routes/team.routes";
import { testimonialsRouter } from "./routes/testimonials.routes";

export const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.clientOrigins.includes(origin) || !env.isProduction) {
        callback(null, true);
        return;
      }
      callback(new ApiError(403, "Origine non autorisée par CORS."));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (!env.isProduction) {
  app.use(morgan("dev"));
}

app.get("/", (_req, res) => {
  res.json({
    name: "MN Consulting Engineering API",
    version: "1.0.0",
    documentation: "/api/health",
  });
});

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      database: "up",
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(503).json({
      status: "degraded",
      database: "down",
      timestamp: new Date().toISOString(),
    });
  }
});

app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/team", teamRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/quotes", quotesRouter);
app.use("/api/stats", statsRouter);

app.use(notFoundHandler);
app.use(errorHandler);
