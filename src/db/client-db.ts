/**
 * CLIENT-SIDE SurrealDB Connection Manager
 * 
 * This file creates a singleton SurrealDB instance for the browser.
 * It reuses the same config from surreal.ts but works in the browser.
 * 
 * WHY SINGLETON?
 * - We want ONE shared database connection across all hooks
 * - Prevents creating multiple connections (wasteful)
 * - Reuses WebSocket connection for efficiency
 */

import Surreal from "surrealdb";

// Configuration - uses environment variables or defaults
const DB_CONFIG = {
  url: process.env.NEXT_PUBLIC_SURREALDB_URL || "ws://127.0.0.1:8000/rpc",
  namespace: process.env.NEXT_PUBLIC_SURREALDB_NAMESPACE || "test",
  database: process.env.NEXT_PUBLIC_SURREALDB_DATABASE || "test",
  username: process.env.NEXT_PUBLIC_SURREALDB_USER || "root",
  password: process.env.NEXT_PUBLIC_SURREALDB_PASSWORD || "root",
};

// Singleton instance - only create once
let dbInstance: Surreal | null = null;
let connectionPromise: Promise<Surreal> | null = null;

/**
 * Get or create the SurrealDB client instance
 * 
 * HOW IT WORKS:
 * 1. If already connected, return the existing instance immediately
 * 2. If connection is in progress, wait for it
 * 3. Otherwise, create a new connection
 * 
 * This ensures we only have ONE database connection shared everywhere
 */
export async function getClientDb(): Promise<Surreal> {
  // Already connected? Return it
  if (dbInstance) {
    return dbInstance;
  }

  // Connection in progress? Wait for it
  if (connectionPromise) {
    return connectionPromise;
  }

  // Create new connection
  connectionPromise = (async () => {
    const db = new Surreal();

    try {
      // Connect to SurrealDB
      await db.connect(DB_CONFIG.url);
      
      // Select namespace and database
      await db.use({
        namespace: DB_CONFIG.namespace,
        database: DB_CONFIG.database,
      });
      
      // Authenticate
      await db.signin({
        username: DB_CONFIG.username,
        password: DB_CONFIG.password,
      });

      dbInstance = db;
      return db;
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <error-logging>
      console.error("Failed to connect to SurrealDB:", error);
      connectionPromise = null; // Reset so we can retry
      throw error;
    }
  })();

  return connectionPromise;
}

/**
 * Close the database connection
 * Useful for cleanup or testing
 */
export async function closeClientDb(): Promise<void> {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
    connectionPromise = null;
  }
}
