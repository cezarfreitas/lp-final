import path from "path";
import express from "express";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import compression from "compression";
import { initializeDatabase } from "./lib/database.js";
import adminRoutes from "./routes/admin.js";
import setupRoutes from "./routes/setup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export function to create Express app for Vite dev server
export function createServer() {
  const app = express();

  // Initialize database
  initializeDatabase().catch(console.error);

  // Middleware
  app.use(compression());
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(__dirname, '../public/uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Created uploads directory:', uploadsDir);
  }

  // Serve uploads directory
  app.use('/uploads', express.static(uploadsDir));

  // Also serve from root public directory
  app.use(express.static(path.join(__dirname, '../public')));

  // Admin API routes
  app.use('/api/admin', adminRoutes);

  // Setup routes
  app.use('/api/setup', setupRoutes);

  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

// Start standalone server when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();
  const PORT = process.env.PORT || 3000;

  // Serve static files for production
  app.use(express.static(path.join(__dirname, '../dist/client')));

  // Serve React app for all other routes in production
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
