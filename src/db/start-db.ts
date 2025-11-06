import { spawn } from "bun";

console.log("Starting SurrealDB...");

const surrealProcess = spawn(["surreal", "start", "rocksdb:surreal.db"], {
  stdout: "inherit",
  stderr: "inherit",
});
surrealProcess.exited
  .then((code) => {
    if (code === 0) {
      console.log("SurrealDB process exited successfully");
    } else {
      console.error(`SurrealDB process exited with code ${code}`);
    }
  })
  .catch((err) => {
    console.error("Failed to start SurrealDB:", err.message);
  });

await new Promise(() => {});
