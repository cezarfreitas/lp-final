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

    console.log('📂 Looking for SQL files at:');
    console.log('  Schema:', schemaPath);
    console.log('  Init:', initPath);

    let schemaSQL: string;
    let initSQL: string;

    try {
      schemaSQL = await fs.readFile(schemaPath, 'utf8');
      console.log('✅ Schema file loaded successfully');
    } catch (error) {
      console.error('❌ Failed to read schema file:', error);
      throw new Error(`Failed to read schema file: ${schemaPath}`);
    }

    try {
      initSQL = await fs.readFile(initPath, 'utf8');
      console.log('✅ Init file loaded successfully');
    } catch (error) {
      console.error('❌ Failed to read init file:', error);
      throw new Error(`Failed to read init file: ${initPath}`);
    }
    
    // Split and execute schema statements
    const schemaStatements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log(`🔄 Creating database tables... (${schemaStatements.length} statements)`);
    for (let i = 0; i < schemaStatements.length; i++) {
      const statement = schemaStatements[i];
      if (statement.trim()) {
        try {
          console.log(`  Executing schema statement ${i + 1}...`);
          await executeQuery(statement);
        } catch (error) {
          console.error(`  ❌ Failed to execute schema statement ${i + 1}:`, error);
          throw error;
        }
      }
    }

    // Split and execute init statements
    const initStatements = initSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`🔄 Inserting initial data... (${initStatements.length} statements)`);
    for (let i = 0; i < initStatements.length; i++) {
      const statement = initStatements[i];
      if (statement.trim()) {
        try {
          console.log(`  Executing init statement ${i + 1}...`);
          await executeQuery(statement);
        } catch (error) {
          console.error(`  ❌ Failed to execute init statement ${i + 1}:`, error);
          throw error;
        }
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

    let errorMessage = 'Database initialization failed';
    let errorDetails = 'Unknown error';

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || error.message;
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
      details: errorDetails
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
