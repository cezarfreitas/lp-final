import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
export function createServer() {
  const app = express();

  // Middleware básico
  app.use(compression());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API endpoint básico (se necessário no futuro)
  app.get("/api/status", (req, res) => {
    res.json({ message: "ECKO Landing Page API funcionando!" });
  });

  return app;
}

// Start server when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../dist/client")));

    // Serve React app for all routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../dist/client/index.html"));
    });
  }

  // Start server with port fallback
  const port = process.env.PORT || 3000;

  app
    .listen(port, () => {
      console.log(`🚀 ECKO Landing Page rodando na porta ${port}`);
      console.log(
        `📱 URL: ${process.env.BASE_URL || `http://localhost:${port}`}`,
      );
      console.log(`🌟 Ambiente: ${process.env.NODE_ENV || "development"}`);
    })
    .on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Porta ${port} já está em uso`);
        process.exit(1);
      } else {
        console.error("❌ Erro no servidor:", err);
        process.exit(1);
      }
    });
}
