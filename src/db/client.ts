import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "@/db/schema";

// biome-ignore lint: Forbidden non-null assertion.
const sqlite = new Database(process.env.DB_FILE_NAME!);
const db = drizzle(sqlite, { schema });
export default db;
