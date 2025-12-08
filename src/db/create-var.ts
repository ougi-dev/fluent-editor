// scripts/create-global-vars.ts
/** biome-ignore-all lint/suspicious/noConsole: <utility> */
import { jsonify } from "surrealdb";
import { getClientDb } from "@/db/client-db";

type Variable = {
  id?: string;
  name: string;
  description?: string;
  type: "boolean" | "number" | "string" | "object" | "unknown";
  value: unknown;
};

async function createGlobalVar(): Promise<void> {
  const db = await getClientDb();

  if (!db) {
    console.error("Database not initialized");
    return;
  }

  try {
    // Create a set of global variables used to persist important state across the app
    const variables: Variable[] = [
      {
        name: "battleWins",
        description: "Total number of battles won by the player",
        type: "number",
        value: 0,
      },
      {
        name: "npc_bob_alive",
        description: "Is the NPC named Bob alive?",
        type: "boolean",
        value: true,
      },
      {
        name: "event_tutorial_completed",
        description: "Whether the tutorial event has been completed",
        type: "boolean",
        value: false,
      },
      {
        name: "player_gold",
        description: "The player's current gold",
        type: "number",
        value: 100,
      },
      {
        name: "player_display_name",
        description: "Player's display name",
        type: "string",
        value: "Hero",
      },
    ];

    // Try creating all variables. If they already exist, we will catch the error for each.
    const created: unknown[] = [];
    for (const v of variables) {
      try {
        // Create the record in the `globalVar` table. If the table has a unique constraint
        // on name, you may prefer UPSERT; here we attempt to create and log failures.
        const result = await db.create("globalVar", v);
        created.push(result);
        console.log(`Created variable ${v.name}:`, jsonify(result));
      } catch (innerErr: unknown) {
        // If create fails (e.g., record already exists), log and continue.
        console.warn(
          `Failed to create variable ${v.name} - record may already exist:`,
          innerErr instanceof Error ? innerErr.message : String(innerErr)
        );
      }
    }

    if (created.length > 0) {
      console.log(`Created ${created.length} variable(s) in the globalVar table`);
    } else {
      console.log("No new global vars were created (they may already exist)");
    }
  } catch (err: unknown) {
    console.error("Failed to create global vars:", err instanceof Error ? err.message : String(err));
  } finally {
    await db.close();
  }
}

createGlobalVar();
