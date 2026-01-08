import express from "express";
import { Profile } from "../models/Profile.js";
import { calculateTargets } from "../utils/nutrition.js";
const router = express.Router();
router.get("/", async (req, res) => {
  const profile = await Profile.findOne().sort({ createdAt: -1 });
  if (!profile) return res.json({ profile: null, targets: null });
  const targets = calculateTargets(profile);
  res.json({ profile, targets });
});
router.put("/", async (req, res) => {
  const { age, gender, heightFeet, heightInches, weightLbs } = req.body || {};
  if (
    age == null ||
    !gender ||
    heightFeet == null ||
    heightInches == null ||
    weightLbs == null
  ) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const profile = await Profile.create({
    age: Number(age),
    gender,
    heightFeet: Number(heightFeet),
    heightInches: Number(heightInches),
    weightLbs: Number(weightLbs),
  });
  const targets = calculateTargets(profile);
  res.json({ profile, targets });
});
export default router;
