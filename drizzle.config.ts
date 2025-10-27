import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./src/db/drizzle", // migration folder
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    // biome-ignore lint: Forbidden non-null assertion.
    url: process.env.DB_FILE_NAME!,
  },
});
