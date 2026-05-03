const { env } = require("./config/env");
const { createApp } = require("./app");

async function startServer() {
  const app = await createApp();

  app.listen(env.port, () => {
    console.log(`MediFlow backend running on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
