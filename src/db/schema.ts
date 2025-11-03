import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
});
export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  nodes: text("nodes").notNull(), // JSON stringified nodes
  edges: text("edges").notNull(), // JSON stringified edges
});
