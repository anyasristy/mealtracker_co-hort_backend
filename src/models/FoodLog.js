import mongoose from "mongoose";
const FoodLogSchema = new mongoose.Schema(
  {date: { type: String, required: true }, name: { type: String, required: true },calories: { type: Number, required: true },carbs: { type: Number, required: true }, protein: { type: Number, required: true },fat: { type: Number, required: true }},{ timestamps: true }
);
FoodLogSchema.index({ date: 1 });
export const FoodLog = mongoose.model("FoodLog", FoodLogSchema);
