import mysql from 'mysql2/promise';

const dbConfig = {
  host: '148.230.78.129',
  port: 3307,
  user: 'ecko',
  password: '5acf3bfd1f1c3846491a',
  database: 'lp-ecko-db',
  charset: 'utf8mb4',
  timezone: '+00:00',
  connectionLimit: 10,
  // Remove invalid options that cause warnings
  // acquireTimeout and timeout are not valid for mysql2
};

let pool: mysql.Pool;

export function getDbPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

export async function executeQuery<T = any>(
  query: string,
  params?: any[]
): Promise<T> {
  const connection = getDbPool();

  try {
    const [rows] = await connection.execute(query, params);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// For DDL statements (CREATE, DROP, ALTER, etc.) that don't support prepared statements
export async function executeDDL<T = any>(
  query: string
): Promise<T> {
  const connection = getDbPool();

  try {
    const [rows] = await connection.query(query);
    return rows as T;
  } catch (error) {
    console.error('Database DDL error:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    const connection = getDbPool();
    
    // Test connection
    await connection.execute('SELECT 1');
    console.log('✅ Database connected successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

// Helper functions for common operations
export async function findOne<T>(table: string, conditions: Record<string, any>): Promise<T | null> {
  const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
  const values = Object.values(conditions);
  
  const query = `SELECT * FROM ${table} WHERE ${whereClause} LIMIT 1`;
  const rows = await executeQuery<T[]>(query, values);
  
  return rows.length > 0 ? rows[0] : null;
}

export async function findMany<T>(
  table: string, 
  conditions: Record<string, any> = {},
  orderBy?: string,
  limit?: number
): Promise<T[]> {
  let query = `SELECT * FROM ${table}`;
  const values: any[] = [];
  
  if (Object.keys(conditions).length > 0) {
    const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
    query += ` WHERE ${whereClause}`;
    values.push(...Object.values(conditions));
  }
  
  if (orderBy) {
    query += ` ORDER BY ${orderBy}`;
  }
  
  if (limit) {
    query += ` LIMIT ${limit}`;
  }
  
  return executeQuery<T[]>(query, values);
}

export async function insertRecord<T>(
  table: string,
  data: Record<string, any>
): Promise<{ insertId: number; affectedRows: number }> {
  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
  console.log('INSERT query:', query);
  console.log('INSERT values:', values);

  const result = await executeQuery<mysql.ResultSetHeader>(query, values);

  return {
    insertId: result.insertId,
    affectedRows: result.affectedRows
  };
}

export async function updateRecord(
  table: string,
  data: Record<string, any>,
  conditions: Record<string, any>
): Promise<{ affectedRows: number }> {
  // Remove timestamp fields that should not be manually updated
  const filteredData = { ...data };
  delete filteredData.created_at;
  delete filteredData.updated_at;
  delete filteredData.id; // Also remove id from data

  if (Object.keys(filteredData).length === 0) {
    console.log('No data to update after filtering');
    return { affectedRows: 0 };
  }

  const setClause = Object.keys(filteredData).map(key => `${key} = ?`).join(', ');
  const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');

  const values = [...Object.values(filteredData), ...Object.values(conditions)];

  const query = `UPDATE ${table} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE ${whereClause}`;
  console.log('UPDATE query:', query);
  console.log('UPDATE values:', values);

  const result = await executeQuery<mysql.ResultSetHeader>(query, values);
  console.log('UPDATE result:', result);

  return { affectedRows: result.affectedRows };
}

export async function deleteRecord(
  table: string,
  conditions: Record<string, any>
): Promise<{ affectedRows: number }> {
  const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
  const values = Object.values(conditions);
  
  const query = `DELETE FROM ${table} WHERE ${whereClause}`;
  const result = await executeQuery<mysql.ResultSetHeader>(query, values);
  
  return { affectedRows: result.affectedRows };
}
