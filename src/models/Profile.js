import mongoose from "mongoose";
const ProfileSchema = new mongoose.Schema(
  {
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    heightFeet: { type: Number, required: true },
    heightInches: { type: Number, required: true },
    weightLbs: { type: Number, required: true }
  },
  { timestamps: true }
);
export const Profile = mongoose.model("Profile", ProfileSchema);
