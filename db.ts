import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Construct path to schema relative to the backend folder or project root
const dbPath = path.join(process.cwd(), 'database.sqlite');
const schemaPath = path.join(process.cwd(), 'backend', 'schema.sql');

// Initialize database
const db = new Database(dbPath, { verbose: console.log });

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize schema
try {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);
  console.log('Database schema synchronized.');
} catch (error) {
  console.error('Failed to read or execute schema:', error);
}

export default db;
