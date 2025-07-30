import { Router, Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { executeQuery } from '../lib/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Initialize database with schema and initial data
router.post('/init-database', async (req: Request, res: Response) => {
  try {
    // Read schema file
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const initPath = path.join(__dirname, '../../database/init.sql');
    
    const schemaSQL = await fs.readFile(schemaPath, 'utf8');
    const initSQL = await fs.readFile(initPath, 'utf8');
    
    // Split and execute schema statements
    const schemaStatements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log('🔄 Creating database tables...');
    for (const statement of schemaStatements) {
      if (statement.trim()) {
        await executeQuery(statement);
      }
    }
    
    // Split and execute init statements
    const initStatements = initSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log('🔄 Inserting initial data...');
    for (const statement of initStatements) {
      if (statement.trim()) {
        await executeQuery(statement);
      }
    }
    
    console.log('✅ Database initialized successfully');
    res.json({ 
      success: true, 
      message: 'Database initialized successfully',
      tablesCreated: schemaStatements.length,
      recordsInserted: initStatements.length
    });
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Database initialization failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Check database status
router.get('/status', async (req: Request, res: Response) => {
  try {
    // Check if tables exist
    const tables = await executeQuery("SHOW TABLES");
    
    // Count records in main tables
    const counts = {};
    const mainTables = [
      'hero_section', 'benefits', 'testimonials', 'faqs', 
      'product_gallery', 'showroom_section', 'footer_section'
    ];
    
    for (const table of mainTables) {
      try {
        const result = await executeQuery(`SELECT COUNT(*) as count FROM ${table}`);
        counts[table] = result[0]?.count || 0;
      } catch {
        counts[table] = 'table not found';
      }
    }
    
    res.json({
      success: true,
      tables: tables.length,
      tablesList: tables,
      recordCounts: counts
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to check database status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
