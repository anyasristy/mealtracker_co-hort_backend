import mongoose from "mongoose";
export async function connectDb(mongoUri) {
  if (!mongoUri) throw new Error("Missing MONGODB_URI in .env");
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
  console.log("Connected to MongoDB");
}
