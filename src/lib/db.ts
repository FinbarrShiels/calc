import { Database } from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'calculators.db');

// Initialize database
let db: Database;

export function getDb() {
  if (!db) {
    const sqlite3 = require('better-sqlite3');
    db = new sqlite3(dbPath);
    
    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS calculators (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        url TEXT NOT NULL,
        keywords TEXT
      );
    `);
  }
  
  return db;
}

// Initialize the database
export function initializeDb() {
  const db = getDb();
  return db;
}

// Close the database connection
export function closeDb() {
  if (db) {
    db.close();
  }
} 