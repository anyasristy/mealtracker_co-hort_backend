import express from "express";
import { FoodLog } from "../models/FoodLog.js";
import { Profile } from "../models/Profile.js";
import { calculateTargets } from "../utils/nutrition.js";
const router = express.Router();
function todayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
router.get("/", async (req, res) => {
  const date = todayString();
  const entries = await FoodLog.find({ date }).sort({ createdAt: -1 });
  const totals = entries.reduce(
    (acc, item) => {
      acc.calories += item.calories;
      acc.carbs += item.carbs;
      acc.protein += item.protein;
      acc.fat += item.fat;
      return acc;
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );
  const profile = await Profile.findOne().sort({ createdAt: -1 });
  const targets = profile ? calculateTargets(profile) : null;
  res.json({ date, entries, totals, targets });
});
router.post("/food", async (req, res) => {
  const { name, calories, carbs, protein, fat } = req.body || {};
  if (!name || calories == null || carbs == null || protein == null || fat == null) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const entry = await FoodLog.create({
    date: todayString(),name: String(name),calories: Number(calories),carbs: Number(carbs),protein: Number(protein),fat: Number(fat)
  });
  res.status(201).json({ entry });
});
export default router;
