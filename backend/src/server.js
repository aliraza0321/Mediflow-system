import app from "./app.js";
import env from "./config/env.js";

// Start the Express server using the port from the environment configuration.
app.listen(env.port, () => {
  console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
});
