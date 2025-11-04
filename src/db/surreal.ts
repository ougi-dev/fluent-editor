/** biome-ignore-all lint/style/noNonNullAssertion: <.env variables> */
/** biome-ignore-all lint/suspicious/noConsole: <utils> */
import Surreal from "surrealdb";

// Define the database configuration interface
type DbConfig = {
  url: string;
  namespace: string;
  database: string;
  username: string;
  password: string;
};

// Define the default database configuration
const DEFAULT_CONFIG: DbConfig = {
  // url: process.env.SURREALDB_URL || "http://127.0.0.1:8000/rpc",
  url: "./surreal.db",
  namespace: process.env.SURREALDB_NAMESPACE || "test",
  database: process.env.SURREALDB_DATABASE || "test",
  username: process.env.SURREALDB_USER!,
  password: process.env.SURREALDB_PASSWORD!,
};

// Define the function to get the database instance
export async function getDb(
  config: DbConfig = DEFAULT_CONFIG
): Promise<Surreal> {
  const db = new Surreal();
  try {
    await db.connect(config.url);
    await db.use({ namespace: config.namespace, database: config.database });
    await db.signin({ username: config.username, password: config.password });
    return db;
  } catch (err) {
    console.error(
      "Failed to connect to SurrealDB:",
      err instanceof Error ? err.message : String(err)
    );
    await db.close();
    throw err;
  }
}
