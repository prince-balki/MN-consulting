import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";

const server = app.listen(env.port, () => {
  console.log(
    `API MN Consulting Engineering démarrée sur http://localhost:${env.port}/api (${env.nodeEnv})`,
  );
});

async function shutdown(signal: string) {
  console.log(`${signal} reçu : arrêt propre du serveur...`);
  server.close(() => {
    void prisma.$disconnect().finally(() => process.exit(0));
  });
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
