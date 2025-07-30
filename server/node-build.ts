import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "./index";
import * as express from "express";
import compression from "compression";

const app = createServer();
const port = process.env.PORT || 3000;

// Add compression middleware for better performance
app.use(
  compression({
    level: 6, // Good balance between compression ratio and CPU usage
    threshold: 1024, // Only compress responses larger than 1KB
    filter: (req, res) => {
      // Don't compress images or already compressed files
      if (req.headers["x-no-compression"]) return false;
      return compression.filter(req, res);
    },
  }),
);

// In production, serve the built SPA files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../spa");

// Serve static files with optimized caching
app.use(
  express.static(distPath, {
    maxAge: "1y", // Cache static assets for 1 year
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      // Different cache strategies for different file types
      if (path.endsWith(".html")) {
        // HTML files should be revalidated frequently
        res.setHeader(
          "Cache-Control",
          "public, max-age=0, s-maxage=86400, must-revalidate",
        );
      } else if (path.match(/\.(js|css)$/)) {
        // JS/CSS files with hash in filename can be cached longer
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (path.match(/\.(jpg|jpeg|png|gif|ico|svg|webp)$/)) {
        // Images can be cached for a long time
        res.setHeader("Cache-Control", "public, max-age=31536000");
      }
    },
  }),
);

// Handle React Router - serve index.html for all non-API routes
app.get("*", (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
