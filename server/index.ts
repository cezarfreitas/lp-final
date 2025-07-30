import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import compression from "compression";
import { initializeDatabase } from "./lib/database.js";
import adminRoutes from "./routes/admin.js";
import setupRoutes from "./routes/setup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initializeDatabase().catch(console.error);

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, '../dist/client')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Admin API routes
app.use('/api/admin', adminRoutes);

// Setup routes
app.use('/api/setup', setupRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
