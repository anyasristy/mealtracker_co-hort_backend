import dotenv from "dotenv";
dotenv.config();
import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";
const PORT = process.env.PORT ||3001;
async function start() {
  await connectDb(process.env.MONGODB_URI);
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
