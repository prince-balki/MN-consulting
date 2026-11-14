import os from "node:os";
import mdns from "multicast-dns";

const HOSTNAME = "mm-consulting.local";
const PORT = 5173;

function findLanAddress() {
  const candidates = [];

  for (const interfaces of Object.values(os.networkInterfaces())) {
    for (const net of interfaces ?? []) {
      if (net.family !== "IPv4" || net.internal) continue;
      if (net.address.startsWith("169.254.")) continue;
      candidates.push(net.address);
    }
  }

  const isPrivate = (address) =>
    /^10\./.test(address) ||
    /^192\.168\./.test(address) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(address);

  return candidates.find(isPrivate) ?? candidates[0] ?? null;
}

const address = findLanAddress();

if (!address) {
  console.error(
    "Aucune adresse IPv4 locale détectée. Connectez cet ordinateur au WiFi puis relancez.",
  );
  process.exit(1);
}

const server = mdns();

function response() {
  return {
    answers: [
      {
        name: HOSTNAME,
        type: "A",
        ttl: 120,
        data: address,
      },
    ],
  };
}

server.on("query", (query) => {
  const asked = (query.questions ?? []).some(
    (question) =>
      question.name?.toLowerCase() === HOSTNAME &&
      (question.type === "A" || question.type === "ANY"),
  );

  if (asked) {
    server.respond(response());
  }
});

server.on("error", (error) => {
  console.error(`mDNS : ${error.message}`);
});

const announce = setInterval(() => {
  server.respond(response());
}, 10000);

console.log(`Nom local : http://${HOSTNAME}:${PORT} (${address})`);

function shutdown() {
  clearInterval(announce);
  server.destroy();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
