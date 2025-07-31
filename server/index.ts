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

  // Try different ports if the preferred one is in use
  const tryPorts = [
    process.env.PORT ? parseInt(process.env.PORT) : 3000,
    3000,
    3001,
    8080,
    8000
  ];

  // Serve static files for production
  app.use(express.static(path.join(__dirname, '../dist/client')));

  // Serve React app for all other routes in production
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'));
  });

  const startServer = async (ports: number[]) => {
    for (const port of ports) {
      try {
        await new Promise<void>((resolve, reject) => {
          const server = app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
            console.log(`📱 Local: http://localhost:${port}`);
            resolve();
          });

          server.on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
              console.log(`⚠️  Port ${port} is already in use, trying next port...`);
              reject(err);
            } else {
              console.error(`❌ Server error on port ${port}:`, err);
              reject(err);
            }
          });
        });
        break; // Success, exit loop
      } catch (err: any) {
        if (err.code !== 'EADDRINUSE' || port === ports[ports.length - 1]) {
          console.error(`❌ Failed to start server: ${err.message}`);
          process.exit(1);
        }
      }
    }
  };

  startServer(tryPorts).catch((err) => {
    console.error(`❌ Could not start server on any available port:`, err);
    process.exit(1);
  });
}
