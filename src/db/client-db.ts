import Surreal from "surrealdb";

type DbConfig = {
  url: string;
  namespace: string;
  database: string;
  username: string;
  password: string;
};

// Configuration - uses environment variables or defaults
const DEFAULT_CONFIG: DbConfig = {
  url: process.env.SURREALDB_URL || "http://127.0.0.1:8000/rpc",
  namespace: process.env.SURREALDB_NAMESPACE || "test",
  database: process.env.SURREALDB_DATABASE || "test",
  username: process.env.SURREALDB_USER || "root",
  password: process.env.SURREALDB_PASSWORD || "root",
};

/**
 * Create a new SurrealDB connection.
 * Each call returns a fresh connection for isolated live queries.
 * 
 * IMPORTANT: Caller must close the connection when done to avoid leaks.
 * For live queries, keep the connection open; for one-off queries, close after use.
 */
export async function getClientDb(): Promise<Surreal> {
  const db = new Surreal();
  try {
    await db.connect(DEFAULT_CONFIG.url);
    await db.use({ 
      namespace: DEFAULT_CONFIG.namespace, 
      database: DEFAULT_CONFIG.database 
    });
    await db.signin({ 
      username: DEFAULT_CONFIG.username, 
      password: DEFAULT_CONFIG.password 
    });
    return db;
  } catch (err) {
    // biome-ignore lint/suspicious/noConsole: <error-logging>
    console.error(
      "Failed to connect to SurrealDB:",
      err instanceof Error ? err.message : String(err)
    );
    throw err;
  }
}
