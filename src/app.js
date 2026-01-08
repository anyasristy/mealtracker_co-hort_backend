import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profile.routes.js";
import todayRoutes from "./routes/today.routes.js";
export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get("/", (req, res) => res.send("Meal Tracker API running"));
  app.use("/api/profile", profileRoutes);
  app.use("/api/today", todayRoutes);
  return app;
}
